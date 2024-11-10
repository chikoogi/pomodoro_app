'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { PomodoroSession } from '@/types/pomodoro.types';

interface PomodoroTimerProps {
  session: PomodoroSession;
  onUpdate: (sessionId: string, updates: Partial<PomodoroSession>) => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ session, onUpdate }) => {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (session.status === 'RUNNING' && session.timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        onUpdate(session.id, {
          timeRemaining: session.timeRemaining - 1,
          ...(session.timeRemaining <= 1 && {
            status: 'COMPLETED',
            endTime: new Date()
          })
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [session.status, session.timeRemaining, session.id, onUpdate]);

  const handleStart = () => {
    onUpdate(session.id, {
      status: 'RUNNING',
      startTime: new Date()
    });
  };

  const handlePause = () => {
    onUpdate(session.id, {
      status: 'PAUSED'
    });
  };

  const handleReset = () => {
    onUpdate(session.id, {
      status: 'PENDING',
      timeRemaining: session.duration * 60,
      startTime: undefined,
      endTime: null
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="text-center">
        <div className="text-3xl font-mono mb-4">
          {formatTime(session.timeRemaining)}
        </div>
        <div className="flex justify-center gap-2">
          {session.status === 'PENDING' && (
            <Button onClick={handleStart}>시작</Button>
          )}
          {session.status === 'RUNNING' && (
            <Button onClick={handlePause}>일시정지</Button>
          )}
          {session.status === 'PAUSED' && (
            <Button onClick={handleStart}>재개</Button>
          )}
          {(session.status === 'PAUSED' || session.status === 'RUNNING') && (
            <Button variant="secondary" onClick={handleReset}>
              리셋
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}; 
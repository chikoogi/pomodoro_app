'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { PomodoroForm } from '@/components/molecules/PomodoroForm/PomodoroForm';
import { PomodoroTimer } from '@/components/molecules/PomodoroTimer/PomodoroTimer';
import { usePomodoroManagement } from '@/hooks/usePomodoroManagement';
import { PomodoroSession } from '@/types/pomodoro.types';

interface PomodoroListProps {
  todoId: string;
}

export const PomodoroList: React.FC<PomodoroListProps> = ({ todoId }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const { sessions, isLoading, addSession, updateSession, deleteSession } = usePomodoroManagement(todoId);

  const handleSubmit = (duration: number) => {
    if (editingSessionId) {
      updateSession(editingSessionId, { duration });
      setEditingSessionId(null);
    } else {
      addSession(duration);
    }
    setShowForm(false);
  };

  const handleEdit = (sessionId: string) => {
    setEditingSessionId(sessionId);
    setShowForm(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">포모도로 세션</h2>
        <Button onClick={() => setShowForm(true)}>
          새 세션 추가
        </Button>
      </div>

      {showForm && (
        <PomodoroForm
          initialDuration={editingSessionId 
            ? sessions.find((s: PomodoroSession) => s.id === editingSessionId)?.duration 
            : 25}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingSessionId(null);
          }}
        />
      )}

      <div className="grid gap-4">
        {sessions.map((session: PomodoroSession) => (
          <div key={session.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">
                  {session.duration}분 세션
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {session.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(session.id)}
                  disabled={session.status === 'RUNNING'}
                >
                  수정
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteSession(session.id)}
                  disabled={session.status === 'RUNNING'}
                >
                  삭제
                </Button>
              </div>
            </div>
            {session.status !== 'COMPLETED' && (
              <PomodoroTimer
                session={session}
                onUpdate={updateSession}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 
'use client'

import { usePomodoro } from '@/hooks/usePomodoro'
import { Button } from '@/components/atoms/Button/Button'
import { formatTime } from '@/tools/common-tools'

interface PomodoroTimerProps {
  todoId: string
  todoTitle: string
  duration: number
  onComplete?: () => void
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  todoId,
  todoTitle,
  duration,
  onComplete,
}) => {
  const { state, startSession, pauseSession, resumeSession } =
    usePomodoro(todoId)

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{todoTitle}</h3>

      <div className="text-center">
        <div className="text-4xl font-bold mb-6">
          {formatTime(state.timeRemaining)}
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {state.isBreak ? '휴식 시간' : '작업 시간'}
        </div>

        <div className="space-x-4">
          {!state.currentSession && (
            <Button onClick={startSession}>시작</Button>
          )}

          {state.currentSession?.status === 'RUNNING' && (
            <Button variant="secondary" onClick={pauseSession}>
              일시정지
            </Button>
          )}

          {state.currentSession?.status === 'PAUSED' && (
            <Button onClick={resumeSession}>재개</Button>
          )}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          완료한 세션: {state.completedSessions}
        </div>
      </div>
    </div>
  )
}

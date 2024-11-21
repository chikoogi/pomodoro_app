'use client'

import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { PomodoroSession } from '@/types/pomodoro.types'

export const usePomodoroManagement = (todoId: string) => {
  const [sessions, setSessions, isLoading] = useLocalStorage<PomodoroSession[]>(
    `pomodoro_${todoId}`,
    [],
  )

  const addSession = useCallback(
    (item: Pick<PomodoroSession, 'duration' | 'title'>) => {
      const newSession: PomodoroSession = {
        id: crypto.randomUUID(),
        todoId,
        duration: item.duration,
        title: item.title,
        status: 'PENDING',
        timeRemaining: item.duration,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setSessions((prev) => [...prev, newSession])
    },
    [todoId, setSessions],
  )

  const updateSession = useCallback(
    (
      id: string,
      updates: Partial<Omit<PomodoroSession, 'id' | 'todoId' | 'createdAt'>>,
    ) => {
      setSessions((prev) =>
        prev.map((session) =>
          session.id === id
            ? { ...session, ...updates, updatedAt: new Date() }
            : session,
        ),
      )
    },
    [setSessions],
  )

  const deleteSession = useCallback(
    (id: string) => {
      setSessions((prev) => prev.filter((session) => session.id !== id))
    },
    [setSessions],
  )

  return {
    sessions,
    isLoading,
    addSession,
    updateSession,
    deleteSession,
  }
}

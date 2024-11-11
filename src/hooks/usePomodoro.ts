'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  PomodoroSession,
  PomodoroSettings,
  PomodoroState,
} from '@/types/pomodoro.types'
import { useLocalStorage } from './useLocalStorage'

const DEFAULT_SETTINGS: PomodoroSettings = {
  workDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
}

export const usePomodoro = (todoId: string) => {
  const [settings] = useLocalStorage<PomodoroSettings>(
    'pomodoroSettings',
    DEFAULT_SETTINGS,
  )
  const [sessions, setSessions] = useLocalStorage<PomodoroSession[]>(
    `pomodoro_${todoId}`,
    [],
  )

  const [state, setState] = useState<PomodoroState>({
    currentSession: null,
    timeRemaining: settings.workDuration * 60,
    isBreak: false,
    completedSessions: sessions.filter((s) => s.status === 'COMPLETED').length,
  })

  const startSession = useCallback(() => {
    const newSession: PomodoroSession = {
      id: crypto.randomUUID(),
      todoId,
      startTime: new Date(),
      endTime: null,
      duration: settings.workDuration,
      status: 'RUNNING',
      createdAt: new Date(),
      updatedAt: new Date(),
      timeRemaining: 0,
    }

    setState((prev) => ({
      ...prev,
      currentSession: newSession,
      timeRemaining: settings.workDuration * 60,
      isBreak: false,
    }))

    setSessions((prev) => [...prev, newSession])
  }, [todoId, settings, setSessions])

  const pauseSession = useCallback(() => {
    if (!state.currentSession) return

    setState((prev) => ({
      ...prev,
      currentSession: {
        ...prev.currentSession!,
        status: 'PAUSED',
        updatedAt: new Date(),
      },
    }))
  }, [state.currentSession])

  const resumeSession = useCallback(() => {
    if (!state.currentSession) return

    setState((prev) => ({
      ...prev,
      currentSession: {
        ...prev.currentSession!,
        status: 'RUNNING',
        updatedAt: new Date(),
      },
    }))
  }, [state.currentSession])

  const completeSession = useCallback(() => {
    if (!state.currentSession) return

    const updatedSession: PomodoroSession = {
      ...state.currentSession,
      status: 'COMPLETED' as const,
      endTime: new Date(),
      updatedAt: new Date(),
    }

    setSessions((prev) =>
      prev.map((session) =>
        session.id === state.currentSession!.id ? updatedSession : session,
      ),
    )

    setState((prev) => ({
      ...prev,
      currentSession: null,
      completedSessions: prev.completedSessions + 1,
      isBreak: true,
      timeRemaining: shouldTakeLongBreak(prev.completedSessions + 1)
        ? settings.longBreakDuration * 60
        : settings.breakDuration * 60,
    }))
  }, [state.currentSession, settings, setSessions])

  const shouldTakeLongBreak = (completedCount: number) => {
    return completedCount % settings.sessionsUntilLongBreak === 0
  }

  // 타이머 업데이트
  useEffect(() => {
    if (!state.currentSession || state.currentSession.status !== 'RUNNING')
      return

    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.timeRemaining <= 0) {
          clearInterval(timer)
          if (!prev.isBreak) {
            completeSession()
          } else {
            return {
              ...prev,
              isBreak: false,
              timeRemaining: settings.workDuration * 60,
            }
          }
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [state.currentSession, state.isBreak, settings, completeSession])

  return {
    state,
    startSession,
    pauseSession,
    resumeSession,
    completeSession,
    sessions,
  }
}

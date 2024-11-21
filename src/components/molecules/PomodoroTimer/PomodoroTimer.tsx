'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/atoms/Button/Button'
import { PomodoroSession } from '@/types/pomodoro.types'
import { formatTime } from '@/tools/common-tools'

interface PomodoroTimerProps {
  session: PomodoroSession
  onUpdate: (sessionId: string, updates: Partial<PomodoroSession>) => void
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  session,
  onUpdate,
}) => {
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (session.status === 'RUNNING' && session.timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        onUpdate(session.id, {
          timeRemaining: session.timeRemaining - 1,
          ...(session.timeRemaining <= 1 && {
            status: 'COMPLETED',
            endTime: new Date(),
          }),
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [session.status, session.timeRemaining, session.id, onUpdate])

  const handleStart = () => {
    onUpdate(session.id, {
      status: 'RUNNING',
      startTime: new Date(),
    })
  }

  const handlePause = () => {
    onUpdate(session.id, {
      status: 'PAUSED',
    })
  }

  const handleReset = () => {
    onUpdate(session.id, {
      status: 'PENDING',
      timeRemaining: session.duration,
      startTime: undefined,
      endTime: null,
    })
  }

  // 원형 프로그레스 계산
  const totalSeconds = session.duration
  const progress = (session.timeRemaining / totalSeconds) * 100
  const radius = 75
  const circumference = 2 * Math.PI * radius
  const offset = (progress / 100) * circumference - circumference
  const isActive = session.status === 'RUNNING'

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="text-center relative">
        <div className="w-48 h-48 mx-auto relative">
          {/* 시계 눈금 */}
          <svg className="w-full h-full absolute">
            {/* 시간 마커 (1-12) */}
            {/*{Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180)
              const x = 50 + 40 * Math.cos(angle)
              const y = 50 + 40 * Math.sin(angle)
              return (
                <text
                  key={i}
                  x={`${x}%`}
                  y={`${y}%`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium fill-gray-400 dark:fill-gray-500"
                >
                  {i === 0 ? '12' : i}
                </text>
              )
            })}*/}

            {/* 분 눈금 (60개) */}
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i * 6 - 90) * (Math.PI / 180)
              const outerRadius = 46
              const innerRadius = i % 5 === 0 ? 42 : 44 // 5분 단위는 더 긴 눈금
              const x1 = 50 + outerRadius * Math.cos(angle)
              const y1 = 50 + outerRadius * Math.sin(angle)
              const x2 = 50 + innerRadius * Math.cos(angle)
              const y2 = 50 + innerRadius * Math.sin(angle)

              return (
                <line
                  key={i}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="currentColor"
                  strokeWidth={i % 5 === 0 ? '1.5' : '1'}
                  className="text-gray-300 dark:text-gray-600"
                />
              )
            })}
          </svg>

          {/* 배경 원 */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-gray-200 dark:text-gray-600"
            />
            {/* 진행 상태를 나타내는 원 */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className={`text-blue-500 dark:text-blue-400 transition-all ${
                isActive ? 'opacity-100 ' : 'opacity-50'
              }`}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                transition: isActive ? `stroke-dashoffset 1s linear` : 'none',
              }}
            />
            {/* 흐릿한 테두리 효과 */}
            <circle
              cx="50%"
              cy="50%"
              r={radius + 2}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-300 dark:text-gray-500"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition: 'stroke-dashoffset 1s linear',
              }}
            />
          </svg>

          {/* 시간 표시 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent">
            <span className="text-3xl font-mono font-bold">
              {formatTime(session.timeRemaining)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {session.status === 'RUNNING'
                ? '진행 중'
                : session.status === 'PAUSED'
                  ? '일시 정지'
                  : session.status === 'COMPLETED'
                    ? '완료'
                    : '대기 중'}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
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
  )
}

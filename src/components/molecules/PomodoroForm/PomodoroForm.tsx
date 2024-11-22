'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'

interface PomodoroFormProps {
  initialDuration?: number
  onSubmit: (item: { duration: number; title: string }) => void
  onCancel: () => void
}

export const PomodoroForm: React.FC<PomodoroFormProps> = ({
  initialDuration = 5 * 60,
  onSubmit,
  onCancel,
}) => {
  const [min, setMin] = useState(Math.floor(initialDuration / 60))
  const [sec, setSec] = useState(initialDuration % 60)
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState(initialDuration)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ duration, title })
  }

  useEffect(() => {
    setDuration(min * 60 + sec)
  }, [min, sec])

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg bg-white dark:bg-gray-800"
    >
      <div>
        <label className="block text-sm font-medium mb-1">제목</label>
        <Input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          onBlur={() => {
            if (!title.trim()) {
              setTitle('Pomodoro') // 빈 값일 때 임시 값 설정
            }
          }}
          required
        />
      </div>
      <div className={'flex items-center gap-3'}>
        <div className={'flex items-end'}>
          <Input
            type="number"
            min="0"
            max="60"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            required
          />
          <label className="block text-sm font-medium mb-1">(분)</label>
        </div>
        <div className={'flex items-end'}>
          <Input
            type="number"
            min="0"
            max="60"
            value={sec}
            onChange={(e) => setSec(Number(e.target.value))}
            required
          />
          <label className="block text-sm font-medium mb-1">(초)</label>
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit">저장</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          취소
        </Button>
      </div>
    </form>
  )
}

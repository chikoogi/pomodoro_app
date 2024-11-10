'use client';

import { useState } from 'react';
import { Input } from '@/components/atoms/Input/Input';
import { Button } from '@/components/atoms/Button/Button';

interface PomodoroFormProps {
  initialDuration?: number;
  onSubmit: (duration: number) => void;
  onCancel: () => void;
}

export const PomodoroForm: React.FC<PomodoroFormProps> = ({
  initialDuration = 25,
  onSubmit,
  onCancel
}) => {
  const [duration, setDuration] = useState(initialDuration);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(duration);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
      <div>
        <label className="block text-sm font-medium mb-1">
          세션 시간 (분)
        </label>
        <Input
          type="number"
          min="1"
          max="60"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">
          저장
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          취소
        </Button>
      </div>
    </form>
  );
}; 
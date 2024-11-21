'use client'

import { CreateTodoInput, Priority } from '@/types/todo.types'
import { Input } from '@/components/atoms/Input/Input'
import { Textarea } from '@/components/atoms/Textarea/Textarea'
import { Select } from '@/components/atoms/Select/Select'
import { Button } from '@/components/atoms/Button/Button'
import { useTodoForm } from '@/hooks/useTodoForm'

interface TodoFormProps {
  onSubmit: (input: CreateTodoInput) => void
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const { formData, updateField, handleSubmit } = useTodoForm(onSubmit)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="제목"
          required
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
        />
      </div>

      <div>
        <Textarea
          placeholder="설명"
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <Input
          type="date"
          value={formData.dueDate}
          onChange={(e) => updateField('dueDate', e.target.value)}
        />
      </div>

      <div>
        <Select
          value={formData.priority}
          onChange={(e) => updateField('priority', e.target.value as Priority)}
        >
          <option value="HIGH">높음</option>
          <option value="MEDIUM">중간</option>
          <option value="LOW">낮음</option>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        할 일 추가
      </Button>
    </form>
  )
}

'use client';

import { Todo } from '@/types/todo.types';
import { Button } from '@/components/atoms/Button/Button';
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete
}) => {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between gap-4 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => onToggleComplete(todo.id)}
        />
        <div className={todo.isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : ''}>
          <h3 className="font-medium">{todo.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{todo.description}</p>
          {todo.dueDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              마감일: {todo.dueDate.toLocaleDateString()}
            </p>
          )}
          <span className={`text-xs px-2 py-1 rounded-full ${
            todo.priority === 'HIGH' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
            todo.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          }`}>
            {todo.priority}
          </span>
        </div>
      </div>
      <Button
        variant="danger"
        size="sm"
        onClick={() => onDelete(todo.id)}
      >
        삭제
      </Button>
    </div>
  );
}; 
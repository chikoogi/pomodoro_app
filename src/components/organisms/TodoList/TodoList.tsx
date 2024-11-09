'use client';

import { Todo } from '@/types/todo.types';
import { TodoItem } from '@/components/molecules/TodoItem/TodoItem';
import { FilterBar } from '@/components/molecules/FilterBar/FilterBar';
import { useTodoFilter } from '@/hooks/useTodoFilter';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onDelete,
  onEdit
}) => {
  const { filter, updateFilter, filteredTodos } = useTodoFilter(todos);

  return (
    <div className="space-y-4">
      <FilterBar filter={filter} onFilterChange={updateFilter} />
      <div className="space-y-2">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}; 
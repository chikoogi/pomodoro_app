'use client';

import { useState, useCallback, useMemo } from 'react';
import { Todo, TodoFilter } from '@/types/todo.types';

export const useTodoFilter = (todos: Todo[]) => {
  const [filter, setFilter] = useState<TodoFilter>({
    showCompleted: true
  });

  const updateFilter = useCallback((updates: Partial<TodoFilter>) => {
    setFilter(prev => ({ ...prev, ...updates }));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (!filter.showCompleted && todo.isCompleted) return false;
      if (filter.priority && todo.priority !== filter.priority) return false;
      return true;
    });
  }, [todos, filter]);

  return {
    filter,
    updateFilter,
    filteredTodos
  };
}; 
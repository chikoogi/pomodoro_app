'use client';

import { useCallback } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo.types';
import { useLocalStorage } from './useLocalStorage';

export const useTodoManagement = () => {
  const [todos, setTodos, isLoading] = useLocalStorage<Todo[]>('todos', []);

  const addTodo = useCallback((input: CreateTodoInput) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      ...input,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      pomodoroCount: 0
    };
    
    setTodos(prev => [...prev, newTodo]);
  }, [setTodos]);

  const updateTodo = useCallback((id: string, updates: UpdateTodoInput) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date() }
        : todo
    ));
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, [setTodos]);

  const toggleTodoComplete = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted, updatedAt: new Date() }
        : todo
    ));
  }, [setTodos]);

  return {
    todos,
    isLoading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoComplete
  };
}; 
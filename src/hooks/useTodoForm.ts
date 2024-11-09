'use client';

import { useState, useCallback } from 'react';
import { Priority, CreateTodoInput } from '@/types/todo.types';

interface TodoFormState {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
}

const initialState: TodoFormState = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'MEDIUM'
};

export const useTodoForm = (onSubmit: (input: CreateTodoInput) => void) => {
  const [formData, setFormData] = useState<TodoFormState>(initialState);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
      priority: formData.priority
    });
    setFormData(initialState);
  }, [formData, onSubmit]);

  const updateField = useCallback(<K extends keyof TodoFormState>(
    field: K,
    value: TodoFormState[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    formData,
    updateField,
    handleSubmit
  };
}; 
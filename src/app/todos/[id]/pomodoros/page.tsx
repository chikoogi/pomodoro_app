'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTodoManagement } from '@/hooks/useTodoManagement';
import { useEffect, useState } from 'react';
import { PomodoroList } from '@/components/organisms/PomodoroList/PomodoroList';

export default function PomodoroPage() {
  const params = useParams();
  const router = useRouter();
  const { todos, isLoading } = useTodoManagement();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const todo = todos.find(t => t.id === params.id);

  useEffect(() => {
    if (!isLoading && !isInitialized) {
      setIsInitialized(true);
      if (!todo) {
        router.push('/');
      }
    }
  }, [isLoading, todo, router, isInitialized]);

  if (isLoading || !isInitialized) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div>Loading...</div>
      </div>
    );
  }

  if (!todo) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-500 hover:text-blue-600 mb-4"
        >
          ← 돌아가기
        </button>
        <h1 className="text-3xl font-bold">{todo.title} - 포모도로 관리</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{todo.description}</p>
      </div>
      <PomodoroList todoId={todo.id} />
    </main>
  );
} 
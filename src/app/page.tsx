'use client';

import { TodoManagement } from '@/components/templates/TodoManagement/TodoManagement';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">할 일 관리</h1>
      <TodoManagement />
    </main>
  );
}

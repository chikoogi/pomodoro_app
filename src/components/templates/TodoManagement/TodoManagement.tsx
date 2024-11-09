'use client';

import { TodoList } from '@/components/organisms/TodoList/TodoList';
import { TodoForm } from '@/components/organisms/TodoForm/TodoForm';
import { useTodoManagement } from '@/hooks/useTodoManagement';

export const TodoManagement = () => {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodoComplete } = useTodoManagement();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">새로운 할 일</h2>
        <TodoForm onSubmit={addTodo} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">할 일 목록</h2>
        <TodoList
          todos={todos}
          onToggleComplete={toggleTodoComplete}
          onDelete={deleteTodo}
          onEdit={updateTodo}
        />
      </div>
    </div>
  );
}; 
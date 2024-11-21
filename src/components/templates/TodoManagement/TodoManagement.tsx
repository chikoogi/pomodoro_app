'use client'

import { TodoList } from '@/components/organisms/TodoList/TodoList'
import { TodoForm } from '@/components/organisms/TodoForm/TodoForm'
import { useTodoManagement } from '@/hooks/useTodoManagement'
import IconButton from '@/components/atoms/IconButton/IconButton'
import { AddCircleOutlined } from '@mui/icons-material'
import { useState } from 'react'

export const TodoManagement = () => {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodoComplete } =
    useTodoManagement()

  const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false)
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 relative">
      {isOpenAddForm && (
        <div>
          <h2 className="text-xl font-semibold mb-4">새로운 할 일</h2>
          <TodoForm onSubmit={addTodo} />
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold mb-4">할 일 목록</h2>
        <TodoList
          todos={todos}
          onToggleComplete={toggleTodoComplete}
          onDelete={deleteTodo}
          onEdit={updateTodo}
        />
      </div>
      <div className={'fixed bottom-8 right-8'}>
        <IconButton
          icon={<>+</>}
          onClick={() => setIsOpenAddForm(!isOpenAddForm)}
        />
      </div>
    </div>
  )
}

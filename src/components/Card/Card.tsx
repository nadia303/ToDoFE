import React, { useCallback, useState } from 'react'
import { Button, Typography } from 'antd'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../Todo'
import { AddEditTodo } from '../AddEditTodo'
import { ITodo } from '../../types'
import { TodoStatus } from '../../types/status'
import { useCreateTodo } from '../../hooks/useCreateTodo'

interface CardProps {
  title: string
  boardId: string
  status: TodoStatus
  todos: ITodo[]
}

export const Card: React.FC<CardProps> = ({ boardId, title, status, todos }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const { create } = useCreateTodo(boardId)

  const handleOnAddTodo = () => {
    setIsEditMode(true)
  }

  const handleOnCreate = useCallback(
    (data: ITodo) => {
      create(data)
    },
    [create],
  )

  return (
    <div
      style={{
        background: '#a6c7e0',
        height: '100%',
        minWidth: '250px',
        minHeight: '250px',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {status === TodoStatus.TODO && (
        <Button
          onClick={handleOnAddTodo}
          disabled={isEditMode}
          type="dashed"
          style={{
            width: '40px',
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
            color: '#fff',
          }}
        >
          +
        </Button>
      )}
      <div style={{ textAlign: 'center' }}>
        <Typography.Title level={4} style={{ margin: '0', color: '#ffffff' }}>
          {title}
        </Typography.Title>
      </div>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              height: '100%',
              width: '100%',
            }}
          >
            {todos.map(({ title, description, _id }: ITodo, index: number) => (
              <Todo key={_id} title={title} description={description} todoId={_id} boardId={boardId} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddEditTodo visible={isEditMode} setIsEditMode={setIsEditMode} onSubmit={handleOnCreate} title="Add Todo" />
    </div>
  )
}

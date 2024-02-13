import { FC, useCallback, useState } from 'react'
import { Button, Space, Typography, Form } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDeleteTodo } from '../../hooks/useDeleteTodo'
import { useUpdateTodo } from '../../hooks/useUpdateTodo'
import { ITodo } from '../../types'
import { AddEditTodo } from '../AddEditTodo'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal'

interface TodoProps {
  todoId: string
  boardId: string
  title: string
  index: number
  description: string
}

export const Todo: FC<TodoProps> = ({ todoId, boardId, title, description, index }) => {
  const [isEditTodo, setIsEditTodo] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const { remove } = useDeleteTodo(boardId)
  const { update } = useUpdateTodo()
  const [form] = Form.useForm()

  const handleUpdate = useCallback(
    (data: ITodo) => {
      update(todoId, data)
      setIsEditTodo(false)
    },
    [update, todoId],
  )

  const handleEdit = () => {
    setIsEditTodo(true)
    form.setFieldsValue({
      title,
      description,
    })
  }

  const handleDelete = () => {
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDelete = () => {
    remove(todoId)
    setIsDeleteModalVisible(false)
  }

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false)
  }

  return (
    <>
      <AddEditTodo
        title="Edit Todo"
        visible={isEditTodo}
        setIsEditMode={setIsEditTodo}
        onSubmit={handleUpdate}
        initialValues={{ title, description }}
      />
      <Draggable draggableId={todoId} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              border: '1px solid #ccc',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: snapshot.isDragging ? '#d3ffd3' : '#f5f5f5',
              display: 'flex',
              flex: '1',
              flexDirection: 'column',
              marginTop: '16px',
              ...provided.draggableProps.style,
            }}
          >
            <Typography.Title level={5} style={{ marginBottom: '8px', color: '#1890ff' }}>
              {title}
            </Typography.Title>
            <div style={{ whiteSpace: 'pre-line', flex: 1 }}>
              <Typography.Paragraph>{description}</Typography.Paragraph>
            </div>
            <Space style={{ justifyContent: 'flex-end', marginTop: '8px' }}>
              <Button type="link" onClick={handleEdit}>
                <EditOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
              </Button>
              <Button type="link" onClick={handleDelete}>
                <DeleteOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
              </Button>
            </Space>
          </div>
        )}
      </Draggable>
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        modalInformation="Are you sure you want to delete this todo?"
      />
    </>
  )
}

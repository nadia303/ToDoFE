import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Space, Typography, Button, Divider, Card as BasicCard, Spin } from 'antd'
import { Card } from '../Card'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useUpdateBoard } from '../../hooks/useUpdateBoard'
import { ITodo } from '../../types'
import { useDeleteBoard } from '../../hooks/useDeleteBoard'
import { TodoStatus } from '../../types/status'
import { AddEditBoardTitle } from '../AddEditBoardTile'
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd'
import { useUpdateTodo } from '../../hooks/useUpdateTodo'
import { getTodosByStatus } from '../../helpers/getTodosByStatus'
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal'

const { Title } = Typography

interface BoardProps {
  boardName: string
  boardId: string
  initialTodos: ITodo[]
}

export const Board: React.FC<BoardProps> = ({ boardId, boardName, initialTodos }) => {
  const [todoColumns, setTodoColumns] = useState({
    todo: getTodosByStatus(initialTodos, TodoStatus.TODO),
    in_progress: getTodosByStatus(initialTodos, TodoStatus.IN_PROGRESS),
    done: getTodosByStatus(initialTodos, TodoStatus.DONE),
  })
  const [isEditModeBoard, setIsEditModeBoard] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const { update: updateBoard, isPending: isLoadingUpdate } = useUpdateBoard()
  const { remove, isPending: isLoadingDelete } = useDeleteBoard()
  const { update: updateTodo } = useUpdateTodo()
  const [form] = Form.useForm()

  useEffect(() => {
    setTodoColumns({
      todo: getTodosByStatus(initialTodos, TodoStatus.TODO),
      in_progress: getTodosByStatus(initialTodos, TodoStatus.IN_PROGRESS),
      done: getTodosByStatus(initialTodos, TodoStatus.DONE),
    })
  }, [initialTodos])

  const handleEdit = () => {
    setIsEditModeBoard(true)
    form.setFieldsValue({
      name: boardName,
    })
  }

  const handleDelete = () => {
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDelete = () => {
    remove(boardId)
    setIsDeleteModalVisible(false)
  }

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false)
  }

  const handleUpdate = (data: { name: string }) => {
    updateBoard({ name: data.name, boardId })
    setIsEditModeBoard(false)
  }

  const handleDragEnd: DragDropContextProps['onDragEnd'] = (result) => {
    const { source, destination, draggableId } = result

    if (!destination) {
      return
    }

    const newTodoColumns = { ...todoColumns }
    const sourceColumn = newTodoColumns[source.droppableId as keyof typeof newTodoColumns]
    const destinationColumn = newTodoColumns[destination.droppableId as keyof typeof newTodoColumns]

    const draggedTodoIndex = sourceColumn.findIndex((todo) => todo._id === draggableId)

    if (draggedTodoIndex !== -1) {
      const draggedTodo = sourceColumn[draggedTodoIndex]
      sourceColumn.splice(draggedTodoIndex, 1)
      destinationColumn.splice(destination.index, 0, draggedTodo)
      setTodoColumns(newTodoColumns)

      if (source.droppableId !== destination.droppableId) {
        updateTodo(draggedTodo._id, {
          status: destination.droppableId as TodoStatus,
        })
      }

      const todoIds = [
        ...newTodoColumns.todo.map((todo) => todo._id),
        ...newTodoColumns.in_progress.map((todo) => todo._id),
        ...newTodoColumns.done.map((todo) => todo._id),
      ]
      updateBoard({ boardId, todoIds })
    }
  }

  if (isLoadingUpdate || isLoadingDelete) {
    return <Spin size="large" />
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', flex: '1', flexDirection: 'column', height: '100%' }}>
        {isEditModeBoard ? (
          <BasicCard style={{ marginBottom: '16px', minWidth: '250px' }}>
            <AddEditBoardTitle
              setIsEditMode={setIsEditModeBoard}
              onSubmit={handleUpdate}
              initialValues={{ name: boardName }}
            />
          </BasicCard>
        ) : (
          <>
            <Space direction="horizontal" align="center">
              <Title level={3} underline style={{ margin: 0 }}>
                {boardName}
              </Title>
              <Space>
                <Button type="link" icon={<EditOutlined />} onClick={handleEdit} />
                <Button type="link" icon={<DeleteOutlined />} onClick={handleDelete} style={{ color: '#ff4d4f' }} />
              </Space>
            </Space>
            <Divider style={{ margin: '8px 0' }} />
          </>
        )}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card boardId={boardId} title="TO DO" todos={todoColumns.todo} status={TodoStatus.TODO} />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              boardId={boardId}
              title="IN PROGRESS"
              todos={todoColumns.in_progress}
              status={TodoStatus.IN_PROGRESS}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card boardId={boardId} title="DONE" todos={todoColumns.done} status={TodoStatus.DONE} />
          </Col>
        </Row>
        <DeleteConfirmationModal
          isVisible={isDeleteModalVisible}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          modalInformation="Are you sure you want to delete this board?"
        />
      </div>
    </DragDropContext>
  )
}

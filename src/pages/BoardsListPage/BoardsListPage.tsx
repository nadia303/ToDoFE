import React, { useCallback, useState } from 'react'
import { Button, Space, Row, Col, Typography, Card, Layout, Input, Spin } from 'antd'
import { useGetAllBoards } from '../../hooks/useGetAllBoards'
import { useCreateBoard } from '../../hooks/useCreateBoard'
import { Board } from '../../components/Board'
import { AddEditBoardTitle } from '../../components/AddEditBoardTile'
import { IBoard } from '../../types'

const { Title } = Typography
const { Content } = Layout
const { Search } = Input

export const BoardsListPage: React.FC = () => {
  const [searchId, setSearchId] = useState('')
  const [isCreateModeBoard, setIsCreateModeBoard] = useState(false)
  const { data, isPending: isLoadingBoards, refetch } = useGetAllBoards(searchId)
  const { create, isPending: isLoadingNewBoard } = useCreateBoard()

  const handleSubmit = useCallback(
    (data: { name: string }) => {
      create(data)
      setIsCreateModeBoard(false)
    },
    [create],
  )

  const handleOnClick = () => {
    setIsCreateModeBoard(true)
  }

  const handleBackClick = () => {
    setSearchId('')
    refetch()
  }

  const handleSearch = (value: string) => {
    setSearchId(value)
  }

  if (isLoadingBoards || isLoadingNewBoard) {
    return (
      <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
        <Spin size="large" fullscreen />
      </Space>
    )
  }

  return (
    <Layout>
      <Content style={{ padding: '24px', minWidth: '1000px', maxWidth: '1440px', margin: 'auto' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Row gutter={16} style={{ marginBottom: '15px' }}>
            <Col span={24}>
              <Search placeholder="Enter a board ID here" enterButton onSearch={handleSearch} />
            </Col>
          </Row>
          {searchId && <Button onClick={handleBackClick}>Back</Button>}
          {data?.data.length === 0 ? (
            <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
              <Typography>No results found</Typography>
            </Space>
          ) : (
            <>
              {data?.data.map(({ id, name, todos }: IBoard) => (
                <Row gutter={16} key={id} style={{ marginBottom: '25px' }}>
                  <Col xs={24}>
                    <Board boardName={name} boardId={id} initialTodos={todos} />
                  </Col>
                </Row>
              ))}
              {isCreateModeBoard && (
                <Card style={{ marginBottom: 16 }}>
                  <Title level={4}>Create New Board</Title>
                  <AddEditBoardTitle setIsEditMode={setIsCreateModeBoard} onSubmit={handleSubmit} />
                </Card>
              )}
              {!searchId && (
                <Button
                  disabled={isCreateModeBoard}
                  onClick={handleOnClick}
                  type="primary"
                  style={{
                    backgroundColor: '#52c41a',
                    borderColor: '#52c41a',
                    marginTop: '30px',
                  }}
                >
                  Add New Board
                </Button>
              )}
            </>
          )}
        </Space>
      </Content>
    </Layout>
  )
}

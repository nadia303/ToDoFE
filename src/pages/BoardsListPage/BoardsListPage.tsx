import React, { useCallback, useState } from "react";
import { Button, Space, Row, Col, Typography, Card, Layout } from "antd";
import { useGetAllBoards } from "../../hooks/useGetAllBoards";
import { useCreateBoard } from "../../hooks/useCreateBoard";
import { Board } from "../../components/Board";
import { AddEditBoardTitle } from "../../components/AddEditBoardTile";
import { IBoard } from "../../types";

const { Title } = Typography;
const { Content } = Layout;

export const BoardsListPage: React.FC = () => {
  const { data } = useGetAllBoards();

  const [isCreateModeBoard, setIsCreateModeBoard] = useState(false);
  const { create, isPending } = useCreateBoard();

  const handleSubmit = useCallback(
    (data: IBoard) => {
      create(data);
      setIsCreateModeBoard(false);
    },
    [create]
  );

  const handleOnClick = () => {
    setIsCreateModeBoard(true);
  };

  return (
    <Layout>
      <Content style={{ padding: "24px", maxWidth: "1440px", margin: "auto" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {data?.data.map(({ id, name }: any) => (
            <Row gutter={16} key={id} style={{ marginBottom: "25px" }}>
              <Col xs={24}>
                <Board boardName={name} boardId={id} />
              </Col>
            </Row>
          ))}

          {isCreateModeBoard && (
            <Card style={{ marginBottom: 16 }}>
              <Title level={4}>Create New Board</Title>
              <AddEditBoardTitle
                setIsEditMode={setIsCreateModeBoard}
                onSubmit={handleSubmit}
              />
            </Card>
          )}

          <Button
            disabled={isCreateModeBoard}
            onClick={handleOnClick}
            type="primary"
            style={{
              backgroundColor: "#52c41a",
              borderColor: "#52c41a",
              marginTop: "30px",
            }}
          >
            Add New Board
          </Button>
        </Space>
      </Content>
    </Layout>
  );
};

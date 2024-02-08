import React, { useState } from "react";
import {
  Col,
  Form,
  Row,
  Space,
  Typography,
  Button,
  Divider,
  Card as BasicCard,
} from "antd";
import { Card } from "../Card";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useUpdateBoard } from "../../hooks/useUpdateBoard";
import { IBoard } from "../../types";
import { useDeleteBoard } from "../../hooks/useDeleteBoard";
import { TodoStatus } from "../../types/status";
import { AddEditBoardTitle } from "../AddEditBoardTile";

const { Title } = Typography;

interface BoardProps {
  boardName: string;
  boardId: string;
}

export const Board: React.FC<BoardProps> = ({ boardId, boardName }) => {
  const [isEditModeBoard, setIsEditModeBoard] = useState(false);
  const { update } = useUpdateBoard();
  const { remove } = useDeleteBoard();

  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditModeBoard(true);
    form.setFieldsValue({
      name: boardName,
    });
  };

  const handleDelete = () => {
    remove(boardId);
  };

  const handleUpdate = (data: IBoard) => {
    update(data, boardId);
    setIsEditModeBoard(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {isEditModeBoard ? (
        <BasicCard style={{ marginBottom: "16px" }}>
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
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={handleEdit}
              />
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                style={{ color: "#ff4d4f" }}
              />
            </Space>
          </Space>
          <Divider style={{ margin: "8px 0" }} />
        </>
      )}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card boardId={boardId} title="TODO" status={TodoStatus.TODO} />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            boardId={boardId}
            title="IN PROGRESS"
            status={TodoStatus.IN_PROGRESS}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card boardId={boardId} title="DONE" status={TodoStatus.DONE} />
        </Col>
      </Row>
    </div>
  );
};

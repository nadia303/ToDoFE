import React, { useCallback, useState } from "react";
import { Card as BasicCard, Button } from "antd";
import { Todo } from "../Todo";
import { useGetAllTodos } from "../../hooks/useGetAllTodos";
import { AddEditTodo } from "../AddEditTodo";
import { ITodo } from "../../types";
import { TodoStatus } from "../../types/status";
import { useCreateTodo } from "../../hooks/useCreateTodo";

interface CardProps {
  title: string;
  boardId: string;
  status: TodoStatus;
}

export const Card: React.FC<CardProps> = ({ boardId, title, status }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data } = useGetAllTodos(boardId, status);
  const { create } = useCreateTodo(boardId);

  const handleOnAddTodo = () => {
    setIsEditMode(true);
  };

  const handleOnCreate = useCallback(
    (data: ITodo) => {
      create(data);
    },
    [create]
  );

  return (
    <BasicCard
      size="small"
      title={title}
      style={{ background: "#b7eb8f", height: "100%" }}
    >
      {data?.data?.map(({ title, description, id }: ITodo) => {
        return (
          <Todo
            key={id}
            title={title}
            description={description}
            todoId={id}
            boardId={boardId}
          />
        );
      })}
      {isEditMode && status === TodoStatus.TODO && (
        <AddEditTodo setIsEditMode={setIsEditMode} onSubmit={handleOnCreate} />
      )}
      {status === TodoStatus.TODO && (
        <Button
          onClick={handleOnAddTodo}
          disabled={isEditMode}
          type="dashed"
          style={{
            marginTop: "20px",
            width: "100%",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            color: "#fff",
          }}
        >
          Add todo
        </Button>
      )}
    </BasicCard>
  );
};

import React, { useCallback, useState } from "react";
import { Card as BasicCard, Button, Spin } from "antd";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../Todo";
import { AddEditTodo } from "../AddEditTodo";
import { ITodo } from "../../types";
import { TodoStatus } from "../../types/status";
import { useCreateTodo } from "../../hooks/useCreateTodo";

interface CardProps {
  title: string;
  boardId: string;
  status: TodoStatus;
  todos: ITodo[];
}

export const Card: React.FC<CardProps> = ({
  boardId,
  title,
  status,
  todos,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { create, isPending: isLoadingCreate } = useCreateTodo(boardId);

  const handleOnAddTodo = () => {
    setIsEditMode(true);
  };

  const handleOnCreate = useCallback(
    (data: ITodo) => {
      create(data);
    },
    [create]
  );

  if (isLoadingCreate) {
    return <Spin size="large" fullscreen />;
  }

  return (
    <BasicCard
      size="small"
      title={title}
      style={{
        background: "#a6c7e0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minWidth: "250px",
      }}
    >
      <Droppable droppableId={status}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map(({ title, description, _id }: ITodo, index: number) => (
              <Todo
                key={_id}
                title={title}
                description={description}
                todoId={_id}
                boardId={boardId}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isEditMode && status === TodoStatus.TODO && (
        <AddEditTodo setIsEditMode={setIsEditMode} onSubmit={handleOnCreate} />
      )}
      {status === TodoStatus.TODO && (
        <Button
          onClick={handleOnAddTodo}
          disabled={isEditMode}
          type="dashed"
          style={{
            width: "100%",
            marginTop: "20px",
            alignSelf: "flex-start",
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

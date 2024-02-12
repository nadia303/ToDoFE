import { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react";
import { Button, Form, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ITodo } from "../../types";

interface AddTodoProps {
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: ITodo) => void;
  initialValues?: { title: string; description: string };
}

export const AddEditTodo: FC<AddTodoProps> = ({
  setIsEditMode,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = useCallback(
    (data: ITodo) => {
      onSubmit(data);
      setIsEditMode(false);
    },
    [onSubmit, setIsEditMode]
  );

  const handleCancel = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        marginTop: "16px",
      }}
    >
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Space style={{ justifyContent: "flex-end", marginTop: "8px" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          >
            Submit
          </Button>
          <Button
            type="primary"
            onClick={handleCancel}
            style={{ backgroundColor: "#faad14", borderColor: "#faad14" }}
          >
            Cancel
          </Button>
        </Space>
      </Form>
    </div>
  );
};

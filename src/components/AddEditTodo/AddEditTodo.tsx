import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react'
import { Button, Form, Input, Space, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { ITodo } from '../../types'

interface AddTodoProps {
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  onSubmit: (data: ITodo) => void
  initialValues?: { title: string; description: string }
  visible: boolean
  title?: string
}

export const AddEditTodo: FC<AddTodoProps> = ({
  setIsEditMode,
  onSubmit,
  initialValues,
  visible,
  title = 'Add Todo',
}) => {
  const [form] = Form.useForm()

  const handleSubmit = useCallback(
    (data: ITodo) => {
      onSubmit(data)
      form.resetFields()
      setIsEditMode(false)
    },
    [form, onSubmit, setIsEditMode],
  )

  const handleCancel = () => {
    form.resetFields()
    setIsEditMode(false)
  }

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  return (
    <Modal title={title} open={visible} footer={null} onCancel={handleCancel} destroyOnClose>
      <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={handleSubmit}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please enter title',
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
              message: 'Please enter description',
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Space style={{ justifyContent: 'flex-end', marginTop: '8px' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="primary" onClick={handleCancel} style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}>
            Cancel
          </Button>
        </Space>
      </Form>
    </Modal>
  )
}

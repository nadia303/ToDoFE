import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react'
import { Button, Form, Input, Space } from 'antd'

interface AddEditBoardTitleProps {
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  onSubmit: (data: { name: string }) => void
  initialValues?: { name: string }
}

export const AddEditBoardTitle: FC<AddEditBoardTitleProps> = ({ setIsEditMode, onSubmit, initialValues }) => {
  const [form] = Form.useForm()

  const handleSubmit = useCallback(
    (data: { name: string }) => {
      onSubmit(data)
      setIsEditMode(false)
    },
    [onSubmit, setIsEditMode],
  )

  const handleCancel = () => {
    setIsEditMode(false)
  }

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  return (
    <>
      <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={handleSubmit}>
        <Form.Item
          label="Board Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter board's name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="default" onClick={handleCancel} style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}>
            Cancel
          </Button>
        </Space>
      </Form>
    </>
  )
}

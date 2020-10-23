import React, {useState} from 'react'
import Form from 'antd/es/form'
import Alert from 'antd/es/alert'
import Input from 'antd/es/input'
import Button from 'antd/es/button'

import {createLink} from '../../api'
import {urlRegex} from '../../helpers'
import Title from '../../components/Title'
import {LinkInput} from '../../models/models'
import Container from '../../components/Container'

const NewLink = () => {
  const [form] = Form.useForm()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [linkCreated, setLinkCreated] = useState(false)

  const onFinish = async (values: LinkInput) => {
    setError('')
    setLoading(true)
    setLinkCreated(false)

    try {
      await createLink({
        title: values.title.trim(),
        destination: values.destination.trim(),
        description: values.description?.trim(),
      })

      form.resetFields()
      setLinkCreated(true)
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <Container>
      <Title>New Link</Title>

      {linkCreated && (
        <Alert
          message="Success"
          description="Your link was created successfully!"
          type="success"
          style={{marginBottom: 30}}
        />
      )}

      {error && (
        <Alert
          message="Error"
          description={`${error}`}
          type="error"
          closable
          onClose={() => setError('')}
          style={{marginBottom: 30}}
        />
      )}

      <Form form={form} layout="vertical" name="basic" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{required: true, message: 'Please include the title'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Destination"
          name="destination"
          rules={[
            {required: true, message: 'Please include the destination'},
            {
              pattern: urlRegex,
              message: 'Please enter a valid URL',
            },
          ]}
        >
          <Input type="url" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>

        <Form.Item style={{textAlign: 'center'}}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Link
          </Button>
        </Form.Item>
      </Form>
    </Container>
  )
}

export default NewLink

/** @jsx jsx */
import {jsx} from '@emotion/core'
import Modal from 'antd/es/modal'
import Alert from 'antd/es/alert'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import React, {useContext, useState, useEffect} from 'react'

import {LinkInput, User} from '../../../models'
import Button from '../../../components/Button'
import {urlRegex} from '../../../helpers'
import {UserContext} from '../../App'
import {createLink, updateLink} from '../../../api/link.api'
import {LinkModel} from '../../../models/link.model'

export interface LinkModalProps {
  nextOrder: number
  link: LinkModel | null
  visible: boolean
  onHide: () => void
  onSave: () => void
}

const LinkModal = (props: LinkModalProps) => {
  const userContext = useContext(UserContext)
  const user = userContext as User

  const [form] = Form.useForm()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    form.resetFields()

    if (props.link) {
      form.setFieldsValue({...props.link})
    }
  }, [props.link])

  const handleSave = async (values: LinkInput) => {
    setLoading(true)
    setError('')

    const data: LinkInput = {
      owner: {connect: user._id},
      addedTs: props.link?.addedTs as string,
      title: values.title.trim(),
      destination: values.destination.trim(),
      description: values.description?.trim(),
      active: props.link?.active || true,
      deleted: props.link?.deleted || false,
      order: props.link?.order || props.nextOrder,
    }

    try {
      if (props.link) {
        await updateLink(props.link._id, data)
      } else {
        await createLink(data)
      }

      form.resetFields()
      props.onSave()
      props.onHide()
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <Modal
      visible={props.visible}
      title={`${props.link ? 'Edit' : 'Create'} Link`}
      onOk={() => form.submit()}
      onCancel={props.onHide}
      footer={[
        <Button key="back" className="border-sm" onClick={props.onHide}>
          Cancel
        </Button>,
        <Button
          key="submit"
          className="border-sm"
          accent
          loading={loading}
          onClick={() => form.submit()}
        >
          Save
        </Button>,
      ]}
    >
      {error && (
        <Alert
          message="Error"
          description={`${error}`}
          type="error"
          closable
          onClose={() => setError('')}
          css={{marginBottom: 30}}
        />
      )}

      <Form form={form} layout="vertical" name="basic" onFinish={handleSave}>
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
      </Form>
    </Modal>
  )
}

export default LinkModal

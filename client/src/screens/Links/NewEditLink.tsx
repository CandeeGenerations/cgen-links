import React, {useEffect, useState} from 'react'
import Form from 'antd/es/form'
import Alert from 'antd/es/alert'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Skeleton from 'antd/es/skeleton'
import Breadcrumb from 'antd/es/breadcrumb'
import {Link as RLink, useParams} from 'react-router-dom'

import Title from '../../components/Title'
import {Link, LinkInput} from '../../models'
import Container from '../../components/Container'
import {getUserData, urlRegex} from '../../helpers'
import {createLink, findLinkById, updateLink} from '../../api/link.api'

const NewEditLink = () => {
  const {id} = useParams<{id?: string}>()

  const [form] = Form.useForm()

  const [error, setError] = useState('')
  const [userId, setUserId] = useState('')
  const [saved, setSaved] = useState(false)
  const [link, setLink] = useState<Link | undefined>()
  const [loading, setLoading] = useState(false)
  const [newId, setNewId] = useState<string | undefined>()
  const [loadingLink, setLoadingLink] = useState(true)

  const onFinish = async (values: LinkInput) => {
    setError('')
    setSaved(false)
    setLoading(true)

    const data: LinkInput = {
      owner: {connect: userId},
      addedTs: link?.addedTs as string,
      title: values.title.trim(),
      destination: values.destination.trim(),
      description: values.description?.trim(),
      active: link?.active || true,
      deleted: link?.deleted || false,
    }

    try {
      if (id) {
        await updateLink(id, data)

        setNewId(id)
      } else {
        const response = await createLink(data)

        setNewId(response._id)
        form.resetFields()
      }

      setSaved(true)
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  const loadLink = async () => {
    const response = await findLinkById(id as string)

    setLoadingLink(false)
    setLink(response)
    form.setFieldsValue({...response})
  }

  useEffect(() => {
    const userData = getUserData()

    setUserId(userData._id)

    if (id) {
      loadLink()
    } else {
      setLoadingLink(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Container background={false}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>
            <RLink to="/links">Links</RLink>
          </Breadcrumb.Item>

          <Breadcrumb.Item>{id ? 'Edit' : 'New'} Link</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container>
        <Title>{id ? 'Edit' : 'New'} Link</Title>

        {loadingLink ? (
          <Skeleton active />
        ) : (
          <>
            {saved && (
              <Alert
                message="Success"
                description={
                  <>
                    <div>
                      Your link was {id ? 'updated' : 'created'} successfully!
                    </div>

                    <div style={{marginTop: 15}}>
                      <RLink to={`/links/${newId}`}>View your link</RLink>
                    </div>
                  </>
                }
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

            <Form
              form={form}
              layout="vertical"
              name="basic"
              onFinish={onFinish}
            >
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
                <Button style={{marginRight: 10}}>
                  <RLink to={`/links${id ? `/${id}` : ''}`}>Cancel</RLink>
                </Button>

                <Button type="primary" htmlType="submit" loading={loading}>
                  {id ? 'Update' : 'Create'} Link
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </>
  )
}

export default NewEditLink

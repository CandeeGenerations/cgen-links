import React, {useEffect, useState} from 'react'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Form from 'antd/es/form'
import Alert from 'antd/es/alert'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Skeleton from 'antd/es/skeleton'
import {SketchPicker} from 'react-color'
import Typography from 'antd/es/typography'

import Title from '../../components/Title'
import Container from '../../components/Container'
import {authTokenKey, urlRegex} from '../../helpers'
import {SettingsInput, UserModel} from '../../models/models'
import {createSettings, findSettingsByUserId, updateSettings} from '../../api'
import ColorPicker from '../../components/ColorPicker'

const Settings = () => {
  const [form] = Form.useForm()
  const [error, setError] = useState('')
  const [userId, setUserId] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [settingsId, setSettingsId] = useState<string | undefined>()
  const [settingsLoading, setSettingsLoading] = useState(true)

  const loadSettings = async () => {
    const authToken = localStorage.getItem(authTokenKey)
    const user: UserModel = JSON.parse(atob(authToken as string))
    const response = await findSettingsByUserId(user._id)

    if (response) {
      setSettingsId(response._id)
      form.setFieldsValue({...response})
    }

    setUserId(user._id)
    setSettingsLoading(false)
  }

  const onFinish = async (values: SettingsInput) => {
    setError('')
    setLoading(true)
    setSaved(false)

    console.log(values)

    const data: SettingsInput = {
      userId,
      slug: values.slug.trim(),
      logoUrl: values.logoUrl?.trim() || undefined,
      primaryColor: values.primaryColor || undefined,
      secondaryColor: values.secondaryColor || undefined,
      facebook: values.facebook?.trim() || undefined,
      instagram: values.instagram?.trim() || undefined,
      twitter: values.twitter?.trim() || undefined,
      youtube: values.youtube?.trim() || undefined,
    }

    try {
      if (settingsId) {
        await updateSettings(settingsId, data)
      } else {
        const response = await createSettings(data)

        setSettingsId(response._id)
      }

      setSaved(true)
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container span={20}>
      <Title>Settings</Title>

      {settingsLoading ? (
        <Skeleton active />
      ) : (
        <>
          {saved && (
            <Alert
              message="Success"
              description="Your settings have been saved!"
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
            <Row gutter={[16, {md: 16, sm: 24, xs: 24}]}>
              <Col md={12} sm={24} xs={24}>
                <Form.Item
                  label="Slug"
                  name="slug"
                  rules={[
                    {required: true, message: 'Please include your slug'},
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Logo URL"
                  name="logoUrl"
                  rules={[
                    {
                      pattern: urlRegex,
                      message: 'Please enter a valid URL',
                    },
                  ]}
                >
                  <Input type="url" />
                </Form.Item>

                <Typography.Title level={4}>Colors</Typography.Title>

                <Row gutter={[16, {md: 16, sm: 24, xs: 24}]}>
                  <Col md={12} sm={24} xs={24}>
                    <Form.Item label="Primary Color" name="primaryColor">
                      <ColorPicker defaultValue="#000" />
                    </Form.Item>
                  </Col>

                  <Col md={12} sm={24} xs={24}>
                    <Form.Item label="Secondary Color" name="secondaryColor">
                      <ColorPicker defaultValue="#fff" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col md={12} sm={24} xs={24}>
                <Typography.Title level={4}>Social</Typography.Title>

                <Form.Item label="Facebook" name="facebook">
                  <Input addonBefore="https://facebook.com/" />
                </Form.Item>

                <Form.Item label="Instagram" name="instagram">
                  <Input addonBefore="https://instagram.com/" />
                </Form.Item>

                <Form.Item label="Twitter" name="twitter">
                  <Input addonBefore="https://twitter.com/" />
                </Form.Item>

                <Form.Item label="YouTube" name="youtube">
                  <Input addonBefore="https://youtube.com/channel/" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{textAlign: 'center'}}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Container>
  )
}

export default Settings

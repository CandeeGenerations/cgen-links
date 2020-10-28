import React, {useContext, useEffect, useState} from 'react'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Form from 'antd/es/form'
import Alert from 'antd/es/alert'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Skeleton from 'antd/es/skeleton'
import Checkbox from 'antd/es/checkbox'
import Typography from 'antd/es/typography'

import {UserContext} from '../App'
import {urlRegex} from '../../helpers'
import Title from '../../components/Title'
import {SettingsInput, User} from '../../models'
import {findUserById} from '../../api/auth.api'
import Container from '../../components/Container'
import ColorPicker from '../../components/ColorPicker'
import {createSettings, updateSettings} from '../../api/settings.api'

const Settings = () => {
  const userContext = useContext(UserContext)
  const user = userContext as User

  const [form] = Form.useForm()

  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [settingsId, setSettingsId] = useState<string | undefined>()
  const [settingsLoading, setSettingsLoading] = useState(true)

  const loadSettings = async () => {
    const response = await findUserById(user._id)

    if (response.settings) {
      setSettingsId(response.settings._id)
      form.setFieldsValue({...response.settings})
    }

    setSettingsLoading(false)
  }

  const onFinish = async (values: SettingsInput) => {
    setError('')
    setLoading(true)
    setSaved(false)

    const data: SettingsInput = {
      owner: {connect: user._id},
      slug: values.slug.trim(),
      logoUrl: values.logoUrl?.trim() || '',
      primaryColor: values.primaryColor || '',
      secondaryColor: values.secondaryColor || '',
      useGradient: values.useGradient || false,
      facebook: values.facebook?.trim() || '',
      instagram: values.instagram?.trim() || '',
      twitter: values.twitter?.trim() || '',
      youtube: values.youtube?.trim() || '',
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
                  <Input addonBefore="https://links.cgen.cc/" />
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

                <Form.Item name="useGradient" valuePropName="checked">
                  <Checkbox>Use Gradient</Checkbox>
                </Form.Item>

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

            <Form.Item>
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

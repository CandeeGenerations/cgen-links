import React, {useEffect, useState} from 'react'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Tooltip from 'antd/es/tooltip'
import Skeleton from 'antd/es/skeleton'
import Text from 'antd/es/typography/Text'
import Breadcrumb from 'antd/es/breadcrumb'
import Table, {ColumnsType} from 'antd/es/table'
import {useParams, Link as RLink} from 'react-router-dom'

import {formatDate} from '../../helpers'
import Title from '../../components/Title'
import {findLinkById} from '../../api/link.api'
import {Click, Link as MLink} from '../../models'
import Container from '../../components/Container'
import {findAllClicksByOwner} from '../../api/click.api'
import NullableField from '../../components/NullableField'

const columns: ColumnsType<Click> = [
  {
    title: 'Date Clicked',
    dataIndex: 'clickedTs',
    key: 'clickedTs',
    render: formatDate,
  },
  {
    title: 'IP Address',
    dataIndex: 'ipAddress',
    key: 'ipAddress',
    render: (text: string) => <NullableField value={text} />,
  },
  {
    title: 'Language',
    dataIndex: 'language',
    key: 'language',
    render: (text: string) => <NullableField value={text} />,
  },
  {
    title: 'Browser',
    key: 'browser',
    dataIndex: 'userAgent',
    ellipsis: {
      showTitle: false,
    },
    render: (userAgent: string) => (
      <NullableField
        value={
          userAgent && (
            <Tooltip placement="topLeft" title={userAgent}>
              {userAgent}
            </Tooltip>
          )
        }
      />
    ),
  },
  {
    title: 'Location',
    key: 'location',
    render: (text: string, data: Click) =>
      `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country ||
        'Unknown'}`,
  },
]

const Link = () => {
  const {id} = useParams<{id: string}>()

  const [loadingLink, setLoadingLink] = useState(true)
  const [clicks, setClicks] = useState<Click[]>([])
  const [loadingClicks, setLoadingClicks] = useState(true)
  const [link, setLink] = useState<MLink | null>(null)

  const getShortUrl = async () => {
    const response = await findLinkById(id)

    setLink(response)
    setLoadingLink(false)
  }

  const getClicks = async () => {
    const response = await findAllClicksByOwner(id)

    setClicks(response.data)
    setLoadingClicks(false)
  }

  useEffect(() => {
    getShortUrl()
    getClicks()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Container span={20} background={false}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>
            <RLink to="/links">Links</RLink>
          </Breadcrumb.Item>

          <Breadcrumb.Item>{loadingLink ? '...' : link?.title}</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container span={20}>
        <Title link={{title: 'Edit Link', to: `/links/edit/${id}`}}>Link</Title>

        {loadingLink || !link ? (
          <Skeleton active />
        ) : (
          <>
            <Row gutter={[16, {md: 16, sm: 24, xs: 24}]}>
              <Col md={6} sm={24} xs={24}>
                <strong>Title:</strong>
                <br />
                <Text>{link.title}</Text>
              </Col>

              <Col md={10} sm={24} xs={24}>
                <strong>Destination:</strong>
                <br />
                <Text code copyable>
                  {link.destination}
                </Text>
              </Col>

              <Col md={8} sm={24} xs={24}>
                <strong>Date Added:</strong>
                <br />
                <Text>
                  {link.addedTs ? formatDate(link.addedTs) : <em>None</em>}
                </Text>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <strong>Description:</strong>
                <br />
                <Text>{link.description || <em>None</em>}</Text>
              </Col>
            </Row>
          </>
        )}
      </Container>

      <Container span={20}>
        <Title>Clicks</Title>

        {loadingClicks ? (
          <Skeleton active />
        ) : (
          <Table dataSource={clicks} columns={columns} />
        )}
      </Container>
    </>
  )
}

export default Link

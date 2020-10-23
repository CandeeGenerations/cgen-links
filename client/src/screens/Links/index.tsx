import React, {useContext, useEffect, useState} from 'react'

import Space from 'antd/es/space'
import {Link} from 'react-router-dom'
import Tooltip from 'antd/es/tooltip'
import Skeleton from 'antd/es/skeleton'
import Text from 'antd/es/typography/Text'
import Breadcrumb from 'antd/es/breadcrumb'
import Table, {ColumnsType} from 'antd/es/table'

import {ConfigContext} from '../App'
import {findAllLinks} from '../../api'
import {formatDate} from '../../helpers'
import Title from '../../components/Title'
import {LinkModel} from '../../models/models'
import Container from '../../components/Container'

const Links = () => {
  const configContext = useContext(ConfigContext)
  const [loading, setLoading] = useState(true)
  const [allLinks, setAllLinks] = useState<LinkModel[]>([])

  const columns: ColumnsType<LinkModel> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
      responsive: ['xl'],
      render: (url: string) => (
        <Text code copyable>
          {url}
        </Text>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      ellipsis: {
        showTitle: false,
      },
      render: (description: string) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
      align: 'center',
      render: (clicks?: number) => clicks || 0,
    },
    {
      title: 'Added Date',
      dataIndex: 'addedTs',
      key: 'addedTs',
      responsive: ['xl'],
      render: formatDate,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: LinkModel) => (
        <Space size="middle">
          <Link to={`/links/${record._id}`}>View Details</Link>
        </Space>
      ),
    },
  ]

  const getLinks = async () => {
    const response = await findAllLinks()

    setAllLinks(response)
    setLoading(false)
  }

  useEffect(() => {
    getLinks()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Container span={20} background={false}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>
            <Link to="/new">Home</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Links</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container span={20}>
        <Title>Links</Title>

        {loading ? (
          <Skeleton active />
        ) : (
          <Table dataSource={allLinks} columns={columns} />
        )}
      </Container>
    </>
  )
}

export default Links

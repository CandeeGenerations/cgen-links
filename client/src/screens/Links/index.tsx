/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useContext, useEffect, useState, useCallback} from 'react'
import {Link} from 'react-router-dom'
import Spin from 'antd/es/spin'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import styled from '@emotion/styled'

import {User} from '../../models'
import {UserContext} from '../App'
import Title from '../../components/Title'
import {LinkModel} from '../../models/link.model'
import Container from '../../components/Container'
import {findLinksByOwner, reorderLinks} from '../../api/link.api'
import LinkItem from './components/LinkItem'
import Button from '../../components/Button'

const Links = () => {
  const userContext = useContext(UserContext)
  const user = userContext as User
  const [loading, setLoading] = useState(true)
  const [dirtyLinks, setDirtyLinks] = useState(false)
  const [allLinks, setAllLinks] = useState<LinkModel[]>([])

  const getLinks = async () => {
    const response = await findLinksByOwner(user._id)

    setAllLinks(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getLinks()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const saveOrder = async () => {
    setDirtyLinks(false)
    setLoading(true)

    await reorderLinks(
      allLinks.map(x => x._id),
      user._id,
    )

    setLoading(false)
  }

  const moveLink = useCallback(
    async (dragIndex: number, hoverIndex: number) => {
      const dragCard = allLinks[dragIndex]

      setAllLinks(
        update(allLinks, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
      setDirtyLinks(true)
    },
    [allLinks],
  )

  return (
    <div css={{padding: '50px 0'}}>
      <Container background={false} span={20}>
        <Title>Links</Title>

        <Row css={{marginBottom: 30}}>
          <Col xs={24} sm={24}>
            <Button css={{marginBottom: 30}} block accent size="large">
              <Link to="/link/new">New Link</Link>
            </Button>

            {loading ? (
              <div css={{textAlign: 'center', marginTop: 30}}>
                <Spin />
              </div>
            ) : (
              <DndProvider backend={HTML5Backend}>
                {allLinks.map((link, index) => (
                  <LinkItem
                    index={index}
                    key={link._id}
                    link={link}
                    moveLink={moveLink}
                  />
                ))}
              </DndProvider>
            )}
          </Col>
        </Row>
      </Container>

      {dirtyLinks && (
        <SaveOrderButton block size="large" accent onClick={saveOrder}>
          Save Order
        </SaveOrderButton>
      )}
    </div>
  )
}

const SaveOrderButton = styled(Button)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 0;
  height: auto;
  border-radius: 0 !important;
  margin-bottom: 0;
`

export default Links

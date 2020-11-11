/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useContext, useEffect, useState} from 'react'
import Spin from 'antd/es/spin'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import ATitle from 'antd/es/typography/Title'
import styled from '@emotion/styled'
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd'
import update from 'immutability-helper'
import {Redirect} from 'react-router-dom'

import {User} from '../../models'
import {UserContext} from '../App'
import Title from '../../components/Title'
import {LinkModel} from '../../models/link.model'
import Container from '../../components/Container'
import {findLinksByOwner, reorderLinks} from '../../api/link.api'
import LinkItem from './components/LinkItem'
import Button from '../../components/Button'
import LinkModal from './components/LinkModal'

const Links = () => {
  const userContext = useContext(UserContext)
  const user = userContext?.user as User

  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [dirtyLinks, setDirtyLinks] = useState(false)
  const [allLinks, setAllLinks] = useState<LinkModel[]>([])
  const [editLink, setEditLink] = useState<LinkModel | null>(null)

  const getLinks = async () => {
    setLoading(true)

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

  const onDragEnd = (result: DropResult) => {
    const {destination, source} = result

    if (!destination || destination.index === source.index) {
      return
    }

    const dragCard = allLinks[source.index]

    setAllLinks(
      update(allLinks, {
        $splice: [
          [source.index, 1],
          [destination.index, 0, dragCard],
        ],
      }),
    )
    setDirtyLinks(true)
  }

  return user && (!user.settings || !user.settings.slug) ? (
    <Redirect to={{pathname: '/settings'}} />
  ) : (
    <div css={{padding: '50px 0'}}>
      <Container background={false} span={20}>
        <Title>Links</Title>

        <Row justify="space-around" align="middle" css={{marginBottom: 30}}>
          <Col xs={24} lg={10} xl={8}>
            <Button
              css={{marginBottom: 30}}
              block
              accent
              size="large"
              onClick={() => setShowModal(true)}
            >
              New Link
            </Button>

            {loading ? (
              <div css={{textAlign: 'center', marginTop: 30}}>
                <Spin />
              </div>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="links">
                  {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {allLinks.map((link, index) => (
                        <LinkItem
                          index={index}
                          key={link._id}
                          link={link}
                          editLink={() => {
                            setEditLink(link)
                            setShowModal(true)
                          }}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </Col>

          <Col xs={0} lg={14} xl={16}>
            <ATitle
              level={1}
              css={{textAlign: 'center', color: '#a2bdd8 !important'}}
            >
              Preview Coming Soon
            </ATitle>
          </Col>
        </Row>
      </Container>

      {dirtyLinks && (
        <SaveOrderButton block size="large" accent onClick={saveOrder}>
          Save Order
        </SaveOrderButton>
      )}

      <LinkModal
        link={editLink}
        nextOrder={allLinks.length}
        visible={showModal}
        onHide={() => {
          setEditLink(null)
          setShowModal(false)
        }}
        onSave={() => getLinks()}
      />
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
  z-index: 1;
`

export default Links

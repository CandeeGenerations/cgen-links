/** @jsx jsx */
import {jsx, css} from '@emotion/core'
import styled from '@emotion/styled'
import Typography from 'antd/es/typography'
import {MenuOutlined} from '@ant-design/icons'
import {Draggable} from 'react-beautiful-dnd'

import {LinkModel} from '../../../models/link.model'
import Button from '../../../components/Button'

export interface LinkItemProps {
  index: number
  link: LinkModel
  editLink: () => void
}

const {Title, Paragraph, Text} = Typography

const LinkItem = (props: LinkItemProps) => {
  return (
    <Draggable draggableId={props.link._id} index={props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Wrapper>
            <MenuOutlined
              css={css`
                float: right;
                margin-top: 5px;
              `}
            />

            <Title level={5}>{props.link.title}</Title>

            <Paragraph ellipsis>{props.link.destination}</Paragraph>

            {props.link.description && (
              <Paragraph ellipsis={{rows: 2}}>
                <em>{props.link.description}</em>
              </Paragraph>
            )}

            <Paragraph>
              <Text strong>Clicks</Text>: {props.link.clickCount}
            </Paragraph>
          </Wrapper>

          <LinkButton
            type="primary"
            block
            size="large"
            onClick={props.editLink}
          >
            View Link
          </LinkButton>
        </Container>
      )}
    </Draggable>
  )
}

const Container = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 30px #bcbcbc;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
`

const Wrapper = styled.div`
  padding: 1rem;
  cursor: pointer;
`

const LinkButton = styled(Button)`
  border-radius: 0 0 0.5rem 0.5rem !important;
`

export default LinkItem

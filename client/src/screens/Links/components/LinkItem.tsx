/** @jsx jsx */
import {jsx, css} from '@emotion/core'
import styled from '@emotion/styled'
import Typography from 'antd/es/typography'
import {MenuOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {useRef} from 'react'
import {useDrag, useDrop, DropTargetMonitor} from 'react-dnd'
import {XYCoord} from 'dnd-core'

import {LinkModel} from '../../../models/link.model'
import Button from '../../../components/Button'

export interface LinkItemProps {
  index: number
  link: LinkModel
  moveLink: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const {Title, Paragraph, Text} = Typography

const LinkItem = (props: LinkItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: 'link',
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = props.index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return
      }

      props.moveLink(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{isDragging}, drag] = useDrag({
    item: {type: 'link', id: props.link._id, index: props.index},
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <Container ref={ref} css={{opacity}}>
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

      <LinkButton type="primary" block size="large">
        <Link to={`/links/${props.link._id}`}>View Link</Link>
      </LinkButton>
    </Container>
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

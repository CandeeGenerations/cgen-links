/** @jsx jsx */
import {jsx} from '@emotion/core'
import Row from 'antd/es/row'
import Col from 'antd/es/col'

export interface ContainerProps {
  background?: boolean
  span?: number
  children: React.ReactNode
}

const Container = (props: ContainerProps) => {
  const background = props.background === undefined ? true : props.background
  const width = props.span || 12
  const offset = (24 - width) / 2

  return (
    <div css={{padding: 20}}>
      <Row>
        <Col xs={24} xl={{span: width, offset}}>
          {background ? (
            <div
              css={{
                padding: '50px 50px 25px',
                backgroundColor: '#fff',
                borderRadius: '0.5rem',
                boxShadow: '0 0 30px #bcbcbc',
              }}
            >
              {props.children}
            </div>
          ) : (
            props.children
          )}
        </Col>
      </Row>
    </div>
  )
}

export default Container

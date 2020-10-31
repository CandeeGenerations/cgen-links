import React from 'react'
import Row from 'antd/es/row'
import Col, {ColProps} from 'antd/es/col'

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
    <Row>
      <Col lg={24} xl={{span: width, offset}}>
        {background ? (
          <div
            style={{
              padding: 48,
              minHeight: 280,
              margin: '16px 0',
              background: '#fff',
            }}
          >
            {props.children}
          </div>
        ) : (
          props.children
        )}
      </Col>
    </Row>
  )
}

export default Container

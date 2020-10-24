import React from 'react'
import Button from 'antd/es/button'
import {Link} from 'react-router-dom'
import ATitle from 'antd/es/typography/Title'

export interface TitleProps {
  link?: {
    title: string
    to: string
  }
  children: React.ReactNode | string
}

const Title = (props: TitleProps) => {
  return (
    <>
      {props.link && (
        <Button type="primary" style={{float: 'right', marginTop: 7}}>
          <Link to={props.link.to}>{props.link.title}</Link>
        </Button>
      )}

      <ATitle>{props.children}</ATitle>

      <hr style={{marginBottom: 30}} />
    </>
  )
}

export default Title

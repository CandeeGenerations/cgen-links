import React from 'react'
import Button from 'antd/es/button'
import {Link} from 'react-router-dom'
import ATitle, {TitleProps as ATitleProps} from 'antd/es/typography/Title'
import styled from '@emotion/styled'

export interface TitleProps extends ATitleProps {
  link?: {
    title: string
    to: string
  }
  children: React.ReactNode | string
}

const Title = ({link, children, ...props}: TitleProps) => {
  return (
    <>
      {link && (
        <Button type="primary" style={{float: 'right', marginTop: 7}}>
          <Link to={link.to}>{link.title}</Link>
        </Button>
      )}

      <BTitle {...props}>{children}</BTitle>
    </>
  )
}

const BTitle = styled(ATitle)`
  color: #a2bdd8 !important;
  padding-bottom: 15px;
  border-bottom: 1px solid #a2bdd8;
  margin-bottom: 30px !important;
`

export default Title

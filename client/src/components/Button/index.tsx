/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react'
import {ButtonProps as BProps} from 'antd/es/button/button'
import AButton from 'antd/es/button'
import styled from '@emotion/styled'

export interface ButtonProps extends BProps {
  accent?: boolean
}

const Button = ({
  className,
  ...props
}: ButtonProps & React.RefAttributes<HTMLElement>) => {
  return (
    <BButton
      {...props}
      className={`${className} ${props.accent ? 'ant-custom-btn-accent' : ''}`}
    >
      {props.children}
    </BButton>
  )
}

const BButton = styled(AButton)`
  width: 100%;
  padding: 1rem !important;
  display: block;
  font-size: 0.75rem;
  text-align: center;
  margin-bottom: 30px;
  border-radius: 0.5rem;
  font-size: 16px;
  transition: all ease 0.5s;
  height: auto;
`

export default Button

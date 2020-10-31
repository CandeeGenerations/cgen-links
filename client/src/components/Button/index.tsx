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
  size,
  ...props
}: ButtonProps & React.RefAttributes<HTMLElement>) => {
  return (
    <BButton
      {...props}
      size={size}
      className={`ant-custom ${className ? className : ''} ${
        props.accent ? 'btn-accent' : ''
      } ${size ? size : ''}`}
    >
      {props.children}
    </BButton>
  )
}

const BButton = styled(AButton)`
  text-align: center;
  transition: all ease 0.5s;
  height: auto;

  &.large {
    padding: 1rem !important;
    font-size: 16px;
  }
`

export default Button

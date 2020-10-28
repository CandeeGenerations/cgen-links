/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useContext} from 'react'
import styled from '@emotion/styled'

import {LinkPageContext} from '../index'
import {colorForHover, hexToRgba} from '../../../helpers'
import {Link, Settings} from '../../../models'

export interface LinkButtonProps {
  link: Link
  settings: Settings
}

const LinkButton = (props: LinkButtonProps) => {
  const {
    colors: {button},
  } = useContext(LinkPageContext)

  return (
    <Button
      href={props.link.destination}
      target="_blank"
      css={{
        color: `${button.textColor} !important`,
        backgroundColor: button.backgroundColor,
        boxShadow: `0 0 30px ${hexToRgba(button.backgroundColor, 0.5)}`,

        '&:hover': {
          backgroundColor: colorForHover(button.backgroundColor),
        },
      }}
    >
      {props.link.title}
    </Button>
  )
}

const Button = styled.a`
  width: 100%;
  padding: 1rem;
  display: block;
  font-size: 0.75rem;
  text-align: center;
  margin-bottom: 30px;
  border-radius: 0.5rem;
  font-size: 16px;
  transition: all ease 0.5s;
`

export default LinkButton

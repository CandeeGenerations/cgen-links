/** @jsx jsx */
import {jsx} from '@emotion/core'
import styled from '@emotion/styled'
import {useContext, useState} from 'react'

import {ConfigContext} from '../../App'
import {LinkPageContext} from '../index'
import {createClick} from '../../../api/click.api'
import {ClickInput, Link, Settings} from '../../../models'
import {colorForHover, hexToRgba} from '../../../helpers'
import AButton from '../../../components/Button'

export interface LinkButtonProps {
  link: Link
  settings: Settings
}

const LinkButton = (props: LinkButtonProps) => {
  const {
    colors: {button},
  } = useContext(LinkPageContext)
  const configContext = useContext(ConfigContext)

  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    window.open(props.link.destination, '_target')

    setLoading(true)

    const clickData: ClickInput = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      clickedTs: '',
      owner: {
        connect: props.link._id,
      },
    }

    if (configContext && configContext?.ipUrl) {
      const ipResponse = await fetch(configContext?.ipUrl)

      if (ipResponse.ok) {
        const result = await ipResponse.json()

        const locationData = {
          ipAddress: result.ip_address,
          country: result.country,
          region: result.region,
          city: result.city,
        }

        await createClick({...clickData, ...locationData})
      }
    } else {
      await createClick(clickData)
    }

    setLoading(false)
  }

  return (
    <Button
      onClick={handleClick}
      loading={loading}
      css={{
        color: `${button.textColor} !important`,
        backgroundColor: button.backgroundColor,
        boxShadow: `0 0 30px ${hexToRgba(button.backgroundColor, 0.5)}`,

        '&:hover, &:active, &:focus': {
          backgroundColor: colorForHover(button.backgroundColor),
        },
      }}
    >
      {props.link.title}
    </Button>
  )
}

const Button = styled(AButton)`
  width: 100%;
  padding: 1rem !important;
  display: block;
  text-align: center;
  margin-bottom: 30px;
  font-size: 16px;
  transition: all ease 0.5s;
  height: auto;
`

export default LinkButton

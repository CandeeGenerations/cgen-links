/** @jsx jsx */
import {jsx} from '@emotion/core'
import styled from '@emotion/styled'
import YoutubeFilled from '@ant-design/icons/YoutubeFilled'
import FacebookFilled from '@ant-design/icons/FacebookFilled'
import InstagramFilled from '@ant-design/icons/InstagramFilled'
import TwitterOutlined from '@ant-design/icons/TwitterOutlined'

import {colorForHover} from '../../../helpers'

export interface SocialIconProps {
  color: string
  platform: 'facebook' | 'twitter' | 'instagram' | 'youtube'
  slug: string
}

const SocialIcon = (props: SocialIconProps) => {
  const urls = {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    youtube: 'https://youtube.com/channel/',
  }
  const components = {
    facebook: <FacebookFilled />,
    instagram: <InstagramFilled />,
    twitter: <TwitterOutlined />,
    youtube: <YoutubeFilled />,
  }

  return (
    <IconItem>
      <IconLink
        css={{
          color: props.color,

          '&:active': {
            color: props.color,
          },

          '&:hover': {
            color: colorForHover(props.color),
          },
        }}
        href={`${urls[props.platform]}${props.slug}`}
        target="_blank"
      >
        {components[props.platform]}
      </IconLink>
    </IconItem>
  )
}

const IconItem = styled.li`
  display: inline-block;

  &:not(:last-child) {
    margin-right: 5px;
  }
`

const IconLink = styled.a`
  display: block;
  padding: 5px 15px;
`

export default SocialIcon

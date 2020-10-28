/** @jsx jsx */
import {jsx} from '@emotion/core'
import styled from '@emotion/styled'

import {Settings} from '../../../models'

export interface ProfileImageProps {
  settings: Settings
}

const ProfileImage = (props: ProfileImageProps) => {
  return (
    <ProfileImageWrapper>
      <ImageWrapper>
        <ImageBump />

        <Image src={props.settings.logoUrl} alt={props.settings.slug} />
      </ImageWrapper>
    </ProfileImageWrapper>
  )
}

const ProfileImageWrapper = styled.div`
  z-index: 1;
  width: 164px;
  height: 164px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  margin-bottom: 35px;
  border: 2px solid #fafafa;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 31px;
  margin-right: auto;
  margin-left: auto;
`

const ImageWrapper = styled.div`
  border-radius: 50%;
  position: relative;
  overflow: hidden;
`

const Image = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  transition-delay: 500ms;
`

const ImageBump = styled.div`
  width: 100%;
  padding-bottom: 100.121%;
`

export default ProfileImage

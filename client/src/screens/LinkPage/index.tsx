/** @jsx jsx */
import {jsx} from '@emotion/core'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Spin from 'antd/es/spin'
import tinycolor from 'tinycolor2'
import {Helmet} from 'react-helmet'
import styled from '@emotion/styled'
import {useLocation} from 'react-router-dom'
import Title from 'antd/es/typography/Title'
import React, {useEffect, useState} from 'react'

import {hexToRgba} from '../../helpers'
import {Link, Settings} from '../../models'
import LinkButton from './components/LinkButton'
import SocialIcon from './components/SocialIcon'
import Copyright from '../../components/Copyright'
import ProfileImage from './components/ProfileImage'
import {findSettingsBySlug} from '../../api/settings.api'
import {findActiveLinksByOwner} from '../../api/link.api'

export interface Color {
  textColor: string
  backgroundColor: string
  backgroundGradient?: string
}

export interface Colors {
  header: Color
  button: Color
}

const LIGHT = '#eee'
const DARK = '#333'
const colorState: Colors = {
  header: {
    textColor: DARK,
    backgroundColor: LIGHT,
  },
  button: {
    textColor: LIGHT,
    backgroundColor: DARK,
  },
}

export const LinkPageContext = React.createContext<{
  settings?: Settings
  colors: Colors
}>({colors: colorState})

const LinkPage = () => {
  const location = useLocation()

  const [colors, setColors] = useState(colorState)
  const [loading, setLoading] = useState(true)
  const [links, setLinks] = useState<Link[]>([])
  const [anySocial, setAnySocial] = useState(false)
  const [settings, setSettings] = useState<Settings | null>(null)

  const load = async () => {
    setLoading(true)

    const settings = await findSettingsBySlug(
      location.pathname.replace('/', ''),
    )
    const links = await findActiveLinksByOwner(settings.owner._id)

    setLoading(false)
    setLinks(links.data)
    setSettings(settings)
    setAnySocial(
      !!(
        settings &&
        (settings.facebook ||
          settings.twitter ||
          settings.instagram ||
          settings.youtube)
      ),
    )

    const secondaryColor = tinycolor(settings.secondaryColor || LIGHT)
    const primaryColor = tinycolor(settings.primaryColor || DARK)
    const headerTextColor = secondaryColor.isLight() ? DARK : LIGHT
    const colorHex = primaryColor.isLight() ? DARK : LIGHT
    const headerGradientColor = (secondaryColor.isLight()
      ? secondaryColor.clone().darken(10)
      : secondaryColor.clone().lighten(10)
    ).toHexString()

    setColors({
      header: {
        textColor: headerTextColor,
        backgroundColor: secondaryColor.toHexString(),
        backgroundGradient: `linear-gradient(180deg, ${secondaryColor.toHexString()} 0%, ${headerGradientColor} 100%)`,
      },
      button: {
        textColor: colorHex,
        backgroundColor: primaryColor.toHexString(),
      },
    })
  }

  useEffect(() => {
    load()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div css={{minWidth: 300}}>
      {loading || !settings ? (
        <Wrapper css={{textAlign: 'center'}}>
          <Spin size="large" />
        </Wrapper>
      ) : (
        <LinkPageContext.Provider value={{settings, colors}}>
          <Helmet>
            <title>{settings.slug} | CGen Links</title>
          </Helmet>

          <Row>
            <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <Header
                css={{
                  color: colors.header.textColor,
                  background: settings.useGradient
                    ? [
                        colors.header.backgroundColor,
                        colors.header.backgroundGradient as string,
                      ]
                    : colors.header.backgroundColor,
                }}
              >
                {settings.logoUrl ? (
                  <ProfileImage settings={settings} />
                ) : (
                  settings.slug
                )}

                {anySocial && (
                  <SocialLinksWrapper>
                    <SocialLinks>
                      {settings.facebook && (
                        <SocialIcon
                          color={colors.header.textColor}
                          platform="facebook"
                          slug={settings.facebook}
                        />
                      )}

                      {settings.instagram && (
                        <SocialIcon
                          color={colors.header.textColor}
                          platform="instagram"
                          slug={settings.instagram}
                        />
                      )}

                      {settings.twitter && (
                        <SocialIcon
                          color={colors.header.textColor}
                          platform="twitter"
                          slug={settings.twitter}
                        />
                      )}

                      {settings.youtube && (
                        <SocialIcon
                          color={colors.header.textColor}
                          platform="youtube"
                          slug={settings.youtube}
                        />
                      )}
                    </SocialLinks>
                  </SocialLinksWrapper>
                )}
              </Header>
            </Col>

            <Col
              xs={24}
              sm={24}
              md={16}
              lg={16}
              xl={12}
              xxl={12}
              css={{margin: '0 auto'}}
            >
              <Wrapper>
                <PageTitle level={2}>Links for {settings.slug}</PageTitle>

                {links.map(link => (
                  <LinkButton key={link._id} link={link} settings={settings} />
                ))}
              </Wrapper>

              <Copyright />
            </Col>
          </Row>
        </LinkPageContext.Provider>
      )}
    </div>
  )
}

const Wrapper = styled.div`
  padding: 50px;

  @media (min-width: 768px) {
    padding-top: 100px;
  }
`

const PageTitle = styled(Title)`
  display: none;
  padding-bottom: 50px;
  text-align: center;

  @media (min-width: 768px) {
    display: block;
  }
`

const Header = styled.div`
  font-size: 25px;
  text-align: center;
  padding: 35px 50px 50px;

  @media (min-width: 768px) {
    height: 100vh;
    padding-top: 100px;
  }
`

const SocialLinksWrapper = styled.div`
  padding: 15px;
  border-radius: 0.5rem;
  background-color: hsla(0, 0%, 100%, 0.1);
`

const SocialLinks = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`

export default LinkPage

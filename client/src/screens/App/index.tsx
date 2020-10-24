import React, {useEffect, useState} from 'react'
import Menu from 'antd/es/menu'
import Layout from 'antd/es/layout'
import ALink from 'antd/es/typography/Link'
import {
  Switch,
  Route,
  Link as RLink,
  BrowserRouter,
  Redirect,
} from 'react-router-dom'

import './app.css'

import Home from '../Home'
import Links from '../Links'
import Link from '../Links/Link'
import Settings from '../Settings'
import {getConfig} from '../../api'
import {authTokenKey} from '../../helpers'
import NewEditLink from '../Links/NewEditLink'
import {ConfigModel} from '../../models/models'

const {Header, Content, Footer} = Layout

export const ConfigContext = React.createContext<ConfigModel | null>(null)

const App = () => {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [config, setConfig] = useState<ConfigModel | null>(null)

  const loadConfig = async () => {
    const response = await getConfig()

    setConfig(response)
    setLoading(false)
  }

  useEffect(() => {
    setLoggedIn(localStorage.getItem(authTokenKey) !== null)
    loadConfig()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onLogIn = () => setLoggedIn(true)

  const onLogOut = () => {
    localStorage.removeItem(authTokenKey)
    setLoggedIn(false)
  }

  return loading ? (
    <div style={{padding: 10}}>Loading..</div>
  ) : (
    <ConfigContext.Provider value={config}>
      <BrowserRouter>
        <Layout style={{minWidth: 470}}>
          {loggedIn && (
            <Header>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <RLink to="/links">Links</RLink>
                </Menu.Item>

                <Menu.Item key="2">
                  <RLink to="/settings">Settings</RLink>
                </Menu.Item>

                <Menu.Item key="3" style={{float: 'right'}}>
                  <ALink onClick={onLogOut}>Log Out</ALink>
                </Menu.Item>
              </Menu>
            </Header>
          )}

          <Content style={{padding: loggedIn ? '0 50px' : '50px 50px 0'}}>
            <Switch>
              <Route
                path={['/links/new', '/links/edit/:id']}
                render={({location}) =>
                  loggedIn ? (
                    <NewEditLink />
                  ) : (
                    <Redirect
                      to={{
                        pathname: '/',
                        state: {from: location},
                      }}
                    />
                  )
                }
              />

              <Route
                path="/links/:id"
                render={({location}) =>
                  loggedIn ? (
                    <Link />
                  ) : (
                    <Redirect
                      to={{
                        pathname: '/',
                        state: {from: location},
                      }}
                    />
                  )
                }
              />

              <Route
                path="/links"
                render={({location}) =>
                  loggedIn ? (
                    <Links />
                  ) : (
                    <Redirect
                      to={{
                        pathname: '/',
                        state: {from: location},
                      }}
                    />
                  )
                }
              />

              <Route
                path="/settings"
                render={({location}) =>
                  loggedIn ? (
                    <Settings />
                  ) : (
                    <Redirect
                      to={{
                        pathname: '/',
                        state: {from: location},
                      }}
                    />
                  )
                }
              />

              <Route
                path="/"
                render={({location}) =>
                  !loggedIn ? (
                    <Home onLogIn={onLogIn} />
                  ) : (
                    <Redirect
                      to={{
                        pathname: '/links',
                        state: {from: location},
                      }}
                    />
                  )
                }
              />
            </Switch>
          </Content>

          <Footer style={{textAlign: 'center'}}>
            Candee Generations &copy; {new Date().getFullYear()}
          </Footer>
        </Layout>
      </BrowserRouter>
    </ConfigContext.Provider>
  )
}

export default App

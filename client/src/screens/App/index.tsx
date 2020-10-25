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
import {User} from '../../models'
import Settings from '../Settings'
import {getConfig} from '../../api'
import {authTokenKey} from '../../helpers'
import NewEditLink from '../Links/NewEditLink'
import {ConfigModel} from '../../models/config.model'

const {Header, Content, Footer} = Layout

export const UserContext = React.createContext<User | null>(null)
export const ConfigContext = React.createContext<ConfigModel | null>(null)

const App = () => {
  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState<ConfigModel | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const loadConfig = async () => {
    const response = await getConfig()

    setConfig(response)
    setLoading(false)
  }

  const getUser = () => {
    const userData = localStorage.getItem(authTokenKey)

    setUser(userData && JSON.parse(atob(userData as string)))
  }

  useEffect(() => {
    getUser()
    loadConfig()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onLogIn = () => getUser()

  const onLogOut = () => {
    localStorage.removeItem(authTokenKey)
    setUser(null)
  }

  const redirect = (Component: any): JSX.Element =>
    user ? <Component /> : <Redirect to={{pathname: '/'}} />

  return loading ? (
    <div style={{padding: 10}}>Loading..</div>
  ) : (
    <ConfigContext.Provider value={config}>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Layout style={{minWidth: 470}}>
            {user && (
              <Header>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                >
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

            <Content style={{padding: user ? '0 50px' : '50px 50px 0'}}>
              <Switch>
                <Route
                  path={['/links/new', '/links/edit/:id']}
                  render={() => redirect(NewEditLink)}
                />

                <Route path="/links/:id" render={() => redirect(Link)} />

                <Route path="/links" render={() => redirect(Links)} />

                <Route path="/settings" render={() => redirect(Settings)} />

                <Route
                  path="/"
                  render={({location}) =>
                    !user ? (
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
      </UserContext.Provider>
    </ConfigContext.Provider>
  )
}

export default App

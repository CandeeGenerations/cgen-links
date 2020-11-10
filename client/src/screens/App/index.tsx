/** @jsx jsx */
import {jsx} from '@emotion/core'
import Spin from 'antd/es/spin'
import Layout from 'antd/es/layout'
import React, {useEffect, useState} from 'react'
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
  useHistory,
} from 'react-router-dom'

import Home from '../Home'
import Links from '../Links'
import Link from '../Links/Link'
import {User} from '../../models'
import Settings from '../Settings'
import LinkPage from '../LinkPage'
import {getConfig} from '../../api'
import {authTokenKey} from '../../helpers'
import {ConfigModel} from '../../models/config.model'
import Copyright from '../../components/Copyright'
import Navbar from '../../components/Navbar'
import {findUserById} from '../../api/auth.api'

const {Content} = Layout

export const UserContext = React.createContext<{
  user: User | null
  getUser: () => void
} | null>(null)
export const ConfigContext = React.createContext<ConfigModel | null>(null)

const App = () => {
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState<ConfigModel | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const loadConfig = async () => {
    const response = await getConfig()

    setConfig(response)
    setLoading(false)
  }

  const getUser = async () => {
    const userData = localStorage.getItem(authTokenKey)

    if (userData) {
      const userObject = (userData &&
        JSON.parse(atob(userData as string))) as User

      const user = await findUserById(userObject._id)

      setUser(user)
    }
  }

  useEffect(() => {
    getUser()
    loadConfig()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onLogIn = () => {
    getUser()
    history.push('/links')
  }

  const onLogOut = () => {
    localStorage.removeItem(authTokenKey)
    setUser(null)
  }

  const redirect = (Component: any): JSX.Element => (
    <Layout>
      {user && <Navbar onLogOut={onLogOut} />}

      <Content style={{padding: user ? '0 50px' : '50px 50px 0'}}>
        {user ? <Component /> : <Redirect to={{pathname: '/'}} />}
      </Content>

      <Copyright onLogOut={onLogOut} />
    </Layout>
  )

  return loading ? (
    <div css={{padding: 50, textAlign: 'center'}}>
      <Spin size="large" />
    </div>
  ) : (
    <ConfigContext.Provider value={config}>
      <UserContext.Provider value={{user, getUser}}>
        <BrowserRouter>
          <Switch>
            <Route path="/links/:id" render={() => redirect(Link)} />

            <Route path="/links" render={() => redirect(Links)} />

            <Route path="/settings" render={() => redirect(Settings)} />

            <Route path="/:slug">
              <LinkPage />
            </Route>

            <Route
              path="/"
              render={() =>
                !user ? (
                  <Home onLogIn={onLogIn} />
                ) : (
                  <Redirect to={{pathname: '/links'}} />
                )
              }
            />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </ConfigContext.Provider>
  )
}

export default App

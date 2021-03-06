import React, {useContext, useState} from 'react'
import Alert from 'antd/es/alert'
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'

import Title from '../Title'
import {authTokenKey} from '../../helpers'
import {ConfigContext} from '../../screens/App'
import {findOrCreateUser} from '../../api/auth.api'

export interface LoginProps {
  onLogIn: () => void
}

const Login = (props: LoginProps) => {
  const configContext = useContext(ConfigContext)
  const [error, setError] = useState('')

  const responseGoogle = async (
    r: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    const response = r as GoogleLoginResponse

    try {
      const user = await findOrCreateUser(response)

      localStorage.setItem(authTokenKey, btoa(JSON.stringify(user)))
      props.onLogIn()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <Title style={{textAlign: 'center'}}>Links Login</Title>

      {error && (
        <Alert
          message="Error"
          description={`${error}`}
          type="error"
          closable
          onClose={() => setError('')}
          style={{marginBottom: 30}}
        />
      )}

      <div style={{textAlign: 'center'}}>
        <GoogleLogin
          clientId={configContext?.gClientId || ''}
          buttonText="Login with Google"
          onSuccess={r => responseGoogle(r)}
          onFailure={r => responseGoogle(r)}
          cookiePolicy={'single_host_origin'}
          onRequest={() => setError('')}
        />
      </div>
    </>
  )
}

export default Login

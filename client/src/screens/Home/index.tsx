import React from 'react'

import Login from '../../components/Login'
import Container from '../../components/Container'
import Copyright from '../../components/Copyright'

export interface HomeProps {
  onLogIn: () => void
}

const Home = (props: HomeProps) => {
  return (
    <>
      <Container>
        <Login onLogIn={props.onLogIn} />
      </Container>

      <Copyright />
    </>
  )
}

export default Home

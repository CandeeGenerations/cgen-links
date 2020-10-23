import React from 'react'

import Login from '../../components/Login'
import Container from '../../components/Container'

export interface HomeProps {
  onLogIn: () => void
}

const Home = (props: HomeProps) => {
  return (
    <Container>
      <Login onLogIn={props.onLogIn} />
    </Container>
  )
}

export default Home

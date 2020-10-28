/** @jsx jsx */
import {jsx} from '@emotion/core'
import Layout from 'antd/es/layout'

const Copyright = () => {
  return (
    <Layout.Footer css={{backgroundColor: '#fff', textAlign: 'center'}}>
      <a href="https://cgen.cc" target="_blank">
        Candee Generations
      </a>{' '}
      &copy; {new Date().getFullYear()}
    </Layout.Footer>
  )
}

export default Copyright

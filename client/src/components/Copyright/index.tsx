/** @jsx jsx */
import {jsx} from '@emotion/core'
import Layout from 'antd/es/layout'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Link from 'antd/es/typography/Link'

export interface CopyrightProps {
  onLogOut?: () => void
}

const Copyright = (props: CopyrightProps) => {
  return (
    <Layout.Footer css={{textAlign: 'center', color: '#a2bdd8'}}>
      <Row>
        {props.onLogOut && (
          <Col xs={24} lg={0} css={{marginBottom: 20, textAlign: 'center'}}>
            <Link onClick={props.onLogOut}>Log Out</Link>
          </Col>
        )}

        <Col xs={24}>
          <a href="https://cgen.cc" target="_blank" css={{color: '#a2bdd8'}}>
            Candee Generations
          </a>{' '}
          &copy; {new Date().getFullYear()}
        </Col>
      </Row>
    </Layout.Footer>
  )
}

export default Copyright

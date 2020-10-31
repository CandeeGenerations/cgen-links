/** @jsx jsx */
import {jsx} from '@emotion/core'
import styled from '@emotion/styled'
import {Link as RLink} from 'react-router-dom'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Link from 'antd/es/typography/Link'

const LinksLink = () => <RLink to="/links">Links</RLink>
const SettingsLink = () => <RLink to="/settings">Settings</RLink>

export interface NavbarProps {
  onLogOut: () => void
}

const Navbar = (props: NavbarProps) => {
  return (
    <Row>
      <NavItem xs={12} lg={0}>
        <LinksLink />
      </NavItem>

      <NavItem xs={12} lg={0}>
        <SettingsLink />
      </NavItem>

      <Col xs={0} lg={24}>
        <NavList>
          <li>
            <LinksLink />
          </li>

          <li>
            <SettingsLink />
          </li>

          <li>
            <Link onClick={props.onLogOut}>Log Out</Link>
          </li>
        </NavList>
      </Col>
    </Row>
  )
}

const NavList = styled.ul`
  padding: 0;
  margin: 30px 0 0;
  list-style-type: none;
  text-align: center;

  > li {
    display: inline-block;

    > a {
      padding: 10px 20px;
    }

    &:not(:last-child) {
      border-right: 1px solid #a2bdd8;
    }
  }
`

const NavItem = styled(Col)`
  background-color: #fefefe;
  border-bottom: 1px solid #a2bdd8;

  &:not(:last-child) {
    border-right: 1px solid #a2bdd8;
  }

  > a {
    display: block;
    padding: 30px 10px;
    text-align: center;
  }
`

export default Navbar

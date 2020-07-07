import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { AuthUserContext } from '../Session';
import SignOutButton from '../Account/SignOut';
import { Notification } from '../Notifications/Notification';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand href={ROUTES.LANDING}>Cup of Sugar</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link eventKey={ROUTES.LANDING} href={ROUTES.LANDING}>
            Explore
          </Nav.Link>
          <Nav.Link eventKey={ROUTES.MYSHARES} href={ROUTES.MYSHARES}>
            MyShares
          </Nav.Link>
          <Nav.Link eventKey={ROUTES.CHAT} href={ROUTES.CHAT}>
            <div className="d-inline">Chat</div>
            <Notification className="d-inline" />
          </Nav.Link>
          <NavDropdown
            title={authUser.username}
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item
              eventKey={ROUTES.CHAT}
              href={ROUTES.CHAT}
            >
              Account
            </NavDropdown.Item>
            {!!authUser.roles[ROLES.ADMIN] && (
              <NavDropdown.Item
                eventKey={ROUTES.ADMIN}
                href={ROUTES.ADMIN}
              >
                Admin
              </NavDropdown.Item>
            )}
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <SignOutButton />
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const NavigationNonAuth = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand href={ROUTES.LANDING}>Cup of Sugar</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link eventKey={ROUTES.LANDING} href={ROUTES.LANDING}>
            Explore
          </Nav.Link>
          <Nav.Link eventKey={ROUTES.SIGN_IN} href={ROUTES.SIGN_IN}>
            Sign in to share
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;

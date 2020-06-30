import React from 'react';
import Nav from 'react-bootstrap/Nav';

import { AuthUserContext } from '../Session';
import SignOutButton from '../Account/SignOut';
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
  const activeKey = window.location.pathname;

  return (
    <Nav
      className="justify-content-end mt-2 mb-2"
      activeKey={activeKey}
      defaultActiveKey="1"
      variant="tabs"
    >
      <Nav.Item>
        <Nav.Link eventKey={ROUTES.LANDING} href={ROUTES.LANDING}>
          Explore
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey={ROUTES.MYSHARES} href={ROUTES.MYSHARES}>
          MyShares
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey={ROUTES.CHAT} href={ROUTES.CHAT}>
          Chat
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey={ROUTES.ACCOUNT} href={ROUTES.ACCOUNT}>
          Account
        </Nav.Link>
      </Nav.Item>
      {!!authUser.roles[ROLES.ADMIN] && (
        <Nav.Item>
          <Nav.Link eventKey={ROUTES.ADMIN} href={ROUTES.ADMIN}>
            Admin
          </Nav.Link>
        </Nav.Item>
      )}
      <Nav.Item>
        <SignOutButton />
      </Nav.Item>
    </Nav>
  );
};

const NavigationNonAuth = () => {
  const activeKey = window.location.pathname;
  return (
    <Nav
      className="justify-content-end mt-2 mb-2"
      activeKey={activeKey}
      defaultActiveKey="1"
      variant="tabs"
    >
      <Nav.Item>
        <Nav.Link eventKey={ROUTES.LANDING} href={ROUTES.LANDING}>
          Explore
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey={ROUTES.SIGN_IN} href={ROUTES.SIGN_IN}>
          Sign in to share
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navigation;

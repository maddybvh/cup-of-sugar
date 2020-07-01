import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../Account/SignUp';
import SignInPage from '../Account/SignIn';
import PasswordForgetPage from '../Account/PasswordForget';
import MyShares from '../MyShares';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ItemPage from '../Items/ItemPage';
import { Chat } from '../Chat';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <div className="container-lg vh-100">
    <Router>
      <Navigation />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.MYSHARES} component={MyShares} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path="/i/:uid" component={ItemPage} />
      <Route path={ROUTES.CHAT} component={Chat} />
    </Router>
  </div>
);

export default withAuthentication(App);

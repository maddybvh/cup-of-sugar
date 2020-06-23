import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Items from '../Items';

const MyShares = () => (
  <div>
    <h2>I'm offering...</h2>
    <Items />
    <h2>I'm looking for...</h2>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(MyShares);

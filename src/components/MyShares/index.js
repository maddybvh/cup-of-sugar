import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Items from '../Items';

const MyShares = () => (
  <div>
    <h1>My Shares</h1>
    <p>
      A list of items the current user is willing to share, and things
      they have asked to borrow.
    </p>
    <h2>I'm offering:</h2>
    <Items />
    <h2>I'm requesting:</h2>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(MyShares);

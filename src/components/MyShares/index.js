import React from 'react';
import { compose } from 'recompose';
import { AuthUserContext } from '../Session';

import { withAuthorization, withEmailVerification } from '../Session';
import Items from '../Items';
import ItemInput from '../Items/ItemInput';

const MyShares = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <>
        <ItemInput
          authUser={authUser}
          buttonText="Add an offer or request"
        />
        <h2>I'm looking for...</h2>
        <Items
          authUser={authUser}
          queryKey={'myRequests'}
          buttonText="Add request"
          type="request"
        />
        <h2>I'm offering...</h2>
        <Items
          authUser={authUser}
          queryKey="myOffers"
          buttonText="Add offer"
          type="offer"
        />
      </>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(MyShares);

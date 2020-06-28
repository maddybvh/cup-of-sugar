import React, { useState } from 'react';
import { AuthUserContext } from '../Session';
import Items from '../Items';
import Filters from '../Filters';
import ItemInput from '../Items/ItemInput';

const Landing = () => {
  const [zipcodesToSearch, setZipCodesToSearch] = useState([]);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          <ItemInput
            authUser={authUser}
            buttonText="Add an offer or request"
          />
          <Filters setZipCodesToSearch={setZipCodesToSearch} />

          <div className="border-bottom p-2 mb-4">
            <h2>Your neighbors are looking for... </h2>
            <Items
              queryKey="allRequests"
              placeholder="What do you need?"
              buttonText="Add request"
              type="request"
              zipcodesToSearch={zipcodesToSearch}
            />
          </div>

          <h2>Your neighbors are offering... </h2>
          <Items
            queryKey="allOffers"
            placeholder="I'd be happy to share..."
            buttonText="Add offer"
            type="offer"
            zipcodesToSearch={zipcodesToSearch}
          />
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

export default Landing;

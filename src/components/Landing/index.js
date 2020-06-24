import React from 'react';
import Items from '../Items';

const Landing = () => (
  <div>
    <div className="border-bottom p-2 mb-4">
      <h2>Your neighbors are looking for... </h2>
      <Items
        queryKey="allRequests"
        placeholder="What do you need?"
        buttonText="Add request"
        type="request"
      />
    </div>

    <h2>Your neighbors are offering... </h2>
    <Items
      placeholder="I'd be happy to share..."
      buttonText="Add offer"
      type="offer"
    />
  </div>
);

export default Landing;

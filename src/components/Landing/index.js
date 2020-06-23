import React from 'react';
import Items from '../Items';

const Landing = () => (
  <div>
    <h2>Your neighbors are looking for... </h2>
    <Items
      queryKey={'allRequests'} //@todo
      placeholder="What do you need?"
      buttonText="Add request"
    />
    <h2>Your neighbors are offering... </h2>
    <Items
      placeholder="I'd be happy to share..."
      buttonText="Add offer"
    />
  </div>
);

export default Landing;

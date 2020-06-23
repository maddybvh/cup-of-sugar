import React from 'react';
import Items from '../Items';

const Landing = () => (
  <div>
    <h2>Your neighbors are requesting: </h2>
    <p>Add requested items here</p>
    <p>Sign in to request</p>
    <h2>Your neighbors are offering: </h2>
    <Items />
  </div>
);

export default Landing;

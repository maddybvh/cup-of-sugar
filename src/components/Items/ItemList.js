import React from 'react';

import SingleItem from './SingleItem';

const ItemList = ({ authUser, items, onEditItem, onRemoveItem }) => (
  <ul>
    {items.map((item) => (
      <SingleItem
        authUser={authUser}
        key={item.uid}
        item={item}
        onEditItem={onEditItem}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
);

export default ItemList;

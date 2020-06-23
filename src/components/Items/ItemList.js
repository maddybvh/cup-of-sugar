import React from 'react';

import { ItemCard } from './ItemCard';

const ItemList = ({ authUser, items, onEditItem, onRemoveItem }) => (
  <ul>
    {items.map((item) => (
      <ItemCard
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

import React from 'react';

import { ItemCard } from './ItemCard';

const ItemList = ({
  authUser,
  items,
  onEditItem,
  onRemoveItem,
  queryKey,
}) => {
  switch (queryKey) {
    case 'myOffers':
      items = items.filter((item) => item.userId == authUser.uid);
      break;
  }
  return (
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
};

export default ItemList;

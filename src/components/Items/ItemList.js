import React from 'react';
import Masonry from 'react-masonry-css';

import { ItemCard } from './ItemCard';

const ItemList = ({ authUser, items, onEditItem, onRemoveItem }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {items.map((item) => (
        <ItemCard
          authUser={authUser}
          key={item.uid}
          item={item}
          onEditItem={onEditItem}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </Masonry>
  );
};

export default ItemList;

const breakpointColumnsObj = {
  default: 3,
  700: 2,
  500: 1,
};

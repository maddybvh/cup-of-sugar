import React from 'react';
import Masonry from 'react-masonry-css';

import { ItemCard } from './ItemCard';

const ItemList = ({ authUser, items, onEditItem, onRemoveItem }) => {
  return items.length > 0 ? (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {items.map((item) => (
        <ItemCard
          authUser={authUser}
          item={item}
          onEditItem={onEditItem}
          onRemoveItem={onRemoveItem}
          key={item.uid}
        />
      ))}
    </Masonry>
  ) : (
    <div>Sorry, nothing matches that search.</div>
  );
};

export default ItemList;

const breakpointColumnsObj = {
  default: 3,
  700: 2,
  500: 1,
};

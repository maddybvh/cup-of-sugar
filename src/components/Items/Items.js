import React, { useState, useEffect } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import ItemList from './ItemList';
import ItemInput from './ItemInput';

const Items = (props) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(5);

  const onListenForItems = () => {
    setLoading(true);

    const unsubscribe = props.firebase
      .items()
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          let items = [];
          snapshot.forEach((doc) =>
            items.push({ ...doc.data(), uid: doc.id }),
          );

          setItems(items);
          setLoading(false);
        } else {
          setItems(null);
          setLoading(false);
        }
      });
  };

  const onChangeText = (event) => {
    setText(event.target.value);
  };

  const onCreateItem = (event, authUser) => {
    props.firebase.items().add({
      text: text,
      userId: authUser.uid,
      createdAt: props.firebase.fieldValue.serverTimestamp(),
    });

    setText('');

    event.preventDefault();
  };

  const onEditItem = (item, text) => {
    const { uid, ...itemSnapshot } = item;

    props.firebase.item(item.uid).update({
      ...itemSnapshot,
      text,
      editedAt: props.firebase.fieldValue.serverTimestamp(),
    });
  };

  const onRemoveItem = (uid) => {
    props.firebase.item(uid).delete();
  };

  const onNextPage = () => {
    setLimit(limit + 5);
    onListenForItems();
  };

  useEffect(() => {
    onListenForItems();
  }, [props.firebase.items]);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          {!items && (
            <div>Add something you'd be willing to share ...</div>
          )}

          <ItemInput
            authUser={authUser}
            onCreateItem={onCreateItem}
            onChangeText={onChangeText}
            text={text}
            placeholder={props.placeholder}
            buttonText={props.buttonText}
          />

          {loading && <div>Loading ...</div>}

          {items && (
            <ItemList
              authUser={authUser}
              items={items}
              onEditItem={onEditItem}
              onRemoveItem={onRemoveItem}
              queryKey={props.queryKey}
            />
          )}

          {!loading && items && (
            <div className="text-center">
              <button
                type="button"
                onClick={onNextPage}
                className="btn btn-outline-secondary btn-sm"
              >
                More
              </button>
            </div>
          )}
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

export default withFirebase(Items);

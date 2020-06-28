import React, { useState, useContext, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import lunr from 'lunr';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import ItemList from './ItemList';
import ItemInput from './ItemInput';

const Items = (props) => {
  const authUser = useContext(AuthUserContext);
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const limit = 10;

  let query = props.firebase.items();

  switch (props.queryKey) {
    case 'myOffers':
      query = query
        .where('type', '==', 'offer')
        .where('userId', '==', authUser.uid)
        .orderBy('createdAt', 'asc')
        .limit(limit);
      break;
    case 'myRequests':
      query = query
        .where('type', '==', 'request')
        .where('userId', '==', authUser.uid)
        .orderBy('createdAt', 'asc')
        .limit(limit);
      break;
    case 'allRequests':
      query = query
        .where('type', '==', 'request')
        .orderBy('createdAt', 'asc')
        .limit(limit);
      break;
    case 'allOffers':
      query = query
        .where('type', '==', 'offer')
        .orderBy('createdAt', 'asc')
        .limit(limit);
      break;
    default:
      query = query
        .where('type', '==', 'request')
        .orderBy('createdAt', 'asc')
        .limit(limit);
      break;
  }

  const onChangeText = (event) => {
    setText(event.target.value);
  };

  const onCreateItem = (event, authUser, type) => {
    event.preventDefault();
    props.firebase.items().add({
      text: text,
      userId: authUser.uid,
      userName: authUser.username,
      type: type,
      zipcode: authUser.zipcode,
      createdAt: props.firebase.fieldValue.serverTimestamp(),
    });

    setText('');
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

  let [value, loading, error] = useCollection(query);

  useEffect(() => {
    value &&
      value.docs.forEach((doc) =>
        items.push({ ...doc.data(), uid: doc.id }),
      );
    setItems(items);
  }, [value, items]);

  useEffect(() => {
    const zipcodes = props.zipcodesToSearch;
    const newItems = [];
    if (zipcodes?.length > 0) {
      const idx = lunr(function () {
        this.ref('uid');
        this.field('zipcode');

        items.forEach(function (item) {
          this.add(item);
        }, this);
      });

      zipcodes.map((zipcode) => {
        if (idx.search(zipcode)?.length > 0) {
          newItems.push(idx.search(zipcode));
        }
        return newItems;
      });

      const refs = newItems[0]?.map((item) => item.ref);

      const filteredItems = items?.filter((item) =>
        refs?.includes(item.uid),
      );

      setItems(filteredItems);
    }
  }, [props.zipcodesToSearch, items]);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <ItemInput
            authUser={authUser}
            onCreateItem={onCreateItem}
            onChangeText={onChangeText}
            text={text}
            placeholder={props.placeholder}
            buttonText={props.buttonText}
            type={props.type}
          />
          {loading && <div>Loading ...</div>}
          {error && <div>Error accessing Firestore: {error}</div>}

          {items && (
            <ItemList
              authUser={authUser}
              items={items}
              onEditItem={onEditItem}
              onRemoveItem={onRemoveItem}
              queryKey={props.queryKey}
            />
          )}
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

export default withFirebase(Items);

import React, { useState, useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import ItemList from './ItemList';
import ItemInput from './ItemInput';

const Items = (props) => {
  const authUser = useContext(AuthUserContext);
  const [text, setText] = useState('');
  const items = [];
  const limit = 10;

  let zipcodes = [authUser.zipcode];

  let query = props.firebase.items();
  if (props.zipcodesToSearch && props.zipcodesToSearch.length > 0) {
    zipcodes = props.zipcodesToSearch.slice(0, 9);
    query = query.where('zipcode', 'in', zipcodes);
  }

  console.log(query);

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

  value &&
    value.docs.forEach((doc) =>
      items.push({ ...doc.data(), uid: doc.id }),
    );

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

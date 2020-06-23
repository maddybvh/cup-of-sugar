import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import ItemList from './ItemList';
import ItemInput from './ItemInput';

const Items = (props) => {
  const [text, setText] = useState('');
  const items = [];
  const limit = 5;

  let query = null;
  switch (props.queryKey) {
    case 'myShares':
      query = props.firebase
        .items()
        .where('userId', '==', props.authUser.uid)
        .orderBy('createdAt', 'desc')
        .limit(limit);
      break;
    case 'myRequests':
      query = props.firebase
        .items()
        .where('userId', '==', '123') // @todo
        .orderBy('createdAt', 'desc')
        .limit(limit);
      break;
    case 'allRequests':
      query = props.firebase
        .items()
        .where('userId', '==', '123') // @todo
        .orderBy('createdAt', 'desc')
        .limit(limit);
      break;
    default:
      query = props.firebase
        .items()
        .orderBy('createdAt', 'desc')
        .limit(limit);
      break;
  }

  let [value, loading, error] = useCollection(query);

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

import React, { useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import ItemList from './ItemList';

const Items = (props) => {
  const authUser = useContext(AuthUserContext);
  let items = [];
  const limit = 10;
  const zipcodesFromProps =
    props.zipcodesToSearch?.length > 0
      ? props.zipcodesToSearch
      : ['27707'];

  // Break zip codes into chunks of 10, so they can be queries in Firestore.
  const zipcodes = zipcodesFromProps.reduce((all, one, i) => {
    const ch = Math.floor(i / 10);
    all[ch] = [].concat(all[ch] || [], one);
    return all;
  }, []);

  const getQuery = (queryKey, zipcodes) => {
    let query = props.firebase.items();

    switch (queryKey) {
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
          .where('zipcode', 'in', zipcodes)
          .orderBy('createdAt', 'asc')
          .limit(limit);
        break;
      case 'allOffers':
        query = query
          .where('type', '==', 'offer')
          .where('zipcode', 'in', zipcodes)
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

    return query;
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

  const query = zipcodes.map((zipcode) =>
    getQuery(props.queryKey, zipcode),
  );

  // @todo this is a gross workarround because hooks cannot be called conditionally.
  // This searches up to the nearest 60 zip codes.
  let [value, loading, error] = useCollection(query[0]);
  // eslint-disable-next-line
  let [value1, loading1, error1] = useCollection(query[1]);
  // eslint-disable-next-line
  let [value2, loading2, error2] = useCollection(query[2]);
  // eslint-disable-next-line
  let [value3, loading3, error3] = useCollection(query[3]);
  // eslint-disable-next-line
  let [value4, loading4, error4] = useCollection(query[4]);
  // eslint-disable-next-line
  let [value5, loading5, error5] = useCollection(query[5]);

  value &&
    value.docs.forEach((doc) =>
      items.push({
        ...doc.data(),
        uid: doc.id,
      }),
    );
  value1 &&
    value1.docs.forEach((doc) =>
      items.push({
        ...doc.data(),
        uid: doc.id,
      }),
    );
  value2 &&
    value2.docs.forEach((doc) =>
      items.push({
        ...doc.data(),
        uid: doc.id,
      }),
    );
  value3 &&
    value3.docs.forEach((doc) =>
      items.push({
        ...doc.data(),
        uid: doc.id,
      }),
    );
  value4 &&
    value4.docs.forEach((doc) =>
      items.push({
        ...doc.data(),
        uid: doc.id,
      }),
    );
  value5 &&
    value5.docs.forEach((doc) =>
      items.push({
        ...doc.data(),
        uid: doc.id,
      }),
    );

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
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

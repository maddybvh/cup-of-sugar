import React, { useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

export const Notification = withFirebase(({ firebase }) => {
  const userId = useContext(AuthUserContext).uid;
  const reference = firebase.user(userId);
  // eslint-disable-next-line
  const [user, loading, error] = useDocumentData(reference);
  return (
    <>
      {user?.chatNotificationNum > 0 ? (
        <div className="d-inline ml-1" style={{ color: '#ed6b6b' }}>
          ({user.chatNotificationNum})
        </div>
      ) : (
        ''
      )}
    </>
  );
});

import React from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useDownloadURL } from 'react-firebase-hooks/storage';

import { withFirebase } from '../../Firebase';
import { AuthUserContext } from '../../Session';
import ItemComments from './ItemComments';
import { MessageCta } from '../../Chat/MessageCta';

const ItemPage = (props) => {
  const uid = window.location.pathname.split('/')[2];

  const reference = props.firebase.item(uid);

  const [item, loading, error] = useDocumentDataOnce(reference);

  const [downloadUrl, loadingImage, errorImage] = useDownloadURL(
    item?.image ? props.firebase.image(item.image) : '',
  );

  return (
    <div>
      {item && (
        <>
          <h1>{item.text}</h1>
          <span>
            {item.type === 'request' && (
              <span className="badge badge-info"> {item.type}</span>
            )}
            {item.type === 'offer' && (
              <span className="badge badge-success">{item.type}</span>
            )}
            {item.userName && (
              <span className="badge" style={{ color: 'gray' }}>
                by {item.userName}
              </span>
            )}
            {item.editedAt && (
              <span className="font-weight-light pl-2 pr-2">
                (Edited)
              </span>
            )}
            <MessageCta
              recipientName={item.userName}
              recipientId={item.userId}
            />
          </span>
          {item.description && (
            <div className="mt-4 mb-4">{item.description}</div>
          )}
          {downloadUrl && (
            <img
              src={downloadUrl}
              className="img-fluid m-2"
              alt={item.text}
            />
          )}
          {loadingImage && <div>Image is loading</div>}
          {errorImage && <div>{errorImage}</div>}
        </>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>Error reaching the database: {error}</div>}
      <AuthUserContext.Consumer>
        {(authUser) => <ItemComments uid={uid} authUser={authUser} />}
      </AuthUserContext.Consumer>
    </div>
  );
};

export default withFirebase(ItemPage);

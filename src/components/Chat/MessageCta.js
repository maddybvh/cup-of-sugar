import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

export const MessageCta = ({ recipientName, recipientId }) => (
  <Link
    to={{
      pathname: ROUTES.CHAT,
      state: {
        fromItem: true,
        recipientName: recipientName,
        recipientId: recipientId,
      },
    }}
  >
    <button type="button" className="btn btn-primary float-right">
      Message {recipientName}
    </button>
  </Link>
);

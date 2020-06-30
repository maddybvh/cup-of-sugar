import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

export const MessageCta = (props) => (
  <Link
    to={{
      pathname: ROUTES.CHAT,
      state: { fromItem: true, recipient: props.recipient },
    }}
  >
    <button type="button" className="btn btn-primary float-right">
      Message {props.recipient}
    </button>
  </Link>
);

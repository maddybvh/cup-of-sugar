import React, { useState } from 'react';
import { AuthUserContext } from '../Session';

export const Chat = (props) => {
  const fromItem = props.location.state?.fromItem;
  const recipient = props.location.state?.recipient;

  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // @todo write to firebase
    setText('');
  };
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          <h1>chat</h1>
          <div className="row">
            <div className="col-sm-4">
              <div>Chat list</div>
              {recipient && <div>{recipient}</div>}
            </div>
            <div className="col-sm-8">
              <div
                className="row"
                style={{ background: 'lightblue', minHeight: 200 }}
              >
                chats go here
              </div>
              <form
                className="form-inline mt-2"
                onSubmit={handleSubmit}
              >
                <label htmlFor="chatInput" className="sr-only">
                  New message
                </label>
                <input
                  type="text"
                  className="form-control col-10"
                  id="chatInput"
                  placeholder="Aa"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <div className="col-2">
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

import React, { useState, useContext } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

const InputZipcode = ({ handleChange, handleSubmit, value }) => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleNewZip(authUser, zipcode);
  // };

  // const handleNewZip = (authUser, zipcode) => {
  //   const { uid, ...userSnapshot } = authUser;

  //   props.firebase.user(authUser.uid).update({
  //     ...userSnapshot,
  //     zipcode,
  //     editedAt: props.firebase.fieldValue.serverTimestamp(),
  //   });
  // };
  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <div className="form-group mx-sm-3 mb-2">
        <label htmlFor="zipcode" className="sr-only">
          Zipcode
        </label>
        <input
          id="zip"
          name="zip"
          type="text"
          inputMode="numeric"
          pattern="^(^00000(|-0000))|(\d{5}(|-\d{4}))$"
          className="form-control"
          placeholder="5 digit zip code"
          value={value}
          onChange={handleChange}
        ></input>
      </div>
      <button type="submit" className="btn btn-primary mb-2">
        Go
      </button>
    </form>
  );
};

export default withFirebase(InputZipcode);

import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const ItemInput = ({
  authUser,
  onCreateItem,
  onChangeText,
  text,
  placeholder,
  buttonText,
  type,
}) => {
  return authUser ? (
    <form onSubmit={(event) => onCreateItem(event, authUser, type)}>
      <div className="form-group mt-4 mb-4">
        <div className="row ml-4">
          <div className="col">
            <input
              placeholder={placeholder}
              type="text"
              value={text}
              onChange={onChangeText}
              className="form-control"
              name="item-title"
              aria-label="item title"
            />
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              type="submit"
              aria-label="Submit"
            >
              {buttonText}
              <svg
                className="bi bi-arrow-right-circle-fill ml-2"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  ) : (
    <div></div>
  );
};

export default ItemInput;

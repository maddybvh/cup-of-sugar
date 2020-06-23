import React from 'react';

const ItemInput = ({
  authUser,
  onCreateItem,
  onChangeText,
  text,
}) => {
  return (
    <form onSubmit={(event) => onCreateItem(event, authUser)}>
      <div className="row ml-4">
        <div className="col">
          <input
            placeholder="I'd by happy to share..."
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
            Add offer
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
    </form>
  );
};

export default ItemInput;

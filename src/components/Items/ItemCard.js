import React, { useState } from 'react';

export const ItemCard = (props) => {
  const { authUser, item, onEditItem, onRemoveItem } = props;

  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(item.text);

  const onToggleEditMode = () => {
    setEditMode(!editMode);
    setEditText(item.text);
  };

  const onChangeEditText = (event) => {
    setEditText(event.target.value);
  };

  const onSaveEditText = () => {
    onEditItem(item, editText);
    setEditMode(false);
  };

  return (
    <li className="card mr-3 mt-3">
      <div className="card-body">
        {editMode && item ? (
          <input
            type="text"
            value={editText}
            onChange={onChangeEditText}
          />
        ) : (
          <span>
            {item.type === 'request' && (
              <span className="badge badge-info"> {item.type}</span>
            )}
            {item.type === 'offer' && (
              <span className="badge badge-success">{item.type}</span>
            )}
            <div>{item.text}</div>
            {item.editedAt && (
              <span className="font-weight-light pl-2 pr-2">
                (Edited)
              </span>
            )}
          </span>
        )}
      </div>

      {authUser && authUser.uid === item.userId && (
        <div className="card-footer text-muted text-right p-1">
          <span>
            {editMode ? (
              <span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={onSaveEditText}
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={onToggleEditMode}
                >
                  Undo
                </button>
              </span>
            ) : (
              <button
                className="btn btn-sm btn-outline-secondary ml-1 mr-1"
                onClick={onToggleEditMode}
              >
                <svg
                  className="bi bi-pencil"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"
                  />
                </svg>
              </button>
            )}

            {!editMode && (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger ml-1 mr-1"
                onClick={() => onRemoveItem(item.uid)}
              >
                <svg
                  className="bi bi-trash"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            )}
          </span>
        </div>
      )}
    </li>
  );
};

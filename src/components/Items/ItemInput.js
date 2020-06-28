import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { withFirebase } from '../Firebase';

const ItemInput = ({ authUser, buttonText, firebase }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [radioValue, setRadioValue] = useState('offer');

  const handleSave = () => {
    if (text.length > 0) {
      handleClose();
      addItemToDb();
    } else {
      alert(
        'A short description of your ' + radioValue + ' is required.',
      );
    }
  };

  const addItemToDb = () => {
    firebase.items().add({
      text: text,
      description: description,
      userId: authUser.uid,
      userName: authUser.username,
      type: radioValue,
      zipcode: authUser.zipcode,
      createdAt: firebase.fieldValue.serverTimestamp(),
    });

    setText('');
    setDescription('');
  };

  return authUser ? (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="float-right"
      >
        {buttonText}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="form-group">
              <div className="row">
                <label
                  htmlFor="item-type-toggle"
                  className="mt-2 ml-2 mr-2 lead"
                >
                  Add a new
                </label>
                <ButtonGroup toggle className="mb-2">
                  <ToggleButton
                    key="offer"
                    type="radio"
                    name="radio"
                    value="offer"
                    checked={radioValue === 'offer'}
                    onChange={(e) =>
                      setRadioValue(e.currentTarget.value)
                    }
                  >
                    offer
                  </ToggleButton>
                  <ToggleButton
                    key="request"
                    type="radio"
                    name="radio"
                    value="request"
                    checked={radioValue === 'request'}
                    onChange={(e) =>
                      setRadioValue(e.currentTarget.value)
                    }
                  >
                    request
                  </ToggleButton>
                </ButtonGroup>
                <div className="m-2 lead"> for</div>
              </div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                required
                className="form-control form-control-lg"
                type="text"
                placeholder="A short description"
                onChange={(e) => setText(e.currentTarget.value)}
              ></input>
              <label htmlFor="description" className="mt-4">
                Additional description (optional)
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="8"
                onChange={(e) =>
                  setDescription(e.currentTarget.value)
                }
              ></textarea>
              <label htmlFor="image" className="mt-4">
                Image (optional)
              </label>
              <input
                type="file"
                className="form-control-file"
                id="image"
                onChange={(e) => setImage(e.currentTarget.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="success"
              type="submit"
              onClick={handleSave}
            >
              Save {radioValue}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  ) : (
    <div></div>
  );
};

export default withFirebase(ItemInput);

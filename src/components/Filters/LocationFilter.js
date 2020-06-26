import React, { useState, useContext } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Zipcodes from 'zipcodes';

import { AuthUserContext } from '../Session';
import InputZipcode from './InputZipcode';

export const LocationFilter = ({ setZipCodesToSearch }) => {
  const authUser = useContext(AuthUserContext);

  const [zipcode, setZipcode] = useState(
    authUser.zipcode ? authUser.zipcode : '',
  );
  const [radioValue, setRadioValue] = useState('1');

  // @todo move this to constants
  const radios = [
    { name: '1', value: '1' },
    { name: '5', value: '5' },
    { name: '10', value: '10' },
    { name: '20', value: '20' },
  ];

  const updateZip = (e) => {
    e.preventDefault();
    const zipCodeArray = Zipcodes.radius(zipcode, radioValue);
    setZipCodesToSearch(zipCodeArray);
  };

  const handleChange = (e) => {
    setZipcode(e.target.value);
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.currentTarget.value);
    const zipCodeArray = Zipcodes.radius(
      zipcode,
      e.currentTarget.value,
    );
    setZipCodesToSearch(zipCodeArray);
  };

  return (
    <div className="row">
      <span className="span1 mt-2 mr-2">Show me results within </span>
      <ButtonGroup toggle className="mb-2">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => handleRadioChange(e)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <span className="span1 mt-2 ml-2">miles of </span>
      <InputZipcode
        value={zipcode}
        className="span4"
        handleSubmit={updateZip}
        handleChange={handleChange}
      />
    </div>
  );
};

import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import InputZipcode from './InputZipcode';

export const LocationFilter = () => {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: '1', value: '1' },
    { name: '5', value: '5' },
    { name: '10', value: '10' },
    { name: '20', value: '20' },
    { name: 'any', value: 'any' },
  ];
  const options = [1, 5, 20, 50];

  const handleChange = (e) => {
    console.log(e);
    alert(e);
  };

  return (
    <div className="row">
      <span className="span1 mt-2 mr-2">Show me results within </span>
      <ButtonGroup toggle>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <span className="span1 mt-2 ml-2">miles of </span>
      <InputZipcode className="span4" />
    </div>
  );
};

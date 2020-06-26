import React from 'react';
import { LocationFilter } from './LocationFilter';

const Filters = ({ setZipCodesToSearch }) => (
  <>
    <LocationFilter setZipCodesToSearch={setZipCodesToSearch} />
  </>
);

export default Filters;

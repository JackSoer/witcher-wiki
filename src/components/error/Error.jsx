import React from 'react';
import './error.scss';

const Error = ({ errorText }) => {
  return <div className="error">{errorText}</div>;
};

export default Error;

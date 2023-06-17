import React from 'react';
import './error.scss';

const Error = ({ errorText, className }) => {
  return <div className={className ? className : 'error'}>{errorText}</div>;
};

export default Error;

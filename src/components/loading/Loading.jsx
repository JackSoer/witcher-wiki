import React from 'react';
import './loading.scss';

const Loading = () => {
  return (
    <div className="loading">
      <img
        src="./assets/icons/loading.svg"
        alt="Something went wrong"
        className="loading__icon"
      />
    </div>
  );
};

export default Loading;

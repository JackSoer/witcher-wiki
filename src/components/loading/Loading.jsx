import React from 'react';
import './loading.scss';

const Loading = () => {
  return (
    <div className="loading">
      <img
        src="../public/assets/icons/loading.svg"
        alt="Something went wrong"
        className="loading__icon"
      />
    </div>
  );
};

export default Loading;

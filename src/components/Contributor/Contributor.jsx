import React from 'react';
import './contributor.scss';

import cutString from '../../utils/cutString';

const Contributor = ({ img, username }) => {
  return (
    <div className="contributor">
      <img
        src={img || '../assets/images/default-avatar.webp'}
        alt="Something went wrong..."
        className="contributor__img"
        loading="lazy"
      />
      <p className="contrubutor__username">{cutString(username, 8)}</p>
    </div>
  );
};

export default Contributor;

import React from 'react';
import { Link } from 'react-router-dom';

import './catItem.scss';

const CatItem = ({ img, title, id }) => {
  return (
    <Link to={`/${id}`}>
      <div className="cat-item">
        <img
          src={img}
          alt="Something went wrong"
          className="cat-item__img"
          loading="lazy"
        />
        <h3 className="cat-item__title">{title}</h3>
      </div>
    </Link>
  );
};

export default CatItem;

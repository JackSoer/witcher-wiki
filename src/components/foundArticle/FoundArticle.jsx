import React from 'react';
import './foundArticle.scss';
import { Link } from 'react-router-dom';

const FoundArticle = ({ title, img, id }) => {
  return (
    <div className="found-article">
      <Link to={`/${id}`}>
        <img
          src={img}
          alt="Something went wrong"
          className="found-article__img"
          loading="lazy"
        />
        <h4 className="found-article__title">{title}</h4>
      </Link>
    </div>
  );
};

export default FoundArticle;

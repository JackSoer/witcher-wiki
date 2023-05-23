import React from 'react';
import './foundArticle.scss';
import { Link } from 'react-router-dom';

const FoundArticle = ({ title, img }) => {
  return (
    <div className="found-article">
      <Link to={`/${title}`}>
        <img
          src={img}
          alt="Something went wrong"
          className="found-article__img"
        />
        <h4 className="found-article__title">{title}</h4>
      </Link>
    </div>
  );
};

export default FoundArticle;

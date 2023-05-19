import React from 'react';
import { Link } from 'react-router-dom';
import './articleCard.scss';

const ArticleCard = ({ title, image }) => {
  return (
    <Link to={`/${title}`}>
      <div className="article-card">
        <img
          src={image}
          alt="Something went wrong"
          className="article-card__img"
        />
        <h3 className="article-card__title">{title}</h3>
      </div>
    </Link>
  );
};

export default ArticleCard;

import React from 'react';
import './foundArticles.scss';

import FoundArticle from '../foundArticle/FoundArticle';

const FoundArticles = ({ foundArticles }) => {
  return (
    <div className="found-articles">
      {foundArticles.map((foundArticle) => (
        <FoundArticle
          img={foundArticle.mainImage}
          title={foundArticle.title}
          key={foundArticle.id}
          id={foundArticle.id}
        />
      ))}
    </div>
  );
};

export default FoundArticles;

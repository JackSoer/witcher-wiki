import React, { useContext } from 'react';
import './foundArticle.scss';
import { Link } from 'react-router-dom';
import SearchContext from '../../context/SearchContext';

const FoundArticle = ({ title, img }) => {
  const { setSearch } = useContext(SearchContext);

  const handleClick = () => {
    setSearch('');
  };

  return (
    <div className="found-article">
      <Link to={`/${title}`} onClick={handleClick}>
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

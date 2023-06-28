import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ArticlesContext from '../../context/ArticlesContext';
import './cats.scss';

const Cats = () => {
  const { categories } = useContext(ArticlesContext);

  return (
    <ul className="cats-list">
      {categories?.map((cat) => (
        <li className="cats-list__item" key={cat.id}>
          <Link to={`/${cat.title}`}>{cat.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Cats;

import React from 'react';
import { Link } from 'react-router-dom';

import './cat.scss';

const Cat = ({ title, isOpen }) => {
  return (
    <div className={isOpen ? 'cat cat--active' : 'cat'}>
      <Link to={`/${title}`}>{title}</Link>
    </div>
  );
};

export default Cat;

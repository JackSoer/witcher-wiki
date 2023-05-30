import React from 'react';
import { Link } from 'react-router-dom';

import './cat.scss';

const Cat = ({ title }) => {
  return (
    <div className="cat">
      <Link to={`/${title}`}>{title}</Link>
    </div>
  );
};

export default Cat;

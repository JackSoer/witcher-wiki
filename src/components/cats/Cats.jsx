import React, { useState } from 'react';
import './cats.scss';

import Cat from '../cat/Cat';

const Cats = ({ cats }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="cats">
        <button className="cats__menu" onClick={handleClick}>
          <span className="cats__btn">Categories</span>
          <img
            src="./assets/icons/arrow.svg"
            alt="Something went wrong"
            className={
              isOpen ? 'cats__btn-img cats__btn-img--active' : 'cats__btn-img'
            }
          />
        </button>
      </div>
      <div
        className={
          isOpen ? 'cats-content cats-content--active' : 'cats-content'
        }
      >
        {cats.map((cat) => (
          <Cat title={cat.title} isOpen={isOpen} key={cat.id} />
        ))}
      </div>
    </>
  );
};

export default Cats;

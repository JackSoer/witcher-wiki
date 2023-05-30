import React, { useState } from 'react';
import './dropdown.scss';

const Dropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="dropdown">
        <button className="dropdown__menu" onClick={handleClick}>
          <span className="dropdown__btn">{title}</span>
          <img
            src="./assets/icons/arrow.svg"
            alt="Something went wrong"
            className={
              isOpen
                ? 'dropdown__btn-img dropdown__btn-img--active'
                : 'dropdown__btn-img'
            }
          />
        </button>
      </div>
      <div
        className={
          isOpen
            ? 'dropdown-content dropdown-content--active'
            : 'dropdown-content'
        }
      >
        {children}
      </div>
    </>
  );
};

export default Dropdown;

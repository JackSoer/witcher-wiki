import React from 'react';
import AuthBtns from '../authBtns/AuthBtns';
import Cats from '../cats/Cats';
import './sidebar.scss';

const Sidebar = ({ setIsOpen, isOpen }) => {
  return (
    <nav className={isOpen ? 'sidebar sidebar--open' : 'sidebar'}>
      <button
        className="sidebar__close-btn-box"
        onClick={() => setIsOpen(false)}
      >
        <div className="sidebar__close-btn"></div>
      </button>
      <ul className="sidebar__list">
        <li className="sidebar__list-item">
          <Cats />
        </li>
        <li className="sidebar__list-item">
          <AuthBtns />
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;

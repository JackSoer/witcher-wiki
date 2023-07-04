import React, { useContext, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import SearchContext from '../../context/SearchContext';
import WindowSizeContext from '../../context/WindowSizeContext';
import AuthBtns from '../authBtns/AuthBtns';
import Cats from '../cats/Cats';
import './sidebar.scss';

const Sidebar = () => {
  const { windowSize } = useContext(WindowSizeContext);
  const { currentUser } = useContext(AuthContext);
  const { isOpen, setIsOpen } = useContext(SearchContext);

  const { pathname } = useLocation();

  const sidebarRef = useRef(null);

  useEffect(() => {
    if (windowSize.width > 1041) {
      setIsOpen(false);
    }
  }, [windowSize]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClose = (e) => {
      if (!sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClose);

    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <div className="sidebar-container" ref={sidebarRef}>
      <button
        className="header__menu-btn-box"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="header__menu-btn"></div>
      </button>
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
          {!currentUser && (
            <li className="sidebar__list-item">
              <AuthBtns />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.scss';
import { signOut } from 'firebase/auth';
import Nav from '../nav/Nav';
import AuthContext from '../../context/AuthContext';
import { auth } from '../../config/firebase';
import Notifications from '../notifications/Notifications';
import AuthBtns from '../authBtns/AuthBtns';
import Sidebar from '../sidebar/Sidebar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const userRef = useRef(null);

  const { currentUser, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch({ type: 'LOGOUT' });

    navigate('/');
  };

  const handleUserMenuClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClose = (e) => {
      if (!userRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClose);

    return () => document.removeEventListener('click', handleClose);
  }, []);

  return (
    <header className="header">
      <Link to="/">
        <img
          src="../assets/icons/witcher-medalion.png"
          alt="Something went wrong"
          className="header__logo"
          loading="lazy"
        />
      </Link>
      <Nav />
      {!currentUser ? (
        <AuthBtns />
      ) : (
        <>
          <Notifications />
          <div
            className="header__user user"
            onClick={handleUserMenuClick}
            ref={userRef}
          >
            <div
              className={
                isOpen ? 'user__info user__info--active' : 'user__info'
              }
            >
              <div className="user__avatar">
                <img
                  src={
                    currentUser.img || '../assets/images/default-avatar.webp'
                  }
                  alt="Error..."
                  className="user__avatar-item"
                  loading="lazy"
                />
                <img
                  src="../assets/icons/avatar-border.png"
                  alt="Error..."
                  className="user__avatar-border"
                  loading="lazy"
                />
              </div>
              <p className="user__name">{currentUser.username}</p>
            </div>
            <div
              className={
                isOpen ? 'user__menu user__menu--active' : 'user__menu'
              }
            >
              <ul className="user__menu-list">
                {currentUser?.isAdmin && (
                  <li className="user__menu-list-item">
                    <Link to="/suggested-articles">Suggesed Articles</Link>
                  </li>
                )}
                <li className="user__menu-list-item">
                  <Link to="/my-articles">My Articles</Link>
                </li>
                <li className="user__menu-list-item">
                  <Link to="/add-article">Add Article</Link>
                </li>
                <li className="user__menu-list-item">
                  <button className="user__logout" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      <Sidebar />
    </header>
  );
};

export default Header;

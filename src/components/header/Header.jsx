import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.scss';
import { signOut } from 'firebase/auth';
import Nav from '../nav/Nav';
import AuthContext from '../../context/AuthContext';
import { auth } from '../../config/firebase';

const Header = () => {
  const { currentUser, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch({ type: 'LOGOUT' });

    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/">
        <img
          src="./assets/icons/witcher-medalion.png"
          alt="Something went wrong"
          className="header__logo"
        />
      </Link>
      <Nav />
      {!currentUser ? (
        <div className="header__acc-btns acc-btns">
          <Link to="/login">
            <button className="acc-btns__sign-in">Sign In</button>
          </Link>
          <Link to="/register">
            <button className="acc-btns__sign-up">Sign Up</button>
          </Link>
        </div>
      ) : (
        <div className="header__user user">
          <div className="user__info">
            <div className="user__avatar">
              <img
                src={currentUser.img || './assets/images/default-avatar.webp'}
                alt="Error..."
                className="user__avatar-item"
              />
              <img
                src="./assets/icons/avatar-border.png"
                alt="Error..."
                className="user__avatar-border"
              />
            </div>
            <p className="user__name">{currentUser.username}</p>
          </div>
          <div className="user__menu">
            <ul className="user__menu-list">
              {currentUser.isAdmin && (
                <>
                  <li className="user__menu-list-item">
                    <Link to="/">My Articles</Link>
                  </li>
                  <li className="user__menu-list-item">
                    <Link to="/add-article">Add Article</Link>
                  </li>
                </>
              )}
              <li className="user__menu-list-item">
                <button className="user__logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

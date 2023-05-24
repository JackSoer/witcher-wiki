import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

import Nav from '../nav/Nav';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
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
      <div className="header__acc-btns acc-btns">
        <Link to="/login">
          <button className="acc-btns__sign-in">Sign In</button>
        </Link>
        <Link to="/register">
          <button className="acc-btns__sign-up">Sign Up</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;

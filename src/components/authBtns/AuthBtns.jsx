import React from 'react';
import { Link } from 'react-router-dom';
import './authBtns.scss';

const AuthBtns = () => {
  return (
    <div className="acc-btns">
      <Link to="/login">
        <button className="acc-btns__sign-in">Sign In</button>
      </Link>
      <Link to="/register">
        <button className="acc-btns__sign-up">Sign Up</button>
      </Link>
    </div>
  );
};

export default AuthBtns;

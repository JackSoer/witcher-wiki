import React from 'react';
import './authForm.scss';
import { Link } from 'react-router-dom';

const AuthForm = ({ isRegister, handleSubmit }) => {
  return (
    <div className="auth-form">
      <form className="auth-form__item">
        <h1 className="auth-form__title">
          <img
            src="./assets/icons/witcher-medalion.png"
            alt="Something went wrong"
            className="auth-form__logo"
          />
          {isRegister ? 'SIGN UP' : 'SIGN IN'}
        </h1>
        <input type="email" className="auth-form__email" placeholder="Email" />
        <input
          type="password"
          className="auth-form__password"
          placeholder="Password"
        />
        {isRegister && (
          <>
            <input
              type="file"
              className="auth-form__file"
              id="file"
              accept="image/*"
            />
            <label htmlFor="file">
              <img
                src="./assets/icons/plus.png"
                alt="Something went wrong"
                className="auth-form__file-icon"
              />
              <span>Add an avatar</span>
            </label>
          </>
        )}
        <Link to="/">
          <button
            className="auth-form__submit"
            // onClick={}
            type="submit"
          >
            {isRegister ? 'SIGN UP NOW' : 'SIGN IN NOW'}
          </button>
        </Link>
        <footer className="auth-form__extra-info">
          {!isRegister ? (
            <p>
              You don't have an account? <Link to="/register">Sign up now</Link>
            </p>
          ) : (
            <p>
              You already have an account? <Link to="/login">Sign in now</Link>
            </p>
          )}
        </footer>
      </form>
    </div>
  );
};

export default AuthForm;

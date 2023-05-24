import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import AuthContext from '../../context/AuthContext';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import AddFile from '../../components/addFile/AddFile';
import Error from '../../components/error/Error';

const Register = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      await setDoc(doc(db, 'Users', user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      dispatch({ type: 'LOGIN', payload: user });

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleError = () => {
    let errorMsg;

    if (error.includes('auth/weak-password')) {
      errorMsg = 'Password should be at least 6 characters';
    } else if (error.includes('auth/email-already-in-use')) {
      errorMsg = 'An account with this email already exist';
    } else {
      errorMsg = error;
    }

    return errorMsg;
  };

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  return (
    <div className="register">
      <Form handleSubmit={handleRegister}>
        <h1 className="auth-form__title">
          <img
            src="./assets/icons/witcher-medalion.png"
            alt="Something went wrong"
            className="auth-form__logo"
          />
          SIGN UP
        </h1>
        <Input
          required
          id="username"
          type="text"
          placeholder="Username"
          onChange={handleInput}
        />
        <Input
          required
          id="email"
          type="email"
          placeholder="Email"
          onChange={handleInput}
        />
        <Input
          required
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleInput}
        />
        {/* <AddFile title="Add an avatar" handleInput={handleInput} /> */}
        <button className="auth-form__submit" type="submit">
          SIGN UP NOW
        </button>
        {error && <Error errorText={handleError(error)} />}
        <footer className="auth-form__extra-info">
          <p>
            You already have an account? <Link to="/login">Sign in now</Link>
          </p>
        </footer>
      </Form>
    </div>
  );
};

export default Register;

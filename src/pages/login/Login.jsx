import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import AuthContext from '../../context/AuthContext';
import getDocById from '../../utils/getDocById';

import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import Error from '../../components/error/Error';

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      const user = await getDocById('Users', userId);
      dispatch({ type: 'LOGIN', payload: user });

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <Form handleSubmit={handleLogin}>
        <h1 className="auth-form__title">
          <img
            src="./assets/icons/witcher-medalion.png"
            alt="Something went wrong"
            className="auth-form__logo"
            loading="lazy"
          />
          SIGN IN
        </h1>
        <Input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-form__submit" type="submit">
          SIGN IN NOW
        </button>
        {error && <Error errorText="Wrong email or password" />}
        <footer className="auth-form__extra-info">
          <p>
            You don't have an account? <Link to="/register">Sign up now</Link>
          </p>
        </footer>
      </Form>
    </div>
  );
};

export default Login;

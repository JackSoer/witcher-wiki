import React from 'react';
import './login.scss';

import AuthForm from '../../components/authForm/AuthForm';

const Login = () => {
  return (
    <div className="login">
      <AuthForm isRegister={false} />
    </div>
  );
};

export default Login;

import React from 'react';
import './register.scss';

import AuthForm from '../../components/authForm/AuthForm';

const Register = () => {
  return (
    <div className="register">
      <AuthForm isRegister={true} />
    </div>
  );
};

export default Register;

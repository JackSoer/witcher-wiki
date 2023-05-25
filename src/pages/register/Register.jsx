import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import AuthContext from '../../context/AuthContext';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import useUploadFile from '../../hooks/useUploadFile';
import registerInputs from '../../data/formSources/register';

import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import AddFile from '../../components/addFile/AddFile';
import Error from '../../components/error/Error';

const Register = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState({});
  const [file, setFile] = useState('');

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const { uploadError, downloadUrl, isLoading } = useUploadFile(
    file,
    'images/avatars/'
  );

  useEffect(() => {
    setData((prev) => ({ ...prev, img: downloadUrl }));
  }, [downloadUrl]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const userData = {
        ...data,
        timeStamp: serverTimestamp(),
      };

      await setDoc(doc(db, 'Users', user.uid), userData);
      dispatch({ type: 'LOGIN', payload: userData });

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
        {registerInputs.map((registerInput) => (
          <Input
            required={registerInput.required}
            id={registerInput.id}
            key={registerInput.id}
            type={registerInput.type}
            placeholder={registerInput.placeholder}
            onChange={handleInput}
          />
        ))}
        <AddFile
          title="Add an avatar"
          file={file}
          isLoading={isLoading}
          uploadError={uploadError}
        >
          <Input
            type="file"
            id="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </AddFile>
        <button
          className="auth-form__submit"
          type="submit"
          disabled={isLoading}
        >
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

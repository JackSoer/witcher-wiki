import React from 'react';
import './form.scss';

const Form = ({ children, handleSubmit }) => {
  return (
    <div className="form">
      <form className="form__item" onSubmit={handleSubmit}>
        {children}
      </form>
    </div>
  );
};

export default Form;

import React, { useState } from 'react';
import './input.scss';

const Input = (props) => {
  const { errorMsg, ...attributes } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    errorMsg && setFocused(true);
  };

  return (
    <div className="input-box">
      <input
        focused={focused.toString()}
        className="form-input"
        {...attributes}
        onBlur={handleFocus}
      />
      <p className="validation-error">{errorMsg}</p>
    </div>
  );
};

export default Input;

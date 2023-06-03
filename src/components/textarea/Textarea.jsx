import React, { useState } from 'react';
import './textarea.scss';

const Textarea = (props) => {
  const { errorMsg, isValidate, ...attributes } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    errorMsg && setFocused(true);
  };

  return (
    <div className="textarea-box">
      <textarea
        focused={focused.toString()}
        {...attributes}
        onBlur={handleFocus}
      />
      {!isValidate && focused && (
        <p className="textarea-validation-error">{errorMsg}</p>
      )}
    </div>
  );
};

export default Textarea;

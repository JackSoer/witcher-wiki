import React from 'react';
import './addFile.scss';

import Input from '../input/Input';

const AddFile = ({ title, handleInput }) => {
  return (
    <div className="add-file">
      <Input
        type="file"
        id="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleInput}
      />
      <label htmlFor="file">
        <img
          src="./assets/icons/plus.png"
          alt="Something went wrong"
          className="add-file__add-icon"
        />
        <span>{title}</span>
      </label>
    </div>
  );
};

export default AddFile;

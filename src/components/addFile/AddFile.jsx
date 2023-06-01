import React from 'react';
import './addFile.scss';

import Error from '../error/Error';

const AddFile = (props) => {
  const { title, children, file, isLoading, uploadError } = props;
  return (
    <div className="add-file">
      {children}
      <label htmlFor="file">
        <img
          src="../public/assets/icons/plus.png"
          alt="Something went wrong"
          className="add-file__add-icon"
        />
        {!uploadError ? (
          <span>{file && !isLoading ? file.name : title}</span>
        ) : (
          <Error errorText={uploadError} />
        )}
      </label>
    </div>
  );
};

export default AddFile;

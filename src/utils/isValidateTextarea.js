const isValidateTextarea = (textareaValue) => {
  const minLength = 10;
  const maxLength = 5000;

  const trimmedValue = textareaValue.trim();
  const length = trimmedValue.length;

  if (length >= minLength && length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

export default isValidateTextarea;

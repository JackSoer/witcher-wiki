const cutString = (string, resultLength) => {
  if (string.length <= resultLength) {
    return string;
  }

  const newStr = string.slice(0, resultLength) + '...';

  return newStr;
};

export default cutString;

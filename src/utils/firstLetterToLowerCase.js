const firstLetterToLowerCase = (word) => {
  const newWord = word[0].toLowerCase() + word.slice(1);

  return newWord;
};

export default firstLetterToLowerCase;

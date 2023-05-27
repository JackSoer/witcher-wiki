const handleInput = (e, setFunc) => {
  const value = e.target.value;
  const id = e.target.id;

  if (id === 'username' && value.length > 20) {
    return;
  }

  setFunc((prev) => ({ ...prev, [id]: value }));
};

export default handleInput;

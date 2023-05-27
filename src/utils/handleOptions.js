const handleOptions = (e, setFunc) => {
  const id = e.target.id;
  const options = Array.from(e.target.options);

  const selectedOptions = options.filter((option) => option.selected);
  const values = selectedOptions.map((selectedOption) => selectedOption.id);

  setFunc((prev) => ({ ...prev, [id]: values }));
};

export default handleOptions;

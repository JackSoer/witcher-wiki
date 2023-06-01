import React, { useEffect, useState } from 'react';
import './selectItem.scss';

const SelectItem = (props) => {
  const { setFunc, title, name, value, defValues } = props;
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    if (defValues?.includes(title)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [defValues]);

  useEffect(() => {
    if (active) {
      setFunc((prev) => ({ ...prev, [name]: [...prev[name], value] }));
    } else {
      setFunc((prev) => ({
        ...prev,
        [name]: [...prev[name]].filter((item) => item !== value),
      }));
    }
  }, [active]);

  return (
    <div
      className={active ? 'select-item select-item--active' : 'select-item'}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

export default SelectItem;

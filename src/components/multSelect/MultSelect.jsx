import React from 'react';
import './multSelect.scss';

import SelectItem from '../selectItem/SelectItem';

const MultSelect = ({ items, id, setFunc }) => {
  return (
    <div className="multi-select">
      {items.map((item) => (
        <SelectItem
          key={item.id}
          value={item.id}
          name={id}
          title={item.title}
          setFunc={setFunc}
        />
      ))}
    </div>
  );
};

export default MultSelect;

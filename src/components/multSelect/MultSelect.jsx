import React from 'react';
import './multSelect.scss';

import SelectItem from '../selectItem/SelectItem';

const MultSelect = (props) => {
  const { items, id, setFunc, defValues } = props;

  return (
    <div className="multi-select">
      {items.map((item) => (
        <SelectItem
          key={item.id}
          value={item.id}
          name={id}
          title={item.title}
          setFunc={setFunc}
          defValues={defValues}
        />
      ))}
    </div>
  );
};

export default MultSelect;

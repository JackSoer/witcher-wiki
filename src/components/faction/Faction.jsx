import React from 'react';
import './faction.scss';

const Faction = ({ faction }) => {
  return (
    <div className="faction">
      <button className="faction__btn">
        <img
          src={`./assets/icons/${faction}.png`}
          alt="Something went wrong"
          className="faction__icon"
        />
      </button>
      <div className="faction__tooltip">{faction}</div>
    </div>
  );
};

export default Faction;

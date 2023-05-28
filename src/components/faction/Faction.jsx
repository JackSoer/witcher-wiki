import React, { useContext } from 'react';
import FilterContext from '../../context/FilterContext';
import './faction.scss';

const Faction = ({ factionTitle }) => {
  const { faction, setFaction } = useContext(FilterContext);

  const isCurrentFaction = faction === factionTitle;

  const handleChangeFaction = () => {
    if (isCurrentFaction) {
      setFaction('');
    } else {
      setFaction(factionTitle);
    }
  };

  return (
    <div className="faction">
      <button
        className={
          isCurrentFaction
            ? 'faction__btn faction__btn--active'
            : 'faction__btn'
        }
        onClick={handleChangeFaction}
        type="button"
      >
        <img
          src={
            isCurrentFaction
              ? `./assets/icons/${factionTitle}-active.png`
              : `./assets/icons/${factionTitle}.png`
          }
          alt="Something went wrong"
          className="faction__icon"
        />
      </button>
      <div className="faction__tooltip">{factionTitle}</div>
    </div>
  );
};

export default Faction;

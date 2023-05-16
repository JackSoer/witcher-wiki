import React from 'react';
import useFetchFactions from '../../hooks/useFetchFactions';
import './factionsFilter.scss';

import Faction from '../../components/faction/Faction';

const FactionsFilter = () => {
  const { factions, isLoading, fetchError } = useFetchFactions();

  return (
    <div className="faction-filter">
      {!isLoading &&
        !fetchError &&
        factions.map((faction) => (
          <Faction factionTitle={faction.title} key={faction.id} />
        ))}
    </div>
  );
};

export default FactionsFilter;

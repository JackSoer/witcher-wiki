import React from 'react';
import useFetchFactions from '../../hooks/useFetchFactions';
import './factionsFilter.scss';

import Faction from '../../components/faction/Faction';
import Loading from '../loading/Loading';
import Error from '../error/Error';

const FactionsFilter = () => {
  const { factions, isLoading, fetchError } = useFetchFactions();

  return (
    <div className="faction-filter">
      {!isLoading &&
        !fetchError &&
        factions.map((faction) => (
          <Faction faction={faction.title} key={faction.id} />
        ))}
      {isLoading && !fetchError && <Loading />}
      {fetchError && !isLoading && <Error errorText={fetchError} />}
    </div>
  );
};

export default FactionsFilter;

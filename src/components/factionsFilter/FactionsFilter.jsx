import React from 'react';
import './factionsFilter.scss';

import Faction from '../../components/faction/Faction';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';

const FactionsFilter = () => {
  const { data, isLoading, fetchError } = useFetchDocsFromColl('Fractions');

  return (
    <div className="faction-filter">
      {!isLoading &&
        !fetchError &&
        data.map((faction) => (
          <Faction factionTitle={faction.title} key={faction.id} />
        ))}
    </div>
  );
};

export default FactionsFilter;

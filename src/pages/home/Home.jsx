import React, { useContext } from 'react';
import './home.scss';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';
import ArticlesContext from '../../context/ArticlesContext';

import CatSection from '../../components/catSection/CatSection';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const Home = () => {
  const { data, isLoading, fetchError } = useFetchDocsFromColl('Users');
  const { articles } = useContext(ArticlesContext);

  return (
    <div className="home">
      <h1 className="home__title">
        Welcome to the witcher wiki!
        <span className="home__subtitle">
          Explore the witcher universe with us!
        </span>
      </h1>
      {!isLoading && !fetchError && (
        <div className="home__stat">
          <div className="home__stat-item">
            <p className="home__stat-item-num">{data.length}</p>
            <h2 className="home__stat-item-title">Users</h2>
          </div>
          <div className="home__stat-item">
            <p className="home__stat-item-num">{articles.length}</p>
            <h2 className="home__stat-item-title">Articles</h2>
          </div>
        </div>
      )}
      {isLoading && !fetchError && <Loading />}
      {!isLoading && fetchError && <Error errorText={fetchError} />}
      <CatSection title="Characters" />
      <CatSection title="Locations" />
      <CatSection title="Bestiary" />
    </div>
  );
};

export default Home;

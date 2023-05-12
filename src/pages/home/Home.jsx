import React from 'react';
import './home.scss';

import CatSection from '../../components/catSection/CatSection';

const Home = () => {
  return (
    <div className="home">
      <h1 className="home__title">
        Welcome to the witcher wiki!
        <span className="home__subtitle">
          Explore the witcher universe with us!
        </span>
      </h1>
      <CatSection title="Characters" />
      <CatSection title="Locations" />
      <CatSection title="Bestiary" />
    </div>
  );
};

export default Home;

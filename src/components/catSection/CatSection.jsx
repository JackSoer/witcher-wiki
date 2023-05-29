import React from 'react';
import { Link } from 'react-router-dom';
import './catSection.scss';
import useFetchArticlesByCat from '../../hooks/useFetchArticlesByCat.js';
import firstLetterToLowerCase from '../../utils/firstLetterToLowerCase';

import CatSlider from '../catSlider/CatSlider';
import Loading from '../loading/Loading';
import Error from '../error/Error';

const CatSection = ({ title }) => {
  const { articles, isLoading, fetchError } = useFetchArticlesByCat(title);

  return (
    <section className="home__cat-section cat-section">
      <div className="container">
        <Link to={`/${firstLetterToLowerCase(title)}`}>
          <h2 className="cat-section__title">{title}</h2>
        </Link>
        {!isLoading && !fetchError && (
          <CatSlider catItems={articles.slice(0, 6).reverse()} />
        )}
        {isLoading && !fetchError && <Loading />}
        {fetchError && !isLoading && <Error errorText={fetchError} />}
        <button className="cat-section__read-more-btn">
          <Link to={`/${firstLetterToLowerCase(title)}`}>{'Read More ->'}</Link>
        </button>
      </div>
    </section>
  );
};

export default CatSection;

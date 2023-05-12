import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getArticlesByCat from '../../utils/getArticlesByCat.js';
import './catSection.scss';

import CatSlider from '../catSlider/CatSlider';

const CatSection = ({ title }) => {
  const [catSliderArticles, setCatSliderArticles] = useState([]);

  useEffect(() => {
    const getSliderArticles = async () => {
      const articles = await getArticlesByCat(title);
      const sliderArticles = articles.slice(0, 6);

      setCatSliderArticles(sliderArticles);
    };

    getSliderArticles();
  }, []);

  return (
    <section className="home__cat-section cat-section">
      <div className="container">
        <Link to="/">
          <h2 className="cat-section__title">{title}</h2>
        </Link>
        <CatSlider catItems={catSliderArticles} />
        <button className="cat-section__read-more-btn">
          <Link to="">{'Read More ->'}</Link>
        </button>
      </div>
    </section>
  );
};

export default CatSection;

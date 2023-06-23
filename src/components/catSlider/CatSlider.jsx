import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './catSlider.scss';

import CatItem from '../catItem/CatItem';

const CatSlider = ({ catItems }) => {
  return (
    <div className="slider">
      <Slider slidesToShow={4} dots={true}>
        {catItems.map((item) => (
          <CatItem
            img={item.mainImage}
            title={item.title}
            key={item.id}
            id={item.id}
          />
        ))}
      </Slider>
    </div>
  );
};

export default CatSlider;

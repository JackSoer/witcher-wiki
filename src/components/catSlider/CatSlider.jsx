import React, { useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './catSlider.scss';

import CatItem from '../catItem/CatItem';
import WindowSizeContext from '../../context/WindowSizeContext';

const CatSlider = ({ catItems }) => {
  const { windowSize } = useContext(WindowSizeContext);

  const getSlidesToShow = () => {
    if (windowSize.width <= 500) {
      return 1;
    } else if (windowSize.width <= 800) {
      return 2;
    } else if (windowSize.width <= 1000) {
      return 3;
    } else {
      return 4;
    }
  };

  return (
    <div className="slider">
      <Slider slidesToShow={getSlidesToShow()} dots={true}>
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

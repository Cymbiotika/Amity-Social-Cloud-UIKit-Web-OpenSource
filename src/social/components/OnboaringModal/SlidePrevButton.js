// some-inner-component.jsx
import { React } from 'react';
import { useSwiper } from 'swiper/react';

const SlidePrevButton = ({ prevText }) => {
  const swiper = useSwiper();

  return (
    <button type="button" onClick={() => swiper.slidePrev()}>
      {prevText}
    </button>
  );
};

export default SlidePrevButton;

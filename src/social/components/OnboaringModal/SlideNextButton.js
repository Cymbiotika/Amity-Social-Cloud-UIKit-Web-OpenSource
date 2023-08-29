// some-inner-component.jsx
import { React } from 'react';
import { useSwiper } from 'swiper/react';

const SlideNextButton = ({ nextText }) => {
  const swiper = useSwiper();

  return (
    <button
      className="py-[6px] max-w-[296px] bg-cym-darkteal text-[16px] leading-[140%] font-mon uppercase text-white rounded-full"
      type="button"
      onClick={() => swiper.slideNext()}
    >
      {nextText}
    </button>
  );
};

export default SlideNextButton;

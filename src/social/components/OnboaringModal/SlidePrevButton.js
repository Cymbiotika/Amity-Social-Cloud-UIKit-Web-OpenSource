// some-inner-component.jsx
import { React } from 'react';
import { useSwiper } from 'swiper/react';

const SlidePrevButton = ({ prevText }) => {
  const swiper = useSwiper();

  return (
    <button
      className="mx-auto py-[6px] w-[260px] md:w-[296px] text-[16px] leading-[140%] font-mon uppercase text-cym-teal rounded-full border border-cym-teal"
      type="button"
      onClick={() => swiper.slidePrev()}
    >
      {prevText}
    </button>
  );
};

export default SlidePrevButton;

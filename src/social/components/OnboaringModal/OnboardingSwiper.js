import React from 'react';
import styled from 'styled-components';
// import Swiper core and required modules
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import SlidePrevButton from './SlidePrevButton';
import SlideNextButton from './SlideNextButton';

const TextWrapper = styled.div`
  text-align: center;
`;

const OnboardingSwiper = ({ setOpen }) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, A11y]}
      pagination
      spaceBetween={50}
      slidesPerView={1}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <TextWrapper>
          <h2 className="font-ivy text-[40px]">Welcome to the Arise Community!</h2>
          <p>Let&lsquo;s start with a quick tour!</p>
          <p>We&lsquo;ll have you up and running in no time.</p>
          <div className="grid grid-cols-2 gap-5 my-[48px]">
            <button type="button" onClick={() => setOpen(false)}>
              Not Now
            </button>
            <SlideNextButton nextText={'Get Started'} />
          </div>
        </TextWrapper>
      </SwiperSlide>
      <SwiperSlide>
        <TextWrapper>
          <div className="grid grid-cols-2 gap-5 my-[48px]">
            <SlidePrevButton prevText={'Back'} />
            <SlideNextButton nextText={'Next'} />
          </div>
        </TextWrapper>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-200px">
          Slide 3
          <div className="grid grid-cols-2 gap-5 my-[48px]">
            <SlidePrevButton prevText={'Back'} />
            <SlideNextButton nextText={'Next'} />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-200px">Slide 4</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default OnboardingSwiper;

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

import WelcomeSvg from './assets/Welcome';
import BioSvg from './assets/Bio';
import JoinGroups from './assets/JoinGroups';
import DoneSvg from './assets/Done';

const TextWrapper = styled.div`
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 22px;
  margin: 48px auto;
  width: max-content;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 32px;
    grid-row-gap: 0px;
  }
`;

const OnboardingSwiper = ({ setOpen }) => {
  const handleModalOnboardingComplete = () => {
    setOpen(false);
    const localStorageKey = 'onboardingComplete';
    const localStorageValue = 'true';
    localStorage.setItem(localStorageKey, localStorageValue);
  };
  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, A11y]}
      pagination
      spaceBetween={50}
      slidesPerView={1}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      style={{
        '--swiper-pagination-color': '#005850',
      }}
    >
      <SwiperSlide>
        <TextWrapper>
          <WelcomeSvg />
          <h2 className="mb-[28px] text-[28px] md:text-[40px] leading-[140%] font-ivy">
            Welcome to the Arise Community!
          </h2>
          <p className="font-ter text-[16px] md:text-[20px]">
            Let&lsquo;s start with a quick tour!
          </p>
          <p className="font-ter text-[16px] md:text-[20px]">
            We&lsquo;ll have you up and running in no time.
          </p>
          <ButtonContainer>
            <button
              className="mx-auto py-[6px] w-[260px] md:w-[296px] text-[16px] leading-[140%] font-mon uppercase text-cym-teal rounded-full border border-cym-teal"
              type="button"
              onClick={() => setOpen(false)}
            >
              Show Me Later
            </button>
            <SlideNextButton nextText={'Get Started'} />
          </ButtonContainer>
        </TextWrapper>
      </SwiperSlide>
      <SwiperSlide>
        <TextWrapper>
          <BioSvg />
          <h2 className="mb-[28px] text-[28px] md:text-[40px] leading-[140%] font-ivy">
            Share more about yourself
          </h2>
          <p className="font-ter text-[16px] md:text-[20px]">
            Choose your profile picture and write a bio.
          </p>
          <ButtonContainer>
            <SlidePrevButton prevText={'Back'} />
            <SlideNextButton nextText={'Next'} />
          </ButtonContainer>
        </TextWrapper>
      </SwiperSlide>
      <SwiperSlide>
        <TextWrapper>
          <JoinGroups />
          <h2 className="mb-[28px] text-[28px] md:text-[40px] leading-[140%] font-ivy">
            Join Groups
          </h2>
          <p className="font-ter text-[16px] md:text-[20px]">
            Groups will be the main hubs for conversation regarding the topic at focus. Start
            conversations and meet like minded.
          </p>
          <ButtonContainer>
            <SlidePrevButton prevText={'Back'} />
            <SlideNextButton nextText={'Next'} />
          </ButtonContainer>
        </TextWrapper>
      </SwiperSlide>
      <SwiperSlide>
        <TextWrapper>
          <DoneSvg />
          <h2 className="mb-[28px] text-[28px] md:text-[40px] leading-[140%] font-ivy">
            Great Job!
          </h2>
          <p className="font-ter text-[16px] md:text-[20px]">
            You&lsquo;re ready to explore and connect!
          </p>
          <ButtonContainer>
            <SlidePrevButton prevText={'Back'} />
            <button
              id="modal-onboarding-complete"
              className="py-[6px] w-full md:w-[296px] bg-cym-teal text-[16px] leading-[140%] font-mon uppercase text-white rounded-full"
              type="button"
              onClick={() => handleModalOnboardingComplete()}
            >
              I&lsquo;m All Set!
            </button>
          </ButtonContainer>
        </TextWrapper>
      </SwiperSlide>
    </Swiper>
  );
};

export default OnboardingSwiper;

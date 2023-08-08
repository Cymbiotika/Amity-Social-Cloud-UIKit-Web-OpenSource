import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { UserRepository } from '@amityco/js-sdk';
import ServerAPI from '~/social/pages/Application/ServerAPI';

import Avatar from '~/core/components/Avatar';
import { backgroundImage as UserImage } from '~/icons/User';

const SlideOutContainer = styled.div`
  /* padding: 0 17.5px; */
  @media screen and (max-width: 768px) {
    width: 100vw;
    right: -100vw;
  }
  @media screen and (min-width: 769px) {
    width: 400px;
    right: -400px;
  }
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: white;
  transition: right 0.2s ease-in-out;
  z-index: 2;

  &.open {
    right: 0;
  }
`;

const SlideOutHeader = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const SlideOutContent = styled.div`
  padding: 16px 0;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const SlideOutOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  pointer-events: none;
  z-index: 700;

  &.open {
    opacity: 1;
    pointer-events: auto;
  }
`;

const LikedListTray = ({ reactorIds }) => {
  console.log(reactorIds);

  const server = ServerAPI();

  useEffect(() => {
    server.likedList(reactorIds);
  }, [reactorIds]);

  const hideOverlay = () => {
    document.querySelector('.slideout-overlay').classList.remove('open');
    document.querySelector('.slideout-container').classList.remove('open');
  };

  return (
    <SlideOutOverlay className="slideout-overlay" onClick={hideOverlay}>
      <SlideOutContainer className="slideout-container">
        <SlideOutHeader>
          <svg
            className="xs:hidden md:block absolute ml-3 left-0 cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg
            className="xs:block md:hidden absolute ml-3 left-0 cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.6211 19.9141L16.3242 19.2461C16.4648 19.0703 16.4648 18.7891 16.3242 18.6484L9.96094 12.25L16.3242 5.88672C16.4648 5.74609 16.4648 5.46484 16.3242 5.28906L15.6211 4.62109C15.4453 4.44531 15.1992 4.44531 15.0234 4.62109L7.64062 11.9688C7.5 12.1445 7.5 12.3906 7.64062 12.5664L15.0234 19.9141C15.1992 20.0898 15.4453 20.0898 15.6211 19.9141Z"
              fill="#292B32"
            />
          </svg>

          <h1 className="cym-h-2-lg">Likes</h1>
        </SlideOutHeader>
        <SlideOutContent className="flex flex-col h-full liked-list">
          <code>Slide out content</code>
        </SlideOutContent>
      </SlideOutContainer>
    </SlideOutOverlay>
  );
};

export default LikedListTray;

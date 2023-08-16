import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import { useNavigation } from '~/social/providers/NavigationProvider';

const SlideOutContainer = styled.div`
  padding: 0 17.5px;
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
  z-index: 1000;

  &.open {
    right: 0;
  }
`;

const SlideOutHeader = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
`;
const SlideOutContent = styled.div`
  padding-top: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: auto;

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

const SidebarOverlay = ({ setSideBarIsVisible }) => {
  return (
    <>
      <SlideOutOverlay className="slideout-overlay open" />
      <SlideOutContainer className="slideout-container open z-[100]">
        <SlideOutHeader>
          <button
            className="w-6 h-6 flex items-center absolute"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSideBarIsVisible(false);
            }}
          >
            <FiX className="w-4 h-4" />
          </button>
          <h1 className="cym-h-2-lg mx-auto">Group Members</h1>
        </SlideOutHeader>
        <SlideOutContent className="flex flex-col h-full liked-list pb-[58px]">
          <code>content will go here</code>
        </SlideOutContent>
      </SlideOutContainer>
    </>
  );
};

export default SidebarOverlay;

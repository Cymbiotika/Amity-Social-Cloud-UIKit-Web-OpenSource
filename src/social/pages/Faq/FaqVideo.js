import React from 'react';
import styled from 'styled-components';

import { CloseButton } from '~/core/components/ImageGallery/styles';
import { ButtonContainer } from '~/core/components/Uploaders/Image/styles';
import { Play } from '~/icons';

export const Overlay = styled.div`
  /* display: none; */
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  z-index: 10000;
  padding: 1rem;

  video {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    height: max-content;
    width: auto;
    @media screen and (min-width: 768px) {
      height: 80%;
    }
  }
`;

const FaqVideo = () => {
  const overlay = document.getElementById('video-overlay');

  const spawnVideoOverlay = () => {
    // setSelectedVideoIndex(index);
    document.getElementById('video-overlay').style.display = 'block';
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById(`video`).play();
  };

  const closeVideoOverlay = () => {
    // setSelectedVideoIndex(null);
    overlay.classList.add('hidden');
    document.getElementById('video-overlay').style.display = 'none';
    document.getElementById(`video`).currentTime = 0;
    document.getElementById(`video`).pause();
    document.body.style.overflow = 'auto';
  };
  return (
    <>
      <Overlay id="video-overlay" className="hidden">
        <CloseButton className="absolute right-5 top-5" onClick={closeVideoOverlay} />
        <video id="video" className="video h-max" controls>
          <source
            src="https://cdn.shopify.com/videos/c/o/v/a0511a6edad24607a8d9a7b4d580c46f.mp4"
            type="video/mp4"
          />
          <track kind="captions" label="English" src="captions_en.vtt" srcLang="en" />
        </video>
      </Overlay>
      <div
        className="w-full my-[24px] relative cover h-[315px] rounded-[5px] overflow-hidden"
        style={{
          backgroundImage:
            'url(https://cdn.shopify.com/s/files/1/1824/8017/files/arise-welcome-thumb.jpg?v=1694706464)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <ButtonContainer
          className="absolute w-full h-full flex items-center justify-center cursor-pointer"
          role="button"
          onClick={spawnVideoOverlay}
        >
          <Play />
          {/* <h3
          className="absolute m-[10px] left-0 bottom-0 text-xl font-bold text-white sm:text-2xl"
          style={{
            dropShadow:
              'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          }}
        >
          Use at a later time?
        </h3> */}
        </ButtonContainer>
      </div>
    </>
  );
};

export default FaqVideo;

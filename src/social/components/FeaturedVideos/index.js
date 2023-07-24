import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import useMeasure from 'react-use/lib/useMeasure';
import useScroll from 'react-use/lib/useScroll';
import Button from '~/core/components/Button';
import ChevronLeftIcon from '~/icons/ChevronLeft';
import ChevronRightIcon from '~/icons/ChevronRight';

import { CloseButton } from '~/core/components/ImageGallery/styles';
import { ButtonContainer } from '~/core/components/Uploaders/Image/styles';
import { Play } from '~/icons';

const ITEM_SPACE_SIZE = 16;
const DEFAULT_COLUMN_NUMBER = {
  1024: 2,
  1280: 3,
  1440: 4,
  1800: 5,
};

export const Overlay = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  z-index: 10000;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 16px 0;
  align-items: flex-end;
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.headline};
  display: inline-block;
  margin: 0;
`;

const Pagination = styled.div`
  display: flex;
  gap: 20px;
`;

const PaginationButton = styled(Button).attrs({ variant: 'secondary' })`
  width: 28px;
  padding: 2px;

  &:hover {
    background-color: transparent;
  }

  &:disabled {
    color: ${({ theme }) => theme.palette.neutral.shade3};
  }
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
`;

const StretchedList = styled.div`
  margin-bottom: 0.188rem; // give the shadow a little space
  display: grid;
  grid-auto-flow: column;
  /* grid-auto-columns: 100%; */
  /* grid-gap: ${ITEM_SPACE_SIZE}px; */

  /* ${({ columns }) =>
    Object.entries(columns).map(
      ([breakpoint, column]) => `
        @media (min-width: ${breakpoint}px) {
        grid-auto-columns: calc((100% / ${column}) - (${ITEM_SPACE_SIZE}px * ${
        column - 1
      } / ${column}));
    }
  `,
    )} ); */
`;

const FeaturedVideos = ({
  title = 'Explore Community videos',
  columns = DEFAULT_COLUMN_NUMBER,
  hasMore = false,
  loadMore = () => {},
}) => {
  const containerRef = useRef(null);
  const { x: scrollPosition } = useScroll(containerRef);
  const [wrapperRef, { width }] = useMeasure();
  const [page, setPage] = useState(0);

  const contentWidth = containerRef.current?.scrollWidth ?? 0;

  const hasMultiPage = useMemo(() => contentWidth > width, [contentWidth, width]);

  const isLastPage = useMemo(
    () => scrollPosition >= contentWidth - width,
    [scrollPosition, contentWidth, width],
  );

  const isFirstPage = useMemo(() => scrollPosition === 0, [scrollPosition]);

  useEffect(
    () =>
      containerRef.current?.scrollTo({
        left: (width + ITEM_SPACE_SIZE) * page,
        behavior: 'smooth',
      }),
    [width, page],
  );

  useEffect(() => {
    if (scrollPosition >= contentWidth - width * 2 && hasMore) {
      loadMore();
    }
  }, [scrollPosition, contentWidth, width, hasMore, loadMore]);

  const playlist = [
    {
      key: 0,
      src: 'https://cdn.shopify.com/videos/c/o/v/d8aedd726d4a4f3c96a93e7e3e059037.mp4',
      thumbnail: 'https://cdn.shopify.com/s/files/1/1824/8017/files/home.png?v=1689027600',
      title: 'Watch this foo 🌮',
    },
    {
      key: 1,
      src: 'https://cdn.shopify.com/videos/c/o/v/7ff9ee9b46404feda8d01c6db7adefcc.mp4',
      thumbnail:
        'https://cdn.shopify.com/s/files/1/1824/8017/files/VH__DSRUPTCYMBOTIKA_050423_2676.jpg?v=1688769263',
      title: 'Up close of our plant protein 🌱',
    },
    {
      key: 2,
      src: 'https://cdn.shopify.com/videos/c/o/v/f62144e5c83d4d80b9a270151f8487e2.mp4',
      thumbnail:
        'https://cdn.shopify.com/s/files/1/1824/8017/files/purehydration_lifestyle_3_1.jpg?v=1688745481',
      title: 'Its the Shilajit! 😤',
    },
    {
      key: 3,
      src: 'https://cdn.shopify.com/videos/c/o/v/6d8ff558455e479c93e151938e89d6be.mp4',
      thumbnail:
        'https://cdn.shopify.com/s/files/1/1824/8017/files/Cym_Headers_Rokt_320.png?v=1689789061',
      title: 'Cool Video 🎬',
    },
    {
      key: 4,
      src: 'https://cdn.shopify.com/videos/c/o/v/6920b2167c834aeeafee21bf377c0857.mp4',
      thumbnail:
        'https://cdn.shopify.com/s/files/1/1824/8017/files/arise-welcome-thumbnail_Large_86b211d7-fb30-4b07-89b9-590fa9e97d44.jpg?v=1689962286',
      title: '',
    },
  ];

  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  console.log('Video index', selectedVideoIndex);

  const spawnVideoOverlay = (index) => {
    console.log('Video index', selectedVideoIndex);
    console.log('Spawn overlay');
    setSelectedVideoIndex(index);
    document.getElementById('video-overlay').style.display = 'flex';
  };

  const closeVideoOverlay = () => {
    setSelectedVideoIndex(null);
    document.getElementById('video-overlay').style.display = 'none';
    document.getElementById(`video`).currentTime = 0;
    document.getElementById(`video`).pause();
    console.log('closing overlay');
  };

  return (
    <div className="ml-5 md:mx-0">
      {selectedVideoIndex !== null && (
        <Overlay id="video-overlay">
          <CloseButton className="absolute right-5 top-5" onClick={closeVideoOverlay} />
          <video id="video" className="video" controls>
            <source src={playlist[selectedVideoIndex].src} type="video/mp4" />
          </video>
        </Overlay>
      )}

      <div ref={wrapperRef}>
        <Header>
          <Title>{title}</Title>
          {hasMultiPage && (
            <Pagination>
              <PaginationButton disabled={isFirstPage} onClick={() => setPage(page - 1)}>
                <ChevronLeftIcon height={20} />
              </PaginationButton>
              <PaginationButton disabled={isLastPage} onClick={() => setPage(page + 1)}>
                <ChevronRightIcon height={20} />
              </PaginationButton>
            </Pagination>
          )}
        </Header>

        <ScrollContainer ref={containerRef} page={page}>
          <StretchedList columns={columns} className="gap-[16px] md:gap-unset">
            {playlist.map((video, index) => (
              <div
                key={video.key}
                className={`${
                  index === 4 ? 'w-[520px]' : 'w-[200px]'
                } relative cover h-[315px] rounded-[5px] overflow-hidden`}
                style={{
                  backgroundImage: `url(${video.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <ButtonContainer
                  className="absolute w-full h-full flex items-center justify-center cursor-pointer"
                  onClick={() => spawnVideoOverlay(index)}
                >
                  <Play />
                  <h3
                    className="absolute m-[10px] left-0 bottom-0 text-xl font-bold text-white sm:text-2xl"
                    style={{
                      dropShadow:
                        'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                    }}
                  >
                    {video.title}
                  </h3>
                </ButtonContainer>
              </div>
            ))}
          </StretchedList>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default FeaturedVideos;
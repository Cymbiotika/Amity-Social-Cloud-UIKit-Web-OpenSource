import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import useMeasure from 'react-use/lib/useMeasure';
import useScroll from 'react-use/lib/useScroll';
// import FormattedDuration, { TIMER_FORMAT } from 'react-intl-formatted-duration';
import Button from '~/core/components/Button';
import ChevronLeftIcon from '~/icons/ChevronLeft';
import ChevronRightIcon from '~/icons/ChevronRight';

// import WorkshopAccess from './WorkshopAccess';
// import NoWorkshopAccess from './NoWorkshopAccess';

import ServerAPI from '~/social/pages/Application/ServerAPI';

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
  overflow-x: scroll;
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

const WellnessWorkshops = ({
  title = 'Wellness Workshops',
  columns = DEFAULT_COLUMN_NUMBER,
  hasMore = false,
  loadMore = () => {},
}) => {
  const containerRef = useRef(null);
  const { x: scrollPosition } = useScroll(containerRef);
  const [wrapperRef, { width }] = useMeasure();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  const [postChildrenResp, setPostChildren] = useState([]);
  const [fileData, setFileData] = useState([]);
  // const [hasAccess, setHasAccess] = useState(false);

  const server = new ServerAPI();

  const getWellnessWorkshopPosts = async () => {
    const groupId = '64e7d213210f66637513860d';
    const groupResp = await server.getGroupPosts(groupId);
    setLoading(false);
    setPostChildren(groupResp.postChildren);
    setPostData(groupResp.posts);
    setFileData(groupResp.files);
  };

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
      communityId: '',
      thumbnail: '',
      title: 'Rising Routine',
    },
  ];

  useEffect(() => {
    getWellnessWorkshopPosts();
  }, []);

  return (
    <div className="ml-5 md:mx-0">
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
            {/* {!loading &&
              postChildrenResp.map((post, index) => (
                <WorkshopAccess
                  key={index}
                  postData={postData}
                  fileData={fileData}
                  postId={post.postId}
                  thumbnailFileId={post.data.thumbnailFileId}
                  videoFileId={post.data.videoFileId.original}
                  parentPostId={post.parentPostId}
                  isDeleted={post.isDeleted}
                />
              ))} */}

            {playlist.map((video, index) => (
              <div
                key={video.key}
                className="relative w-[350px] inline-table cover rounded-[5px] overflow-hidden bg-[#EBF2F1] cursor-not-allowed"
                style={{ boxShadow: `rgba(0, 0, 0, 0.05) 0px 1px 2px 0px` }}
              >
                <div
                  className="flex items-center justify-center h-[235px] w-[350px] md:w-[420px]"
                  style={{
                    backgroundImage: `url(${video.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  onClick={() => spawnVideoOverlay(index)} // Pass the index when the div is clicked
                >
                  <span className="!text-[28px] text-[#005850]">Coming Soon...</span>
                </div>
                <div className="bg-white p-5">
                  <h3>Rising Routine</h3>
                </div>
              </div>
            ))}

            {/* 
            <article
              key={1}
              className="relative overflow-hidden w-[310px] md:w-[500px] rounded-lg shadow transition hover:shadow-lg bg-white"
            >
              <img
                alt="Office"
                src="https://cdn.shopify.com/s/files/1/1824/8017/files/WW-Desktop-1.png?v=1695402456"
                className="h-[175px] md:h-[235px] w-full object-initial"
              />

              <div className="absolute bottom-0 max-w-[60%] p-4 sm:p-6 text-gray-500">
                <span>
                  <FormattedDuration seconds={100} format={TIMER_FORMAT} /> Minutes
                </span>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-black">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Donec ac odio tempor orci dapibus
                  ultrices in iaculis nunc. Dis parturient montes nascetur ridiculus mus mauris
                  vitae ultricies leo. Pellentesque habitant morbi tristique senectus et netus et.
                  Faucibus turpis in eu mi bibendum neque.
                </p>
              </div>
            </article>
             */}
          </StretchedList>
        </ScrollContainer>
        {/* {!loading && postChildrenResp.length === 0 && <NoWorkshopAccess />} */}
      </div>
    </div>
  );
};

export default WellnessWorkshops;

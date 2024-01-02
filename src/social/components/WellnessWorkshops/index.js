import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import useMeasure from 'react-use/lib/useMeasure';
import useScroll from 'react-use/lib/useScroll';
import { useSavedPostData } from '~/social/providers/SavedPostsContext';
import ServerAPI from '~/social/pages/Application/ServerAPI';

import Button from '~/core/components/Button';
import ChevronLeftIcon from '~/icons/ChevronLeft';
import ChevronRightIcon from '~/icons/ChevronRight';

import WorkshopAccess from './WorkshopAccess';
import NoWorkshopAccess from './NoWorkshopAccess';

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

const WellnessWorkshops = ({
  title = 'Featured Wellness Workshops',
  columns = DEFAULT_COLUMN_NUMBER,
  hasMore = false,
  loadMore = () => {},
}) => {
  const containerRef = useRef(null);
  const { x: scrollPosition } = useScroll(containerRef);
  const [wrapperRef, { width }] = useMeasure();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const { ariseUserTier } = useSavedPostData();

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

  const postIdsArray = 'postIds=659473a68631fae37524bf4b&postIds=65942893eda84ad1a54413aa';

  const server = new ServerAPI();
  const [destructuredPostData, setDestructuredPostData] = useState([]);
  const getFeaturedPostData = async () => {
    try {
      const featuredPostsResp = await server.getFeaturedPosts(postIdsArray);
      console.log(featuredPostsResp.postChildren);
      const featuredPostsChildren = featuredPostsResp.postChildren;

      setDestructuredPostData(
        featuredPostsChildren.map((post) => ({
          parentPostId: post.parentPostId,
          thumbnailFileId: post.data.thumbnailFileId,
        })),
      );
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    setLoading(false);
    getFeaturedPostData();
  }, []);

  return (
    <div className="ml-5 md:mx-0">
      <div ref={wrapperRef}>
        <Header>
          {/* <Title>{title}</Title> */}
          <Title>{!loading && ariseUserTier === 'VIP' ? title : 'Wellness workshops'}</Title>
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
            {!loading && ariseUserTier === 'VIP' ? (
              <WorkshopAccess destructuredPostData={destructuredPostData} />
            ) : null}

            {!loading && ariseUserTier !== 'VIP' ? <NoWorkshopAccess /> : null}
          </StretchedList>
        </ScrollContainer>
        {/* {!loading && postChildrenResp.length === 0 && <NoWorkshopAccess />} */}
      </div>
    </div>
  );
};

export default WellnessWorkshops;

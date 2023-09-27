import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import LoadMore from '~/social/components/LoadMore';
import CommunityHeader from '~/social/components/community/Header';
import { CommunityScrollContainer } from './styles';
import { useRecommendedGroupContext } from '../../providers/ReccomendedGroupsProvider';
import RecommendedGroups from './RecommendedGroups';

const NoResultsMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.palette.base.shade3};
`;

const UICommunityList = ({
  className,
  communityIds,
  loadMore,
  hasMore,
  activeCommunity,
  onClickCommunity,
  isSearchList,
  searchInput,
  loading,
  loadingMore,
}) => {
  const noCommunitiesFound = isSearchList && !communityIds.length;
  const classNames = [communityIds.length < 4 && 'no-scroll', className].filter(Boolean).join(' ');

  function renderLoadingSkeleton() {
    return new Array(5).fill(1).map((x, index) => <CommunityHeader key={index} loading />);
  }

  const recommendedGroupIds = useRecommendedGroupContext();
  // if (!communityIds?.length)
  //   return (
  //     <p className="mx-5 flex items-center font-medium">
  //       Join some groups! <span className="ml-[5px] !text-[22px]">☝️</span>
  //     </p>
  //   );

  return (
    <CommunityScrollContainer
      className={classNames}
      dataLength={communityIds.length}
      next={loadMore}
      hasMore={hasMore}
      // TODO - when infinite scroll is fixed: bring back loading component
      // and remove use of LoadMore button.
      loader={<div />}
    >
      <LoadMore hasMore={hasMore} loadMore={loadMore} className="no-border">
        {noCommunitiesFound && (
          <NoResultsMessage>
            <FormattedMessage id="communities.nocommunityfound" />
          </NoResultsMessage>
        )}

        {loading && renderLoadingSkeleton()}
        {!loading && communityIds.length === 0 && (
          <p className="mx-5 md:mx-[8px] md:mb-5 flex items-center font-medium">
            Join some groups! <span className="ml-[5px] md:hidden !text-[22px]">☝️</span>{' '}
            <span className="ml-[5px] hidden md:block !text-[22px]">👇</span>
          </p>
        )}

        {!loading &&
          communityIds.map((communityId) => (
            <CommunityHeader
              key={communityId}
              communityId={communityId}
              isActive={communityId === activeCommunity}
              isSearchResult={isSearchList}
              searchInput={searchInput}
              onClick={onClickCommunity}
            />
          ))}

        <RecommendedGroups
          myCommunityIds={communityIds}
          myRecommendedCommunityIds={recommendedGroupIds}
        />

        {loadingMore && renderLoadingSkeleton()}
      </LoadMore>
    </CommunityScrollContainer>
  );
};

UICommunityList.propTypes = {
  className: PropTypes.string,
  communityIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  activeCommunity: PropTypes.string,
  isSearchList: PropTypes.bool,
  searchInput: PropTypes.string,
  loading: PropTypes.bool,
  loadingMore: PropTypes.bool,
  onClickCommunity: PropTypes.func,
};

UICommunityList.defaultProps = {
  className: null,
  loadMore: () => {},
  hasMore: false,
  activeCommunity: '',
  onClickCommunity: () => {},
  isSearchList: false,
  searchInput: '',
  loading: false,
  loadingMore: false,
};

export default UICommunityList;

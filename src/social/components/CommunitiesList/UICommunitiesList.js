import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import useRecommendedCommunitiesList from '~/social/hooks/useRecommendedCommunitiesList';

import LoadMore from '~/social/components/LoadMore';
import CommunityHeader from '~/social/components/community/Header';
import { CommunityScrollContainer } from './styles';
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
  // loading,
  loadingMore,
}) => {
  const noCommunitiesFound = isSearchList && !communityIds.length;
  const classNames = [communityIds.length < 4 && 'no-scroll', className].filter(Boolean).join(' ');

  function renderLoadingSkeleton() {
    return new Array(5).fill(1).map((x, index) => <CommunityHeader key={index} loading />);
  }
  console.log('my groups:', communityIds);

  const [communities, , , loading] = useRecommendedCommunitiesList();
  console.log('rec groups', communities);
  if (!communities?.length) return null;

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
        <RecommendedGroups myCommunityIds={communityIds} myRecommendedCommunityIds={communities} />
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

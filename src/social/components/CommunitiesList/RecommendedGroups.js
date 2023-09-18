import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import useRecommendedCommunitiesList from '~/social/hooks/useRecommendedCommunitiesList';
import Header from '~/social/components/community/Header';

import { useNavigation } from '~/social/providers/NavigationProvider';

const ListHeading = styled.h4`
  ${({ theme }) => theme.typography.title};
  padding: 0 8px;
  margin: 1em 0;
`;

const SectionContainer = styled.div`
  border-top: 1px solid #f7f7f8;
  padding: 1em 0;
`;

const RecommendedGroups = ({ myCommunityIds, myRecommendedCommunityIds }) => {
  const { onClickCommunity } = useNavigation();
  const [communities, , , loading] = useRecommendedCommunitiesList();

  const [recommendedGroupIds, setRecommendedGroupIds] = useState([]);

  function renderLoadingSkeleton() {
    return new Array(5).fill(1).map((x, index) => <Header key={index} loading />);
  }

  const updateRecommendedGroupIds = () => {
    setRecommendedGroupIds(
      myRecommendedCommunityIds.communities.filter(
        (community) => !myCommunityIds.includes(community.communityId),
      ),
    );
  };

  useEffect(() => {
    updateRecommendedGroupIds();
  }, [loading, communities]);

  if (!communities?.length) return null;

  return (
    <SectionContainer className="cym-h-4">
      <div className="hidden md:block">
        <ListHeading className="!cym-h-2-lg">Recommended Groups</ListHeading>

        {/* Only render loading skeleton if there are recommended communities */}
        {loading && communities && communities.length > 0 && renderLoadingSkeleton()}

        {!loading &&
          recommendedGroupIds.map(({ communityId }) => (
            <Header key={communityId} communityId={communityId} onClick={onClickCommunity} />
          ))}
      </div>
    </SectionContainer>
  );
};

export default memo(RecommendedGroups);

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  const [recommendedGroupIds, setRecommendedGroupIds] = useState([]);

  const reccomnededGroups = myRecommendedCommunityIds.communities; // assign to value
  console.log('my groups', myCommunityIds);
  console.log('my recc groups', myRecommendedCommunityIds.communities);

  const updateRecommendedGroupIds = () => {
    setRecommendedGroupIds(
      reccomnededGroups.filter((community) => !myCommunityIds.includes(community.communityId)),
    );
  };

  useEffect(() => {
    setRecommendedGroupIds(myRecommendedCommunityIds);
    // console.log('communityIds:', myCommunityIds);
    // console.log('reccIds:', myRecommendedCommunityIds);
    updateRecommendedGroupIds();
  }, [myCommunityIds]);

  // console.log(recommendedGroupIds);

  return (
    <SectionContainer className="cym-h-4">
      <div className="hidden md:block">
        <ListHeading className="!cym-h-2-lg">Recommended Groups</ListHeading>

        {recommendedGroupIds.map(({ communityId }) => (
          <Header key={communityId} communityId={communityId} onClick={onClickCommunity} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default RecommendedGroups;

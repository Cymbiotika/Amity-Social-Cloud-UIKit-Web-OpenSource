/* eslint-disable react/jsx-no-useless-fragment */

import React, { memo } from 'react';
import styled from 'styled-components';

import Skeleton from '~/core/components/Skeleton';
import Header from '~/social/components/community/Header';

import useRecommendedCommunitiesList from '~/social/hooks/useRecommendedCommunitiesList';
import { useNavigation } from '~/social/providers/NavigationProvider';

const ListHeading = styled.h4`
  ${({ theme }) => theme.typography.title};
  padding: 0 8px;
  margin: 1em 0;
`;

const SidebarRecommendedList = () => {
  const { onClickCommunity } = useNavigation();
  const [communities, , , loading] = useRecommendedCommunitiesList();

  if (!communities?.length) return null;

  console.log('here', communities.length);

  return (
    // <HorizontalList title={title}>
    <>
      <ListHeading className="!cym-h-2-lg">Recommended Groups</ListHeading>
      {loading && new Array(4).fill(1).map((x, index) => <Header key={index} loading />)}

      {!loading &&
        communities.map(({ communityId }) => (
          <Header key={communityId} communityId={communityId} onClick={onClickCommunity} />
        ))}
    </>
    // </HorizontalList>
  );
};

export default memo(SidebarRecommendedList);

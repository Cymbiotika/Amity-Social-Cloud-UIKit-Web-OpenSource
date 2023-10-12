/* eslint-disable react/jsx-no-useless-fragment */

import React, { memo } from 'react';
import styled from 'styled-components';

import Header from '~/social/components/community/Header';

import useRecommendedCommunitiesList from '~/social/hooks/useRecommendedCommunitiesList';
import { useNavigation } from '~/social/providers/NavigationProvider';

const ListHeading = styled.h4`
  ${({ theme }) => theme.typography.title};
  padding: 0 8px;
  margin: 1em 0;
`;

const Contatiner = styled.div`
  display: flex;
  a {
    display: flex !important;
    flex-direction: column !important;
  }
`;

const SidebarRecommendedList = () => {
  const { onClickCommunity } = useNavigation();
  const [communities, , , loading] = useRecommendedCommunitiesList();

  if (!communities?.length) return <p className="mx-5">You&lsquo;ve joined all the groups! 🎉</p>;

  return (
    <Contatiner className="">
      <ListHeading className="!cym-h-2-lg">Recommended Groups</ListHeading>
      {loading && new Array(4).fill(1).map((x, index) => <Header key={index} loading />)}

      {!loading &&
        communities.map(({ communityId }) => (
          <Header key={communityId} communityId={communityId} onClick={onClickCommunity} />
        ))}
    </Contatiner>
  );
};

export default memo(SidebarRecommendedList);

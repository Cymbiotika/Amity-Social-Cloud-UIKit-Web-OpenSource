import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Skeleton from '~/core/components/Skeleton';

import customizableComponent from '~/core/hocs/customization';

import Avatar from '~/core/components/Avatar';
import { backgroundImage as CommunityImage } from '~/icons/Community';
import CommunityName from '~/social/components/community/Name';

const CommunityHeaderContainer = styled.a.attrs((props) => props)`
  @media screen and (max-width: 768px) {
    padding-bottom: 0;
  }
  min-width: 100px;
  display: grid;
  grid-template-areas: 'avatar title' 'avatar children';
  grid-template-columns: min-content auto;
  grid-template-rows: min-content min-content;
  grid-gap: 0 0.75em;
  padding: 0.5em;
  border-radius: 4px;
  align-items: center;
  color: ${({ theme }) => theme.palette.base.main};

  ${({ $loading }) =>
    !$loading &&
    `&:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.base.shade4};
  }`}

  ${({ isActive, theme }) =>
    isActive &&
    css`
      color: ${theme.palette.primary.main};
      background-color: #ebf2f1;
    `};

  ${({ hasChildren }) =>
    !hasChildren &&
    css`
      grid-template-areas: 'avatar title';
      align-items: center;
    `}
`;

const CommunityHeaderAvatar = styled(Avatar)`
  grid-area: avatar;
`;

const Rest = styled.div`
  grid-area: children;
`;

const UICommunityHeader = ({
  communityId,
  isActive,
  avatarFileUrl,
  onClick,
  isOfficial,
  isPublic,
  isSearchResult,
  name,
  searchInput,
  children,
  loading,
}) => (
  <CommunityHeaderContainer
    data-qa-anchor="community-header"
    isActive={isActive}
    hasChildren={!!children}
    $loading={loading}
    onClick={() => onClick(communityId)}
  >
    <CommunityHeaderAvatar
      avatar={avatarFileUrl}
      backgroundImage={CommunityImage}
      loading={loading}
      className="community-header-avatar xs:!h-[60px] xs:!w-[60px] md:!w-[40px] md:!h-[40px] !text-[#005850] no-underline"
    />
    {loading && children ? (
      <Skeleton style={{ fontSize: 8, maxWidth: 120 }} />
    ) : (
      <CommunityName
        data-qa-anchor="community-header"
        isActive={isActive}
        isOfficial={isOfficial}
        isPublic={isPublic}
        isSearchResult={isSearchResult}
        name={name}
        searchInput={searchInput}
        loading={loading}
      />
    )}
    {children && <Rest>{children}</Rest>}
  </CommunityHeaderContainer>
);

UICommunityHeader.propTypes = {
  communityId: PropTypes.string,
  isActive: PropTypes.bool,
  avatarFileUrl: PropTypes.string,
  isOfficial: PropTypes.bool,
  isPublic: PropTypes.bool,
  isSearchResult: PropTypes.bool,
  name: PropTypes.string,
  searchInput: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

UICommunityHeader.defaultProps = {
  onClick: () => {},
};

export default customizableComponent('UICommunityHeader', UICommunityHeader);

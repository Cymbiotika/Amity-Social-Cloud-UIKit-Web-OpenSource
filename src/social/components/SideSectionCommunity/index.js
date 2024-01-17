import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import SideMenuActionItem from '~/core/components/SideMenuActionItem';
import SideMenuSection from '~/core/components/SideMenuSection';
import { Newspaper, Star, Sun } from '~/icons';
import { PageTypes } from '~/social/constants';
import { useNavigation } from '~/social/providers/NavigationProvider';
// import { useSavedPostData } from '~/social/providers/SavedPostsContext';

export const NewsIcon = styled(Newspaper).attrs({ width: 20, height: 20 })``;
export const SunIcon = styled(Sun).attrs({ width: 20, height: 20 })``;
export const StarIcon = styled(Star).attrs({ width: 20, height: 20 })``;

const SideSectionCommunity = ({ shouldHideExplore, children }) => {
  const { onChangePage, page } = useNavigation();
  // const { ariseUserTier } = useSavedPostData();

  return (
    <SideMenuSection heading={<FormattedMessage id="sidesectioncommunity.community" />}>
      <SideMenuActionItem
        className="cym-h-4"
        data-qa-anchor="side-section-community-side-menu-action-item-news-feed-button"
        icon={<NewsIcon />}
        active={page.type === PageTypes.NewsFeed}
        onClick={() => onChangePage(PageTypes.NewsFeed)}
      >
        <FormattedMessage id="sidesectioncommunity.newfeed" />
      </SideMenuActionItem>

      {/* {ariseUserTier === 'VIP' ? (
        <SideMenuActionItem
          className="cym-h-4"
          data-qa-anchor="side-section-community-side-menu-action-item-wellness-button"
          icon={<SunIcon />}
          active={page.type === PageTypes.Wellness}
          onClick={() => onChangePage(PageTypes.Wellness)}
        >
          <FormattedMessage id="sidesectioncommunity.wellness" />
        </SideMenuActionItem>
      ) : null} */}

      {!shouldHideExplore && (
        <SideMenuActionItem
          className="cym-h-4"
          data-qa-anchor="side-section-community-side-menu-action-item-explore-button"
          icon={<StarIcon />}
          active={page.type === PageTypes.Explore}
          onClick={() => onChangePage(PageTypes.Explore)}
        >
          <FormattedMessage id="sidesectioncommunity.explore" />
        </SideMenuActionItem>
      )}
      {children}
    </SideMenuSection>
  );
};

SideSectionCommunity.propTypes = {
  shouldHideExplore: PropTypes.bool,
  children: PropTypes.node,
};

export default SideSectionCommunity;

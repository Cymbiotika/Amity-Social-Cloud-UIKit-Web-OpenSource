import { PostTargetType } from '@amityco/js-sdk';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import withSDK from '~/core/hocs/withSDK';
import * as utils from '~/helpers/utils';
import AriseTokensGallery from '~/social/components/AriseTokens';
import MediaGallery from '~/social/components/MediaGallery';
import SavedPosts from '~/social/components/SavedPosts';

import FeedHeaderTabs from '~/social/components/FeedHeaderTabs';
import UserInfo from '~/social/components/UserInfo';

import Feed from '~/social/components/Feed';
import Followers from '~/social/pages/UserFeed/Followers';

import useFollow from '~/core/hooks/useFollow';
import { FollowersTabs } from '~/social/pages/UserFeed/Followers/constants';
import { tabs, UserFeedTabs } from './constants';
import { Wrapper } from './styles';

const UserFeed = ({ userId, currentUserId, networkSettings }) => {
  const isPrivateNetwork = utils.isPrivateNetwork(networkSettings);

  const [activeTab, setActiveTab] = useState(UserFeedTabs.TIMELINE);
  const [followActiveTab, setFollowActiveTab] = useState(FollowersTabs.FOLLOWINGS);

  const isMe = userId === currentUserId;

  const { isFollowAccepted } = useFollow(currentUserId, userId);

  const isHiddenProfile = isPrivateNetwork && !isFollowAccepted && !isMe;

  const filteredTabs = isHiddenProfile
    ? tabs.filter(({ value }) => value === UserFeedTabs.TIMELINE)
    : tabs;

  const myTabs = !isMe ? tabs.filter(({ value }) => value !== UserFeedTabs.SAVEDPOSTS) : tabs;

  return (
    // key prop is necessary here, without it this part will never re-render !!!
    <Wrapper className="content-wrapper">
      <UserInfo
        key={userId}
        userId={userId}
        setActiveTab={setActiveTab}
        setFollowActiveTab={setFollowActiveTab}
        isPrivateNetwork={isPrivateNetwork}
      />

      <FeedHeaderTabs
        data-qa-anchor="user-feed-header"
        tabs={myTabs || filteredTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === UserFeedTabs.TIMELINE && (
        <Feed
          targetType={isMe ? PostTargetType.MyFeed : PostTargetType.UserFeed}
          targetId={userId}
          showPostCreator={isMe}
          isHiddenProfile={isHiddenProfile}
        />
      )}

      {activeTab === UserFeedTabs.GALLERY && (
        <MediaGallery targetType={PostTargetType.UserFeed} targetId={userId} />
      )}

      {activeTab === UserFeedTabs.TOKENS && (
        <AriseTokensGallery
          targetType={isMe ? PostTargetType.MyFeed : PostTargetType.UserFeed}
          targetId={userId}
          isMe={isMe}
        />
      )}

      {activeTab === UserFeedTabs.FOLLOWERS && !isHiddenProfile && (
        <Followers
          userId={userId}
          activeTab={followActiveTab}
          setActiveTab={setFollowActiveTab}
          setUserFeedTab={setActiveTab}
        />
      )}

      {activeTab === UserFeedTabs.SAVEDPOSTS && <SavedPosts userId={userId} />}
    </Wrapper>
  );
};

UserFeed.propTypes = {
  userId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
  networkSettings: PropTypes.object.isRequired,
};

export default withSDK(UserFeed);

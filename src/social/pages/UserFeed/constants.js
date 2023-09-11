import React from 'react';
import { FormattedMessage } from 'react-intl';

export const UserFeedTabs = {
  TIMELINE: 'TIMELINE',
  TOKENS: 'TOKENS',
  FOLLOWERS: 'FOLLOWERS',
  SAVEDPOSTS: 'SAVED POSTS',
  GALLERY: 'GALLERY',
};

export const tabs = [
  { value: UserFeedTabs.TIMELINE, label: <FormattedMessage id="tabs.timeline" /> },
  { value: UserFeedTabs.TOKENS, label: <FormattedMessage id="tabs.tokens" /> },
  { value: UserFeedTabs.FOLLOWERS, label: <FormattedMessage id="tabs.followers" /> },
  { value: UserFeedTabs.SAVEDPOSTS, label: <FormattedMessage id="tabs.savedPosts" /> },
  { value: UserFeedTabs.GALLERY, label: <FormattedMessage id="tabs.gallery" /> },
];

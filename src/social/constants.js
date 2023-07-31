export const PageTypes = {
  Explore: 'explore',
  Category: 'category',
  NewsFeed: 'newsfeed',
  UserFeed: 'userfeed',
  CommunityFeed: 'communityfeed',
  CommunityEdit: 'communityedit',
  UserEdit: 'useredit',
  MyGroups: 'mygroups',
  Search: 'search',
  NotificationTarget: 'notificationtarget',
};

export const MemberRoles = Object.freeze({
  MEMBER: 'member',
  COMMUNITY_MODERATOR: 'community-moderator',
  CHANNEL_MODERATOR: 'channel-moderator',
});

export const MAXIMUM_MENTIONEES = 30;

export const VideoFileStatus = Object.freeze({
  Uploaded: 'uploaded',
  Transcoding: 'transcoding',
  Transcoded: 'transcoded',
  TranscodeFailed: 'transcodeFailed',
});

export const VideoQuality = Object.freeze({
  FHD: '1080p',
  HD: '720p',
  SD: '480p',
  LD: '360p',
  Original: 'original',
});

export const MP4MimeType = 'video/mp4';

export const userId = window.shopifyCustomerId ?? '3454838145071';
export const displayName = window.shopifyCustomerName ?? 'Jared Radtkey';
export const apiKey = 'b0e8ee0f3fdda3644836851c545a1f89d50fdae4e9636628';

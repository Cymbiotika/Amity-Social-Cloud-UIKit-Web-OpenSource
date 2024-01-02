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
  SearchFeed: 'searchfeed',
  Wellness: 'wellness',
  NotificationTarget: 'notificationtarget',
  Faq: 'faq',
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

// export const userId = window.shopifyCustomerId ?? '6229059141679';
// export const displayName = window.shopifyCustomerName ?? 'Hector Cardona';

// export const userId = window.shopifyCustomerId ?? '3454838145071';
// export const displayName = window.shopifyCustomerName ?? 'Jared Radtkey';

export const userId = window.shopifyCustomerId ?? '6405802983471';
export const displayName = window.shopifyCustomerName ?? 'Arise';
export const apiKey = 'b0e8ee0f3fdda3644836851c545a1f89d50fdae4e9636628';

export const roleRenderer = (role) => {
  switch (role) {
    case '6412fc76-ef6c-476c-ba45-17063dfed0ba':
      return 'Cymbiologist';
    case 'edc90e79-1920-4da2-9176-defad5f70f8e':
      return 'Cymbiotika Curated';
    case '4e31d2e1-7ab8-4a63-b1b9-bd7383612ac9':
      return 'Founder';
    case '19ee7e0e-e137-4c86-84f5-88bc27fb6504':
      return 'Community Moderator';
    case '3a9230d9-48fa-40d4-adf8-909807153406':
      return 'Product Developer';
    default:
      return null;
  }
};

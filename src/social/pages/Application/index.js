import { PostTargetType } from '@amityco/js-sdk';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { PageTypes, userId } from '~/social/constants';

import { RecommendedGroupsProvider } from '../../providers/ReccomendedGroupsProvider';
import { SavedPostsProvider } from '~/social/providers/SavedPostsContext';

import MainLayout from '~/social/layouts/Main';
import CustomFooterNav from '~/core/components/CustomFooterNav';
import CustomHeader from '~/core/components/CustomHeader';
import useUser from '~/core/hooks/useUser';
import CommunitySideMenu from '~/social/components/CommunitySideMenu';
import CreatePostOverlay from '~/social/components/CreatePostOverlay';
import MobilePostButton from '~/social/components/MobilePostButton';
import OnboardingModal from '~/social/components/OnboaringModal';
import ProfileSettings from '~/social/components/ProfileSettings';
import SideSectionMyCommunity from '~/social/components/SideSectionMyCommunity';
import SocialSearchv2 from '~/social/components/SocialSearchv2';
import CategoryCommunitiesPage from '~/social/pages/CategoryCommunities';
import CommunityEditPage from '~/social/pages/CommunityEdit';
import CommunityFeedPage from '~/social/pages/CommunityFeed';
import ExplorePage from '~/social/pages/Explore';
import NewsFeedPage from '~/social/pages/NewsFeed';
import UserFeedPage from '~/social/pages/UserFeed';
import { useNavigation } from '~/social/providers/NavigationProvider';
import NotificationTargetPage from '../NotificationTargetPage';
import SearchFeed from '../SearchFeed';
import FaqPage from '../Faq';
import LoadingScreen from '../LoadingScreen';
import ServerAPI from './ServerAPI';
// import WellnessWorkshopsPage from '../WellnessWorkshops';

// import Custom from '~/chat/components/Message/MessageContent/Custom';

const ApplicationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const StyledCommunitySideMenu = styled(CommunitySideMenu)`
  min-height: 100%;
  display: none;
  @media screen and (min-width: 996px) {
    display: block;
  }
`;

const Community = () => {
  const { onChangePage } = useNavigation();
  const { user } = useUser(userId);
  const server = ServerAPI();

  useEffect(() => {
    if (user.createdAt) {
      const followUsers = async () => {
        try {
          onChangePage(PageTypes.LoadingScreen);
          const followResponse = await server.followUser('6405802983471');
          const followStatus = followResponse.follows[0].status;
          if (followStatus === 'accepted') {
            setTimeout(() => {
              onChangePage(PageTypes.NewsFeed);
            }, 3000);
          }
        } catch (error) {
          console.error('Error following users:', error.message);
          setTimeout(() => {
            onChangePage(PageTypes.NewsFeed);
          }, 1000);
        }
      };

      const today = moment().format('YYYY-MM-DD');
      const createdAtDate = moment(user.createdAt).format('YYYY-MM-DD');
      if (today === createdAtDate) {
        followUsers();
      }
    }
  }, [user]);

  const customerId = window.shopifyCustomerId || userId;
  const { page, onClickUser } = useNavigation();

  const [feedType, setFeedType] = useState('');
  const [feedTargetId, setFeedTargetId] = useState('');
  const handleClickUser = (userId) => onClickUser(userId);

  const assignFeedType = () => {
    if (page.type === 'communityfeed') {
      setFeedType(PostTargetType.CommunityFeed);
    } else {
      setFeedType(PostTargetType.UserFeed);
    }
  };

  const assignTargetId = () => {
    if (page.type === 'communityfeed') {
      setFeedTargetId(window.communityId);
    } else if (page.type === 'newsfeed') {
      setFeedTargetId(customerId);
    } else {
      setFeedTargetId(page.userId);
    }
  };
  useEffect(() => {
    window.sidebar = document.querySelector('.sidebar-menu');
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    assignFeedType();
    assignTargetId();
    scrollToTop();
  }, [page.type]);
  return (
    <SavedPostsProvider>
      <ApplicationContainer id="ApplicationContainer">
        <CreatePostOverlay targetType={feedType} targetId={feedTargetId} userId={page.userId} />
        <CustomHeader
          id="custom-header-wrapper-md"
          className="hidden md:block"
          userId={page.userId}
          page={page.type}
          onClickUser={handleClickUser}
        />
        <RecommendedGroupsProvider>
          <MainLayout
            aside={
              <StyledCommunitySideMenu
                activeCommunity={page.communityId}
                id="main-layout"
                className="sidebar-menu"
              />
            }
          >
            <CustomHeader
              id="custom-header-wrapper-mobile"
              className="md:!hidden"
              userId={page.userId}
              onClickUser={handleClickUser}
            />

            {page.type === PageTypes.Explore && <ExplorePage />}

            {page.type === PageTypes.NewsFeed && <NewsFeedPage />}

            {page.type === PageTypes.CommunityFeed && (
              <CommunityFeedPage
                communityId={page.communityId}
                isNewCommunity={page.isNewCommunity}
              />
            )}

            {page.type === PageTypes.CommunityEdit && (
              <CommunityEditPage communityId={page.communityId} tab={page.tab} />
            )}

            {page.type === PageTypes.Category && (
              <CategoryCommunitiesPage categoryId={page.categoryId} />
            )}

            {page.type === PageTypes.UserFeed && <UserFeedPage userId={page.userId} />}

            {page.type === PageTypes.UserEdit && <ProfileSettings userId={page.userId} />}

            {page.type === PageTypes.MyGroups && (
              <SideSectionMyCommunity activeCommunity={page.communityId} showCreateButton />
            )}

            {page.type === PageTypes.Search && <SocialSearchv2 className="mt-7" />}

            {page.type === PageTypes.NotificationTarget && (
              <NotificationTargetPage targetId={page.targetId} />
            )}

            {page.type === PageTypes.SearchFeed && <SearchFeed searchQuery={page.targetId} />}

            {page.type === PageTypes.FaqPage && <FaqPage searchQuery={page.targetId} />}

            {page.type === PageTypes.LoadingScreen && <LoadingScreen />}

            {/* {page.type === PageTypes.Wellness && (
              <WellnessWorkshopsPage searchQuery={page.targetId} />
            )} */}

            <MobilePostButton />
            <CustomFooterNav page={page.type} onClickUser={handleClickUser} />
          </MainLayout>
        </RecommendedGroupsProvider>
        <OnboardingModal user={user} />
      </ApplicationContainer>
    </SavedPostsProvider>
  );
};

export default Community;

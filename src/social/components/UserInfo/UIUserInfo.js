import { FollowRequestStatus } from '@amityco/js-sdk';
import { toHumanString } from 'human-readable-numbers';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import Truncate from 'react-truncate-markup';

import Button, { PrimaryButton } from '~/core/components/Button';
import ConditionalRender from '~/core/components/ConditionalRender';
import customizableComponent from '~/core/hocs/customization';
import { backgroundImage as UserImage } from '~/icons/User';

import BanIcon from '~/icons/Ban';
import { FollowersTabs, PENDING_TAB } from '~/social/pages/UserFeed/Followers/constants';

import {
  ActionButtonContainer,
  Avatar,
  CheckIconWrapper,
  ClickableCount,
  Container,
  CountContainer,
  Description,
  Header,
  NotificationBody,
  NotificationTitle,
  OptionMenu,
  PencilIcon,
  PendingIcon,
  PendingIconContainer,
  PendingNotification,
  PlusIcon,
  ProfileName,
  ProfileNameWrapper,
  TitleEllipse,
  UserBadgesWrapper,
} from './styles';

import { confirm } from '~/core/components/Confirm';
import { notification } from '~/core/components/Notification';
import { useAsyncCallback } from '~/core/hooks/useAsyncCallback';
import useFollowersList from '~/core/hooks/useFollowersList';
import { useSDK } from '~/core/hooks/useSDK';
import useUser from '~/core/hooks/useUser';
import { POSITION_LEFT } from '~/helpers';
import { Check } from '~/icons';
import useReport from '~/social/hooks/useReport';
import { UserFeedTabs } from '~/social/pages/UserFeed/constants';

const UIUserInfo = ({
  userId,
  currentUserId,
  fileUrl,
  displayName,
  description,
  isMyProfile,
  onEditUser,
  onFollowRequest,
  onFollowDecline,
  isFollowPending,
  isFollowNone,
  isFollowAccepted,
  setActiveTab,
  setFollowActiveTab,
  followerCount,
  followingCount,
  isPrivateNetwork,
  userAriseTier,
  userRoles,
}) => {
  const isXsScreen = window.innerWidth < 640;

  const { user } = useUser(userId);
  const { isFlaggedByMe, handleReport } = useReport(user);
  const { formatMessage } = useIntl();
  const { connected } = useSDK();
  let cymRole;
  switch (userRoles[0]) {
    case 'c312406d-ee76-4900-bc19-43b1f1bdf58d':
      cymRole = 'Cymbiotika Legend';
      break;
    default:
      console.log('This user has no Cymbiotika roles');
  }

  const [onReportClick] = useAsyncCallback(async () => {
    await handleReport();
    notification.success({
      content: (
        <FormattedMessage id={isFlaggedByMe ? 'report.unreportSent' : 'report.reportSent'} />
      ),
    });
  }, [handleReport]);

  const title = user.displayName
    ? formatMessage({ id: 'user.unfollow.confirm.title' }, { displayName: user.displayName })
    : formatMessage({ id: 'user.unfollow.confirm.title.thisUser' });

  const content = user.displayName
    ? formatMessage({ id: 'user.unfollow.confirm.body' }, { displayName: user.displayName })
    : formatMessage({ id: 'user.unfollow.confirm.body.thisUser' });

  const allOptions = [
    isFollowAccepted &&
      !isMyProfile && {
        name: 'user.unfollow',
        action: () =>
          confirm({
            title,
            content,
            cancelText: formatMessage({ id: 'buttonText.cancel' }),
            okText: formatMessage({ id: 'buttonText.unfollow' }),
            onOk: async () => {
              await onFollowDecline();
              setActiveTab(UserFeedTabs.TIMELINE);
            },
          }),
      },
    !isMyProfile && {
      name: isFlaggedByMe ? 'report.unreportUser' : 'report.reportUser',
      action: onReportClick,
    },
  ].filter(Boolean);

  const [pendingUsers] = useFollowersList(currentUserId, FollowRequestStatus.Pending);

  return (
    <>
      <Container className="xs:block md:hidden" data-qa-anchor="user-info">
        <Header className="!items-center">
          <Avatar
            className="!h-[64px] !w-[64px] !mr-[14px]"
            data-qa-anchor="user-info-profile-image"
            avatar={fileUrl}
            backgroundImage={UserImage}
          />
          <div className="flex flex-col">
            <ProfileNameWrapper>
              <Truncate lines={3}>
                <ProfileName data-qa-anchor="user-info-profile-name">{displayName}</ProfileName>
              </Truncate>

              {user.isGlobalBan && (
                <BanIcon width={14} height={14} css="margin-left: 0.265rem; margin-top: 1px;" />
              )}
            </ProfileNameWrapper>
            {/* Add badges styled compoenent */}

            {(userAriseTier || cymRole) && (
              <UserBadgesWrapper>
                {userAriseTier ? (
                  <span className="whitespace-nowrap rounded-full bg-[#EBF2F1] px-3 py-1 text-[12px] uppercase font-mon font-bold text-[#222222] tracking-[1%]">
                    {' '}
                    {userAriseTier}
                  </span>
                ) : (
                  <span className="hidden">Nothing to see here</span>
                )}

                {cymRole ? (
                  <span className="whitespace-nowrap rounded-full bg-[#EFF0E5] px-3 py-1 text-[12px] uppercase font-mon font-bold text-[#222222] tracking-[1%]">
                    {cymRole}
                  </span>
                ) : (
                  <span className="hidden">Nothing to see here</span>
                )}
              </UserBadgesWrapper>
            )}
            <CountContainer>
              <ClickableCount
                onClick={() => {
                  setActiveTab(UserFeedTabs.FOLLOWERS);
                  setTimeout(() => setFollowActiveTab(FollowersTabs.FOLLOWINGS), 250);
                }}
              >
                {toHumanString(followingCount)}
              </ClickableCount>
              <FormattedMessage id="counter.followings" />
              <ClickableCount
                onClick={() => {
                  setActiveTab(UserFeedTabs.FOLLOWERS);
                  setTimeout(() => setFollowActiveTab(FollowersTabs.FOLLOWERS), 250);
                }}
              >
                {toHumanString(followerCount)}
              </ClickableCount>
              <FormattedMessage id="counter.followers" />
            </CountContainer>
          </div>
        </Header>

        <Description data-qa-anchor="user-info-description">{description}</Description>

        <ActionButtonContainer>
          <ConditionalRender condition={isMyProfile}>
            <Button
              data-qa-anchor="user-info-edit-profile-button"
              disabled={!connected}
              onClick={() => onEditUser(userId)}
            >
              <PencilIcon /> <FormattedMessage id="user.editProfile" />
            </Button>
            <>
              {isPrivateNetwork && isFollowPending && (
                <Button disabled={!connected} onClick={() => onFollowDecline()}>
                  <PendingIconContainer>
                    <PendingIcon />
                  </PendingIconContainer>
                  <FormattedMessage id="user.cancel_follow" />
                </Button>
              )}
              {isFollowNone && (
                <PrimaryButton disabled={!connected} onClick={() => onFollowRequest()}>
                  <PlusIcon /> <FormattedMessage id="user.follow" />
                </PrimaryButton>
              )}
              {isFollowAccepted && (
                // <CheckIconWrapper>
                //   <Check className="w-4" /> <FormattedMessage id="Following" />
                // <CheckIconWrapper/>
                <CheckIconWrapper className="items-center text-cym gap-2">
                  <Check className="w-4 fill-cym" /> <FormattedMessage id="Following" />
                </CheckIconWrapper>
              )}
            </>
          </ConditionalRender>
          <OptionMenu options={allOptions} pullRight={false} align={POSITION_LEFT} />
        </ActionButtonContainer>

        {isMyProfile && pendingUsers.length > 0 && isPrivateNetwork && (
          <PendingNotification
            onClick={() => {
              setActiveTab(UserFeedTabs.FOLLOWERS);
              setTimeout(() => setFollowActiveTab(PENDING_TAB), 250);
            }}
          >
            <NotificationTitle>
              <TitleEllipse />
              <FormattedMessage id="follow.pendingNotification.title" />
            </NotificationTitle>
            <NotificationBody>
              <FormattedMessage id="follow.pendingNotification.body" />
            </NotificationBody>
          </PendingNotification>
        )}
      </Container>

      <Container className="xs:hidden md:block" data-qa-anchor="user-info">
        <Header>
          <Avatar
            data-qa-anchor="user-info-profile-image"
            avatar={fileUrl}
            backgroundImage={UserImage}
          />
          <ActionButtonContainer>
            <ConditionalRender condition={isMyProfile}>
              <Button
                data-qa-anchor="user-info-edit-profile-button"
                disabled={!connected}
                onClick={() => onEditUser(userId)}
              >
                <PencilIcon /> <FormattedMessage id="user.editProfile" />
              </Button>
              <>
                {isPrivateNetwork && isFollowPending && (
                  <Button disabled={!connected} onClick={() => onFollowDecline()}>
                    <PendingIconContainer>
                      <PendingIcon />
                    </PendingIconContainer>
                    <FormattedMessage id="user.cancel_follow" />
                  </Button>
                )}
                {isFollowNone && (
                  <PrimaryButton disabled={!connected} onClick={() => onFollowRequest()}>
                    <PlusIcon /> <FormattedMessage id="user.follow" />
                  </PrimaryButton>
                )}
              </>
            </ConditionalRender>
          </ActionButtonContainer>
          <OptionMenu options={allOptions} pullRight={false} />
        </Header>
        <ProfileNameWrapper>
          <Truncate lines={3}>
            <ProfileName data-qa-anchor="user-info-profile-name">{displayName}</ProfileName>
          </Truncate>

          {user.isGlobalBan && (
            <BanIcon width={14} height={14} css="margin-left: 0.265rem; margin-top: 1px;" />
          )}
        </ProfileNameWrapper>
        {/* Add badges styled compoenent */}

        <UserBadgesWrapper>
          {userAriseTier ? (
            <span className="whitespace-nowrap rounded-full bg-[#EBF2F1] px-3 py-1 text-[12px] uppercase font-mon font-bold text-[#222222] tracking-[1%]">
              {' '}
              {userAriseTier}
            </span>
          ) : (
            <span className="hidden">Nothing to see here</span>
          )}

          {cymRole ? (
            <span className="whitespace-nowrap rounded-full bg-[#EFF0E5] px-3 py-1 text-[12px] uppercase font-mon font-bold text-[#222222] tracking-[1%]">
              {cymRole}
            </span>
          ) : (
            <span className="hidden">Nothing to see here</span>
          )}
        </UserBadgesWrapper>

        <CountContainer>
          <ClickableCount
            onClick={() => {
              setActiveTab(UserFeedTabs.FOLLOWERS);
              setTimeout(() => setFollowActiveTab(FollowersTabs.FOLLOWINGS), 250);
            }}
          >
            {toHumanString(followingCount)}
          </ClickableCount>
          <FormattedMessage id="counter.followings" />
          <ClickableCount
            onClick={() => {
              setActiveTab(UserFeedTabs.FOLLOWERS);
              setTimeout(() => setFollowActiveTab(FollowersTabs.FOLLOWERS), 250);
            }}
          >
            {toHumanString(followerCount)}
          </ClickableCount>
          <FormattedMessage id="counter.followers" />
        </CountContainer>
        <Description data-qa-anchor="user-info-description">{description}</Description>

        {isMyProfile && pendingUsers.length > 0 && isPrivateNetwork && (
          <PendingNotification
            onClick={() => {
              setActiveTab(UserFeedTabs.FOLLOWERS);
              setTimeout(() => setFollowActiveTab(PENDING_TAB), 250);
            }}
          >
            <NotificationTitle>
              <TitleEllipse />
              <FormattedMessage id="follow.pendingNotification.title" />
            </NotificationTitle>
            <NotificationBody>
              <FormattedMessage id="follow.pendingNotification.body" />
            </NotificationBody>
          </PendingNotification>
        )}
      </Container>
    </>
  );
};

UIUserInfo.propTypes = {
  userId: PropTypes.string,
  currentUserId: PropTypes.string,
  userAriseTier: PropTypes.string,
  userRoles: PropTypes.string,
  fileUrl: PropTypes.string,
  displayName: PropTypes.string,
  description: PropTypes.string,
  isMyProfile: PropTypes.bool,
  isFollowPending: PropTypes.bool,
  isFollowNone: PropTypes.bool,
  isFollowAccepted: PropTypes.bool,
  setActiveTab: PropTypes.func,
  setFollowActiveTab: PropTypes.func,
  followerCount: PropTypes.number,
  followingCount: PropTypes.number,
  isPrivateNetwork: PropTypes.bool,
  onEditUser: PropTypes.func,
  onFollowRequest: PropTypes.func,
  onFollowDecline: PropTypes.func,
};

UIUserInfo.defaultProps = {
  userId: '',
  currentUserId: '',
  userAriseTier: '',
  userRoles: '',
  fileUrl: '',
  displayName: '',
  description: '',
  isMyProfile: false,
  onEditUser: () => {},
  onFollowRequest: () => null,
  onFollowDecline: () => null,
  isFollowPending: false,
  isFollowNone: false,
  isFollowAccepted: false,
  setActiveTab: () => null,
  setFollowActiveTab: () => null,
  followerCount: 0,
  followingCount: 0,
};

export default customizableComponent('UIUserInfo', UIUserInfo);

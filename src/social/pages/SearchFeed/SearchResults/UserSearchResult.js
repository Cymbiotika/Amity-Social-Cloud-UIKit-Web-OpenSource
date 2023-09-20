import { FormattedMessage } from 'react-intl';
import Avatar from '~/core/components/Avatar';
import { PrimaryButton } from '~/core/components/Button';
import useFollow from '~/core/hooks/useFollow';
import UserTag from '~/social/components/UserTag';
import { roleRenderer, userId } from '~/social/constants';
import { useNavigation } from '~/social/providers/NavigationProvider';
function UserSearchResult({ user }) {
  const { onClickUser } = useNavigation();

  const { follow, followDecline, isFollowPending, isFollowNone, isFollowAccepted } = useFollow(
    userId,
    user.userId,
  );
  return (
    <div
      className="flex flex-row p-4 rounded-md bg-white mb-3 gap-4 cursor-pointer items-center"
      onClick={() => onClickUser(user.userId)}
    >
      <Avatar avatar={user?.avatarFile?.fileUrl} />
      <div className="flex flex-col max-w-[calc(100%-108px)]">
        <h1>{user.displayName}</h1>
        <div className="flex flex-row gap-2 flex-wrap gap-y-0">
          <UserTag text={user?.metadata?.ariseTier} />
          <UserTag text={roleRenderer(user?.roles[0])} variant="role" />
        </div>
      </div>
      {!isFollowAccepted && (
        <PrimaryButton
          data-qa-anchor="community-info-join-button"
          onClick={(e) => {
            e.stopPropagation();
            follow();
            setFollowingStatus(true);
          }}
          className="w-[68px] h-9 ml-auto"
        >
          <FormattedMessage id="user.follow" />
        </PrimaryButton>
      )}
    </div>
  );
}

export default UserSearchResult;

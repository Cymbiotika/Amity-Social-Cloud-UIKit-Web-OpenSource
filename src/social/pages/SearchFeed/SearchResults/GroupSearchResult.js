import { FileRepository, ImageSize } from '@amityco/js-sdk';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { PrimaryButton } from '~/core/components/Button';
import useCommunity from '~/social/hooks/useCommunity';
import { useNavigation } from '~/social/providers/NavigationProvider';
import { PlusIcon } from '../../CommunityEdit/styles';

function GroupSearchResult({ group }) {
  const { onClickCommunity, onClickUser } = useNavigation();
  const {
    community: { isJoined },
    communityCategories,
    joinCommunity,
    leaveCommunity,
  } = useCommunity(group.communityId);

  const fileUrl = useMemo(
    () =>
      group.avatarFileId &&
      FileRepository.getFileUrlById({
        fileId: group.avatarFileId,
        imageSize: ImageSize.Large,
      }),
    [group.avatarFileId],
  );

  console.log(group);
  return (
    <div
      className="flex flex-col rounded-md bg-white mb-1 cursor-pointer"
      onClick={() => onClickCommunity(group.communityId)}
    >
      {/* <div className="h-"></div> */}

      <div
        className=" h-[140px] bg-cym-lightgrey rounded-t-md"
        style={{
          backgroundImage: `url(${fileUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      ></div>
      <div className="p-4 flex flex-col gap-1">
        <h1 className="xs:cym-h-2-sm md:cym-h-2 xl:cym-h-2-lg">{group.displayName}</h1>
        <p className="text-cym-placeholdergrey">{group.membersCount} Members</p>
        <p className="">{group.description}</p>
        {!isJoined && (
          <PrimaryButton
            data-qa-anchor="community-info-join-button"
            onClick={(e) => {
              e.stopPropagation();
              joinCommunity(communityId);
            }}
            className="w-[130px] h-9 mt-3 text-start"
          >
            <PlusIcon /> <FormattedMessage id="community.join" />
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}

export default GroupSearchResult;

import React, { useEffect, useState } from 'react';
import { userId } from '~/social/constants';
import { useNavigation } from '~/social/providers/NavigationProvider';
import useUser from '~/core/hooks/useUser';
import useFollow from '~/core/hooks/useFollow';
import Avatar from '~/core/components/Avatar';

const UserCard = ({ targetId, removedIds, setRemovedIds, pageContext }) => {
  const { onClickUser } = useNavigation();
  const { user, file } = useUser(`${targetId}`);
  const { follow, isFollowAccepted } = useFollow(userId, `${targetId}`);

  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);  do we want to show some kind of success tooltip?
  // const [showErrorMessage, setShowErrorMessage] = useState(false); do we want to show some kind of success tooltip?

  const isMe = userId === `${targetId}`;

  const userName = user?.displayName;
  const avatarUrl = file?.fileUrl;

  const handleViewProfile = () => {
    onClickUser(`${targetId}`);
  };
  const handleFollow = async () => {
    try {
      await follow();
      if (isFollowAccepted) {
        console.log('successful');
        // setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error('Error in follow request:', error);
      // setShowErrorMessage(true);
    }
  };

  const handleRemoveUser = () => {
    setRemovedIds([...removedIds, targetId]);
  };

  if (!isMe && !isFollowAccepted) {
    return (
      <div
        className={`px-[15px] py-[10px] snap-center border rounded-md border-zinc-200 bg-[#f7f7f7] shrink-0 ${
          pageContext === 'recommended-users-page'
            ? 'w-auto'
            : 'w-[152px] md:w-[137px] lg:w-[152px]'
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <button type="button" className="self-end" onClick={() => handleRemoveUser()}>
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex self-end"
              >
                <path
                  d="M11.25 4.42926L3.75 11.9293"
                  stroke="#222222"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.75 4.42926L11.25 11.9293"
                  stroke="#222222"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button type="button" onClick={() => handleViewProfile()}>
              <Avatar avatar={avatarUrl} className="mb-[8px] mx-auto" size="big" />
              <p>{userName}</p>
            </button>
          </div>

          <button
            type="button"
            className="w-full mt-[15px] bg-[#005850] text-white font-semibold px-[15px] py-[8px] rounded-[10px]"
            onClick={handleFollow}
          >
            Follow
          </button>
        </div>
      </div>
    );
  }
};

export default UserCard;

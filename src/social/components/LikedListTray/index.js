import { ReactionRepository } from '@amityco/js-sdk';
import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { useNavigation } from '~/social/providers/NavigationProvider';

import Avatar from '~/core/components/Avatar';
import { backgroundImage as UserImage } from '~/icons/User';
import ServerAPI from '~/social/pages/Application/ServerAPI';
import UserLoading from './UserLoading';

const SlideOutContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: white;
  transition: right 0.2s ease-in-out;
  z-index: 60;
  padding: 0 17.5px;
  @media screen and (max-width: 768px) {
    width: 100vw;
    right: -100vw;
  }
  @media screen and (min-width: 769px) {
    width: 400px;
    right: -400px;
  }
  &.open {
    right: 0;
  }
`;

const SlideOutHeader = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
`;
const SlideOutContent = styled.div`
  padding-top: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: auto;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const SlideOutOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  pointer-events: none;
  z-index: 50;

  &.open {
    opacity: 1;
    pointer-events: auto;
  }
`;

const LikedListTray = ({ postId, trayIsVisible, setTrayIsVisible }) => {
  const server = ServerAPI();
  const [users, setUsers] = useState([]);

  const { onClickUser } = useNavigation();

  const fetchUsers = async () => {
    const liveCollection = ReactionRepository.queryReactions({
      referenceId: postId,
      referenceType: 'post',
    });

    liveCollection.on('dataUpdated', async (reactions) => {
      const url = 'https://api.us.amity.co/api/v3/users/list?';
      const arr = [];
      reactions.map((reaction) => arr.push(`userIds=${reaction.userId}`));
      const requestUrl = url + arr.join('&');
      const usersResponseData = await server.likedList(requestUrl);
      usersResponseData.users = usersResponseData.users
        .filter((user) => !user.isDeleted)
        .map((user) => {
          return {
            id: user.userId,
            fullName: user.displayName,
            profilePictureId: user.avatarFileId,
            email: user.metadata.userEmail,
            bio: user.description,
          };
        });
      setUsers(usersResponseData.users);
      if (liveCollection && liveCollection.loadingStatus === 'loaded' && liveCollection.hasMore) {
        liveCollection.nextPage();
      }
    });
  };

  if (trayIsVisible) {
    document.body.style.overflow = 'hidden';
  }

  const hideTray = () => {
    setTrayIsVisible(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    fetchUsers();
  }, [postId]);

  return (
    <>
      <SlideOutOverlay className="slideout-overlay open" />
      <SlideOutContainer className="slideout-container open z-[100]">
        <SlideOutHeader>
          <button
            className="w-6 h-6 flex items-center absolute"
            type="button"
            onClick={() => hideTray()}
          >
            <FiX className="w-4 h-4" />
          </button>
          <h1 className="cym-h-2-lg mx-auto">Likes</h1>
        </SlideOutHeader>
        <SlideOutContent className="flex flex-col h-full liked-list pb-[58px]">
          {!users.length ? (
            <UserLoading />
          ) : (
            users.map((user, idx) => (
              <div
                key={idx}
                className="flex items-center my-2 cursor-pointer"
                onClick={() => onClickUser(user.id)}
              >
                <Avatar
                  data-qa-anchor="header-avatar"
                  avatar={`https://api.us.amity.co/api/v3/files/${user.profilePictureId}/download`}
                  backgroundImage={UserImage}
                />
                <div>
                  <span className="mx-2">{user.fullName}</span>
                  {/* profile bio? */}
                </div>
                {/* follow button will go here */}
              </div>
            ))
          )}
        </SlideOutContent>
      </SlideOutContainer>
    </>
  );
};

export default LikedListTray;

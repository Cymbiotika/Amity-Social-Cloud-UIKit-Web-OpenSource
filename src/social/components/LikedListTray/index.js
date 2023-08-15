import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactionRepository } from '@amityco/js-sdk';
import { FiX } from 'react-icons/fi';
import { useNavigation } from '~/social/providers/NavigationProvider';

import ServerAPI from '~/social/pages/Application/ServerAPI';
import UserLoading from './UserLoading';
import Avatar from '~/core/components/Avatar';
import { backgroundImage as UserImage } from '~/icons/User';

const SlideOutContainer = styled.div`
  padding: 0 17.5px;
  @media screen and (max-width: 768px) {
    width: 100vw;
    right: -100vw;
  }
  @media screen and (min-width: 769px) {
    width: 400px;
    right: -400px;
  }
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: white;
  transition: right 0.2s ease-in-out;
  z-index: 1000;

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
  padding: 16px 0;
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
  z-index: 700;

  &.open {
    opacity: 1;
    pointer-events: auto;
  }
`;

const LikedListTray = ({ postId, setTrayIsVisible }) => {
  const server = ServerAPI();
  const [users, setUsers] = useState([]);

  const { onClickUser } = useNavigation();

  const fetchReactions = () => {
    console.log('fetched reactions will go here');
  };

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
      usersResponseData.users = usersResponseData.users.map((user) => {
        return {
          id: user.userId,
          fullName: user.displayName,
          profilePictureId: user.avatarFileId,
          email: user.metadata.userEmail,
          bio: user.description,
        };
      });
      setUsers(usersResponseData.users);
    });
  };

  useEffect(() => {
    fetchUsers();
    fetchReactions();
  }, [postId]);

  return (
    <>
      <SlideOutOverlay className="slideout-overlay open" />
      <SlideOutContainer className="slideout-container open z-[100]">
        <SlideOutHeader>
          <button
            className="w-6 h-6 flex items-center justify-start"
            onClick={() => setTrayIsVisible(false)}
            type="button"
          >
            <FiX className="w-4 h-4" />
          </button>
          <h1 className="cym-h-2-lg">Likes</h1>
        </SlideOutHeader>
        <SlideOutContent className="flex flex-col h-full liked-list px-5">
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

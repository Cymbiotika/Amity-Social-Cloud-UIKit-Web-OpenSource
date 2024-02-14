import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { FiX } from 'react-icons/fi';
import Avatar from '~/core/components/Avatar';
import { backgroundImage as UserImage } from '~/icons/User';
import { useNavigation } from '~/social/providers/NavigationProvider';
import MembersLoading from './MembersLoading';
import ServerAPI from '~/social/pages/Application/ServerAPI';

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
  z-index: 50;

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
  z-index: 700;

  &.open {
    opacity: 1;
    pointer-events: auto;
  }
`;

const SidebarOverlay = ({ setSideBarIsVisible, communityId }) => {
  const server = ServerAPI();
  const [communityUser, setCommunityUser] = useState([]);

  const { onClickUser } = useNavigation();
  const userIdSet = new Set();

  const fetchCommunityUsers = async () => {
    const communityUsersResp = await server.getCommunityUsers(communityId);
    console.log('community users', communityUsersResp.length);
    const usersArray = communityUsersResp;
    /*
    fix this asap
    usersArray.map((user) => {
      console.log('community user', user.displayName);
      return {
        id: user.userId,
        fullName: user.displayName,
        profilePictureId: user.avatarFileId,
        email: user.metadata.userEmail,
        bio: user.description,
      };
    });
    */
    setCommunityUser(usersArray);
  };

  useEffect(() => {
    fetchCommunityUsers();
  }, [communityId]);

  return (
    <>
      <SlideOutOverlay className="slideout-overlay open" />
      <SlideOutContainer className="slideout-container open z-[100]">
        <SlideOutHeader>
          <button
            className="w-6 h-6 flex items-center absolute"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSideBarIsVisible(false);
            }}
          >
            <FiX className="w-4 h-4" />
          </button>
          <h1 className="cym-h-2-lg mx-auto">Group Members</h1>
        </SlideOutHeader>
        <SlideOutContent className="flex flex-col h-full liked-list pb-[58px]">
          {!communityUser.length ? (
            <MembersLoading />
          ) : (
            communityUser.map((user, idx) => {
              // Check if the userId is already encountered
              if (!userIdSet.has(user.userId)) {
                userIdSet.add(user.userId); // Add userId to the Set

                return (
                  <button
                    key={idx}
                    className="flex items-center my-2 cursor-pointer"
                    type="button"
                    onClick={() => onClickUser(user.userId)}
                  >
                    <Avatar
                      data-qa-anchor="header-avatar"
                      avatar={`https://api.us.amity.co/api/v3/files/${user.avatarFileId}/download`}
                      backgroundImage={UserImage}
                    />
                    <div>
                      <span className="mx-2">{user.displayName}</span>
                    </div>
                  </button>
                );
              }

              return null; // Skip rendering duplicate userIds
            })
          )}
        </SlideOutContent>
      </SlideOutContainer>
    </>
  );
};

export default SidebarOverlay;

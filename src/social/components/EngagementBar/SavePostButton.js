import React from 'react';
import { FaRegBookmark } from 'react-icons/fa';

import { SecondaryButton } from '~/core/components/Button';
import ServerAPI from '~/social/pages/Application/ServerAPI';

const SavePostButton = ({ postId, currentUserId, setPostIsSaved }) => {
  // i hate prop drilling: currentUserId
  const server = ServerAPI();

  const handleSavePost = async () => {
    const ariseUserId = currentUserId;
    try {
      const userResp = await server.getUserMetaData(ariseUserId);
      const fetchedMetadata = userResp.users[0].metadata;
      let { savedPostIds } = userResp.users[0].metadata;

      if (savedPostIds === undefined) {
        savedPostIds = [postId];
        const savePostResp = await server.savePost(ariseUserId, fetchedMetadata, savedPostIds);
      } else {
        // add post id to existing array savedPosts
        savedPostIds.push(postId);
        const savePostResp = await server.savePost(ariseUserId, fetchedMetadata, savedPostIds);
        console.log('add to the array');
      }
      setPostIsSaved(true);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <SecondaryButton className="absolute right-0" onClick={() => handleSavePost()}>
      <FaRegBookmark className="h-[16px] w-auto mr-1" />
      <span className="!ml-0">Save</span>
    </SecondaryButton>
  );
};

export default SavePostButton;

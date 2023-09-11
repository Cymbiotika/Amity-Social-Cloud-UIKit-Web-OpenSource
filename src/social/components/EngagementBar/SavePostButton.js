import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { FaRegBookmark } from 'react-icons/fa';

import { SecondaryButton } from '~/core/components/Button';
import ServerAPI from '~/social/pages/Application/ServerAPI';

const SavePostButton = ({ postId, currentUserId, postIsSaved }) => {
  // i hate prop drilling: currentUserId
  const server = ServerAPI();

  const handleSavePost = async () => {
    console.log(`saved post ${postId}!`);
    console.log(`current user ${currentUserId}!`);
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
    } catch (error) {
      console.error('Error fetching Rewards data:', error);
    }
  };

  if (postIsSaved === true) {
    console.log(`you saved post ${postId}`);
  }

  return (
    <SecondaryButton className="absolute right-0" onClick={() => handleSavePost()}>
      <FaRegBookmark className="h-[16px] w-auto mr-1" />
      <FormattedMessage id="save" />
    </SecondaryButton>
  );
};

export default SavePostButton;

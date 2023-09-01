import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

import { SecondaryButton } from '~/core/components/Button';
import ServerAPI from '~/social/pages/Application/ServerAPI';

// import ServerAPI from '~/social/pages/Application/ServerAPI';

const SavePostButton = ({ postId, currentUserId, postIsSaved }) => {
  // i hate prop drilling: currentUserId
  const server = ServerAPI();

  let savedPosts;
  const handleSavePost = async (savedPosts) => {
    console.log(`saved post ${postId}!`);
    console.log(`current user ${currentUserId}!`);
    const ariseUserId = currentUserId;
    try {
      const userResp = await server.getUserMetaData(ariseUserId);
      const fetchedMetadata = userResp.users[0].metadata;
      let { savedPostIds } = userResp.users[0].metadata;

      console.log('fetched meta', fetchedMetadata);
      if (savedPostIds === undefined) {
        // create savedPosts array => add postId to array
        savedPostIds = [postId];
        savedPosts = savedPostIds;
        const savePostResp = await server.savePost(ariseUserId, fetchedMetadata, savedPostIds);
      } else {
        // add post id to existing array savedPosts
        savedPostIds.push(postId);
        savedPosts = savedPostIds;
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
      <FaRegBookmark className="h-[16px] w-auto mr-1" /> <FormattedMessage id="save" />
      <FaBookmark className="h-[16px] w-auto mr-1" /> <FormattedMessage id="saved" />
    </SecondaryButton>
  );
};

export default SavePostButton;

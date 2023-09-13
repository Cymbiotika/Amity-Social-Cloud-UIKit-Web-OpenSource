import React, { useEffect, useState } from 'react';
import Post from '~/social/components/post/Post';
import DefaultPostRenderer from '~/social/components/post/Post/DefaultPostRenderer';
import { SavedPostsContainer } from './styles';
import EmptyState from '../EmptyState';
import { EmptyStateContainer } from '../EmptyState/styles';

import ServerAPI from '~/social/pages/Application/ServerAPI';

const SavedPosts = ({ userId, isMe }) => {
  const [loading, setLoading] = useState(true);
  const [mySavedPosts, setMySavedPosts] = useState([]);

  function renderLoadingSkeleton() {
    return new Array(3).fill(3).map((x, index) => <DefaultPostRenderer key={index} loading />);
  }

  useEffect(() => {
    const server = ServerAPI();
    const getMySavedPosts = async () => {
      try {
        const fetchUserData = await server.getUserMetaData(userId);
        const savedPostsResp = fetchUserData.users[0].metadata.savedPostIds;
        setMySavedPosts(savedPostsResp);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved post data:', error);
      }
    };
    getMySavedPosts();
  }, [userId]);

  return (
    <SavedPostsContainer>
      {loading && renderLoadingSkeleton()}
      {!loading && mySavedPosts === undefined ? (
        <EmptyStateContainer>
          <EmptyState
            // icon={icon}
            title="Nothing to see here."
            description="You have no saved posts"
          />
        </EmptyStateContainer>
      ) : null}
      {!loading &&
        mySavedPosts &&
        mySavedPosts.map((postId, index) => <Post key={index} postId={postId} />)}
    </SavedPostsContainer>
  );
};

export default SavedPosts;

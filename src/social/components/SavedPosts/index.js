import React, { useEffect, useState } from 'react';
import Post from '~/social/components/post/Post';
import DefaultPostRenderer from '~/social/components/post/Post/DefaultPostRenderer';
import { SavedPostsContainer } from './styles';

import { ContentSkeleton } from '../post/Post/styles';

import ServerAPI from '~/social/pages/Application/ServerAPI';

const SavedPosts = ({ userId }) => {
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
        console.log(mySavedPosts);
      } catch (error) {
        console.error('Error fetching saved post data:', error);
      }
    };
    getMySavedPosts();
  }, [userId]);

  return (
    <SavedPostsContainer>
      {/* {userId} */}
      {loading && renderLoadingSkeleton()}
      {!loading && mySavedPosts.map((postId, index) => <Post key={index} postId={postId} />)}
      {/* <Post postId={'64f9fdfa79efa93a8f027792'} /> */}
    </SavedPostsContainer>
  );
};

export default SavedPosts;

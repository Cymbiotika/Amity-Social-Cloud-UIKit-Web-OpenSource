import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FaBookmark } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import { SecondaryButton } from '~/core/components/Button';
import ServerAPI from '~/social/pages/Application/ServerAPI';

const UnsavePostButton = ({ postId, currentUserId, setPostIsSaved }) => {
  const server = ServerAPI();
  console.log('UwU', currentUserId);
  const handleUnsavePost = async () => {
    const ariseUserId = currentUserId;
    try {
      const fetchUserData = await server.getUserMetaData(currentUserId);
      const fetchedMetadata = fetchUserData.users[0].metadata;
      const savedPostIdsArray = fetchUserData.users[0].metadata.savedPostIds;

      if (savedPostIdsArray.includes(postId)) {
        const savedPostIds = savedPostIdsArray.filter((id) => id !== postId);
        console.log(`updated saved posts array ${savedPostIds}`);
        try {
          const savePostResp = await server.savePost(ariseUserId, fetchedMetadata, savedPostIds);
        } catch (error) {
          console.error('Error unsaving post:', error);
        }
      }
      setPostIsSaved(false);
    } catch (error) {
      console.error('Error fetching saved post data:', error);
    }
  };

  return (
    <SecondaryButton className="absolute right-0" onClick={() => handleUnsavePost()}>
      <IconContext.Provider value={{ color: '#005850', className: 'global-class-name' }}>
        <FaBookmark className="h-[16px] w-auto mr-1" />
        <FormattedMessage id="Saved" />
      </IconContext.Provider>
    </SecondaryButton>
  );
};

export default UnsavePostButton;

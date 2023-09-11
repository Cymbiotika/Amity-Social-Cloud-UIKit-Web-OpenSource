import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FaBookmark } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import { SecondaryButton } from '~/core/components/Button';
import ServerAPI from '~/social/pages/Application/ServerAPI';

const UnsavePostButton = ({ postId, currentUserId, postIsSaved }) => {
  const server = ServerAPI();
  console.log('UwU', currentUserId);
  const handleUnsavePost = async () => {
    try {
      const fetchUserData = await server.getUserMetaData(currentUserId);
      const savedPostIdsArray = fetchUserData.users[0].metadata.savedPostIds;
      console.log(savedPostIdsArray);
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

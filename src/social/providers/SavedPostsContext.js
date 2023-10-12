// prop drilling sucks. thats why we use context.
import React, { createContext, useContext, useEffect, useState } from 'react';
import ServerAPI from '~/social/pages/Application/ServerAPI';
import { userId } from '~/social/constants';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const SavedPostsProvider = ({ children }) => {
  const [savedPostIds, setSavedPostIds] = useState([]);
  const [userRole, setUserRole] = useState([]);

  const server = ServerAPI();

  const getSavedPostStatus = async () => {
    try {
      const userMetaResp = await server.getUserMetaData(userId);
      const postIds = userMetaResp.users[0].metadata.savedPostIds;
      const savedPostIdsArray = postIds;
      setSavedPostIds(savedPostIdsArray);
      setUserRole(userMetaResp.users[0].roles);
    } catch (error) {
      console.error('Error fetching your saved post data:', error);
    }
  };
  useEffect(() => {
    getSavedPostStatus();
  }, []);
  return <LocalStateProvider value={{ savedPostIds, userRole }}>{children}</LocalStateProvider>;
};

// custom hook: access saved posts data

function useSavedPostData() {
  // consumer to access the fetched data
  const all = useContext(LocalStateContext);
  return all;
}
export { SavedPostsProvider, useSavedPostData };

import React, { createContext, useContext, useState, useEffect } from 'react';
import useRecommendedCommunitiesList from '~/social/hooks/useRecommendedCommunitiesList';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const RecommendedGroupsProvider = ({ children }) => {
  // this is our own custom provider. we will store data (state) and funcitionallity (updaters) in here; and anyone can access it via the consumer!

  const [communities] = useRecommendedCommunitiesList();
  const recgroups = communities.communities;

  if (!communities?.length) return null;

  // console.log('recc comm', communities);

  return <LocalStateProvider value={{ communities, recgroups }}>{children}</LocalStateProvider>;
};

// custom hook for accessing reccomneded group data
const useRecommendedGroupContext = () => {
  // user a `consumer` to access the local state
  const all = useContext(LocalStateContext);
  return all;
};

export { RecommendedGroupsProvider, useRecommendedGroupContext };

import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import BackLink from '~/core/components/BackLink';
import Button from '~/core/components/Button';
import useUserQuery from '~/core/hooks/useUserQuery';
import SocialSearchv2 from '~/social/components/SocialSearchv2';
import Post from '~/social/components/post/Post';
import useCommunitiesList from '~/social/hooks/useCommunitiesList';
import ServerAPI from '../Application/ServerAPI';
import GroupSearchResult from './SearchResults/GroupSearchResult';
import UserSearchResult from './SearchResults/UserSearchResult';

const SearchFeed = ({ searchQuery }) => {
  // const { post } = usePost(targetId);
  const navbarTabs = [
    { label: 'All', filterId: 'all' },
    { label: 'Groups', filterId: 'groups' },
    { label: 'Accounts', filterId: 'accounts' },
    { label: 'Posts', filterId: 'posts' },
  ];
  const [selected, setSelected] = useState(navbarTabs.findIndex((item) => item.label === 'All'));
  const handleSelected = (index) => {
    setSelected(index);
  };
  const server = ServerAPI();

  const [postLoading, setPostLoading] = useState(true);
  const [postResults, setPostResults] = useState([]);

  const [users = [], hasMoreUsers, loadMoreUsers] = useUserQuery(searchQuery);
  const filteredUsers = users[0].filter((user) => !user.isDeleted);

  const [groups, hasMoreCommunities, loadMoreCommunities] = useCommunitiesList({
    search: searchQuery,
  });

  const queryPosts = async () => {
    const searchPostsResponse = await server.getPosts(searchQuery);
    const {
      postIds,
      objects: { posts },
    } = await searchPostsResponse;
    setPostResults(postIds.map((postId) => posts.find((post) => post.postId === postId)));
    setPostLoading(false);
  };
  useEffect(() => {
    setPostLoading(true);
    queryPosts();
  }, [searchQuery]);

  const getPagination = (activeTab) => {
    const hasMore = activeTab === 'groups' ? hasMoreCommunities : hasMoreUsers;
    const loadMore = activeTab === 'groups' ? loadMoreCommunities : loadMoreUsers;

    return hasMore ? loadMore : undefined;
  };

  const loadMore = getPagination(navbarTabs[selected].filterId);

  const LoadMoreButton = loadMore && !filteredUsers.every((user) => user.isDeleted) && (
    <Button fullWidth onClick={loadMore}>
      <FormattedMessage id="loadMore" />
    </Button>
  );
  return (
    <div className="flex flex-col w-full mx-auto py-7 max-w-[550px]">
      <SocialSearchv2 className="md:hidden" defaultValue={searchQuery} />
      <BackLink
        className="xs:hidden md:block"
        text={
          <div className="flex flex-row items-center">
            <svg
              width="11"
              height="16"
              viewBox="0 0 11 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12L1 8L5 4"
                stroke="#222222"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <h1 className="underline text-[#292B32]">Back</h1>
          </div>
        }
      />

      {/* Search Feed Header */}
      <div className="flex flex-col gap-4 my-6">
        <h1 className="uppercase text-[#767676]">Search Results For:</h1>
        <span className="xs:!cym-h-1-sm md:cym-h-1 xl:cym-h-1-lg">{searchQuery}</span>
      </div>

      {/* Search Feed Navbar */}
      <nav
        id="search-suggestions-navbar"
        className="flex flex-row h-[48px] justify-around bg-white rounded-md"
      >
        {navbarTabs.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelected(index)}
            className={`flex-1 flex justify-center cursor-pointer items-center ${
              index === selected ? 'text-cym-teal border-b-2 border-b-cym-teal' : ''
            }`}
          >
            <p>{item.label}</p>
          </div>
        ))}
      </nav>

      {navbarTabs[selected].filterId === 'all' && (
        <div className="flex flex-col">
          {!groups.length && !filteredUsers.length && !postResults.length && !postLoading && (
            <p className="text-cym-placeholdergrey mt-4">Nothing to see here.</p>
          )}

          {!!groups.length && (
            <div className="mt-3">
              {groups.map((group) => (
                <GroupSearchResult group={group} />
              ))}
            </div>
          )}

          {!!filteredUsers.length && (
            <div className="mt-3">
              {filteredUsers.map((user) => (
                <UserSearchResult user={user} />
              ))}
            </div>
          )}

          {postLoading ? (
            <p className="text-cym-placeholdergrey my-2">Loading posts...</p>
          ) : (
            <div className="mt-3">
              {postResults.map(({ postId }, index) => (
                <Post className="mb-3" postId={postId} />
              ))}
            </div>
          )}
        </div>
      )}

      {navbarTabs[selected].filterId === 'groups' && (
        <div className="mt-3 flex flex-col">
          {!groups.length && <p className="text-cym-placeholdergrey mt-1">Nothing to see here.</p>}

          {groups.map((group) => (
            <GroupSearchResult group={group} />
          ))}
        </div>
      )}
      {navbarTabs[selected].filterId === 'accounts' && (
        <div className="mt-3 flex flex-col">
          {!filteredUsers.length && (
            <p className="text-cym-placeholdergrey mt-1">Nothing to see here.</p>
          )}
          {filteredUsers.map((user) => (
            <UserSearchResult user={user} />
          ))}
          {LoadMoreButton}
        </div>
      )}
      {navbarTabs[selected].filterId === 'posts' && (
        <div className="mt-3 flex flex-col">
          {!postLoading && !postResults.length && (
            <p className="text-cym-placeholdergrey mt-1">Nothing to see here.</p>
          )}

          {postLoading ? (
            <p className="text-cym-placeholdergrey my-2">Loading posts...</p>
          ) : (
            <>
              {postResults.map(({ postId }, index) => (
                <Post className="mb-3" postId={postId} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

SearchFeed.defaultProps = {
  searchQuery: ' ', // Set the default value to a space character
};
export default SearchFeed;

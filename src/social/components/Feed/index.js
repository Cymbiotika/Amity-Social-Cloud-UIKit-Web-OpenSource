import { CommunityFilter, FeedType, PostRepository, PostTargetType } from '@amityco/js-sdk';
import PropTypes from 'prop-types';
import React, { memo, useState, useEffect } from 'react';
import DefaultPostRenderer from '~/social/components/post/Post/DefaultPostRenderer';
import { PageTypes } from '~/social/constants';

import ConditionalRender from '~/core/components/ConditionalRender';
import customizableComponent from '~/core/hocs/customization';
import EmptyFeed from '~/social/components/EmptyFeed';
import LoadMore from '~/social/components/LoadMore';
import PrivateFeed from '~/social/components/PrivateFeed';
import PostCreator from '~/social/components/post/Creator';
import Post from '~/social/components/post/Post';
import useCommunitiesList from '~/social/hooks/useCommunitiesList';
import useFeed from '~/social/hooks/useFeed';
import { FeedScrollContainer } from './styles';

// import NewsFeedTrendingList from '../community/NewsFeedTrendingList';

import { useNavigation } from '~/social/providers/NavigationProvider';

const queryParams = { filter: CommunityFilter.Member };

const postLiveObject = PostRepository.postForId('64b6ab1efc7ca338eeced8b1');
postLiveObject.once('dataUpdated', (model) => {
  console.log('Post', model.data.text);
});

const Feed = ({
  className = null,
  feedType,
  targetType = PostTargetType.MyFeed,
  targetId = '',
  showPostCreator = false,
  onPostCreated,
  goToExplore,
  readonly = false,
  isHiddenProfile = false,
  pinned,
}) => {
  const { page } = useNavigation();
  const enablePostTargetPicker = targetType === PostTargetType.GlobalFeed;

  const [posts, hasMore, loadMore, loading, loadingMore] = useFeed({
    targetType,
    targetId,
    feedType,
  });

  const [pinnedPostId, setPinnedPostId] = useState('');
  const [firstPostId, setFirstPostId] = useState('');
  const [updatedPostsArray, setUpdatedPostsArray] = useState([]);
  const [communities, hasMoreCommunities, loadMoreCommunities] = useCommunitiesList(
    queryParams,
    false,
    () => !showPostCreator && !enablePostTargetPicker,
  );

  function renderLoadingSkeleton() {
    return new Array(3).fill(3).map((x, index) => <DefaultPostRenderer key={index} loading />);
  }

  useEffect(() => {
    setPinnedPostId('65833e86985ddd43669749d9');
    if (posts.length > 0) {
      setFirstPostId(posts[0].postId);
      if (firstPostId === pinnedPostId) {
        setUpdatedPostsArray(posts.filter((post) => post.postId !== pinnedPostId));
      }
    }
  }, [posts, firstPostId]);

  return (
    <FeedScrollContainer
      className={className}
      dataLength={posts.length}
      next={loadMore}
      hasMore={hasMore}
    >
      {/* <FeaturedVideos /> */}
      <ConditionalRender condition={!isHiddenProfile}>
        <>
          {showPostCreator && (
            <>
              <PostCreator
                data-qa-anchor="feed-post-creator-textarea"
                targetType={targetType}
                targetId={targetId}
                communities={communities}
                enablePostTargetPicker={enablePostTargetPicker}
                hasMoreCommunities={hasMoreCommunities}
                loadMoreCommunities={loadMoreCommunities}
                onCreateSuccess={onPostCreated}
              />
              {/*  */}

              {targetId === '649b243a2b963c70c54750bf' && (
                <Post
                  postId="64c940b1a31da5f25f674dc0"
                  hidePostTarget={targetType !== PostTargetType.GlobalFeed}
                  readonly={readonly}
                  pinned={pinned}
                  className="mb-[12px]"
                />
              )}
              {/* Healthy Aging */}
              {targetId === '649b239b03858406835eaaa2' && (
                <Post
                  postId="64c93d6a1cfebc15cfb7f023"
                  hidePostTarget={targetType !== PostTargetType.GlobalFeed}
                  readonly={readonly}
                  pinned={pinned}
                  className="mb-[12px]"
                />
              )}
              {/* Gut Health */}
              {targetId === '649b23322be19926f2f4d0af' && (
                <Post
                  postId="64c93df9757ede6729e875b3"
                  hidePostTarget={targetType !== PostTargetType.GlobalFeed}
                  readonly={readonly}
                  pinned={pinned}
                  className="mb-[12px]"
                />
              )}
            </>
          )}

          {loading && renderLoadingSkeleton()}

          {!loading && posts.length > 0 && (
            <LoadMore hasMore={hasMore} loadMore={loadMore} className="load-more no-border">
              {/* {page.type === PageTypes.NewsFeed && (
                <div>
                  <div className="w-max px-5">
                    <span className="!text-[18px] font-bold">Pinned Posts 📌</span>
                    <hr className="w-full h-1 bg-[#005850] rounded" />
                  </div>

                  <Post
                    postId={pinnedPostId}
                    hidePostTarget={targetType !== PostTargetType.GlobalFeed}
                    readonly={readonly}
                    pinned={pinned}
                  />
                </div>
              )} */}

              {(updatedPostsArray.length > 0 ? updatedPostsArray : posts).map(
                ({ postId }, index) => (
                  <React.Fragment key={postId}>
                    <Post
                      postId={postId}
                      hidePostTarget={targetType !== PostTargetType.GlobalFeed}
                      readonly={readonly}
                    />
                    {/* {page.type === PageTypes.NewsFeed && index === 0 && <NewsFeedTrendingList />} */}
                  </React.Fragment>
                ),
              )}

              {loadingMore && renderLoadingSkeleton()}
            </LoadMore>
          )}

          {!loading && posts.length === 0 && (
            <EmptyFeed
              targetType={targetType}
              goToExplore={goToExplore}
              canPost={showPostCreator}
              feedType={feedType}
            />
          )}
        </>
        <PrivateFeed />
      </ConditionalRender>
    </FeedScrollContainer>
  );
};

Feed.propTypes = {
  className: PropTypes.string,
  feedType: PropTypes.oneOf(Object.values(FeedType)),
  targetType: PropTypes.oneOf(Object.values(PostTargetType)),
  targetId: PropTypes.string,
  showPostCreator: PropTypes.bool,
  pinned: PropTypes.bool,
  // below is to be refactored
  goToExplore: PropTypes.func,
  readonly: PropTypes.bool,
  isHiddenProfile: PropTypes.bool,
  onPostCreated: PropTypes.func,
};

export default memo(customizableComponent('Feed', Feed));

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toHumanString } from 'human-readable-numbers';
import { FormattedMessage } from 'react-intl';
import { CommentReferenceType, ReactionRepository } from '@amityco/js-sdk';

import customizableComponent from '~/core/hocs/customization';
import ConditionalRender from '~/core/components/ConditionalRender';
import PostLikeButton from '~/social/components/post/LikeButton';
import CommentComposeBar from '~/social/components/CommentComposeBar';
import { SecondaryButton } from '~/core/components/Button';
import {
  EngagementBarContainer,
  Counters,
  InteractionBar,
  CommentIcon,
  NoInteractionMessage,
} from './styles';
import CommentList from '~/social/components/CommentList';

import LikedListTray from '../LikedListTray';

const COMMENTS_PER_PAGE = 5;

const UIEngagementBar = ({
  postId,
  targetType,
  totalLikes,
  totalComments,
  readonly,
  onClickComment,
  isComposeBarDisplayed,
  handleAddComment,
}) => {
  const [reactorIds, setReactorIds] = useState([]);
  const fetchReactionIds = async () => {
    try {
      // Fetch the reactions data asynchronously
      const liveCollection = ReactionRepository.queryReactions({
        referenceId: `${postId}`,
        referenceType: 'post',
      });

      // Wait for the 'dataUpdated' event using Promise
      const reactions = await new Promise((resolve) => {
        liveCollection.on('dataUpdated', (reactions) => {
          // Resolve the Promise with the fetched reactions
          resolve(reactions);
        });
      });

      // Process the fetched data and update the state
      const reactorIds = reactions.map((reaction) => reaction.userId);
      setReactorIds(reactorIds);

      // Log the fetched data and reactorIds

      document.querySelector('.slideout-overlay').classList.add('open');
      document.querySelector('.slideout-container').classList.add('open');
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };
  // useEffect: dep watch for reactorIds
  useEffect(() => {
    fetchReactionIds();
  }, []);

  return (
    <EngagementBarContainer>
      <Counters>
        {totalLikes > 0 && (
          <>
            <button
              data-qa-anchor="engagement-bar-like-counter"
              type="button"
              onClick={() => fetchReactionIds()}
            >
              {toHumanString(totalLikes)}{' '}
              <FormattedMessage id="plural.like" values={{ amount: totalLikes }} />
            </button>
            <LikedListTray className="flex flex-col h-full" reactorIds={reactorIds} />
          </>
        )}

        {totalComments > 0 && (
          <span data-qa-anchor="engagement-bar-comment-counter">
            {toHumanString(totalComments)}{' '}
            <FormattedMessage id="plural.comment" values={{ amount: totalComments }} />
          </span>
        )}
      </Counters>
      <ConditionalRender condition={!readonly}>
        <>
          <InteractionBar>
            <PostLikeButton postId={postId} />
            <SecondaryButton
              data-qa-anchor="engagement-bar-comment-button"
              onClick={onClickComment}
            >
              <CommentIcon /> <FormattedMessage id="comment" />
            </SecondaryButton>
          </InteractionBar>
          <CommentList
            referenceId={postId}
            referenceType={CommentReferenceType.Post}
            last={COMMENTS_PER_PAGE}
          />

          {isComposeBarDisplayed && (
            <CommentComposeBar postId={postId} postType={targetType} onSubmit={handleAddComment} />
          )}
        </>
        <>
          <NoInteractionMessage>
            <FormattedMessage id="community.cannotInteract" />
          </NoInteractionMessage>
          <CommentList
            referenceId={postId}
            referenceType={CommentReferenceType.Post}
            last={COMMENTS_PER_PAGE}
            readonly
            loadMoreText={<FormattedMessage id="collapsible.viewAllComments" />}
          />
        </>
      </ConditionalRender>
    </EngagementBarContainer>
  );
};

UIEngagementBar.propTypes = {
  postId: PropTypes.string,
  targetType: PropTypes.string,
  reactorIds: PropTypes.string,
  totalLikes: PropTypes.number,
  totalComments: PropTypes.number,
  readonly: PropTypes.bool,
  isComposeBarDisplayed: PropTypes.bool,
  handleAddComment: PropTypes.func,
  onClickComment: PropTypes.func,
};

UIEngagementBar.defaultProps = {
  postId: '',
  targetType: '',
  reactorIds: '',
  totalLikes: 0,
  totalComments: 0,
  readonly: false,
  onClickComment: () => {},
  isComposeBarDisplayed: false,
  handleAddComment: () => {},
};

export default customizableComponent('UIEngagementBar', UIEngagementBar);

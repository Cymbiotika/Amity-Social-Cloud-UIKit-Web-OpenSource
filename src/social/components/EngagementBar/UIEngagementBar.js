import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toHumanString } from 'human-readable-numbers';
import { FormattedMessage } from 'react-intl';
import { CommentReferenceType, ReactionRepository } from '@amityco/js-sdk';

import customizableComponent from '~/core/hocs/customization';
import ConditionalRender from '~/core/components/ConditionalRender';
import PostLikeButton from '~/social/components/post/LikeButton';
import CommentComposeBar from '~/social/components/CommentComposeBar';
import SavePostButton from './SavePostButton';
import UnsavePostButton from './UnsavePostButton';
import { SecondaryButton } from '~/core/components/Button';
import {
  EngagementBarContainer,
  Counters,
  InteractionBar,
  CommentIcon,
  NoInteractionMessage,
} from './styles';
import CommentList from '~/social/components/CommentList';

import { useNavigation } from '~/social/providers/NavigationProvider';

const COMMENTS_PER_PAGE = 3;

const UIEngagementBar = ({
  postId,
  targetType,
  totalLikes,
  totalComments,
  readonly,
  onClickComment,
  isComposeBarDisplayed,
  handleAddComment,
  currentUserId,
  setTrayIsVisible,
  postIsSaved,
  setPostIsSaved,
}) => {
  const { onClickNotification } = useNavigation();
  const showTray = () => {
    setTrayIsVisible(true);
  };

  return (
    <EngagementBarContainer>
      <Counters>
        {totalLikes > 0 && (
          <button data-qa-anchor="engagement-bar-like-counter" type="button" onClick={showTray}>
            {toHumanString(totalLikes)}{' '}
            <FormattedMessage id="plural.like" values={{ amount: totalLikes }} />
          </button>
        )}

        {totalComments > 0 && (
          <button
            data-qa-anchor="engagement-bar-comment-counter"
            type="button"
            onClick={() => onClickNotification(postId)}
          >
            {toHumanString(totalComments)}{' '}
            <FormattedMessage id="plural.comment" values={{ amount: totalComments }} />
          </button>
        )}
      </Counters>
      <ConditionalRender condition={!readonly}>
        <>
          <InteractionBar className="relative">
            <PostLikeButton postId={postId} />
            <SecondaryButton
              data-qa-anchor="engagement-bar-comment-button"
              onClick={onClickComment}
            >
              <CommentIcon /> <FormattedMessage id="comment" />
            </SecondaryButton>
            {postIsSaved ? (
              <UnsavePostButton
                postId={postId}
                currentUserId={currentUserId}
                postIsSaved={postIsSaved}
                setPostIsSaved={setPostIsSaved}
              />
            ) : (
              <SavePostButton
                postId={postId}
                currentUserId={currentUserId}
                postIsSaved={postIsSaved}
                setPostIsSaved={setPostIsSaved}
              />
            )}
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
  currentUserId: PropTypes.string,
  postId: PropTypes.string,
  postIsSaved: PropTypes.bool,
  targetType: PropTypes.string,
  setTrayIsVisible: PropTypes.func,
  totalLikes: PropTypes.number,
  totalComments: PropTypes.number,
  readonly: PropTypes.bool,
  isComposeBarDisplayed: PropTypes.bool,
  handleAddComment: PropTypes.func,
  onClickComment: PropTypes.func,
};

UIEngagementBar.defaultProps = {
  currentUserId: '',
  postId: '',
  postIsSaved: false,
  targetType: '',
  setTrayIsVisible: () => {},
  totalLikes: 0,
  totalComments: 0,
  readonly: false,
  onClickComment: () => {},
  isComposeBarDisplayed: false,
  handleAddComment: () => {},
};

export default customizableComponent('UIEngagementBar', UIEngagementBar);

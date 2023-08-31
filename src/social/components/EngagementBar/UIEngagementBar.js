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
import { SecondaryButton } from '~/core/components/Button';
import {
  EngagementBarContainer,
  Counters,
  InteractionBar,
  CommentIcon,
  NoInteractionMessage,
} from './styles';
import CommentList from '~/social/components/CommentList';

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
  currentUserId,
  setTrayIsVisible,
}) => {
  const showTray = () => {
    console.log('before showing the tray', postId);

    setTrayIsVisible(true);
    console.log('after showing the tray');
  };

  return (
    <EngagementBarContainer>
      <Counters>
        {totalLikes > 0 && (
          <>
            <button data-qa-anchor="engagement-bar-like-counter" type="button" onClick={showTray}>
              {toHumanString(totalLikes)}{' '}
              <FormattedMessage id="plural.like" values={{ amount: totalLikes }} />
            </button>

            {/*<span data-qa-anchor="engagement-bar-like-counter">
              {toHumanString(totalLikes)}{' '}
              <FormattedMessage id="plural.like" values={{ amount: totalLikes }} />
        </span>*/}
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
          <InteractionBar className="relative">
            <PostLikeButton postId={postId} />
            <SecondaryButton
              data-qa-anchor="engagement-bar-comment-button"
              onClick={onClickComment}
            >
              <CommentIcon /> <FormattedMessage id="comment" />
            </SecondaryButton>
            {/* <SavePostButton postId={postId} currentUserId={currentUserId} /> */}
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
  setTrayIsVisible: PropTypes.bool,
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
  setTrayIsVisible: false,
  totalLikes: 0,
  totalComments: 0,
  readonly: false,
  onClickComment: () => {},
  isComposeBarDisplayed: false,
  handleAddComment: () => {},
};

export default customizableComponent('UIEngagementBar', UIEngagementBar);

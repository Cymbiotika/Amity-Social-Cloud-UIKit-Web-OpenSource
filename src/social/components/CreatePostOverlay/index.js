import PropTypes from 'prop-types';
import React, { memo } from 'react';

import styled from 'styled-components';

import withSDK from '~/core/hocs/withSDK';

import PostCreator from '~/social/components/post/Creator';

export const Overlay = styled.div`
  display: none;
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

  .postComposeBar {
    position: relative;
  }
`;

const CancelPost = styled.button`
  padding: 10px;
  text-transform: uppercase;
  font-weight: 600;
  color: #005850;
`;

const cancelPost = () => {
  document.getElementById('create-post-overlay').style.display = 'none';
  document.getElementById('ApplicationContainer').style.overflowY = 'auto';
  document.body.style.overflow = 'auto';
};

const CreatePostOverlay = ({
  targetType = '',
  targetId = '',
  enablePostTargetPicker = true,
  communities = [],
  hasMoreCommunities,
  loadMoreCommunities,
  onPostCreated,
}) => {
  return (
    <Overlay id="create-post-overlay">
      <CancelPost id="post-cancel-button" onClick={cancelPost}>
        Cancel
      </CancelPost>
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
    </Overlay>
  );
};

CreatePostOverlay.propTypes = {
  targetType: PropTypes.string,
  targetId: PropTypes.string,
  communities: PropTypes.array,
  hasMoreCommunities: PropTypes.bool,
  loadMoreCommunities: PropTypes.func,
  enablePostTargetPicker: PropTypes.bool,
  onPostCreated: PropTypes.func,
};

export default memo(withSDK(CreatePostOverlay));

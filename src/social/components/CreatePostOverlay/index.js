import { CommunityRepository, FileType, PostTargetType, UserRepository } from '@amityco/js-sdk';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { info } from '~/core/components/Confirm';
import { useAsyncCallback } from '~/core/hooks/useAsyncCallback';
import useImage from '~/core/hooks/useImage';

import withSDK from '~/core/hocs/withSDK';
import { isEmpty } from '~/helpers';
// import useUser from '~/core/hooks/useUser';
import { notification } from '~/core/components/Notification';
import useErrorNotification from '~/core/hooks/useErrorNotification';
import useLiveObject from '~/core/hooks/useLiveObject';

import { FileLoaderContainer } from '~/core/components/Uploaders/Loader';
import { extractMetadata, formatMentionees } from '~/helpers/utils';
import { backgroundImage as CommunityImage } from '~/icons/Community';
import { backgroundImage as UserImage } from '~/icons/User';
import PollModal from '~/social/components/post/PollComposer/PollModal';
import { useNavigation } from '~/social/providers/NavigationProvider';
// import FilesUploaded from './components/FilesUploaded';
import ImagesUploaded from './components/ImagesUploaded';
import PostTargetSelector from './components/PostTargetSelector';
import UploaderButtons from './components/UploaderButtons';
import VideosUploaded from './components/VideosUploaded';

import { createPost, showPostCreatedNotification } from './utils';

import {
  Avatar,
  Footer,
  PollButton,
  PollIcon,
  PostButton,
  PostContainer,
  PostCreatorContainer,
  PostInputText,
  UploadsContainer,
} from './styles';

import promisify from '~/helpers/promisify';
import { MAXIMUM_POST_CHARACTERS, MAXIMUM_POST_MENTIONEES } from './constants';

const communityFetcher = (id) => () => CommunityRepository.communityForId(id);
const userFetcher = (id) => () => UserRepository.getUser(id);

const MAX_FILES_PER_POST = 10;

const overCharacterModal = () =>
  info({
    title: <FormattedMessage id="postCreator.unableToPost" />,
    content: <FormattedMessage id="postCreator.overCharacter" />,
    okText: <FormattedMessage id="postCreator.done" />,
    type: 'info',
  });

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
  className = '',
  currentUserId,
  connected, // connection status
  targetType = '',
  targetId = '',
  enablePostTargetPicker,
  communities = [],
  placeholder = "What's going on...",
  hasMoreCommunities,
  loadMoreCommunities,
  onCreateSuccess = () => {},
  maxFiles = MAX_FILES_PER_POST,
}) => {
  const { setNavigationBlocker } = useNavigation();
  const user = currentUserId;

  // default to me
  if (targetType === PostTargetType.GlobalFeed || targetType === PostTargetType.MyFeed) {
    /* eslint-disable no-param-reassign */
    targetType = PostTargetType.UserFeed;
    /* eslint-disable no-param-reassign */
    targetId = currentUserId;
  }
  const [target, setTarget] = useState({ targetType, targetId });
  useEffect(() => {
    setTarget({ targetType, targetId });
  }, [targetType, targetId]);

  const fetcher = target.targetType === PostTargetType.UserFeed ? userFetcher : communityFetcher;
  const model = useLiveObject(fetcher(target.targetId), [target.targetId]);

  const fileUrl = useImage({ fileId: model.avatarFileId });

  const [postText, setPostText] = useState('');
  const [plainText, setPlainText] = useState('');
  const [postImages, setPostImages] = useState([]);
  const [postVideos, setPostVideos] = useState([]);
  const [postFiles, setPostFiles] = useState([]);

  // Images/files incoming from uploads.
  const [incomingImages, setIncomingImages] = useState([]);
  const [incomingVideos, setIncomingVideos] = useState([]);
  const [incomingFiles, setIncomingFiles] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [setError] = useErrorNotification();
  const [mentionees, setMentionees] = useState([]);

  const [onCreatePost, creating] = useAsyncCallback(async () => {
    const data = {};
    const attachments = [];
    const postMentionees = {};
    const metadata = {};

    if (postText) {
      data.text = plainText;
    }

    if (postImages.length) {
      attachments.push(...postImages.map((i) => ({ fileId: i.fileId, type: FileType.Image })));
    }

    if (postVideos.length) {
      attachments.push(...postVideos.map((i) => ({ fileId: i.fileId, type: FileType.Video })));
    }

    if (postFiles.length) {
      attachments.push(...postFiles.map((i) => ({ fileId: i.fileId, type: FileType.File })));
    }

    if (mentionees.length) {
      postMentionees.type = 'user';
      postMentionees.userIds = mentionees.map(({ id }) => id);
    }

    if (data.text?.length > MAXIMUM_POST_CHARACTERS) {
      overCharacterModal();
      return;
    }

    const createPostParams = {
      ...target,
      data,
      attachments,
      metadata: {},
    };
    if (postMentionees.type && postMentionees.userIds.length > 0) {
      createPostParams.mentionees = [{ ...postMentionees }];
      const { metadata: extractedMetadata } = extractMetadata(mentionees);
      metadata.markupText = postText;
      createPostParams.metadata = { ...metadata, ...extractedMetadata };
    }

    const post = await createPost(createPostParams);

    const overlayCloseOnSuccess = () => {
      document.getElementById('create-post-overlay').style.display = 'none';
      console.log('Success!');
    };

    onCreateSuccess(post.postId, overlayCloseOnSuccess());
    setPostText('');
    setPostImages([]);
    setPostVideos([]);
    setPostFiles([]);
    setIncomingImages([]);
    setIncomingVideos([]);
    setIncomingFiles([]);
    setMentionees([]);

    showPostCreatedNotification(post, model);
  }, [postText, postImages, postVideos, postFiles, target, onCreateSuccess, model, mentionees]);

  const onMaxFilesLimit = () => {
    notification.info({
      content: <FormattedMessage id="upload.attachmentLimit" values={{ maxFiles }} />,
    });
  };

  const onFileSizeLimit = () => {
    notification.info({
      content: <FormattedMessage id="upload.fileSizeLimit" />,
    });
  };

  const backgroundImage =
    target.targetType === PostTargetType.CommunityFeed ? CommunityImage : UserImage;

  const CurrentTargetAvatar = (
    <Avatar avatar={model.avatarCustomUrl || fileUrl} backgroundImage={backgroundImage} />
  );
  const isDisabled =
    isEmpty(postText, postImages, postVideos, postFiles) || uploadLoading || creating || !connected;
  const hasChanges = !isEmpty(postText, postImages, postVideos, postFiles);

  useEffect(() => {
    if (hasChanges) {
      setNavigationBlocker({
        title: <FormattedMessage id="post.discard.title" />,
        content: <FormattedMessage id="post.discard.content" />,
        okText: <FormattedMessage id="general.action.discard" />,
      });
    } else {
      setNavigationBlocker(null);
    }
  }, [hasChanges, setNavigationBlocker]);

  const [isPollModalOpened, setPollModalOpened] = useState(false);
  const openPollModal = () => setPollModalOpened(true);

  const [mentionText, setMentionText] = useState();

  const creatorTargetType = target?.targetType ?? targetType;
  const creatorTargetId = target?.targetId ?? targetId;

  const queryMentionees = useCallback(
    async (query, cb) => {
      let keyword = query || mentionText;
      let users;

      // Weird hack to show users to show users on start
      if (keyword.match(/^@$/)) {
        keyword = undefined;
      }

      // Only fetch private community members
      if (creatorTargetType === PostTargetType.CommunityFeed && !model?.isPublic) {
        const liveCollection = CommunityRepository.getCommunityMembers({
          communityId: creatorTargetId,
          search: keyword,
        });
        const communityMembers = await promisify(liveCollection);
        users = communityMembers.map((member) => member.user);
      } else {
        const liveCollection = UserRepository.queryUsers({ keyword });
        users = await promisify(liveCollection);
      }

      cb(formatMentionees(users));
    },
    [mentionText, model?.isPublic, creatorTargetId, creatorTargetType],
  );

  return (
    <Overlay id="create-post-overlay">
      <CancelPost id="post-cancel-button" onClick={cancelPost}>
        Cancel
      </CancelPost>

      <PostCreatorContainer className={cx('postComposeBar', className)}>
        {isPollModalOpened && (
          <PollModal
            targetId={creatorTargetId}
            targetType={creatorTargetType}
            onCreatePoll={(pollId, text, pollMentionees, metadata) =>
              createPost({
                targetId: creatorTargetId,
                targetType: creatorTargetType,
                data: { pollId, text },
                dataType: 'poll',
                mentionees: pollMentionees,
                metadata,
              })
            }
            onClose={() => setPollModalOpened(false)}
          />
        )}

        {enablePostTargetPicker ? (
          <PostTargetSelector
            user={user}
            communities={communities}
            hasMoreCommunities={hasMoreCommunities}
            loadMoreCommunities={loadMoreCommunities}
            currentTargetType={target.targetType}
            currentTargetId={target.targetId}
            onChange={setTarget}
          >
            {CurrentTargetAvatar}
          </PostTargetSelector>
        ) : (
          CurrentTargetAvatar
        )}

        <PostContainer>
          <PostInputText
            data-qa-anchor="post-creator-textarea"
            multiline
            value={postText}
            placeholder={placeholder}
            mentionAllowed
            queryMentionees={queryMentionees}
            loadMoreMentionees={() => queryMentionees(mentionText)}
            // Need to work on this, possible conflict incoming
            append={
              <UploadsContainer>
                <ImagesUploaded
                  files={incomingImages}
                  uploadLoading={uploadLoading}
                  onLoadingChange={setUploadLoading}
                  onChange={setPostImages}
                  onError={setError}
                />
                <VideosUploaded
                  files={incomingVideos}
                  uploadLoading={uploadLoading}
                  onLoadingChange={setUploadLoading}
                  onChange={setPostVideos}
                  onError={setError}
                />
                {/* <FilesUploaded
                  files={incomingFiles}
                  uploadLoading={uploadLoading}
                  onLoadingChange={setUploadLoading}
                  onChange={setPostFiles}
                  onError={setError}
                /> */}
              </UploadsContainer>
            }
            onChange={({ text, plainText: plainTextVal, lastMentionText, mentions }) => {
              // Disrupt the flow
              if (mentions?.length > MAXIMUM_POST_MENTIONEES) {
                return info({
                  title: <FormattedMessage id="postCreator.unableToMention" />,
                  content: <FormattedMessage id="postCreator.overMentionees" />,
                  okText: <FormattedMessage id="postCreator.okText" />,
                  type: 'info',
                });
              }

              setMentionees(mentions);
              setMentionText(lastMentionText);
              setPostText(text);
              setPlainText(plainTextVal);
            }}
          />
          <Footer data-qa-anchor="post-creator-footer">
            <UploaderButtons
              imageUploadDisabled={postFiles.length > 0 || postVideos.length > 0 || uploadLoading}
              videoUploadDisabled={postFiles.length > 0 || postImages.length > 0 || uploadLoading}
              fileUploadDisabled={postImages.length > 0 || postVideos.length > 0 || uploadLoading}
              fileLimitRemaining={
                maxFiles - postFiles.length - postImages.length - postVideos.length
              }
              uploadLoading={uploadLoading}
              onChangeImages={setIncomingImages}
              onChangeVideos={setIncomingVideos}
              onChangeFiles={setIncomingFiles}
              onMaxFilesLimit={onMaxFilesLimit}
              onFileSizeLimit={onFileSizeLimit}
            />
            <PollButton data-qa-anchor="post-creator-poll-button" onClick={openPollModal}>
              <FileLoaderContainer>
                <PollIcon />
              </FileLoaderContainer>
            </PollButton>
            <PostButton
              disabled={isDisabled}
              data-qa-anchor="post-creator-post-button"
              onClick={onCreatePost}
            >
              <FormattedMessage id="post" />
            </PostButton>
          </Footer>
        </PostContainer>
      </PostCreatorContainer>
    </Overlay>
  );
};

CreatePostOverlay.propTypes = {
  currentUserId: PropTypes.string,
  targetType: PropTypes.string,
  targetId: PropTypes.string,
  communities: PropTypes.array,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  hasMoreCommunities: PropTypes.bool,
  loadMoreCommunities: PropTypes.func,
  enablePostTargetPicker: PropTypes.bool,
  maxFiles: PropTypes.number,
  connected: PropTypes.bool,
  onCreateSuccess: PropTypes.func,
};

export default memo(withSDK(CreatePostOverlay));

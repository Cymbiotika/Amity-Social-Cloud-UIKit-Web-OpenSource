import React from 'react';
import MicroModal from 'react-micro-modal';
import { FiX } from 'react-icons/fi';

import ServerAPI from '~/social/pages/Application/ServerAPI';

const DeletePostModal = ({
  postId,
  deletePostModalIsOpen,
  setDeletePostModalIsOpen,
  setPostDeleted,
}) => {
  const server = new ServerAPI();

  const handleDeletePost = async () => {
    try {
      console.log('postId:', postId);
      const deleteResp = await server.deletePost(postId);
      setDeletePostModalIsOpen(false);
      setPostDeleted(true);
    } catch (error) {
      console.log('Error: Could not delete post', error);
    }
  };
  return (
    <MicroModal
      // openInitially={openInitially}
      open={deletePostModalIsOpen}
      overrides={{
        Overlay: { style: { zIndex: 160 } },
        Dialog: {
          style: { margin: 10, padding: 20, maxWidth: 'auto' },
          className: 'w-[420px]',
        },
      }}
      handleClose={() => setDeletePostModalIsOpen(false)}
      closeOnOverlayClick={false}
    >
      {(close) => (
        <div className="flex flex-col relative">
          <button
            className="absolute top-[-10px] right-[-10px] self-end w-[20px] h-[20px] outline-none"
            type="button"
            onClick={close}
          >
            <FiX className="w-full h-full" />
          </button>

          <div>
            <h2 className="text-lg md:text-xl font-bold">Are you sure you want to do that?</h2>

            <p className="mt-2 text-sm md:text-md text-gray-500">
              This post will be permanently deleted. You’ll no longer to see and find this post.
              Continue?
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded transition ease-in-out delay-150 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-700 hover:text-white"
                onClick={close}
              >
                No, go back
              </button>
              <button
                type="button"
                className="rounded transition ease-in-out delay-150 bg-green-50 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-700 hover:text-white"
                onClick={handleDeletePost}
              >
                Yes, I&lsquo;m sure
              </button>
            </div>
          </div>
        </div>
      )}
    </MicroModal>
  );
};

export default DeletePostModal;

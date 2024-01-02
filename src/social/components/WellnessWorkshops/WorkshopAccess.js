import React from 'react';
import { useNavigation } from '~/social/providers/NavigationProvider';

const WorkshopAccess = ({ destructuredPostData }) => {
  const { onClickNotification } = useNavigation();

  return destructuredPostData.map((post, index) => (
    <button
      key={post.parentPostId}
      id={destructuredPostData[index]}
      className="relative overflow-hidden w-[310px] md:w-[500px] rounded-lg shadow transition hover:shadow-lg bg-white cursor-pointer"
      type="button"
      onClick={() => onClickNotification(post.parentPostId)}
    >
      <img
        alt="Workshop Thumbnail"
        src={`https://api.us.amity.co/api/v3/files/${post.thumbnailFileId}/download?size=medium`}
        className="h-full w-full object-cover md:object-initial"
      />
      <p>{post.parentPostId}</p>
    </button>
  ));
};

export default WorkshopAccess;

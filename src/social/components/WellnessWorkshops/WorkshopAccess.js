import React from 'react';
import FormattedDuration, { TIMER_FORMAT } from 'react-intl-formatted-duration';
// import { useNavigation } from '~/social/providers/NavigationProvider';

// import useNavigation to redirect to post in group feed.

const WorkshopAccess = ({
  index,
  postId,
  parentPostId,
  postData,
  fileData,
  videoFileId,
  thumbnailFileId,
}) => {
  console.log('post data', postData);
  console.log('file data', fileData);

  // extract post text
  const matchingObjects = postData.filter((item) => item.postId === parentPostId);
  const extractedData = matchingObjects.map((item) => item.data);

  const matchingFile = fileData.find((item) => item.fileId === videoFileId);
  let duration;
  if (matchingFile && matchingFile.attributes && matchingFile.attributes.metadata) {
    duration = matchingFile.attributes.metadata.video.duration;

    console.log(duration);
  }

  console.log('extracted data', extractedData[0].text);
  return postId ? (
    <>
      {/* <div
        key={key}
        className="relative w-[310px] h-[240px] md:w-[500px] md:h-[260px] px-[20px] py-[28.5px] cover rounded-[5px] overflow-hidden bg-white border border-[#edeef2]"
      >
        <div className="z-1 max-w-1/2">
          <p>{extractedData[0].text}</p>
          <FormattedDuration seconds={duration} format={TIMER_FORMAT} />
        </div>
        <div className="">
          <div className="z-0">
            <img
              src={`https://api.us.amity.co/api/v3/files/${thumbnailFileId}/download?size=large`}
              className="block absolute"
              loading="lazy"
              alt="thumb"
            />
          </div>
        </div>
      </div> */}
      <article
        key={1}
        id={postId}
        className="relative overflow-hidden w-[310px] md:w-[500px] rounded-lg shadow transition hover:shadow-lg bg-white"
      >
        <img
          alt="Office"
          // src="https://cdn.shopify.com/s/files/1/1824/8017/files/WW-Desktop-1.png?v=1695402456"
          src={`https://api.us.amity.co/api/v3/files/${thumbnailFileId}/download?size=medium`}
          className="h-[175px] md:h-[235px] w-full object-initial"
        />
        <div className="absolute bottom-0 max-w-[60%] p-4 sm:p-6 text-gray-500">
          <span>
            <FormattedDuration seconds={100} format={TIMER_FORMAT} /> Minutes
          </span>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-black">{extractedData[0].text}</p>
          {/* <p>https://api.us.amity.co/api/v3/files/{thumbnailFileId}/download?size=medium</p> */}
        </div>
      </article>
    </>
  ) : null;
};

export default WorkshopAccess;

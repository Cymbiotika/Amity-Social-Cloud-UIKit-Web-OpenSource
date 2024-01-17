import React from 'react';
import PropTypes from 'prop-types';

const VimeoEmbed = ({ videoId }) => {
  return (
    <div
      style={{
        left: 0,
        width: '100%',
        height: 0,
        position: 'relative',
        paddingBottom: '56.338%',
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?h=ae7186a386&app_id=122963&byline=0&badge=0&portrait=0&title=0&playsinline=0`}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          border: 0,
        }}
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
        allow="encrypted-media;"
        scrolling="no"
        title={videoId}
      />
    </div>
  );
};

VimeoEmbed.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default VimeoEmbed;

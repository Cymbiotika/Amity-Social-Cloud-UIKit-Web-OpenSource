/*
  Very minimal Highlight UI Component

  Reasons why:
  react-highlight-words have unnecessary highlights and the
  unpacked size was ~3.8 MB-ish which was pretty big.
  The internal of the library also uses String.substr() which
  is no longer supported from MDN
  (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr)

  This component "borrows" design from react-highlight-words lib
  but only uses the {start, end} chunks of a string and injects
  the desired Nodes inside <span> Node for rendering.
*/

import React, { createElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidV4 } from 'uuid';
import { Spotify } from 'react-spotify-embed';
import YoutubeEmbed from './YoutubeEmbed';
import VimeoEmbed from './VimeoEmbed';

const renderNodes = (parentNode, props) => {
  if (isValidElement(parentNode) || typeof parentNode === 'object') {
    const Node = parentNode;

    return <Node {...props} />;
  }

  return createElement(parentNode ?? 'span', props);
};

const processChunks = (text, chunks = []) => {
  const textLength = text.length;
  const allChunks = [];

  const append = (start, end, highlight) => {
    allChunks.push({ start, end, highlight });
  };

  if (chunks.length === 0) {
    append(0, textLength, false);
  } else {
    let lastIndex = 0;
    chunks.forEach((chunk) => {
      append(lastIndex, chunk.start, false);
      append(chunk.start, chunk.end, true);
      lastIndex = chunk.end;
    });
    append(lastIndex, textLength, false);
  }

  return allChunks;
};

const ChunkHighlighter = ({ textToHighlight, chunks, highlightNode, unhighlightNode }) => {
  let highlightIndex = -1;

  const combinedChunks = processChunks(textToHighlight, chunks);

  return (
    <span>
      {combinedChunks.map(({ highlight, start, end }) => {
        const text = textToHighlight.substring(start, end);
        const key = uuidV4();
        if (text.includes('spotify')) {
          // Extract the first String using regex
          const firstStringRegex = /^[^!?\n.]+/;
          const firstStringMatch = text.match(firstStringRegex);
          let firstString = firstStringMatch ? firstStringMatch[0] : '';
          if (firstString === 'https://open') {
            firstString = null;
          }

          // Extract the Spotify URL using regex
          const spotifyURLRegex = /https:\/\/open\.spotify\.com\/\S+/g;
          const spotifyURLMatch = text.match(spotifyURLRegex);
          const spotifyURL = spotifyURLMatch ? spotifyURLMatch[0] : ' ';

          return (
            <>
              <p className="mb-[10px]">{firstString}</p>
              <Spotify link={spotifyURL} className="mx-auto md:mx-0 w-full" />
            </>
          );
        }

        if (text.includes('youtu.be')) {
          const url = text;
          const firstStringRegex = /^[^!?\n.]+/;
          const firstStringMatch = text.match(firstStringRegex);

          const videoId = url.match(/\/([^/]+)$/)[1];
          const regex = /https:\/\/youtu\.be\/[^\s]+/g;
          const result = text.replace(regex, '');

          let firstString = firstStringMatch ? firstStringMatch[0] : '';
          console.log('First String:', firstString);
          if (firstString === 'https://youtu') {
            firstString = null;
          }

          return (
            <>
              <p className="mb-[10px]">{firstString}</p>
              <YoutubeEmbed embedId={videoId} />
            </>
          );
        }

        if (text.includes('youtube')) {
          const youtubeUrl = text;
          const urlParams = new URLSearchParams(new URL(youtubeUrl).search);
          const videoId = urlParams.get('v');
          const regex = /https:\/\/youtu\.be\/[^\s]+/g;

          const firstStringRegex = /^[^!?\n.]+/;
          const firstStringMatch = text.match(firstStringRegex);

          const result = text.replace(regex, '');

          let firstString = firstStringMatch ? firstStringMatch[0] : '';
          console.log('First String:', firstString);
          if (firstString === 'https://www') {
            firstString = null;
          }

          return (
            <>
              <p className="mb-[10px]">{firstString}</p>
              <YoutubeEmbed embedId={videoId} />
            </>
          );
        }

        if (text.includes('vimeo.com')) {
          const url = text;
          const firstStringRegex = /^[^!?\n.]+/;
          const firstStringMatch = text.match(firstStringRegex);

          // Extract the video ID after "/video/"
          const videoIdMatch = url.match(/\/video\/([^/?]+)/);
          const videoId = videoIdMatch ? videoIdMatch[1] : null;

          const regex = /https:\/\/player\.vimeo\.com\/video\/[^\s]+/g;

          // Log the original text and the result after the replace operation
          const result = text.replace(regex, '');

          let firstString = firstStringMatch ? firstStringMatch[0] : '';
          if (firstString === 'https://player') {
            firstString = null;
          }

          return (
            <>
              <p className="mb-[10px]">{firstString}</p>
              {videoId && <VimeoEmbed videoId={videoId} />}
            </>
          );
        }

        if (highlight) {
          highlightIndex += 1;
          return renderNodes(highlightNode, { children: text, highlightIndex, key });
        }
        return renderNodes(unhighlightNode, { children: text, key });
      })}
    </span>
  );
};

ChunkHighlighter.propTypes = {
  textToHighlight: PropTypes.string.isRequired,
  chunks: PropTypes.array,
  highlightNode: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ]),
  unhighlightNode: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default ChunkHighlighter;

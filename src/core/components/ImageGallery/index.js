import React from 'react';
import customizableComponent from '~/core/hocs/customization';
import useKeyboard from '~/core/hooks/useKeyboard';

import {
  CloseButton,
  Container,
  Counter,
  Frame,
  ImageRenderer,
  LeftButton,
  RightButton,
} from './styles';

const ImageGallery = ({ index = 0, items = [], children, onChange, showCounter = true }) => {
  const [render = ImageRenderer] = [].concat(children);

  const handleClose = () => {
    onChange(null);
    function isMobileViewport() {
      return window.innerWidth <= 768;
    }

    if (isMobileViewport()) {
      document.getElementById('create-post-mobile-button').style.display = 'flex';
    }
  };

  const next = () => onChange(index + 1 < items.length ? index + 1 : 0);
  const prev = () => onChange(index - 1 >= 0 ? index - 1 : items.length - 1);

  const listeners = {
    ArrowLeft: prev,
    ArrowRight: next,
    Escape: handleClose,
  };

  const params = {
    ignoreOtherKeys: true,
  };

  useKeyboard(listeners, params);

  const stopPropagation = (event) => event.stopPropagation();

  return (
    <Container length={items.length} onClick={handleClose}>
      <Frame>{render(items[index])}</Frame>

      {showCounter && <Counter>{`${index + 1} / ${items.length}`}</Counter>}

      {items.length > 1 && (
        <LeftButton
          onClick={(e) => {
            stopPropagation(e);
            prev();
          }}
        />
      )}
      {items.length > 1 && (
        <RightButton
          onClick={(e) => {
            stopPropagation(e);
            next();
          }}
        />
      )}

      <CloseButton
        onClick={(e) => {
          stopPropagation(e);
          handleClose();
        }}
      />
    </Container>
  );
};

export default customizableComponent('ImageGallery', ImageGallery);

import React from 'react';
import MicroModal from 'react-micro-modal';
import { FiX } from 'react-icons/fi';

import OnboardingSwiper from './OnboardingSwiper';

const TourModal = ({ tourModalIsOpen, setTourModalIsOpen }) => {
  return (
    <MicroModal
      // openInitially={openInitially}
      open={tourModalIsOpen}
      overrides={{
        Overlay: { style: { zIndex: 160 } },
        Dialog: {
          style: { margin: 20, padding: 20, paddingBottom: 10, maxWidth: 'auto' },
          className: 'w-[800px]',
        },
      }}
      handleClose={() => setTourModalIsOpen(false)}
      closeOnOverlayClick={false}
    >
      {(close) => (
        <div className="flex flex-col">
          <button className="self-end w-[30px] h-[30px] outline-none" type="button" onClick={close}>
            <FiX className="w-full h-full" />
          </button>

          <div>
            <OnboardingSwiper setTourModalIsOpen={setTourModalIsOpen} />
          </div>
        </div>
      )}
    </MicroModal>
  );
};

export default TourModal;

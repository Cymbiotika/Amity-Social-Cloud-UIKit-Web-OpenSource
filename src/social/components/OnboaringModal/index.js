import React, { useEffect, useState } from 'react';
import MicroModal from 'react-micro-modal';
import { FiX } from 'react-icons/fi';
import moment from 'moment';

import OnboardingSwiper from './OnboardingSwiper';

const OnboardingModal = ({ user, openInitially = false }) => {
  const [open, setOpen] = useState(false);
  const { createdAt } = user;

  const localStorageKey = 'onboardingComplete';
  const storedValue = localStorage.getItem(localStorageKey);

  let formatCreatedAtDate;
  const today = moment().format('L');

  useEffect(() => {
    if (createdAt) {
      formatCreatedAtDate = moment(createdAt).format('L');
      // formatCreatedAtDate = moment().format('L'); set createdAt to 'today' for testing purposes
      setTimeout(() => {
        if (formatCreatedAtDate === today) {
          if (storedValue === 'true') {
            setOpen(false);
          } else {
            setOpen(true);
          }
        }
      }, 6000);
    }
  }, [createdAt]);

  return (
    <MicroModal
      // openInitially={openInitially}
      open={open}
      overrides={{
        Overlay: { style: { zIndex: 160 } },
        Dialog: {
          style: { margin: 20, padding: 20, paddingBottom: 10, maxWidth: 'auto' },
          className: 'w-[800px]',
        },
      }}
      handleClose={() => setOpen(false)}
      closeOnOverlayClick={false}
    >
      {(close) => (
        <div className="flex flex-col">
          <button className="self-end w-[30px] h-[30px] outline-none" type="button" onClick={close}>
            <FiX className="w-full h-full" />
          </button>

          <div>
            <OnboardingSwiper setOpen={setOpen} />
          </div>
        </div>
      )}
    </MicroModal>
  );
};

export default OnboardingModal;

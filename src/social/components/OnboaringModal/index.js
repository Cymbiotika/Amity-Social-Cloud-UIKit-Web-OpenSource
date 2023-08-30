import React, { useEffect, useState } from 'react';
import MicroModal from 'react-micro-modal';
import { FiX } from 'react-icons/fi';
import moment from 'moment';

import OnboardingSwiper from './OnboardingSwiper';

const OnboardingModal = ({ user, openInitially = false }) => {
  const [open, setOpen] = useState(openInitially);

  const { createdAt } = user;

  const localStorageKey = 'onboardingComplete';
  const storedValue = localStorage.getItem(localStorageKey);

  useEffect(() => {
    setTimeout(() => {
      const formatCreatedAtDate = moment(createdAt).format('L');
      // const formatCreatedAtDate = '08/30/2023';
      const today = moment().format('L');

      console.log('dates:', formatCreatedAtDate, today);
      console.log('dates are equal:', formatCreatedAtDate === today);
      if (formatCreatedAtDate === today) {
        if (storedValue === 'true') {
          console.log('Onboarding is complete.');
          setOpen(false);
        } else {
          setOpen(true);
        }
      }
    }, 1000);
  }, []);

  return (
    <MicroModal
      openInitially={openInitially}
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

import React, { useEffect, useState } from 'react';
import MicroModal from 'react-micro-modal';
import { FiX } from 'react-icons/fi';
import moment from 'moment';

import OnboardingSwiper from './OnboardingSwiper';

const OnboardingModal = ({ user, openInitially = false }) => {
  const [open, setOpen] = useState(openInitially);
  console.log('user data', user);

  const { createdAt } = user;

  useEffect(() => {
    setTimeout(() => {
      // const formatCreatedAt = moment(createdAt).format('L');
      const formatCreatedAt = '08/29/2023';
      const today = moment().format('L');

      console.log('dates:', formatCreatedAt, today);
      console.log('dates are equal:', formatCreatedAt === today);
      if (formatCreatedAt === today) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }, 1000);
  }, [createdAt]);

  return (
    <MicroModal
      openInitially={openInitially}
      open={open}
      overrides={{
        Overlay: { style: { zIndex: 160 } },
        Dialog: {
          style: { padding: 20, paddingBottom: 10, maxWidth: 'auto' },
          className: 'w-[800px]',
        },
      }}
      handleClose={() => setOpen(false)}
      closeOnOverlayClick={false}
    >
      {(close) => (
        <div className="flex flex-col">
          <button className="self-end w-[20px] h-[20px]" type="button" onClick={close}>
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

import React from 'react';
import MicroModal from 'react-micro-modal';
import { FiX, FiLogOut } from 'react-icons/fi';

const DashboardModal = ({ dashboardModalVisibility, setDashboardModalVisibiltiy }) => {
  return (
    <MicroModal
      open={dashboardModalVisibility}
      overrides={{
        Overlay: { style: { zIndex: 160 } },
        Dialog: {
          style: { margin: 20, padding: 20, paddingBottom: 10, maxWidth: 'auto' },
          className: 'md:w-[600px]',
        },
      }}
      handleClose={() => setDashboardModalVisibiltiy(false)}
      closeOnOverlayClick={false}
    >
      {(close) => (
        <div className="flex flex-col">
          <button className="self-end w-[30px] h-[30px] outline-none" type="button" onClick={close}>
            <FiX className="w-full h-full" />
          </button>

          <div className="content-container mx-auto max-w-[450px] text-center">
            <div className="mx-auto mb-5 w-[24px] h-[24px] md:w-[32px] md:h-[32px] rotate-180">
              <FiLogOut className="w-full h-full" />
            </div>
            <h2 className="text-[20px] md:text-[28px] leading-[120%] font-ivy">
              Are you sure you want to exit the community?
            </h2>
            <p className="my-[32px] text-[12px] font-ter">
              You will be taken back to the dashboard.
            </p>
            <div className="flex flex-col gap-5 mb-[20px]">
              <a
                href="/account"
                className="mx-auto py-[6px] w-[260px] md:w-[296px] bg-cym-teal text-[16px] leading-[140%] font-mon uppercase text-white rounded-full"
                type="button"
              >
                Exit The Community
              </a>
              <button
                className="mx-auto py-[6px] w-[260px] md:w-[296px] text-[16px] leading-[140%] font-mon uppercase text-cym-teal rounded-full border border-cym-teal"
                type="button"
                onClick={close}
              >
                Stay On Community
              </button>
            </div>
          </div>
        </div>
      )}
    </MicroModal>
  );
};

export default DashboardModal;

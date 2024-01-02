import React from 'react';

import { PageTypes, userId } from '~/social/constants';
import { useNavigation } from '~/social/providers/NavigationProvider';

const AriseCommunityLogo = () => {
  const { onChangePage, page } = useNavigation();
  return (
    <button
      className="flex items-end"
      type="button"
      active={page.type === PageTypes.NewsFeed}
      onClick={() => onChangePage(PageTypes.NewsFeed)}
    >
      <svg
        className="ml-[-8px] w-[100px] md:w-[140px]"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 463.83 103.16"
      >
        <defs>
          <style>{`.cls-1{fill:#005850;}`}</style>
        </defs>
        <g>
          <path
            className="cls-1"
            d="M115.02,71.42H48.69l-15.41,27.74h-7.77L78.04,5.36h7.77l52.53,93.8h-7.77l-15.54-27.74Zm-3.48-6.43L81.79,11.79l-29.62,53.2h59.36Z"
          />
          <path
            className="cls-1"
            d="M159.11,99.16V26.39h6.83v19.16c5.76-12.73,21.31-20.37,37.65-20.37v6.16c-16.75,0-31.62,7.64-37.65,22.92v44.89h-6.83Z"
          />
          <path
            className="cls-1"
            d="M221.95,8.97c0-2.95,2.41-5.09,5.63-5.09s5.49,2.14,5.49,5.09-2.28,5.23-5.49,5.23-5.63-2.28-5.63-5.23Zm9.11,90.18h-6.83V26.39h6.83V99.16Z"
          />
          <path
            className="cls-1"
            d="M334.51,79.06c0,12.73-13,22.92-37.52,22.92-17.29,0-31.76-6.03-41.27-16.21l4.69-4.02c8.71,9.38,20.9,14.34,36.72,14.34,18.89,0,30.55-6.57,30.55-16.48s-12.33-13.27-32.43-15.14c-18.89-1.61-36.72-5.36-36.72-19.56s16.62-21.17,36.45-21.17c15.28,0,27.74,5.63,35.24,12.6l-4.56,4.56c-7.1-6.97-17.29-11.26-30.95-11.39-13-.13-29.35,4.29-29.35,15.14,0,10.18,15.01,12.6,32.03,13.94,21.71,1.88,37.12,6.97,37.12,20.5Z"
          />
          <path
            className="cls-1"
            d="M438.23,61.64c0,.67,0,1.07-.13,1.34h-77.86c0,21.57,14.34,32.96,36.58,32.96,15.54,0,25.59-3.75,34.44-12.19l4.56,4.82c-9.92,9.25-21.71,13.4-39.26,13.4-27.47,0-43.28-15.41-43.28-39.13s15.81-39.13,43.01-39.13,41.54,14.2,41.94,37.92Zm-77.72-4.42h70.75c-2.55-18.49-15.81-27.61-34.98-27.61s-33.5,9.65-35.78,27.61Z"
          />
        </g>
        <g>
          <path className="cls-1" d="M440.87,6.75h-4.1v-1.94h10.49v1.94h-4.1v10.41h-2.29V6.75Z" />
          <path
            className="cls-1"
            d="M460.87,17.17l-.02-8.19-4.06,6.78h-1.02l-4.06-6.67v8.09h-2.19V4.81h1.89l4.91,8.19,4.82-8.19h1.89l.02,12.36h-2.17Z"
          />
        </g>
      </svg>

      <div className="text-cym-teal uppercase cym-h-2 !leading-none ml-2">COMMUNITY</div>
    </button>
  );
};

export default AriseCommunityLogo;

import React from 'react';
import { BiAward } from 'react-icons/bi';

const ClaimBadges = () => {
  return (
    <div className="col-span-3">
      <span className="flex items-center justify-center w-max mx-auto rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
        <BiAward />

        <p className="whitespace-nowrap text-sm">
          You have tokens to claim in your{' '}
          <a href="/pages/arise" className="underline">
            wallet!
          </a>
        </p>
      </span>
    </div>
  );
};

export default ClaimBadges;

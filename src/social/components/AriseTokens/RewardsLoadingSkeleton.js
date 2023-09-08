import { borderRadius } from 'polished';
import React from 'react';
import Skeleton from '~/core/components/Skeleton';

const RewardsLoadingSkeleton = () => {
  return (
    <div>
      <Skeleton circle className="mb-[16px] h-[75px] md:h-[140px]" />
      <Skeleton />
    </div>
  );
};

export default RewardsLoadingSkeleton;

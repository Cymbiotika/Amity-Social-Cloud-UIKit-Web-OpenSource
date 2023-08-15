import React from 'react';
import Skeleton from 'react-loading-skeleton';

const UserLoading = () => {
  return (
    <div className="grid gap-y-2">
      <div className="flex items-center">
        <Skeleton style={{ width: 40, height: 40, borderRadius: 100 }} className="mr-2" />
        <Skeleton style={{ width: 150, height: 20, borderRadius: 12 }} />
      </div>
      <div className="flex items-center">
        <Skeleton style={{ width: 40, height: 40, borderRadius: 100 }} className="mr-2" />
        <Skeleton style={{ width: 150, height: 20, borderRadius: 12 }} />
      </div>
      <div className="flex items-center">
        <Skeleton style={{ width: 40, height: 40, borderRadius: 100 }} className="mr-2" />
        <Skeleton style={{ width: 150, height: 20, borderRadius: 12 }} />
      </div>
      <div className="flex items-center">
        <Skeleton style={{ width: 40, height: 40, borderRadius: 100 }} className="mr-2" />
        <Skeleton style={{ width: 150, height: 20, borderRadius: 12 }} />
      </div>
    </div>
  );
};

export default UserLoading;

import React from 'react';
import styled from 'styled-components';
import { Lock } from '~/icons';

export const LockIcon = styled(Lock).attrs({ width: 25, height: 25, fill: '#005850' })``;
const NoWorkshopAccess = () => {
  const workshops = [
    {
      key: 0,
      communityId: '',
      thumbnail: '',
      title: 'Gut Health Wellness Workshops',
    },
    {
      key: 0,
      communityId: '',
      thumbnail: '',
      title: 'Stress  Wellness Workshops',
    },
  ];
  return workshops.map((item, index) => (
    <div
      key={item.key}
      className="relative w-[236px] inline-table cover rounded-[5px] overflow-hidden bg-[#EBF2F1] cursor-not-allowed"
      style={{ boxShadow: `rgba(0, 0, 0, 0.05) 0px 1px 2px 0px` }}
    >
      <div
        className="flex items-center flex-col justify-center h-[235px] w-[350px] md:w-[420px]"
        style={{
          backgroundImage: `url(${item.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <LockIcon className="mb-5" />
        <span className="!text-[26px] text-[#005850] font-ter">Only for VIPs</span>
      </div>
      <div className="bg-white p-5">
        <h3>{item.title}</h3>
      </div>
    </div>
  ));
};

export default NoWorkshopAccess;

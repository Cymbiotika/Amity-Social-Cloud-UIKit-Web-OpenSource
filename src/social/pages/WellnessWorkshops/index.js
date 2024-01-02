import React from 'react';

import CategoryCommunitiesList from '~/social/components/community/CategoryCommunitiesList';
import { Wrapper } from './styles';

const WellnessWorkshopsPage = () => {
  return (
    <Wrapper className="pt-0">
      <h1 className="my-[44px] !text-[28px]">Wellness Workshops 🧘</h1>

      <CategoryCommunitiesList categoryId="6a2f719d3352a4c39702716c4e5d17f5" />
    </Wrapper>
  );
};

export default WellnessWorkshopsPage;

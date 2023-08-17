import React from 'react';
import styled from 'styled-components';

import SidebarRecommendedList from './SidebarRecommendedList';

const SectionContainer = styled.div`
  border-top: 1px solid #f7f7f8;
  padding: 1em 0;
`;

const RecommendedGroups = () => {
  return (
    <SectionContainer className="cym-h-4">
      <SidebarRecommendedList />
    </SectionContainer>
  );
};

export default RecommendedGroups;

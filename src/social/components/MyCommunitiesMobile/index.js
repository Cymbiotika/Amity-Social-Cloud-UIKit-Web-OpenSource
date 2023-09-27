import React from 'react';

import { Container } from './styles';
import MobileMenuTabs from './MobileMenuTabs';

const MyCommunitiesMobile = () => {
  return (
    <Container className="mobile-communities-list">
      {/* <MobileCommunitiesHeader>My Groups</MobileCommunitiesHeader> */}
      {/* <SideSectionMyCommunity /> */}
      {/* Add Tabbed Search here */}
      <MobileMenuTabs />
    </Container>
  );
};

export default MyCommunitiesMobile;

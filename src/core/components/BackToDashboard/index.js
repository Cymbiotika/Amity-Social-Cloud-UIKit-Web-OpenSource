import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigation } from '~/social/providers/NavigationProvider';
import { PageTypes } from '~/social/constants';
import DashboardModal from './DashboardModal';
import ChevronLeft from '~/icons/ChevronLeft';

const BackButton = styled.button`
  display: flex;
  align-items: center;
  font-weight: normal;
  text-decoration: underline;
  color: #005850;
`;

const BackToDashBoard = () => {
  const { page } = useNavigation();
  const pageType = page.type;
  const [dashboardModalVisibility, setDashboardModalVisibiltiy] = useState(false);

  const handleDashboardRedirect = () => {
    setDashboardModalVisibiltiy(true);
  };

  const { onBack } = useNavigation();

  return pageType === 'newsfeed' ? (
    <>
      <DashboardModal
        dashboardModalVisibility={dashboardModalVisibility}
        setDashboardModalVisibiltiy={setDashboardModalVisibiltiy}
      />
      <BackButton onClick={handleDashboardRedirect}>
        <ChevronLeft className="w-2 mr-4" />
        Back to Dashboard
      </BackButton>
    </>
  ) : (
    <BackButton onClick={onBack}>
      <ChevronLeft className="w-2 mr-4" />
      Back
    </BackButton>
  );
};

export default BackToDashBoard;

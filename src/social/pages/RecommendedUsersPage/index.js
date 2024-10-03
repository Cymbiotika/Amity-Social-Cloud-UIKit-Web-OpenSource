import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigation } from '~/social/providers/NavigationProvider';
import RecommendedUsers from '~/social/components/RecommendedUsers';
import ChevronLeft from '~/icons/ChevronLeft';

export const RecommendedUsersContainer = styled.div`
  margin: 0 auto;
  /* height: 1200px; */
  padding: 28px 0;
  max-width: 575px;
  margin-bottom: 54px;
`;
const BackButton = styled.button`
  display: flex;
  align-items: center;
  font-weight: normal;
  text-decoration: underline;
  color: #005850;
`;

const RecommendedUsersPage = () => {
  const [pageContext, setPageContext] = useState('');
  const { onBack } = useNavigation();
  useEffect(() => {
    setPageContext('recommended-users-page');
    const scrollToTop = () => {
      const scrollStep = 50; // Adjust the scroll step as needed
      let currentYOffset = window.pageYOffset;

      const scrollAnimation = () => {
        window.scrollTo(0, currentYOffset);
        currentYOffset -= scrollStep;

        if (currentYOffset <= 0) {
          // The window has been scrolled to the top, stop the animation
          window.cancelAnimationFrame(scrollAnimation);
          console.log('Scrolled to top');
          return;
        }

        requestAnimationFrame(scrollAnimation);
      };

      scrollAnimation();
    };
    scrollToTop();
  }, []);
  return (
    <>
      <RecommendedUsersContainer>
        <BackButton className="ml-5 md:ml-0" onClick={() => onBack()}>
          <ChevronLeft className="w-2 mr-4" />
          Back to NewsFeed
        </BackButton>
        <div className="mx-5 md:mx-0">
          <RecommendedUsers pageContext={pageContext} />
        </div>
      </RecommendedUsersContainer>
      <span className="hidden">hi</span>
    </>
  );
};

export default RecommendedUsersPage;

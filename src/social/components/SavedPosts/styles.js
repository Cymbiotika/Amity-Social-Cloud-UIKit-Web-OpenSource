import styled from 'styled-components';

export const SavedPostsContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  padding: 32px;
  background: ${({ theme }) => theme.palette.system.background};
  border: 1px solid ${({ theme }) => theme.palette.system.borders};
  border-radius: 0.25em;
`;

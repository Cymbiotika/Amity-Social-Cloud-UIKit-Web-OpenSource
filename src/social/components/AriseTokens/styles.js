import styled from 'styled-components';
import MediaGalleryTabs from '~/core/components/Tabs/MediaGalleryTabs';

export const AriseTokensContainer = styled.div`
  padding: 32px;
  background: ${({ theme }) => theme.palette.system.background};
  border: 1px solid ${({ theme }) => theme.palette.system.borders};
  border-radius: 0.25em;
`;

export const Tabs = styled(MediaGalleryTabs)`
  margin-bottom: 1em;
`;

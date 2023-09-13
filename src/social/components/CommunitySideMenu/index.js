import PropTypes from 'prop-types';
import styled from 'styled-components';
import SideMenu from '~/core/components/SideMenu';
import SideSectionCommunity from '~/social/components/SideSectionCommunity';
import SideSectionMyCommunity from '~/social/components/SideSectionMyCommunity';
import UiKitSocialSearch from '~/social/components/SocialSearch';
import SocialSearchv2 from '~/social/components/SocialSearchv2';

export const SocialSearch = styled(UiKitSocialSearch)`
  background: ${({ theme }) => theme.palette.system.background};
  padding: 0.5rem;
`;

const CommunitySideMenu = ({ className, activeCommunity }) => (
  <SideMenu data-qa-anchor="community-side-menu" className={className}>
    <SocialSearchv2 className="my-7" />

    <SideSectionCommunity />

    <SideSectionMyCommunity activeCommunity={activeCommunity} showCreateButton />
  </SideMenu>
);

CommunitySideMenu.propTypes = {
  className: PropTypes.string,
  activeCommunity: PropTypes.string,
};

export default CommunitySideMenu;

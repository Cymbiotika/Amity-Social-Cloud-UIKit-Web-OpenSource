import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import customizableComponent from '~/core/hocs/customization';
import withSDK from '~/core/hocs/withSDK';

import useUser from '~/core/hooks/useUser';
import { backgroundImage as UserImage } from '~/icons/User';
import Avatar from '../Avatar';
import DashboardModal from '../BackToDashboard/DashboardModal';
import FaqButton from './FaqButton';

import NotificationTray from '~/social/components/NotificationTray';
import UiKitSocialSearch from '~/social/components/SocialSearch';
import { PageTypes, userId } from '~/social/constants';
import { useNavigation } from '~/social/providers/NavigationProvider';
import { CustomHeaderWrapper, SearchWrapper } from './styles';
import BackToDashBoard from '../BackToDashboard';
import AriseCommunityLogo from './AriseCommunityLogo';

const CustomHeader = ({ onClickUser, className, id }) => {
  // const userId = window.shopifyCustomerId;
  const { user, file } = useUser(userId);
  const { onChangePage, page } = useNavigation();

  const [showMenu, setShowMenu] = useState(false);

  const searchWrapper = document.getElementById('search-wrapper');
  const mainContainer = document.getElementById('main-container');
  const searchMenuItem = document.querySelector('.search-menu-item');
  // const searchMenuItem = document.querySelector('search-menu-item');

  function showMobileSearch() {
    searchWrapper.style.display = 'block';
  }

  function hideMobileSearch() {
    searchWrapper.style.display = 'none';
  }

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      // Key code 13 corresponds to the Enter key
      // You can replace the following line with your own function call
      hideMobileSearch();
    }
  });
  if (searchMenuItem) {
    searchMenuItem.addEventListener('click', function () {
      hideMobileSearch();
    });
  }
  if (mainContainer) {
    mainContainer.addEventListener('click', function () {
      hideMobileSearch();
    });
  }
  useEffect(() => {
    window.ariseHeader = document.querySelector('.custom-header-wrapper');
  });

  return (
    <CustomHeaderWrapper
      id={id}
      className={`${
        className ?? ''
      } pt-4 border-cym-lightgrey bg-cym-lightteal custom-header-wrapper`}
    >
      <div className="spt-container">
        <BackToDashBoard />

        <div className="flex flex-col w-full border-y-1  gap-3 py-[16px]">
          <div className="flex flex-row items-end">
            <AriseCommunityLogo />
            <div className="flex ml-auto gap-5 items-center ">
              <FaqButton />
              <NotificationTray />

              {/* <button type="button" className="relative md:hidden" onClick={showMobileSearch}>
              <Search className="w-[16px] h-7" id="search-button" />
            </button> */}
              <div className="hidden md:block">
                <Avatar
                  data-qa-anchor="header-avatar"
                  avatar={file.fileUrl}
                  backgroundImage={UserImage}
                  onClick={() => onClickUser(user.userId)} // add functionallity that directs to profile page on click.
                />
              </div>

              <p
                onClick={() => onClickUser(user.userId)} // add functionallity that directs to profile page on click.
                className="xs:cym-p-1-sm md:cym-p-1 xl:cym-p-1-lg hidden md:block cursor-pointer"
                data-qa-anchor="user-info-profile-name"
              >
                {user.displayName}
              </p>
            </div>
          </div>

          <div className="cym-h-2 hidden md:block mb-[18px]">
            Ask questions, join challenges, and find support as you embark on your wellness journey.
          </div>
        </div>
      </div>
      <SearchWrapper id="search-wrapper">
        <UiKitSocialSearch />
      </SearchWrapper>
    </CustomHeaderWrapper>
  );
};

CustomHeader.propTypes = {
  userId: PropTypes.string,
  onClickUser: PropTypes.func,
};
CustomHeader.defaultProps = {
  userId: '',
  onClickUser: null,
};

export default memo(withSDK(customizableComponent('CustomHeader', CustomHeader)));

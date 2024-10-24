import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageTypes, userId } from '~/social/constants';
import { useNavigation } from '~/social/providers/NavigationProvider';
import { useSavedPostData } from '~/social/providers/SavedPostsContext';

import useUser from '~/core/hooks/useUser';

const MobileFooter = styled.div`
  @media screen and (min-width: 996px) {
    display: none;
  }
`;

const CustomFooterNav = ({ onClickUser, page }) => {
  const { user, file } = useUser(userId);
  const { onChangePage } = useNavigation();
  const [selectedTab, setSelectedTab] = useState(page);
  const { ariseUserTier } = useSavedPostData();

  useEffect(() => {
    setSelectedTab(page);
  }, [page]);

  /* const wellnessOption =
    ariseUserTier === 'VIP'
      ? {
          name: 'Wellness',
          pages: [PageTypes.Wellness],
          func: () => onChangePage(PageTypes.Wellness),

          svg: (
            <svg
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1203_2121)">
                <path
                  d="M11.5 19.25V21.0833"
                  stroke="#005850"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.3301 16.83L18.6317 18.1317"
                  stroke="#005850"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.36841 18.1317L5.67007 16.83"
                  stroke="#005850"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.75 11H21.5833"
                  stroke="#005850"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.41675 11H3.25008"
                  stroke="#005850"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.5001 15.5833C14.0314 15.5833 16.0834 13.5313 16.0834 11C16.0834 8.4687 14.0314 6.41667 11.5001 6.41667C8.96878 6.41667 6.91675 8.4687 6.91675 11C6.91675 13.5313 8.96878 15.5833 11.5001 15.5833Z"
                  stroke="#005850"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.3301 5.17L18.6317 3.86833"
                  stroke="#005850"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.36841 3.86833L5.67007 5.17"
                  stroke="#005850"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.5 0.916672V2.75001"
                  stroke="#005850"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1203_2121">
                  <rect width="22" height="22" fill="white" transform="translate(0.5)" />
                </clipPath>
              </defs>
            </svg>
          ),
        }
      : null; */

  const menuTabs = [
    {
      name: 'News Feed',
      pages: [PageTypes.NewsFeed],
      func: () => onChangePage(PageTypes.NewsFeed),
      svg: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.875 6H19.875C20.1402 6 20.3946 6.10536 20.5821 6.29289C20.7696 6.48043 20.875 6.73478 20.875 7V18C20.875 18.5304 20.6643 19.0391 20.2892 19.4142C19.9141 19.7893 19.4054 20 18.875 20M18.875 20C18.3446 20 17.8359 19.7893 17.4608 19.4142C17.0857 19.0391 16.875 18.5304 16.875 18V5C16.875 4.73478 16.7696 4.48043 16.5821 4.29289C16.3946 4.10536 16.1402 4 15.875 4H5.875C5.60978 4 5.35543 4.10536 5.16789 4.29289C4.98036 4.48043 4.875 4.73478 4.875 5V17C4.875 17.7956 5.19107 18.5587 5.75368 19.1213C6.31629 19.6839 7.07935 20 7.875 20H18.875ZM8.875 8H12.875M8.875 12H12.875M8.875 16H12.875"
            stroke="#005850"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'Explore',
      pages: [PageTypes.Explore],
      func: () => onChangePage(PageTypes.Explore),
      svg: (
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.625 20.1667C16.6876 20.1667 20.7917 16.0626 20.7917 11C20.7917 5.9374 16.6876 1.83334 11.625 1.83334C6.5624 1.83334 2.45834 5.9374 2.45834 11C2.45834 16.0626 6.5624 20.1667 11.625 20.1667Z"
            stroke="#005850"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.5117 7.11334L13.5683 12.9433L7.73834 14.8867L9.68168 9.05668L15.5117 7.11334Z"
            stroke="#005850"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    // wellnessOption,
    {
      name: 'Profile',
      pages: [PageTypes.UserFeed],
      func: () => onClickUser(user.userId),
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.3333 19.25V17.4167C18.3333 16.4442 17.947 15.5116 17.2594 14.8239C16.5717 14.1363 15.6391 13.75 14.6667 13.75H7.33332C6.36086 13.75 5.42823 14.1363 4.7406 14.8239C4.05296 15.5116 3.66666 16.4442 3.66666 17.4167V19.25"
            stroke="#005850"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 10.0833C13.0251 10.0833 14.6667 8.44171 14.6667 6.41667C14.6667 4.39162 13.0251 2.75 11 2.75C8.97497 2.75 7.33334 4.39162 7.33334 6.41667C7.33334 8.44171 8.97497 10.0833 11 10.0833Z"
            stroke="#005850"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'Search',
      pages: [PageTypes.Search, PageTypes.SearchFeed],
      func: () => onChangePage(PageTypes.Search),
      svg: (
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.45833 12.8459C10.4039 12.8459 12.7917 10.4581 12.7917 7.51253C12.7917 4.56701 10.4039 2.1792 7.45833 2.1792C4.51281 2.1792 2.125 4.56701 2.125 7.51253C2.125 10.4581 4.51281 12.8459 7.45833 12.8459Z"
            stroke="#005850"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.1251 14.1793L11.2251 11.2793"
            stroke="#005850"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ].filter((tab) => tab);
  return (
    <MobileFooter
      id="mobile-footer"
      className="flex left-0 h-[54px] bg-white bottom-0 z-10 fixed w-full"
    >
      {menuTabs.map((tab, index) => (
        <div
          key={index}
          tabIndex={0}
          className={`w-1/4 flex flex-col justify-center items-center border-t-2 ${
            tab.pages.includes(selectedTab)
              ? 'font-semibold bg-[#EBF2F1]  border-t-2 border-t-cym-darkteal'
              : 'border-cym-lightgrey'
          }`}
          onClick={() => {
            tab.func();
            setSelectedTab(tab.pages[0]);
          }}
        >
          <span className="w-[25px] h-[25px] flex justify-center items-center">{tab.svg}</span>
          <span className="text-cym-darkteal !text-xs">{tab.name}</span>
        </div>
      ))}
    </MobileFooter>
  );
};

export default CustomFooterNav;

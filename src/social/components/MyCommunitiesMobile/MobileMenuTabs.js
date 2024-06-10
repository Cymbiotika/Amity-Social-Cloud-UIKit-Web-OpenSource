import React, { useState } from 'react';
import SideSectionMyCommunity from '~/social/components/SideSectionMyCommunity';
import SidebarRecommendedList from '../CommunitiesList/SidebarRecommendedList';

const MobileMenuTabs = () => {
  const [activeTab, setActiveTab] = useState('my-groups'); // Set 'my-groups' as the initial active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div id="my-communities-tabs" className="px-5 overflow-visible">
      <div className="block mx-5">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            <a
              href="#"
              className={`shrink-0 border-b-2 ${
                activeTab === 'my-groups' ? 'border-[#005850]' : 'border-transparent'
              } px-1 pb-4 text-sm font-medium ${
                activeTab === 'my-groups' ? 'text-[#005850]' : 'text-gray-500'
              } hover:border-gray-300 hover:text-gray-700`}
              onClick={() => handleTabClick('my-groups')}
            >
              My Groups
            </a>

            <a
              href="#"
              className={`shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium ${
                activeTab === 'recommended groups' ? 'text-[#005850]' : 'text-gray-500'
              } hover:border-gray-300 hover:text-gray-700`}
              onClick={() => handleTabClick('recommended groups')}
            >
              Recommended Groups
            </a>
          </nav>
        </div>
      </div>

      <div
        id="my-groups"
        className={`tab-content mt-5 ${activeTab !== 'my-groups' ? 'hidden' : ''}`}
      >
        <SideSectionMyCommunity />
      </div>

      <div
        id="recommended groups"
        className={`tab-content mt-5 ${activeTab !== 'recommended groups' ? 'hidden' : ''}`}
      >
        <SidebarRecommendedList />
      </div>
    </div>
  );
};

export default MobileMenuTabs;

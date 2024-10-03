import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigation } from '~/social/providers/NavigationProvider';

import { PageTypes } from '~/social/constants';

import UserCard from './UserCard';

const Container = styled.div`
  margin-top: 20px;
  padding: 15px 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.system.borders};
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.system.background};
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

if (process.env.NODE_ENV === 'development') {
  window.userIds = [
    2520631443479, 6378574053571, 800445202455, 5349362565167, 6406978043951, 6846300258499,
    6613392818223, 6552678563887,
  ];
}

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

const ReccomendedUsers = ({ pageContext }) => {
  const { onChangePage } = useNavigation();

  const [removedIds, setRemovedIds] = useLocalStorage('removedUserIds', []);
  const [suggestedUserIds, setSuggestedUserIds] = useState([]);

  useEffect(() => {
    const filteredIds = window.userIds.filter((id) => !removedIds.includes(id));
    setSuggestedUserIds(filteredIds);
  }, [removedIds]);

  const cardContainer = document.getElementById('card-container');
  if (cardContainer) {
    setTimeout(() => {
      if (cardContainer.childElementCount === 0) {
        document.getElementById('card-wrapper').classList.add('hidden');
      }
    }, 3000);
  }

  return (
    <Container id="card-wrapper" className="spt-font-mon">
      <Header className="mb-[16px] font-medium">
        <span>Suggested For You</span>

        <button
          type="button"
          className="uppercase underline text-[#005850]"
          onClick={() => onChangePage(PageTypes.ReccUsers)}
        >
          See All
        </button>
      </Header>
      <div
        id="card-container"
        className={`relative w-full gap-[14px] ${
          pageContext === 'recommended-users-page'
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : 'flex snap-x overflow-x-auto no-scrollbar'
        }`}
        style={{
          msOverflowStyle: 'none', // for Internet Explorer, Edge
          scrollbarWidth: 'none', // for Firefox
          overflowY: 'scroll',
        }}
      >
        {suggestedUserIds.map((targetId) => (
          <UserCard
            key={targetId}
            targetId={targetId}
            removedIds={removedIds}
            setRemovedIds={setRemovedIds}
            suggestedUserIds={suggestedUserIds}
            pageContext={pageContext}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReccomendedUsers;

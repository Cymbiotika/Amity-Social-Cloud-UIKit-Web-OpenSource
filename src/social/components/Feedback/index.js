import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  margin-top: 20px;
  padding: 15px 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.system.borders};
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.system.background};
`;
const FeedBack = () => {
  return (
    <Container>
      <div className="flex items-center">
        <svg
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[16px] h-[16px] mr-[8px] notification-icon"
        >
          <path
            d="M18 8.5C18 6.9087 17.3679 5.38258 16.2426 4.25736C15.1174 3.13214 13.5913 2.5 12 2.5C10.4087 2.5 8.88258 3.13214 7.75736 4.25736C6.63214 5.38258 6 6.9087 6 8.5C6 15.5 3 17.5 3 17.5H21C21 17.5 18 15.5 18 8.5Z"
            stroke="#005850"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.73 21.5C13.5542 21.8031 13.3019 22.0547 12.9982 22.2295C12.6946 22.4044 12.3504 22.4965 12 22.4965C11.6496 22.4965 11.3054 22.4044 11.0018 22.2295C10.6982 22.0547 10.4458 21.8031 10.27 21.5"
            stroke="#005850"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="spt-font-mon">
          What would you like to see featured in the Arise Community? <br />
          <span className="underline">
            <a href="https://q38y98k0pnj.typeform.com/to/Hdb67Lic" target="_blank" rel="noreferrer">
              Take our survey
            </a>
          </span>{' '}
          now!
        </p>
      </div>
    </Container>
  );
};

export default FeedBack;

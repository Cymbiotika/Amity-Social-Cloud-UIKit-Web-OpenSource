import React, { useEffect } from 'react';

export const User = ({ user }) => {
  console.log('user', user);
  return (
    <>
      <div>{user}</div>
    </>
  );
};

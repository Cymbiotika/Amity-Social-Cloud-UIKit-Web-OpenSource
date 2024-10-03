import React, { useMemo } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { PageTypes } from '~/social/constants';
import { useNavigation } from '~/social/providers/NavigationProvider';

const FaqButton = () => {
  const { onChangePage, page } = useNavigation();

  const iconContextValue = useMemo(
    () => ({
      color: '#005850',
      className: 'faq-button',
      size: '16px',
    }),
    [],
  );

  return (
    <IconContext.Provider value={iconContextValue}>
      <button type="button" onClick={() => onChangePage(PageTypes.Faq)}>
        <FiHelpCircle />
      </button>
    </IconContext.Provider>
  );
};

export default FaqButton;

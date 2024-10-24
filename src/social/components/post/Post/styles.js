import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import UIOptionMenu from '~/core/components/OptionMenu';
import Skeleton from '~/core/components/Skeleton';

export const OptionMenu = styled(UIOptionMenu)`
  margin-left: auto;
`;

export const PostContainer = styled(({ className, ...props }) => (
  <div className={cx('post richtext', className)} {...props} />
))`
  padding: 16px;
  padding-bottom: 8px;
  background: ${({ theme }) => theme.palette.system.background};
  border: 1px solid #edeef2;
  border-radius: 4px;
  * {
    font-family: 'Montserrat', sans-serif !important;
  }
`;

export const PostHeadContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

export const ReviewButtonsContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.base.shade4};
  margin-top: 6px;
  padding-top: 12px;
  display: flex;

  > * {
    flex: 1 1 0;

    &:not(:first-child) {
      margin-left: 12px;
    }
  }
`;

export const ContentSkeleton = () => {
  return (
    <>
      <div>
        <Skeleton style={{ fontSize: 8, maxWidth: 374 }} />
      </div>
      <div>
        <Skeleton style={{ fontSize: 8, maxWidth: 448 }} />
      </div>
      <div style={{ paddingBottom: 50 }}>
        <Skeleton style={{ fontSize: 8, maxWidth: 279 }} />
      </div>
    </>
  );
};

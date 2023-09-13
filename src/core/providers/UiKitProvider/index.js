/* eslint-disable no-underscore-dangle */

import ASCClient, { ConnectionStatus } from '@amityco/js-sdk';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

import { ThemeProvider } from 'styled-components';
import { ConfirmContainer } from '~/core/components/Confirm';
import { NotificationsContainer } from '~/core/components/Notification';
import { CustomComponentsProvider } from '~/core/hocs/customization';
import { SDKProvider } from '~/core/hocs/withSDK';
import ConfigProvider from '~/social/providers/ConfigProvider';
import NavigationProvider from '~/social/providers/NavigationProvider';
import PostRendererProvider from '~/social/providers/PostRendererProvider';
import Localisation from './Localisation';
import { UIStyles } from './styles';
import buildGlobalTheme from './theme';

let client;

const UiKitProvider = forwardRef(
  (
    {
      apiKey,
      apiRegion,
      apiEndpoint,
      authToken,
      userId,
      displayName,
      customComponents = {},
      theme = {},
      children /* TODO localization */,
      postRenderers,
      actionHandlers,
      socialCommunityCreationButtonVisible,
      onConnectionStatusChange,
      onConnected,
      onDisconnected,
    },
    ref,
  ) => {
    const theGlobal = /* globalThis || */ window || global;

    theGlobal.__asc__ = {
      ...theGlobal.__asc__,
      uikit: __VERSION__,
    };
    console.log('KITPROVIDER');
    const [preventReconnect, setPreventReconnect] = useState(false);

    // reset state if some props have changed
    useEffect(() => {
      setPreventReconnect(false);
    }, [apiKey, userId, displayName, authToken]);

    const SDKInfo = useMemo(() => {
      if (!client) {
        client = new ASCClient({ apiKey, apiEndpoint, apiRegion });
        client.on('connectionStatusChanged', (data) => {
          onConnectionStatusChange && onConnectionStatusChange(data);

          if (data.newValue === ConnectionStatus.Connected) {
            onConnected && onConnected();
          } else if (data.newValue === ConnectionStatus.Disconnected) {
            onDisconnected && onDisconnected();
          }
        });
      } else if (client.currentUserId !== userId) {
        client.unregisterSession();
      }

      // boolean will block looping reconnection
      if (!client.currentUserId && !preventReconnect) {
        client.registerSession({
          userId,
          displayName,
          authToken,
        });
      }
      console.log(client);
      return { client };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiKey, userId, displayName, authToken, preventReconnect]);

    useImperativeHandle(ref, () => ({
      reconnect() {
        // this should refresh the component and relaunch the useMemo, hopefully reconnecting.
        setPreventReconnect(false);
      },

      disconnect() {
        if (client) {
          setPreventReconnect(true);
          client.unregisterSession();
        }
      },
    }));

    return (
      <>
        <Helmet>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Helmet>
        <Localisation locale="en">
          <ThemeProvider theme={buildGlobalTheme(theme)}>
            <UIStyles>
              <SDKProvider {...SDKInfo}>
                <ConfigProvider config={{ socialCommunityCreationButtonVisible }}>
                  <CustomComponentsProvider value={customComponents}>
                    <NavigationProvider {...actionHandlers}>
                      <PostRendererProvider postRenderers={postRenderers}>
                        {children}
                        <NotificationsContainer />
                        <ConfirmContainer />
                      </PostRendererProvider>
                    </NavigationProvider>
                  </CustomComponentsProvider>
                </ConfigProvider>
              </SDKProvider>
            </UIStyles>
          </ThemeProvider>
        </Localisation>
      </>
    );
  },
);

UiKitProvider.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string,
  apiRegion: PropTypes.string.isRequired,
  authToken: PropTypes.string,
  userId: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  customComponents: PropTypes.object,
  theme: PropTypes.shape({
    palette: PropTypes.object,
    typography: PropTypes.object,
  }),
  children: PropTypes.node,
  postRenderers: PropTypes.object,
  actionHandlers: PropTypes.shape({
    onChangePage: PropTypes.func,
    onClickCategory: PropTypes.func,
    onClickCommunity: PropTypes.func,
    onClickUser: PropTypes.func,
    onCommunityCreated: PropTypes.func,
    onEditCommunity: PropTypes.func,
    onEditUser: PropTypes.func,
    onMessageUser: PropTypes.func,
  }),
  socialCommunityCreationButtonVisible: PropTypes.bool,
  onConnectionStatusChange: PropTypes.func,
  onConnected: PropTypes.func,
  onDisconnected: PropTypes.func,
};

export default UiKitProvider;

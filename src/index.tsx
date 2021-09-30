import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import '@reach/dialog/styles.css';
import { Provider } from 'react-redux';
import store from './state';
import { QueryClient, QueryClientProvider } from 'react-query';

import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { NetworkContextName } from './constants/networking';
import getLibrary from './utils/getLibrary';
import ThemeProvider, { ThemedGlobalStyle } from './theme';

import SummonersUpdater from './state/summoners/updater';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)
const queryClient = new QueryClient();


function Updaters(){
  return (
    <>
      <SummonersUpdater/>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <QueryClientProvider client={queryClient}>
            <Updaters />
            <ThemeProvider>
                <ThemedGlobalStyle/>
                <App />
              </ThemeProvider>
            </QueryClientProvider>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


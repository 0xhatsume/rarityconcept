import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import '@reach/dialog/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { NetworkContextName } from './constants/networking';
import getLibrary from './utils/getLibrary';
import ThemeProvider, { ThemedGlobalStyle } from './theme';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
              <ThemedGlobalStyle/>
              <App />
            </ThemeProvider>
          </QueryClientProvider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


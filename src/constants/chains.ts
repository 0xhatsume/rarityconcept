export enum SupportedChainId {
  // ETHMAINNET = 1,
  // ROPSTEN = 3,
  // RINKEBY = 4,
  // GOERLI = 5,
  // KOVAN = 42,
  // ARBITRUM_ONE = 42161,
  // ARBITRUM_RINKEBY = 421611,
  FTM = 250,
  FTM_TESTNET= 0xfa2,
}

export const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  // [SupportedChainId.ETHMAINNET]: 'Ethereum Mainnet',
  // [SupportedChainId.RINKEBY]: 'Rinkeby',
  // [SupportedChainId.ROPSTEN]: 'Ropsten',
  // [SupportedChainId.GOERLI]: 'Görli',
  // [SupportedChainId.KOVAN]: 'Kovan',
  // [SupportedChainId.ARBITRUM_ONE]: 'Arbitrum',
  // [SupportedChainId.ARBITRUM_RINKEBY]: 'Arbitrum Testnet',
  [SupportedChainId.FTM]: 'Fantom Mainnet',
  [SupportedChainId.FTM_TESTNET]: 'Fantom Testnet',
}

import { SupportedChainId } from '../constants/chains';
import { NetworkConnector } from './NetworkConnector';
import { InjectedConnector } from '@web3-react/injected-connector';

const NETWORK_URLS: {
    [chainId in SupportedChainId]: string
    } = {
    // [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    // [SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
    // [SupportedChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
    // [SupportedChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    // [SupportedChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
    // [SupportedChainId.ARBITRUM_ONE]: `https://arb1.arbitrum.io/rpc`,
    // [SupportedChainId.ARBITRUM_RINKEBY]: `https://rinkeby.arbitrum.io/rpc`,
    [SupportedChainId.FTM]: `https://rpc.ftm.tools`,
    [SupportedChainId.FTM_TESTNET]: `https://rpc.testnet.fantom.network`,
    }

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
    // SupportedChainId.MAINNET,
    // SupportedChainId.KOVAN,
    // SupportedChainId.GOERLI,
    // SupportedChainId.RINKEBY,
    // SupportedChainId.ROPSTEN,
    // SupportedChainId.ARBITRUM_ONE,
    // SupportedChainId.ARBITRUM_RINKEBY,
    SupportedChainId.FTM,
    SupportedChainId.FTM_TESTNET,
]

export const network = new NetworkConnector({
    urls: NETWORK_URLS,
    defaultChainId: 250,
})

export const injected = new InjectedConnector({
    supportedChainIds: SUPPORTED_CHAIN_IDS,
})
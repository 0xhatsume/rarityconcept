import {SupportedChainId} from './chains';


type AddressMap = { [chainId: number]: string }

export const RARITY_ADDRESS: AddressMap = {
    [SupportedChainId.FTM]: '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb'
}

export const MULTICALL2_ADDRESS: AddressMap = {
    [SupportedChainId.FTM]: '0x5f28e9fca1c34b2dd44630df26fc7aa3d3f35eb9'
}

import { useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';
import useActiveWeb3React from './useActiveWeb3React';
import { getContract } from '../utils';
import RARITY_ABI from '../constants/abis/rarity.json';
import MULTICALL2_ABI from '../constants/abis/multicall2.json';
import { MULTICALL2_ADDRESS, RARITY_ADDRESS } from '../constants/addresses';

// returns null on errors
// returns a memo which returns the getContract function that returns an ethers Contract object
export function useContract<T extends Contract = Contract>(
    addressOrAddressMap: string | { [chainId: number]: string } | undefined,
    ABI: any,
    withSignerIfPossible = true
    ): T | null {
    const { library, account, chainId } = useActiveWeb3React()

    return useMemo(() => {
        if (!addressOrAddressMap || !ABI || !library || !chainId) return null
        let address: string | undefined
        if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
        else address = addressOrAddressMap[chainId]
        if (!address) return null
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useRarityContract(){
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? RARITY_ADDRESS[chainId]:undefined, RARITY_ABI,true)
}

export function useMulticall2Contract(){
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? MULTICALL2_ADDRESS[chainId]:undefined, MULTICALL2_ADDRESS,true)
}
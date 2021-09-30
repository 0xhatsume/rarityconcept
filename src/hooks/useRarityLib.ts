import { useRarityContract } from "./useContract";
import { useCallback } from "react";
import { utils } from 'ethers';
import { rejects } from "assert";
import { resolve } from "dns";

import useActiveWeb3React from "./useActiveWeb3React";
import { Contract, Provider } from 'ethcall';
import { BaseProvider } from "@ethersproject/providers";
import RARITY_ABI from '../constants/abis/rarity.json';
import {RARITY_ADDRESS } from '../constants/addresses';
import { parse } from "path";

export interface SummonerData {
    id: number
    base: {
        _class: number
        _level: number
        _log: number
        _xp: number
    }
}

interface LibraryInterface {
    summoners_data: (ids: number[]) => Promise<SummonerData[]>
}

export default function useRarityLib(): LibraryInterface {
    //const lib = useRarityContract()
    const { library, chainId } = useActiveWeb3React()

    const summoners_data = useCallback(
        async (ids: number[]): Promise<SummonerData[]> => {

            const ethcallProvider = new Provider();
            await ethcallProvider.init(library as BaseProvider);
            ethcallProvider.multicallAddress = '0x5f28e9fca1c34b2dd44630df26fc7aa3d3f35eb9';

            const rarityContract = new Contract(RARITY_ADDRESS[chainId as number], RARITY_ABI);
            const summoners_calls: any[] = [];

            ids?.forEach((id)=>{
                summoners_calls.push(rarityContract?.summoner(id))
            })

            return new Promise(async(resolve, reject) => {
                try{
                    const summoners = await ethcallProvider.all(summoners_calls);
                    resolve(
                        summoners.map((value, i)=>{
                            return {
                                id: ids[i],
                                base: {
                                    _class: parseInt(value._class.toString()),
                                    _level: parseInt(value._level.toString()),
                                    _log:parseInt(value._log.toString()),
                                    _xp: parseInt(utils.formatUnits(value._xp.toString(),'ether'))
                                }
                            }
                        })

                    )
                    
                } catch (e) {
                    reject()
                }
            })
        }, [library]
    )

    return {summoners_data}
}
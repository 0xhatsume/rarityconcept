import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { useAppDispatch } from "..";
import { useSummonerIDsFromGraph } from "../../services/graphs/hooks";
import useRarityLib, { SummonerData } from "../../hooks/useRarityLib";
import { useCallback, useEffect } from "react";
import { chunkArrayByNumber } from "../../utils/chunkArray";

import { setLoading, updateSummoners } from './actions';

export const SummonersUpdater = () : null => {
    const { library, chainId, account } = useActiveWeb3React()
    const dispatch = useAppDispatch()

    const {data, isLoading, error} = useSummonerIDsFromGraph(account as string)

    const ids: number[] = data?.summoners
                    .map((v:{id:string})=> parseInt(v?.id) )
                    .sort((a:number,b:number)=> a-b)

    const { summoners_data } = useRarityLib()

    const fetch_summoners_data = useCallback(
        async(ids:number[])=>{
            if (ids.length <=50){
                const full_data = await summoners_data(ids)
                dispatch(updateSummoners(full_data))
                return
            }else{
                const chunks = chunkArrayByNumber(ids, 50)
                let full_data:SummonerData[] = []

                for (let chunk of chunks){
                    const chunk_data = await summoners_data(chunk)
                    full_data = full_data.concat(chunk_data)
                }

                dispatch(updateSummoners(full_data))
                return
            }
        }
        ,[summoners_data]
    )

    useEffect(() => {
        if(!ids || !library || !chainId || !account ) return
        dispatch(setLoading(true))
        fetch_summoners_data(ids).then(()=>dispatch(setLoading(false)))
    },[ids, fetch_summoners_data, library, chainId, account])

    return null
}
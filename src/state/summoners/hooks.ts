import { useAppSelector } from '../../state/index'
import { AppState } from '../../state/index'
import { SummonerData } from '../../hooks/useRarityLib'
import { useMemo } from 'react'
import { Interface } from '@ethersproject/abi'

export function useSummoners(): SummonerData[] {
    return useAppSelector((state: AppState) => state.summoners.data)
}

export function useSummonersLoading(): boolean {
    return useAppSelector((state: AppState) => state.summoners.loading)
}
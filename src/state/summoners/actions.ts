import { createAction } from '@reduxjs/toolkit'
import { SummonerData } from '../../hooks/useRarityLib'


export const updateSummoners = createAction<SummonerData[]>('summoners/updateSummoners')
export const syncSummoners = createAction('summoners/syncSummoners')
export const setLoading = createAction<boolean>('summoners/setLoading')
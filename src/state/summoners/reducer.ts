import { createReducer } from '@reduxjs/toolkit'
import { SummonerData } from '../../hooks/useRarityLib'
import { updateSummoners, setLoading, syncSummoners } from './actions'


export interface SummonersState {
    readonly data: SummonerData[]
    readonly loading: boolean
}

const initialState: SummonersState = {
    data: [],
    loading: true,
}

export default createReducer(initialState, (builder) => 
    builder
        .addCase(updateSummoners, (state, action) => {
            state.data = action.payload
            console.log("summoner data:")
            console.log(state.data)
        })
        .addCase(setLoading, (state, action) => {
            state.loading = action.payload
        })
        .addCase(syncSummoners, (state, action) => {
            console.log('syncSummoners')
        })
)

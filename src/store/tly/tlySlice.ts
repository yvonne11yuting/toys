import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CommonState, Vocabulary } from './type'


const initialState: CommonState = {
    vocabularies: [],
}

export const tlySlice = createSlice({
    name: 'tly',
    initialState,
    reducers: {
        setVocabularies: (state, action: PayloadAction<Vocabulary[]>) => {
            state.vocabularies = action.payload
        }
    },
})

export const { setVocabularies } = tlySlice.actions

export default tlySlice.reducer

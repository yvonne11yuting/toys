import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './common/commonSlice'
import tlySlice from './tly/tlySlice'
import { tlyVocApi } from './tly/tlyVocApi'

export const store = configureStore({
    reducer: {
        common: commonSlice,
        tly: tlySlice,
        [tlyVocApi.reducerPath]: tlyVocApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tlyVocApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

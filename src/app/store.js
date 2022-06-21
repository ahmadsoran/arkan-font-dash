import { configureStore } from '@reduxjs/toolkit'
import { appApi } from './appApi'
import tokenSlice from '../feature/tokenSlice'
import RefetchData from '../feature/refetchDataSlice'
import EditFontInputSlice from '../feature/EditFontInputSlice'

export const store = configureStore({
    reducer: {
        [appApi.reducerPath]: appApi.reducer,
        tokenSlice,
        RefetchData,
        EditFontInputSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(appApi.middleware),
})

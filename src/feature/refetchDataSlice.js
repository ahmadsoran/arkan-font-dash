import { createSlice } from "@reduxjs/toolkit";


const RefetchData = createSlice({
    name: 'fetch',
    initialState: {
        refetch: false,

    },
    reducers: {
        setRefetchReducer: (state, action) => {
            state.refetch = action.payload
        },
    }
})

export const { setRefetchReducer } = RefetchData.actions
export default RefetchData.reducer;

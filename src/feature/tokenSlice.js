import { createSlice } from "@reduxjs/toolkit";


const tokenSlice = createSlice({
    name: 'loginToken',
    initialState: {
        token: localStorage.getItem('token'),

    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('token', state.token)
        },
        removeToken: () => localStorage.removeItem('token')


    }
})

export const { setToken, removeToken } = tokenSlice.actions
export default tokenSlice.reducer;

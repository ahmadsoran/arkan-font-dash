import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    KUname: '',
    ENname: '',
    testText: '',
}
const EditFontInputSlice = createSlice({
    name: 'inputs',
    initialState,
    reducers: {
        setKUname: (state, action) => {
            state.KUname = action.payload
        },
        setENname: (state, action) => {
            state.ENname = action.payload
        },
        setTestText: (state, action) => {
            state.testText = action.payload
        }
    }
})

export const { setENname, setKUname, setTestText } = EditFontInputSlice.actions
export default EditFontInputSlice.reducer;

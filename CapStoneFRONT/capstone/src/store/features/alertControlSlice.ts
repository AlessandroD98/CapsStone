import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface alertState {
    alert : boolean
    err: boolean
}

const initialState: alertState = {
    alert : false,
    err : false,
}

export const alertControlSlice = createSlice({
    name: "alert",
    initialState,
    reducers:{
        changeState:(state, action:PayloadAction<boolean>)=> {
            state.alert = action.payload;
        },
        changeErrState:(state, action:PayloadAction<boolean>)=> {
            state.err = action.payload;
        }
    }
})

export default alertControlSlice.reducer
export const { changeState, changeErrState } = alertControlSlice.actions
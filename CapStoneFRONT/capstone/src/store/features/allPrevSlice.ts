import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPreventive } from "../../interface/Interface";

interface allPrevState {
    prevs : IPreventive[]
    subprevs: IPreventive[]
}

const initialState: allPrevState = {
    prevs : [],
    subprevs: []
}

export const allprevSlice = createSlice({
name : "allprevs",
initialState,
reducers: {
addPrevs: (state, action:PayloadAction<IPreventive[]>) =>{
    state.prevs = action.payload
},
addSubPrevs: (state,action:PayloadAction<IPreventive[]>) =>{
    state.subprevs = action.payload
}
}
})

export default allprevSlice.reducer
export const { addPrevs, addSubPrevs } = allprevSlice.actions
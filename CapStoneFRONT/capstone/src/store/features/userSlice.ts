import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICliente } from "../../interface/Interface";

interface userState {
user: ICliente | null
}

const initialState: userState = {
    user: {} as ICliente,
}

export const userSlice = createSlice({
name: "user",
initialState,
reducers: {
    addUser:(state,action:PayloadAction<ICliente>)=>{
        state.user = action.payload;
    }
}
})

export default userSlice.reducer
export const { addUser }=userSlice.actions 
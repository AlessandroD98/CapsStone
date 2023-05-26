import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IArticle, IPrevUser, IPreventive } from "../../interface/Interface";


interface prevState {
preventive : IPreventive
}

const initialState: prevState = {
    preventive : {
        articles: [],
        inspectionDate: "",
        cliente:{
            name: "",
            lastname:"",
            email: "",
            tel: 0,
            city: "",
            zipCode: "",
            address: "", 
        },
        description: "",
    }
}

export const preventivoSlice = createSlice({
    name: "preventivo",
    initialState,
    reducers: {
        addPrev:(state,action:PayloadAction<IPreventive>) => {
            state.preventive = action.payload;
        },
        addArticles:(state, action:PayloadAction<IArticle>) => {
            state.preventive.articles.push(action.payload)
        },
        addCliente:(state, action:PayloadAction<IPrevUser>)=> {
            state.preventive.cliente = action.payload
        },
    }
})

export default preventivoSlice.reducer
export const { addPrev, addCliente, addArticles } = preventivoSlice.actions
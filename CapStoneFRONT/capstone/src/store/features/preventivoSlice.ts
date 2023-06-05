import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IArticle, IHour, IPrevUser, IPreventive } from "../../interface/Interface";


interface prevState {
preventive : IPreventive
}

const initialState: prevState = {
    preventive : {
        articles: [],
        inspectionDate: "",
        inspectionHour: {
            hour: "",
        },
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
        state: "",
        numeropreventivo: 0
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
        removeArticles: (state, action: PayloadAction<string>) => {
            state.preventive.articles = state.preventive.articles.filter(
              article => article.type !== action.payload
            );
          },
        updateArticle: (state, action: PayloadAction<IArticle>) => {
            const updatedArticle = action.payload;
            state.preventive.articles = state.preventive.articles.map((item) =>
              item.type === updatedArticle.type ? updatedArticle : item
            );
          },
        addCliente:(state, action:PayloadAction<IPrevUser>)=> {
            state.preventive.cliente = action.payload
        },
        addDate:(state, action:PayloadAction<string>) => {
            state.preventive.inspectionDate = action.payload
        },
        addHour:(state, action:PayloadAction<IHour>) => {
            state.preventive.inspectionHour = action.payload
        },
        addDescription:(state, action:PayloadAction<string>) =>{
            state.preventive.description = action.payload
        }
    }
})

export default preventivoSlice.reducer
export const { addPrev, addCliente, removeArticles, addArticles, addDate, addHour, updateArticle, addDescription } = preventivoSlice.actions
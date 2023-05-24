import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProfileCheck, IArticleCheck, ICheck } from "../../interface/Interface"


interface prevInput {
checks: ICheck
}


const initialState: prevInput = {
checks : {
    profile: {
        inputs : false
    },
    article: {
        inputs : false
    },
    timing: {
        inputs : false
    }
}, 
}

export const prevInputCheck = createSlice({
    name: "inputCheck",
    initialState,
    reducers : {
        checkAnagrafica : (state, action: PayloadAction<IProfileCheck>) => {
            state.checks.profile = action.payload
        },
        checkArticle : (state, action:PayloadAction<IArticleCheck>) => {
            state.checks.article = action.payload
        },
    
    }
})

export default prevInputCheck.reducer
export const { checkAnagrafica,checkArticle } = prevInputCheck.actions
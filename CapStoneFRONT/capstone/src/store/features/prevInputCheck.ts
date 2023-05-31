import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProfileCheck, IArticleCheck, ICheck, ITimingCheck } from "../../interface/Interface"


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
    },
    dimension : {
        inputs : true
    },
    material: {
        inputs: true
    },
    summary: {
        inputs: true
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
        checkTiming : (state, action:PayloadAction<ITimingCheck>)=> {
            state.checks.timing = action.payload
        }
    
    }
})

export default prevInputCheck.reducer
export const { checkAnagrafica,checkArticle, checkTiming } = prevInputCheck.actions
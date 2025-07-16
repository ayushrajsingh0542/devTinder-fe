import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeFromFeed:(state,action)=>{
             const newArray=state.filter((req)=>req._id!==action.payload)
            return newArray
        }
    }
})

export const {addFeed,removeFromFeed}=feedSlice.actions;
export default feedSlice.reducer
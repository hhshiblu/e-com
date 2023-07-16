import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isloading:true,
}


export const categoryReducer=createReducer(initialState,{
    CategoryCreateRequest:(state)=>{
        state.isloading=true;
    },
    CategoryCreateSuccess:(state,action)=>{
        state.isloading=false;
        state.category=action.payload;
        state.success=true;
    },
    CategoryCreateFail:(state,action)=>{
        state.isloading=false;
        state.error=action.payload;
        state.success=false;
    },




 // get all category 
 getAllCategoryRequest: (state) => {
    state.isloading = true;
  },
  getAllCategorySuccess: (state, action) => {
    state.isloading = false;
    state.category = action.payload;
    console.log(action.payload);
  },

  getAllCategoryFailed: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
  },


    clearErrors:(state)=>{
        state.error=null;
    }

})
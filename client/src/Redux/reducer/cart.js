import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isloading:false,
};


export const cartReducer=createReducer(initialState,{
  cartCreateRequest:(state)=>{
      state.isloading=true;
  },
 cartCreateSuccess:(state,action)=>{
      state.isloading=false;
      state.cart=action.payload;
      state.success=true;
  },
cartCreateFail:(state,action)=>{
      state.isloading=false;
      state.error = action.payload;
      state.success=false;
  },
  clearErrors:(state)=>{
    state.error=null;
}
});

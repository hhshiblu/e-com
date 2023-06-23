import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isSeller: false,
};

export const sellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state) => {
    state.isloading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isSeller = true;
    state.isloading = false;
    state.seller = action.payload;
  },
  LoadSellerFail: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
    state.isSeller = false;
  },
    // get all sellers ---admin
    getAllSellersRequest: (state) => {
      state.isLoading = true;
    },
    getAllSellersSuccess: (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    },
    getAllSellerFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearErrors:(state)=>{
      state.error=null;
  }
})
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
};

export const orderData = createReducer(initialState, {
  orderDataStore: (state, action) => {
    state.leatestorderData = action.payload;
    console.log("hello data", state.leatestorderData);
  },
});

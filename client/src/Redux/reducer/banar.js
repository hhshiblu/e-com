import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const banarReducer = createReducer(initialState, {
    // create banar
  banarCreateRequest: (state) => {
    state.isLoading = true;
  },
  banarCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.banar = action.payload;
    state.success = true;
  },
  banarCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  // get all banar of user
  getAllBanarRequest: (state) => {
    state.isLoading = true;
  },
  getAllBanarSuccess: (state, action) => {
    state.isLoading = false;
    state.banars = action.payload;
  },
  getAllBanarFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // delete Banar 

  deleteBanarRequest: (state) => {
    state.isLoading = true;
  },
  deleteBanarSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
    state.success = true;
  },
  deleteBanarFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isloading: true,
};

export const productReducer = createReducer(initialState, {
  productCreateRequest: (state) => {
    state.isloading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isloading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
    state.success = false;
  },

  // all products for shop
  getAllproductRequest: (state) => {
    state.isloading = true;
  },

  getAllShopProductSuccess: (state, action) => {
    state.isloading = false;
    state.products = action.payload;
  },
  getAllShopProductFailed: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
  },

  // delete product of a shop

  deleteProductRequest: (state) => {
    state.isloading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isloading = false;
    state.message = action.payload;
  },
  deleteProductFailed: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
  },

  // get all products
  getAllProductsRequest: (state) => {
    state.isloading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isloading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});

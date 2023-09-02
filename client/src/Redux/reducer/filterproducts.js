import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  categorys: [],
  products: [],
  totalProduct: 0,
  parPage: 4,
  latest_product: [],
  topRated_product: [],
  discount_product: [],
  priceRange: {
    low: 0,
    high: 100000,
  },
  arrayProducts:[],
  product: {},
  relatedProducts: [],
  moreProducts: [],
};

export const filterProducts = createReducer(initialState, {
  queryProductRequest: (state) => {
    state.isloading = true;
  },
  queryProductSuccess: (state, action) => {
    state.isloading = false;
    state.products = action.payload.products;
    state.totalProduct = action.payload.totalProduct;
    state.parPage = action.payload.parPage;
    state.success = true;
  },
  queryProductFailed: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
    state.success = false;
  },

  // ..............?
  PriceRangeRequest: (state) => {
    state.isloading = true;
  },
  PriceRangeSuccess: (state, action) => {
    state.isloading = false;
    state.latest_product = action.payload.latest_product;
    state.priceRange = action.payload.priceRange;

    state.success = true;
  },
  PriceRangeFailed: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
    state.success = false;
  },

  // ..................

  getProductsRequest: (state) => {
    state.isloading = true;
  },
  getProductsSuccess: (state, action) => {
    state.isloading = false;
    state.products = action.payload.products;
    state.latest_product = action.payload.latest_product;
    state.topRated_product = action.payload.topRated_product;
    state.discount_product = action.payload.discount_product;
    state.success = true;
  },
  getProductsFailed: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
    state.success = false;
  },
  getProductRequest: (state) => {
    state.isloading = true;
  },
  getProductSuccess: (state, action) => {
    state.isloading = false;
    state.product = action.payload.product;
    state.arrayProducts = action.payload.product;
    state.relatedProducts = action.payload.relatedProducts;
    state.moreProducts = action.payload.moreProducts;
    state.success = true;
  },
  getProductFailed: (state, action) => {
    state.isloading = false;
    state.error = action.payload;
    state.success = false;
  },
});

import axios from "axios";

// product filter

import { server } from "../../serverUrl";

export const query_products = (query) => async (dispatch) => {
  try {
    dispatch({ 
      type: "queryProductRequest",
    });

 const queryParams = new URLSearchParams({
   category: query.category,
   subCategory: query.subCategory,
   rating: query.rating,
   lowPrice: query.low,
   highPrice: query.high,
   sortPrice: query.sortPrice,
   pageNumber: query.pageNumber,
   searchValue: query.searchValue || "",
 });
 if (query.maxPrice ) {
   queryParams.set("maxPrice", query.maxPrice);
    }
    
    
 const url = `${server}/products/query-products?${queryParams}`;
 const { data } = await axios.get(url);



    dispatch({
      type: "queryProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "queryProductFailed",
      // payload: error.response.data.message,
    });
  }
};


export const price_range_product = () => async (dispatch) => {
  try {


    const { data } = await axios.get(
      `${server}/products/price-range-latest-product`
    );

    dispatch({
      type: "PriceRangeSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PriceRangeFailed",
      payload: error.response.data.message,
    });
  }
};


export const get_products = () => async (dispatch) => {
  try {
    dispatch({
      type: "getProductsRequest",
    });

    const { data } = await axios.get(`${server}/products/get-products-query`);



    dispatch({
      type: "getProductsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getProductsFailed",
      // payload: error.response.data.message,
    });
  }
};
export const get_product = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductRequest",
    });

    const { data } = await axios.get(
      `${server}/products/get-product/${id}`
    );

    dispatch({
      type: "getProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getProductFailed",
      // payload: error.response.data.message,
    });
  }
};
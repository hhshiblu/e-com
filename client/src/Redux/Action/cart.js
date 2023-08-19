import axios from "axios";

// create cart

import { server } from "../../serverUrl";

export const add_To_cart = (info) => async (dispatch) => {
  try {
    dispatch({
      type: "cartCreateRequest",
    });


    const { data } = await axios.post(
      `${server}/product/cart/add-to-card`,
      info
    );

    dispatch({
      type: "cartCreateSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "cartCreateFail",
      payload: error.response.data,
    });
  }
};


export const get_card_products= (userId) => async (dispatch) => {
  try {
     dispatch({
       type: "getCartRequest",
     });
    const {data} = await axios.get(
      `${server}/product/cart/get-card-product/${userId}`
    );

    dispatch({
      type: "getCartSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getCartFaied",
      payload: error.message,
    });
  }
};

export const delete_card_product = (card_id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCartRequest",
    });
    const { data } = await axios.delete(
      `${server}/product/cart/delete-card-product/${card_id}`
    );

    dispatch({
      type: "deleteCartSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteCartFaied",
      payload: error.message.data,
    });
  }
};

export const quantity_inc = (card_id) => async (dispatch) => {
  try {
    dispatch({
      type: "incCartRequest",
    });
    const { data } = await axios.put(
      `${server}/product/cart/quantity-inc/${card_id}`
    );

    dispatch({
      type: "incCartSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "incCartFaied",
      payload: error.message.data,
    });
  }
};
export const quantity_dec = (card_id) => async (dispatch) => {
  try {
    dispatch({
      type: "decCartRequest",
    });
    const { data } = await axios.put(
      `${server}/product/cart/quantity-dec/${card_id}`
    );

    dispatch({
      type: "decCartSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "decCartFaied",
      payload: error.message.data,
    });
  }
};



// // add to cart
// export const addTocart = (data) => async (dispatch, getState) => {
//   dispatch({
//     type: "addToCart",
//     payload: data,
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
//   return data;
// };

// // remove from cart
// export const removeFromCart = (data) => async (dispatch, getState) => {
//   dispatch({
//     type: "removeFromCart",
//     payload: data._id,
//   });
//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
//   return data;
// };






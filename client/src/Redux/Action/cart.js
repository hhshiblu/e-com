// import axios from "axios";

// // create event

// import { server } from "../../serverUrl";

// export const addTocart = (cartItems) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "cartCreateRequest",
//     });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.post(
//       `${server}/cart/add-to-cart`,
//       cartItems,
//       config
//     );
  

//     dispatch({
//       type: "cartCreateSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "cartCreateFail",
//       payload: error.response.data.message,
//     });
//   }
// };


// export const getCartItems = (userId) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${server}/cart/getCart`);
//     const { cart} = response.data;

//     dispatch({
//       type:"getCartSuccess",
//       payload: cart,
//     }); 
//   } catch (error) {
//     dispatch({
//       type: "getCartFaied",
//       payload: error.message,
//     });
//   }
// };


// add to cart
export const addTocart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};







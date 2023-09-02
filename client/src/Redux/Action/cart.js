
export const addTocart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

export const removeFromCart = (productId) => {
  return (dispatch, getState) => {

    dispatch({ type: "removeFromCart", payload: productId });


    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  };
};

export const updateQuantity = (productId, newQuantity) => {
  return (dispatch, getState) => {

    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, newQuantity } });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  };
};
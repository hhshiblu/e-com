
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const { productId, quantity, color, size } = action.payload;
    const isItemExist = state.cart.find((i) => i.productId === productId);

    const newItem = {
      productId,
      quantity,
      color, // Add color property only if color is provided
      size, // Add size property only if size is provided
    };

    if (isItemExist) {
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.productId === isItemExist.productId ? newItem : i
        ),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  },
  removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
    },

  UPDATE_QUANTITY:(state, action) => {
      const { productId, newQuantity } = action.payload;

      const itemToUpdate = state.cart.find((i) => i.productId === productId);
      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
      }
    },
});
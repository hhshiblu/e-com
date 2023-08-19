import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  card_products: [],
  card_product_count: 0,
  buy_product_item: 0,
  price: 0,
  errorMessage: "",
  successMessage: "",
  shipping_fee: 0,
  outofstock_products: [],
};

export const cartReducer = createReducer(initialState, {
  cartCreateRequest: (state) => {
    state.isloading = true;
  },
  cartCreateSuccess: (state, action) => {
    state.isloading = false;
    state.successMessage = action.payload.message;
      //  state.card_product_count = action.payload.cartItemsLength +1;
    state.success = true;
  },
  cartCreateFail: (state, action) => {
    state.isloading = false;
    state.errorMessage = action.payload.error;
    state.success = false;
  },

  // //get cart Item

  getCartRequest: (state) => {
    state.isloading = true;
  },
  getCartSuccess: (state, action) => {
    state.isloading = false;
    state.card_products = action.payload.card_products;
    state.price = action.payload.price;
    state.card_product_count = action.payload.cartItemsLength;
    state.shipping_fee = action.payload.shipping_fee;
    state.outofstock_products = action.payload.outOfStockProduct;
    state.buy_product_item = action.payload.buy_product_item;
    state.success = true;
  },
  getCartFaied: (state, action) => {
    state.isloading = false;
    state.errorMessage = action.payload.error;
  },

  // ---------------delete cart

  deleteCartRequest: (state) => {
    state.isloading = true;
  },

  deleteCartSuccess: (state, action) => {
    state.isloading = false;
    state.successMessage = action.payload.message;
    state.success = true;
  },
  deleteCartFaied: (state, action) => {
    state.isloading = false;
    state.errorMessage = action.payload.error;
  },

  // increase cart item-------

  incCartRequest: (state) => {
    state.isloading = true;
  },
  incCartSuccess: (state, action) => {
    state.isloading = false;
    state.successMessage = action.payload.message;
    state.success = true;
  },
  incCartFaied: (state, action) => {
    state.isloading = false;
    state.errorMessage = action.payload.error;
  },
  // decrease cart item-------

  decCartRequest: (state) => {
    state.isloading = true;
  },
  decCartSuccess: (state, action) => {
    state.isloading = false;
    state.successMessage = action.payload.message;
    state.success = true;
  },
  decCartFaied: (state, action) => {
    state.isloading = false;
    state.errorMessage = action.payload.error;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   cart: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
// };

// export const cartReducer = createReducer(initialState, {
//   addToCart: (state, action) => {
//     const item = action.payload;
//     const isItemExist = state.cart.find((i) => i._id === item._id);
//     if (isItemExist) {
//       return {
//         ...state,
//         cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
//       };
//     } else {
//       return {
//         ...state,
//         cart: [...state.cart, item],
//       };
//     }
//   },
//   // addToCart: (state, action) => {
//   //   const { productId, quantity } = action.payload;
//   //   const isItemExist = state.cart.find((item) => item.productId === productId._id);
//   //   if (isItemExist) {
//   //     return {
//   //       ...state,
//   //       cart: state.cart.map((item) =>
//   //         item.productId === isItemExist.productId ? { ...item, quantity } : item
//   //       ),
//   //     };
//   //   } else {

//   //     return {
//   //       ...state,
//   //       cart: [...state.cart, productId, quantity],
//   //     };
//   //   }
//   // },

//   removeFromCart: (state, action) => {
//     return {
//       ...state,
//       cart: state.cart.filter((i) => i._id !== action.payload),
//     };
//   },
// });

// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   isloading:false,
// };


// export const cartReducer=createReducer(initialState,{
//   cartCreateRequest:(state)=>{
//       state.isloading=true;
//   },
//  cartCreateSuccess:(state,action)=>{
//       state.isloading=false;
//       state.message=action.payload;
//       state.success=true;
//   },
// cartCreateFail:(state,action)=>{
//       state.isloading=false;
//       state.error = action.payload;
//       state.success=false;
//   },

// //get cart Item

// getcartRequest:(state)=>{
//   state.isloading=true;
// },
// getCartSuccess:(state,action)=>{
//   state.isloading=false;
//   state.cart=action.payload;
//   state.success=true;
// },
// getCartFailed:(state,action)=>{
//   state.isloading=false;
//   state.error = action.payload;
 
// },
//   clearErrors:(state)=>{
//     state.error=null;
// }
// });


import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i) => i._id === item._id);
    if (isItemExist) {
      return {
        ...state,
        cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  },
  // addToCart: (state, action) => {
  //   const { productId, quantity } = action.payload;
  //   const isItemExist = state.cart.find((item) => item.productId === productId._id);
  //   if (isItemExist) {
  //     return {
  //       ...state,
  //       cart: state.cart.map((item) =>
  //         item.productId === isItemExist.productId ? { ...item, quantity } : item
  //       ),
  //     };
  //   } else {
      
  //     return {
  //       ...state,
  //       cart: [...state.cart, productId, quantity],
  //     };
  //   }
  // },
  
  
  
  
  
  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((i) => i._id !== action.payload),
    };
  },
});

import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user";
import { sellerReducer } from "./reducer/seller";
import { productReducer } from "./reducer/product";
import { eventReducer } from "./reducer/event";
import { orderReducer } from "./reducer/order";
import { categoryReducer } from "./reducer/category";
import { orderData } from "./reducer/orderData";
import { banarReducer } from "./reducer/banar";
import { filterProducts } from "./reducer/filterproducts";
import { cartReducer } from "./reducer/cart";

import { chatReducer } from "./reducer/chat";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    cart: cartReducer,
    events: eventReducer,
    order: orderReducer,
    category: categoryReducer,
    banar: banarReducer,
    orderData: orderData,
    filterProduct: filterProducts,
    chat: chatReducer,
  },
});
export default Store;

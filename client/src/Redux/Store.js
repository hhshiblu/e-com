import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user";
import { sellerReducer } from "./reducer/seller";

import { productReducer } from "./reducer/product";
import { eventReducer } from "./reducer/event";
import { cartReducer } from "./reducer/cart";
import { orderReducer } from "./reducer/order";
import { categoryReducer } from "./reducer/category";
import { orderData } from "./reducer/orderData";
import { banarReducer } from "./reducer/banar";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    order: orderReducer,
    category: categoryReducer,
    banar:banarReducer,
    orderData: orderData,
  },
});
export default Store;

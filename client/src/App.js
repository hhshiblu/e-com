import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  SellerActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  FaqPage,
  CartPage,
  ProductDetailsPage,
  UserProfilePage,
  ShopCreatePage,
  ShopLogInPage,
  CheckoutPage,
} from "./Routes.js";
import { useEffect } from "react";
// import axios from "axios";
// import { server } from "./serverUrl";
import Store from "./Redux/Store";
import { loadSeller, loadUser } from "./Redux/Action/user";
import { useSelector } from "react-redux";

import {
  ShopHomePage,
  ShopDashBoardPage,
  ShopCreateProduct,
  AllShopProduct,
  ShopCreateEvent,
  AllShopEvent,
  ShopAllCoupouns,
  ShopViewPage,
} from "./Routes/ShopRoutes.js";
import ProtectedRoute from "./ProtectRoutes/ProtectedRoute";
import ProtectSellerRoute from "./ProtectRoutes/ProtectSellerRoute";
import { getAllProducts } from "./Redux/Action/product";
import { getAllEvents } from "./Redux/Action/event";
import axios from "axios";
axios.defaults.withCredentials = true;
function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());

    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />
          <Route path="/all-products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/best-selling-products" element={<BestSellingPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/all-cart-products" element={<CartPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          {/* all shop route */}

          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route path="/shop-login" element={<ShopLogInPage />} />
          <Route
            path="/shop/:id"
            element={
              <ProtectSellerRoute>
                <ShopHomePage />
              </ProtectSellerRoute>
            }
          />
          <Route path="/shop/view/:id" element={<ShopViewPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectSellerRoute>
                <ShopDashBoardPage />
              </ProtectSellerRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <ProtectSellerRoute>
                <ShopCreateProduct />
              </ProtectSellerRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <ProtectSellerRoute>
                <AllShopProduct />
              </ProtectSellerRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <ProtectSellerRoute>
                <ShopCreateEvent />
              </ProtectSellerRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <ProtectSellerRoute>
                <AllShopEvent />
              </ProtectSellerRoute>
            }
          />

          <Route
            path="/dashboard-coupouns"
            element={
              <ProtectSellerRoute>
                <ShopAllCoupouns />
              </ProtectSellerRoute>
            }
          />
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;

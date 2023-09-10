import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  PaymentPage,
  OrderSuccessPage,
  UserOrderDetailsPage,
  TrackOrderPage,
  UserInbox,
  CateProductsPage,
  SearchProducts,
} from "./Routes.js";
import { useEffect, useState } from "react";
// import axios from "axios";
// import { server } from "./serverUrl";
import Store from "./Redux/Store";
import { loadSeller, loadUser } from "./Redux/Action/user";

import {
  ShopHomePage,
  ShopDashBoardPage,
  ShopCreateProduct,
  AllShopOrders,
  AllShopProduct,
  ShopCreateEvent,
  AllShopEvent,
  ShopAllCoupouns,
  ShopViewPage,
  ShopOrderDetailsPage,
  ShopOrdersRefund,
  ShopSettingPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./Routes/ShopRoutes.js";

import {
  AdminDashboardWithdraw,
  AdminDashboardEvents,
  AdminDashboardProducts,
  AdminDashboardOrders,
  AdminDashboardSellers,
  AdminDashboardCategory,
  AdminDashboardUsers,
  AdminDashboardPage,
  AdminDashboardBanar,
  AdminUpComingItems,
} from "./Routes/AdminRoutes.js";
import ProtectedRoute from "./ProtectRoutes/ProtectedRoute";
import ProtectSellerRoute from "./ProtectRoutes/ProtectSellerRoute";
import { getAllProducts } from "./Redux/Action/product";
import axios from "axios";
import ProtectedAdminRoute from "./ProtectRoutes/ProtectedAdminRoute";
import { leatestOrderData } from "./Redux/Action/orderData";
import { getAllBanar } from "./Redux/Action/banar";
import ScrollTop from "./component/scrollToTop/ScrollTop";
import { getAllCategory } from "./Redux/Action/category";

import MainLayout from "./component/Seller/Layout/MainLayout";

import DashBoard from "./component/Layout/DashBoard.jsx";
import UserOrder from "./component/userProfile/UserOrder";
import UserOrderRefunds from "./component/userProfile/UserOrderRefunds";
import Address from "./component/userProfile/Address";
import UserProfile from "./component/userProfile/UserProfile";
// import UserDashBorad from "./component/Layout/UserDashBoard";
// import UserDashBoard from "./component/Layout/UserDashBoard";

axios.defaults.withCredentials = true;
function App() {

  useEffect(() => {
    Store.dispatch(getAllCategory());
    Store.dispatch(getAllBanar());
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    // Store.dispatch(getAllEvents());
    Store.dispatch(leatestOrderData());
    // getStripeApikey();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ScrollTop />

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
          {/* <Route path="/products/all-products" element={<CateProductsPage />} /> */}
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/best-selling-products" element={<BestSellingPage />} />
          <Route path="/some-related-faq" element={<FaqPage />} />
          <Route path="/products/search?" element={<SearchProducts />} />
          <Route path="/all-cart-products" element={<CartPage />} />
          {/* <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute>
                <TrackOrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <UserOrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route
            path="/checkout_products"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <UserInbox />
              </ProtectedRoute>
            }
          />
          <Route path="/account/profile" element={<DashBoard />}>
            <Route
              index
              element={
             
                  <UserProfile />
               
              }
            />
            <Route path="all-orders" element={<UserOrder />} />
            <Route path="refund-orders" element={<UserOrderRefunds />} />
            <Route path="address" element={<Address />} />
          </Route>

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
          <Route
            path="/settings"
            element={
              <ProtectSellerRoute>
                <ShopSettingPage />
              </ProtectSellerRoute>
            }
          />
          <Route path="/shop/view/:id" element={<ShopViewPage />} />
          <Route path="/seller_DashBoard" element={<MainLayout />}>
            <Route
              index
              element={
                <ProtectSellerRoute>
                  <ShopDashBoardPage />
                </ProtectSellerRoute>
              }
            />
            <Route
              path="all-orders"
              element={
                <ProtectSellerRoute>
                  <AllShopOrders />
                </ProtectSellerRoute>
              }
            />
            <Route
              path="all-Products"
              element={
                <ProtectSellerRoute>
                  <AllShopProduct />
                </ProtectSellerRoute>
              }
            />
            <Route
              path="add-Product"
              element={
                <ProtectSellerRoute>
                  <ShopCreateProduct />
                </ProtectSellerRoute>
              }
            />
            <Route
              path="order-refunds"
              element={
                <ProtectSellerRoute>
                  <ShopOrdersRefund />
                </ProtectSellerRoute>
              }
            />
            <Route
              path="withdraw-money"
              element={
                <ProtectSellerRoute>
                  <ShopWithDrawMoneyPage />
                </ProtectSellerRoute>
              }
            />
            <Route
              path="coupon"
              element={
                <ProtectSellerRoute>
                  <ShopAllCoupouns />
                </ProtectSellerRoute>
              }
            />
            <Route
              path="all-events"
              element={
                <ProtectSellerRoute>
                  <AllShopEvent />
                </ProtectSellerRoute>
              }
            />
            <Route
              path="add-event"
              element={
                <ProtectSellerRoute>
                  <ShopCreateEvent />
                </ProtectSellerRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectSellerRoute>
                  <ShopSettingPage />
                </ProtectSellerRoute>
              }
            />
          </Route>

          <Route
            path="/order/:id"
            element={
              <ProtectSellerRoute>
                <ShopOrderDetailsPage />
              </ProtectSellerRoute>
            }
          />

          <Route
            path="/dashboard-messages"
            element={
              <ProtectSellerRoute>
                <ShopInboxPage />
              </ProtectSellerRoute>
            }
          />

          {/* -----------------------admin routes-------------- */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-up-items"
            element={
              <ProtectedAdminRoute>
                <AdminUpComingItems />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardUsers />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-sellers"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardSellers />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-orders"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardOrders />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-products"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardProducts />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-category"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardCategory />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-events"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardEvents />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-withdraw-request"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardWithdraw />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-hero-section"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardBanar />
              </ProtectedAdminRoute>
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

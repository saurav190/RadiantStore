import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "../components/Search";
import ErrorPage from "../components/common/ErrorPage";
import ProtectedPages from "../components/common/ProtectedPages";
import MasterLayout from "../layouts/MasterLayout";
import AboutUs from "../pages/AboutUs";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import EWayBill from "../pages/EWayBill";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import OrdersListPage from "../pages/OrdersListPage";
import Ourteam from "../pages/OurTeam";
import PrivacyPolicy from "../pages/Privacy";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import Profile from "../pages/Profile";
import SignupPage from "../pages/SignupPage";
import SupportPage from "../pages/SupportPage";
import TermsAndConditions from "../pages/Termcondition";
import WhishlistPage from "../pages/WhishlistPage";
import { setCartData } from "../redux/slices/cart/cartSlice";
import { FormValues } from "../redux/slices/checkout/checkoutSlice";
import { setSaveForLater } from "../redux/slices/saveforlater/saveforlaterSlice";
import {
  loginInfo,
  setIsAuthenticated,
  signUpInfo,
} from "../redux/slices/useAuth/userAuth";
import { addToWishlist, wishlistData } from "../redux/slices/wishList/wishlistSlice";
import { useAppDispatch } from "../redux/store";

const Router: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const userInfo = localStorage?.getItem("loginuser");
    const cartItems = localStorage?.getItem("cartItem");
    const Checkout=localStorage?.getItem("checkout");
    const savedItems = localStorage?.getItem("savedItems");
    const userAuth = localStorage?.getItem("userAuth");
    const wishlist = localStorage?.getItem("Wishlist");

    if (userAuth) {
      const userData = JSON.parse(userAuth);
      dispatch(setIsAuthenticated(userData));
    }
    if (userInfo) {
      const user = JSON.parse(userInfo);
      dispatch(loginInfo(user));
      dispatch(signUpInfo(user));
    }

    if (cartItems) {
      const cart = JSON.parse(cartItems);
      console.log(cart);
      dispatch(setCartData(cart));
    }
    if (savedItems) {
      const savedCart = JSON.parse(savedItems);
      console.log(savedCart);
      dispatch(setSaveForLater(savedCart));
    }
    if(Checkout){
      const checkout=JSON.parse(Checkout)
      dispatch(FormValues(checkout))
    }
    if(wishlist){
      const wish=JSON.parse(wishlist)
      dispatch(wishlistData(wish));
    }
  }, []);



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MasterLayout />}>
            <Route index element={<HomePage />} />
            <Route path="signup" element={<SignupPage />} />
          
      
            <Route path="login" element={<LoginPage />} />
            <Route path="wishlist" element={<WhishlistPage />} />
            <Route
              path="/termsandconditions"
              element={<TermsAndConditions />}
            />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route
              path="productdetails/:productId"
              element={<ProductDetailsPage />}
            />
            <Route
              path="orderlist"
              element={
                <ProtectedPages>
                  <OrdersListPage />
                </ProtectedPages>
              }
            />
            <Route
              path="ourteam"
              element={
                  <Ourteam />
              }
            />
            <Route path="cart" element={<CartPage />} />
            <Route path="search" element={<Search />} />
            <Route
              path="checkout"
              element={
                <ProtectedPages>
                  <Checkout />
                </ProtectedPages>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedPages>
                  <Profile />
                </ProtectedPages>
              }
            />
            <Route
              path="order"
              element={
                <ProtectedPages>
                  <OrdersListPage />
                </ProtectedPages>
              }
            />
            <Route
              path="support"
              element={
                <ProtectedPages>
                  <SupportPage />
                </ProtectedPages>
              }
            />

            <Route
              path="ewaybill/:itemId"
              element={
                <ProtectedPages>
                  <EWayBill />
                </ProtectedPages>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

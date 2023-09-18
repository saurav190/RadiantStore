import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productReducer from "./slices/product/productSlice";
import userReducer from "./slices/useAuth/userAuth";
import productDetailsReducer from "./slices/productDetails/productDetailsSlice";
import cartReducer from "./slices/cart/cartSlice";

import saveforlaterReducer from "./slices/saveforlater/saveforlaterSlice";
import checkoutslice from "./slices/checkout/checkoutSlice";
import shippingSlice from './slices/shipping/shippingSlice'
import searchReducer from "./slices/search/searchSlice"
import wishlistSlice from "./slices/wishList/wishlistSlice"; // Import the wishlistSlice
import categoryReducer from "./slices/category/categorySlice";
import supportSlice from "./slices/support/supportSlice";

const reducer = {
  userAuth: userReducer,
  product: productReducer,
  cart: cartReducer,
  saveforlater: saveforlaterReducer,
  productDetails: productDetailsReducer,
  
  checkout:checkoutslice,
  shippingInfo: shippingSlice,
  search:searchReducer,
  wishList:wishlistSlice,
  category:categoryReducer,

  support:supportSlice,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

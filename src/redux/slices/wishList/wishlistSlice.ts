import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store'; // Adjust the path as needed
import { CartItem } from '../../../utils/types';


const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [] as CartItem[],
  reducers: {
    wishlistData: (state, action: PayloadAction<CartItem>) =>{
      state.push(action.payload);
    },
    addToWishlist: (state, action: PayloadAction<CartItem>) => {
      state.push(action.payload);
      localStorage?.setItem("Wishlist", JSON.stringify(state));
    },
    removeFromWishlist: (state, action: PayloadAction<CartItem>) => {
      const remove = state.filter(item => item.id !== action.payload.id);
       localStorage?.setItem("Wishlist", JSON.stringify(remove));
      return remove;
    },
    removeProductFromWishlist: (state, action: PayloadAction<CartItem>) => {
      const filteredWishList = state.filter(item => item.id !== action.payload.id);
      localStorage.setItem('wishlist', JSON.stringify(filteredWishList));
      return filteredWishList;
    },
  },
});

export const { addToWishlist, removeFromWishlist, removeProductFromWishlist, wishlistData } = wishlistSlice.actions;

export default wishlistSlice.reducer;

// Selector
export const selectWishlist = (state: RootState) => state.wishList; // Adjust the path as needed

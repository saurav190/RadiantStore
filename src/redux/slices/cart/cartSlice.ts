import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../../utils/types";

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  changed: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(
      state,
      action: PayloadAction<{ totalQuantity: number; items: CartItem[] }>
    ): void {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    setCartData(state, action: PayloadAction<CartItem[]>): void {
      state.totalQuantity = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.items = action.payload;
      state.changed = true;
    },
    addItemToCart(state, action: PayloadAction<CartItem>): void {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      const quantityToAdd = newItem.quantity; // Quantity received from payload
      state.totalQuantity += quantityToAdd;
      state.changed = true;
      if (!existingItem) {
        state.items.unshift({
          id: newItem.id,
          price: newItem.price,
          category: newItem.category,
          description: newItem.description,
          image: newItem.image,
          title: newItem.title,
          rating: newItem.rating,
          quantity: quantityToAdd,
          totalPrice: newItem.price * quantityToAdd,
        });
      } else {
        existingItem.quantity += quantityToAdd;
        existingItem.totalPrice += newItem.price * quantityToAdd;
      }
      localStorage?.setItem("cartItem", JSON.stringify(state.items));
    },
    removeItemFromCart(state, action: PayloadAction<number>): void {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else if (existingItem) {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      localStorage?.setItem("cartItem", JSON.stringify(state.items));
    },
    incrementCartItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity++;
        state.changed = true;
      }
      localStorage?.setItem("cartItem", JSON.stringify(state.items));
    },
    decrementCartItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
          state.totalQuantity--;
          state.changed = true;
        }
      }
      localStorage?.setItem("cartItem", JSON.stringify(state.items));
    },
    // emptyItemFromCart(state, action: PayloadAction<number>): void {
    //   const id = action.payload;
    //   const existingItem= state.items.find(item => item.id === id);
    //   state.totalQuantity--;
    //   state.changed = true;
    //   if (existingItem && existingItem.quantity === 1) {
    //     state.items = state.items.filter((item) => item.id !== id);
    //   } else if (existingItem) {
    //     existingItem.quantity --;
    //     existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
    //   }

    // },
    emptyItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage?.setItem("cartItem", JSON.stringify(state.items));
    },
    emptyCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.changed = true;
      localStorage?.removeItem("cartItem");
    },
  },
});

export const {
  replaceCart,
  addItemToCart,
  removeItemFromCart,
  emptyItemFromCart,
  incrementCartItem,
  emptyCart,
  decrementCartItem,
  setCartData,
} = cartSlice.actions;

export default cartSlice.reducer;

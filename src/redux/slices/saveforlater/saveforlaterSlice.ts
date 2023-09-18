import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../../utils/types";

interface SaveForLaterState {
  saveForLaterItems: CartItem[];
}

const initialState: SaveForLaterState = {
  saveForLaterItems: [],
};

const saveForLaterSlice = createSlice({
  name: "saveForLater",
  initialState,
  reducers: {
    addToSaveForLater: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.saveForLaterItems.find(
        (item) => item.id === newItem.id
      );
      if (!existingItem) {
        state.saveForLaterItems.push(newItem);
      }
      localStorage?.setItem(
        "savedItems",
        JSON.stringify(state.saveForLaterItems)
      );
    },
    removeFromSaveForLater: (state, action: PayloadAction<number>) => {
      state.saveForLaterItems = state.saveForLaterItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage?.setItem(
        "savedItems",
        JSON.stringify(state.saveForLaterItems)
      );
    },
    setSaveForLater: (state, action: PayloadAction<CartItem[]>) => {
      state.saveForLaterItems = action.payload;
    },
  },
});

export const { addToSaveForLater, removeFromSaveForLater, setSaveForLater } =
  saveForLaterSlice.actions;
export default saveForLaterSlice.reducer;

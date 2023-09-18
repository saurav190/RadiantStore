import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../../utils/types"; 
import { RootState } from "../../store";


interface CategoriesState {
  filteredProducts: CartItem[];
}

const initialState: CategoriesState = {
  filteredProducts: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setFilteredProducts: (state, action: PayloadAction< CartItem[]>) => {
      state.filteredProducts = action.payload;
    },
  },
});

export const { setFilteredProducts } = categoriesSlice.actions;


export default categoriesSlice.reducer;

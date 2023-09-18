import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../../utils/types";

export const productData = createAsyncThunk<CartItem[]>(
  "product/fetchData",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data:CartItem[]  = await response.json();
    return data;
    
  }
);
interface ProductState {
  data: CartItem[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  data: [],
  loading: "idle", 
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: { },
 
  extraReducers: (builder) => {
    builder
      .addCase(productData.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(productData.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
  },
});
export default productSlice.reducer;


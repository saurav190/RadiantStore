import { createSlice ,createAsyncThunk ,PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';
import { CartItem } from "../../../utils/types";
interface ProductDetailState {
    product: CartItem | null ;
    loading: boolean;
    error: string | null;
    counter:number
}

const initialState:ProductDetailState={
    product: null,
    loading: false,
    error:null,
    counter:1

}
export const fetchProductDetail = createAsyncThunk(
    'productDetail/fetchProduct',
    async (productId:number) => {
        try {
            const response = await axios(`https://fakestoreapi.com/products/${productId}`);
            return response.data;
            
          } catch (error) {
            throw new Error('Error fetching product details');
          }
    }
  );
  const  productDetailsSlice = createSlice({
    name:'productDetails',
    initialState,
    reducers:{
        IncrementItem:(state)=>{
            state.counter += 1;
        },
        DecrementItem:(state)=>{
            if(state.counter > 0){
                state.counter -= 1;
            }
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchProductDetail.pending,(state,action)=>{
            state.loading = false;
        })
        .addCase(fetchProductDetail.fulfilled,(state,action: PayloadAction<CartItem>)=>{
            state.loading = true;
            state.product = action.payload;
        })
        .addCase(fetchProductDetail.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message || "An error occurred.";
        })

    }
  });
export const {IncrementItem ,DecrementItem}=productDetailsSlice.actions;
 
export default productDetailsSlice.reducer;
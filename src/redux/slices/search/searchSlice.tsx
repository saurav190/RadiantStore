import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchData = createAsyncThunk<{ title: string, image: string }[], string>(
  "search/fetchData",
  async (searchTerm) => {
    const response = await fetch(`https://fakestoreapi.com/products?title=${searchTerm}`);
    const data = await response.json();

    const filteredData = data
      .filter((product: { title: string }) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((product: { title: string, image: string ,description:string,id:number}) => ({
        title: product.title,
        id:product.id,
        image: product.image,
        description:product.description
      }));

    return filteredData;
  }
);


interface SearchState {
  searchTerm: string;
  searchResults: any[]; 
}

const initialState: SearchState = {
  searchTerm: "",
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchData.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  },
});

export default searchSlice.reducer;

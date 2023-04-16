import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";

interface ProductState {
  products: Array<any>;
  error: string | null;
  product: Array<any>;
}

const initialState: ProductState = {
  products: [],
  error: null,
  product: []
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      console.log(action.payload)
      state.product.push(action.payload);
    },
    getProducts: (state, action) => {
      state.products = (action.payload);
    }
  }
});

export const { addProducts, getProducts } = productSlice.actions;

export const selectProduct = (state: RootState) => state.product.products;

export default productSlice.reducer;

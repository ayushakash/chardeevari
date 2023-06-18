import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";

interface ProductState {
  products: Array<any>;
  error: string | null;
  cartProducts: Array<any>;
}

const initialState: ProductState = {
  products: [],
  error: null,
  cartProducts: []
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: { 


    getProducts: (state, action) => {
      state.products = (action.payload);
    },
    getCartProducts: (state,action) => {
      state.cartProducts = action.payload 
    }
  }
});

export const {  getProducts,getCartProducts} = productSlice.actions;

export const selectProduct = (state: RootState) => state.product.products;

export default productSlice.reducer;

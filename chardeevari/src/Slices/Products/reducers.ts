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

    addProducts: (state, action) => {
      const updatedProducts = action.payload;
      updatedProducts.forEach((product:any) => {
        const existingProductIndex = state.cartProducts.findIndex((p) => p.id === product.id);
        if (existingProductIndex !== -1) {
          state.cartProducts[existingProductIndex] = product; // update existing product
        } else {
          state.cartProducts.push(product); // add new product
        }
      });
      // Save updated state to local storage 
      localStorage.setItem("cartProduct", JSON.stringify(state.cartProducts));
    },
    getProducts: (state, action) => {
      state.products = (action.payload);
    },
    getCartProducts: (state,action) => {
      state.cartProducts = action.payload 
    }
  }
});

export const { addProducts, getProducts,getCartProducts } = productSlice.actions;

export const selectProduct = (state: RootState) => state.product.products;

export default productSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";

interface CartState {
  error: string | null;
  cartProducts: Array<any>;
} 

const initialState: CartState = {
  error: null,
  cartProducts: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: { 

    addProductsLocally: (state, action) => {
      const updatedProducts = action.payload;
      updatedProducts.forEach((product:any) => {
        const existingProductIndex = state.cartProducts.findIndex((p) => p.id === product.id);
        if (existingProductIndex !== -1) {
          state.cartProducts[existingProductIndex] = product; // update existing product
        } else {
          state.cartProducts.push(product); // add new product
        }
      });
      // if not login Save updated state to local storage `
      
      localStorage.setItem("cartProduct", JSON.stringify(state.cartProducts));
    },

    addProductsRemote: (state, action) => {
      const updatedProducts = action.payload;
      updatedProducts.forEach((product:any) => {
        const existingProductIndex = state.cartProducts.findIndex((p) => p.id === product.id);
        if (existingProductIndex !== -1) {
          state.cartProducts[existingProductIndex] = product; // update existing product
        } else {
          state.cartProducts.push(product); // add new product
        }
      });
      // call the api to save the data `
      
      localStorage.setItem("cartProduct", JSON.stringify(state.cartProducts));
    },


    getCartProducts: (state,action) => {
      console.log(action.payload);
      state.cartProducts = action.payload
    }
  }
});

export const { addProductsLocally,getCartProducts,addProductsRemote } = cartSlice.actions;

export const selectProduct = (state: RootState) => state.cart.cartProducts;

export default cartSlice.reducer;

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
      console.log(action.payload);
      const updatedProducts = action.payload;

      updatedProducts.forEach((product:any) => {
        const existingProductIndex = state.cartProducts.findIndex((p) => p._id === product._id);
        if (existingProductIndex !== -1) {
          state.cartProducts[existingProductIndex] = product; // update existing product
        } else {
          state.cartProducts.push(product); // add new product
        }
      });
      // if not login Save updated state to local storage `
      
      localStorage.setItem("cartProduct", JSON.stringify(state.cartProducts));
    },

    removeCartProduct: (state, action) => {
      console.log(action.payload);
      const productToDelete = action.payload;
      const existingProductIndex = state.cartProducts.findIndex((p) => p._id === productToDelete);
    
      if (existingProductIndex !== -1) {
        state.cartProducts.splice(existingProductIndex, 1); // Remove the product from the array
        localStorage.setItem("cartProduct", JSON.stringify(state.cartProducts)); // Update local storage
      }
    },
    


    getCartProduct: (state,action) => {
      console.log(action.payload);
      state.cartProducts = action.payload
    }
  }
});

export const { addProductsLocally,getCartProduct,removeCartProduct } = cartSlice.actions;

export const selectProduct = (state: RootState) => state.cart.cartProducts;

export default cartSlice.reducer;

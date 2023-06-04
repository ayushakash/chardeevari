import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";
import { 
  addProducts, getProducts,getCartProducts
} from "./reducers";
// import { Product } from "../../Pages/Home/Home";

export const addProduct = (productData: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  dispatch(addProducts(productData));
};

// export const getProducts = (productData: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
//   dispatch(addProducts(productData));
// };

export const fetchProducts = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      dispatch(getProducts(data));
      return data;
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: "error" });
    }
  };
};

export const getCartproducts = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  const cartProducts:any = localStorage.getItem("cartProduct");

  dispatch(getCartProducts(JSON.parse(cartProducts)))

}


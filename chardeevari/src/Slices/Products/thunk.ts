import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";
import { config } from '../../config';

import { getProducts,getCartProducts } from "./reducers";

export const fetchProducts = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${config.API_BASEPATH}/products`);
      const data = await response.json();
      dispatch(getProducts(data));
      return data;
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: "error" });
    }
  };
};

// export const getCartproducts = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
//   const cartProducts:any = localStorage.getItem("cartProduct");
//   dispatch(getCartProducts(JSON.parse(cartProducts)))

// }


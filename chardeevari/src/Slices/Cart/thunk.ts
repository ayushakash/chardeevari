import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";
import { config } from "../../config";

import {
  addProductsLocally,
  getCartProducts,
  addProductsRemote,
} from "./reducers";
import cartService from "../../Api/service/cartService";

export const addProduct =
  (productData: any): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const response: any = await cartService.addToCart(token, {
          product: productData[0]._id,
          quantity: productData[0].orderCount,
        });
        // if(response.length >0){
        // dispatch(addProductsRemote(productData));
        // }
        // else{
        //   console.log("product additon failed in the cart redirect to login")
        // }
      } else {
        dispatch(addProductsLocally(productData));
      }
    } catch {
      console.log("product additon failed in the cart redirect to login");
    }
  };


export const getCartproducts =(): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    
  
  const token = localStorage.getItem("token");
  if(token){
    const cartItems: any = await cartService.getCartItems(token);
    const products = cartItems.map((item: any) => ({
      ...item.product,
      quantity: item.quantity
    }));
    console.log(products)
    //here we are getting a array of products we have to only extract products and then render it

    // console.log(cartItems)
    dispatch(getCartProducts(products));
    
  }
  else{
    const cartProducts: any = localStorage.getItem("cartProduct");
    dispatch(getCartProducts(JSON.parse(cartProducts)));
  }

  };

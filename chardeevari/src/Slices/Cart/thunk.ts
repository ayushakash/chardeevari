import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";
import { config } from "../../config";

import {
  addProductsLocally,
  getCartProduct,
  removeCartProduct,
} from "./reducers";

import cartService from "../../Api/service/cartService";

export const addProduct =(productData: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    
  const token = localStorage.getItem("token");
    try {
      if (token) {
        const response: any = await cartService.addToCart(token, {
          product: productData[0]._id,
          quantity: productData[0].quantity,
        });
        if (response) dispatch(getCartproducts());
      } else {
        //when not login
        dispatch(addProductsLocally(productData));
      }
    } catch {
      console.log("product additon failed in the cart redirect to login");
    }
  };

export const getCartproducts =(): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const cartItems: any = await cartService.getCartItems(token);
      if(cartItems.length){
        const products = cartItems.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
        }));
        dispatch(getCartProduct(products));
      }
      else{
        dispatch(getCartProduct([]));
      }
    } else {
      const cartProducts: any = localStorage.getItem("cartProduct");
      dispatch(getCartProduct(JSON.parse(cartProducts)));
    }
  };

export const deleteCartproducts =(id:any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    const token = localStorage.getItem("token");
    console.log("inside");

    if (token) {
      const cartItems: any = await cartService.deleteCartItems(token,id);
      if(cartItems){
        console.log(cartItems);
        dispatch(getCartproducts());
      }

    } else {
      console.log("inside2");
      dispatch(removeCartProduct(id));
    }
  };

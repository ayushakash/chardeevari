import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";
import { orderFailure, setOrder } from "./reducer";
import userService from "../../Api/service/userService";
import orderService from "../../Api/service/orderService";

export const addOrder = (order: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
      // Perform login API call
      console.log(order);
      let token =  localStorage.getItem('token');
      console.log(token);
      //first create the order in order type by getting all the data
      const response:any = await orderService.createOrder(token,order);
      
      if (response.ok) {
        const data = await response.json();
        getOrder();
        // Dispatch success action
        dispatch(setOrder(data));

      } else {
        const error = await response.text();
        // Dispatch failure action

        dispatch(orderFailure(error));
      }
    } catch (error) {
      // Dispatch failure action
      dispatch(orderFailure(error));
    }
  };

export const getOrder = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
      // Perform login API call
      let token =  localStorage.getItem('token');
      const response:any = await orderService.getOrders(token);
      
      if (response.length > 0 ) {
        // Dispatch success action
        console.log(response);
        dispatch(setOrder(response));
      } else {
        const error = await response.text();
        // Dispatch failure action
        dispatch(orderFailure(error));
      }
    } catch (error) {
      // Dispatch failure action
      dispatch(orderFailure(error));
    }
  };
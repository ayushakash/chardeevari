import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";
import { addAddress, setAddress } from "./reducer";
import userService from "../../Api/service/userService";

export const updateAddress = (address: any,token:any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
      // Perform login API call
      console.log(address);
      const response:any = await userService.addAddress(address,token);
      
      if (response.ok) {
        const data = await response.json();
        // Dispatch success action
        dispatch(addAddress(data));
      } else {
        const error = await response.text();
        // Dispatch failure action
        dispatch({ type: 'auth/loginFailure', payload: error });
      }
    } catch (error) {
      // Dispatch failure action
      dispatch({ type: 'auth/loginFailure', payload: error });
    }
  };

export const getAddress = (userId:any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
      // Perform login API call
      const response:any = await userService.getAddress(userId);
      
      if (response.ok) {
        const data = await response.json();
        // Dispatch success action
        dispatch(setAddress(data));
      } else {
        const error = await response.text();
        // Dispatch failure action
        dispatch({ type: 'address/fetchingFailed', payload: error });
      }
    } catch (error) {
      // Dispatch failure action
      dispatch({ type: 'address/fetchingFailed', payload: error });
    }
  };
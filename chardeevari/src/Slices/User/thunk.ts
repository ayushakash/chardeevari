import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";
import { addAddress, setAddress } from "./reducer";
import userService from "../../Api/service/userService";

export const updateAddress = (address: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
      // Perform login API call
      console.log(address);
      let token =  localStorage.getItem('token');
      console.log(token);
      const response:any = await userService.addAddress(address,token);
      
      if (response.ok) {
        const data = await response.json();
        getAddress();
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

export const getAddress = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
      // Perform login API call
      let token =  localStorage.getItem('token');
      const response:any = await userService.getAddress(token);
      
      if (response.length > 0 ) {
        // Dispatch success action
        dispatch(setAddress(response));
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
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";
import { loginUser, signupUser } from "./reducer";
import authService from '../../Api/service/authService'


export const login = (loginData: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  try {
    // Perform login API call
    console.log(loginData);
    const response = await authService.userLogin(loginData);
    
    if (response.ok) {
      const data = await response.json();
      // Dispatch success action
      dispatch(loginUser(data));
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

export const signup = (signupData: any): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  try {
    console.log(signupData)
    // Perform signup API call
    const response = await authService.userSignup(signupData);

    if (response.ok) {
      const data = await response.json();
      //fetch the address
      // Dispatch success action
      dispatch(signupUser(data));
    } else {
      const error = await response.text();
      // Dispatch failure action
      dispatch({ type: 'auth/signupFailure', payload: error });
    }
  } catch (error) {
    // Dispatch failure action
    dispatch({ type: 'auth/signupFailure', payload: error });
  }
};

export const logout = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  try {
    // Clear the token from local storage
    window.localStorage.removeItem('token');
    console.log('Token removed from local storage');

    // You can perform any other necessary logout actions here

    // Redirect to the login page or perform any other necessary actions
    window.location.href = '/login';
  } catch (error) {
    // Dispatch failure action
    dispatch({ type: 'auth/signupFailure', payload: error });
  }
};



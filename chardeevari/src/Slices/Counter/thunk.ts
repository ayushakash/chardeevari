import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";
import {
  decrement,
  incrementByAmount,
  incrementAsync,
} from "./reducers";

export const incrementByValue = ( number: number): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  dispatch(incrementByAmount(number));
};

export const incrementAsyncByValue = (
  number: number
): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  dispatch(incrementAsync(number));
};

export const decrementByValue = (
  number: number
): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  dispatch(decrement());
};

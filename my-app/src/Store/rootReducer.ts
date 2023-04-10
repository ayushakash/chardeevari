import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../Slices/Counter/reducers";
import productReducer from '../Slices/Products/reducers'

const rootReducer = combineReducers({
  counter: counterReducer,
   product:productReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

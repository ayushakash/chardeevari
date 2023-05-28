import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../Slices/Counter/reducers";
import productReducer from '../Slices/Products/reducers'
import authReducer from '../Slices/Auth/reducer'

const rootReducer = combineReducers({
  counter: counterReducer,
   product:productReducer,
   auth:authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

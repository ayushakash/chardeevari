import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../Slices/Counter/reducers";
import productReducer from '../Slices/Products/reducers'
import authReducer from '../Slices/Auth/reducer'
import userReducer from '../Slices/User/reducer'
import orderReducer from '../Slices/Orders/reducer'

const rootReducer = combineReducers({
  counter: counterReducer,
   product:productReducer,
   auth:authReducer,
   user:userReducer,
   order:orderReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../Slices/Counter/reducers";
import productReducer from '../Slices/Products/reducers'
import authReducer from '../Slices/Auth/reducer'
import userReducer from '../Slices/User/reducer'
import orderReducer from '../Slices/Orders/reducer'
import cartReducer from '../Slices/Cart/reducers'

const rootReducer = combineReducers({
  counter: counterReducer,
   product:productReducer,
   auth:authReducer,
   user:userReducer,
   order:orderReducer,
   cart:cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

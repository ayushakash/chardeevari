import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";
 
interface orderState {
  orders: any;
  error: string | null;
}

const initialState: orderState = {
  orders: null,
  error: null, 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      
    setOrder: (state, action: PayloadAction<any>) => {
      state.orders = action.payload;
      state.error = null;
    },
    orderFailure: (state, action: PayloadAction<any>) => {
      state.orders = action.payload;
      state.error = null;
    },

  },
});

export const { setOrder,orderFailure } = userSlice.actions;

export const selectOrder = (state: RootState) => state.order.orders;
export const selectError = (state: RootState) => state.order.error;

export default userSlice.reducer;

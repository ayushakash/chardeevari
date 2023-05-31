import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";

interface userState {
  user: any;
  error: string | null;
}

const initialState: userState = {
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<any>) => {
      state.user.address = action.payload;
      state.error = null;
    },
    setAddress: (state, action: PayloadAction<any>) => {
      state.user.address = action.payload;
      state.error = null;
    },

  },
});

export const { addAddress,setAddress } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;

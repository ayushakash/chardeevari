import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";

interface AuthState {
  user: any;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.error = null;
    },
    signupUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.error = action.payload;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { loginUser, signupUser, loginFailure, signupFailure } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;

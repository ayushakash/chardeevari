import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../Store/rootReducer";

interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
  error: null,
};

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number, { rejectWithValue }) => {
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return amount;
    } catch (error) {
      return rejectWithValue("Something went wrong!");
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setErrorAction: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setErrorAction } = errorSlice.actions;
export const { reducer: errorReducer } = errorSlice;

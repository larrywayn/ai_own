import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeAction: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setThemeAction } = themeSlice.actions;
export const { reducer: themeReducer } = themeSlice;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
};

const themeSlice = createSlice({
  name: "collapsed",
  initialState,
  reducers: {
    setCollapsedAction: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const { setCollapsedAction } = themeSlice.actions;
export const { reducer: menuReducer } = themeSlice;

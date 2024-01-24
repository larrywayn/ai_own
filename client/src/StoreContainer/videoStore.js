import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoUrl: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoUrlAction: (state, action) => {
      state.videoUrl = action.payload;
    },
  },
});

export const { setVideoUrlAction } = videoSlice.actions;
export const { reducer: videoReducer } = videoSlice;

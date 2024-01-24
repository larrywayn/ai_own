import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  audio: null,
  audioChunksUUID: null,
  audioPlayableUUID: null,
  audioText: null,
  audioBlobUUID: null,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setAudioAction: (state, action) => {
      state.audio = action.payload;
    },
    setPlayableAudioAction: (state, action) => {
      state.audioPlayableUUID = action.payload;
    },
    setBlobAudioAction(state, action) {
      state.audioBlobUUID = action.payload;
    },
    setAudioChunksAction: (state, action) => {
      state.audioChunksUUID = action.payload;
    },
    setAudioTextAction: (state, action) => {
      state.audioText = action.payload;
    },
    resetAudioAction: (state) => {
      state.audioChunksUUID = null;
      state.audioPlayableUUID = null;
      state.audioBlobUUID = null;
      state.audioText = null;
    },
  },
});

export const {
  setAudioAction,
  setAudioChunksAction,
  setPlayableAudioAction,
  setBlobAudioAction,
  resetAudioAction,
  setAudioTextAction,
} = audioSlice.actions;
export const { reducer: audioReducer } = audioSlice;

import { configureStore } from "@reduxjs/toolkit";
import { audioReducer } from "./audioStore";
import { errorReducer } from "./errorStore";
import { menuReducer } from "./menuStore";
import { themeReducer } from "./themeStore";
import { videoReducer } from "./videoStore";

export const store = configureStore({
  reducer: {
    errorStore: errorReducer,
    menuStore: menuReducer,
    themeStore: themeReducer,
    audioStore: audioReducer,
    videoStore: videoReducer,
  },
});

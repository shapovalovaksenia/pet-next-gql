import { configureStore } from "@reduxjs/toolkit";
import mediaPageReducer from "./slices/mediaPageSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      mediaPage: mediaPageReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

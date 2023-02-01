import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import hours from "../features/hours/hoursSlice";
export const store = configureStore({
  reducer: { counter: counterReducer, hours },
});

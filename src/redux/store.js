import { configureStore } from "@reduxjs/toolkit";
import EditorStore from "./reducers";
export const store = configureStore({
  reducer: { EditorStore },
});

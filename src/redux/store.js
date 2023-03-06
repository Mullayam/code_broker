import { configureStore } from "@reduxjs/toolkit";
import EditorStore from "./reducers";
import RoomInfo from "./slices/RoomInfo";

export const store = configureStore({
  reducer: { EditorStore, RoomInfo },
});

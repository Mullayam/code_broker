import { createSlice } from "@reduxjs/toolkit";

export const RoomInfo = createSlice({
  name: "RoomInfo",
  initialState: {
    RoomID: "",
    User: "",
  },
  reducers: {
    add: (state, payload) => {
      state.RoomID = payload.payload.roomId;
      state.User = payload.payload.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, showEditor } = RoomInfo.actions;
export default RoomInfo.reducer;

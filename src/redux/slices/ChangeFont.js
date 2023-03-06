import { createSlice } from "@reduxjs/toolkit";

export const ChangeFont = createSlice({
  name: "Fonts",
  initialState: {
    fontFamily: "Helvetica",
    fontSize: "16px",
    color: "#000000",
  },
  reducers: {
    UpdateFont: (state, payload) => {
      state.RoomID = payload.payload.roomId;
      state.User = payload.payload.user;
    },
    Defaults: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { UpdateFont, Defaults } = ChangeFont.actions;
export default ChangeFont.reducer;

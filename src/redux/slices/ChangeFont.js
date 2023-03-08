import { createSlice } from "@reduxjs/toolkit";

export const ChangeFont = createSlice({
  name: "Fonts",
  initialState: {
    fontFamily: "helvetica",
    fontSize: 16,
    color: "#000000",
  },
  reducers: {
    UpdateFont: (state, payload) => {
      state.fontFamily = payload.payload.fontFamily;
    },
    ChangeFontSize: (state, payload) => {
      state.fontSize = payload.payload.fontSize;
    },
    Defaults: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { UpdateFont, ChangeFontSize, Defaults } = ChangeFont.actions;
export default ChangeFont.reducer;

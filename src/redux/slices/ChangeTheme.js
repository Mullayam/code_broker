import { createSlice } from "@reduxjs/toolkit";

export const ChangeTheme = createSlice({
  name: "ChangeTheme",
  initialState: {
    activeTheme: "dracula",
    opacity: 1,
  },
  reducers: {
    UpdateTheme: (state, payload) => {
      state.activeTheme = payload.payload.theme;
    },
    BackGOpcacity: (state, payload) => {
      state.opacity = payload.payload;
    },
    Defaults: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { UpdateTheme, BackGOpcacity, Defaults } = ChangeTheme.actions;
export default ChangeTheme.reducer;

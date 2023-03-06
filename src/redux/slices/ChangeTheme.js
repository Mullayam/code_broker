import { createSlice } from "@reduxjs/toolkit";

export const ChangeLanguage = createSlice({
  name: "ChangeLanguage",
  initialState: {
    activeTheme: "dracula",
  },
  reducers: {
    UpdateTheme: (state, payload) => {
      state.activeTheme = payload.payload.theme;
    },
    Defaults: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { UpdateTheme, Defaults } = ChangeLanguage.actions;
export default ChangeLanguage.reducer;

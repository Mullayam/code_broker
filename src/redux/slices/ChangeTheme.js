import { createSlice } from "@reduxjs/toolkit";

export const ChangeTheme = createSlice({
  name: "ChangeTheme",
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
export const { UpdateTheme, Defaults } = ChangeTheme.actions;
export default ChangeTheme.reducer;

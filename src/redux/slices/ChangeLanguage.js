import { createSlice } from "@reduxjs/toolkit";

export const ChangeLanguage = createSlice({
  name: "ChangeLanguage",
  initialState: {
    currentLanguage: "javascript",
  },
  reducers: {
    ChangeLang: (state, { payload }) => {
      state.currentLanguage = payload.language;
    },
    Defaults: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ChangeLang, Defaults } = ChangeLanguage.actions;
export default ChangeLanguage.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const isProtected = createSlice({
  name: "isProtected",
  initialState: {
    isProtected: false,
  },
  reducers: {
    setProtected: (state, payload) => {
      state.isProtected = payload.payload;
    },

    Defaults: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = isProtected.actions;
export default isProtected.reducer;

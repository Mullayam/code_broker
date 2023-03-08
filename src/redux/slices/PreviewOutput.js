import { createSlice } from "@reduxjs/toolkit";

export const RenderPreview = createSlice({
  name: "RenderPreview",
  initialState: {
    Terminal: {
      show: true,
      height: 728,
    },
    HTMLOutput: {
      show: true,
      height: 728,
    },
    DisplayBoth: true,
  },
  reducers: {
    ChangeTerminalState: (state, payload) => {
      state.Terminal.show = payload.payload;
    },
    ChangeOutputState: (state, payload) => {
      state.HTMLOutput.show = payload.payload;
    },
    RenderOutput: (state, payload) => {
      state.DisplayBoth = payload.payload;
    },
    Default: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ChangeTerminalState, ChangeOutputState, Default, RenderOutput } =
  RenderPreview.actions;
export default RenderPreview.reducer;

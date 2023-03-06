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
  },
  reducers: {
    ChangeTerminalState: (state, payload) => {
      state.Terminal.show = true;
    },
    ChangeOutputState: (state, payload) => {
      state.HTMLOutput.show = true;
    },
    Default: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ChangeTerminalState, ChangeOutputState, Default } =
  RenderPreview.actions;
export default RenderPreview.reducer;

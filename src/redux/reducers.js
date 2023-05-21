import { combineReducers } from "@reduxjs/toolkit";
import ChangeFont from "./slices/ChangeFont";
import ChangeLanguage from "./slices/ChangeLanguage";
import ChangeTheme from "./slices/ChangeTheme";
import PreviewOutput from "./slices/PreviewOutput";
import isProtected from "./slices/isProctected";

export default combineReducers({
  Font: ChangeFont,
  Lang: ChangeLanguage,
  Theme: ChangeTheme,
  Console: PreviewOutput,
  Protected: isProtected,
});

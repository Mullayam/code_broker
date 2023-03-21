import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TerminalIcon from "@mui/icons-material/Terminal";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDispatch, useSelector } from "react-redux";
import {
  RenderOutput,
  ChangeTerminalState,
  ChangeOutputState,
} from "../redux/slices/PreviewOutput";
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function BottomLayer() {
  const EditorInfo = useSelector((state) => state.EditorStore);
  const dispatch = useDispatch();
  let { DisplayBoth } = EditorInfo.Console;

  const handleOutputs = () => {
    dispatch(RenderOutput(!DisplayBoth));
    dispatch(ChangeTerminalState(true));
    dispatch(ChangeOutputState(true));
  };
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          bgcolor: "background.paper",
          borderRadius: 1,
          justifyContent: "flex-end",
        }}
      >
        <Item>Ln 1, Col 28</Item>
        <Item>Spaces: 2</Item>
        <Item titleAccess="Font-Size">{EditorInfo.Font.fontSize}</Item>
        <Item titleAccess="Font-Familye">{EditorInfo.Font.fontFamily}</Item>
        <Item titleAccess="Current Language">
          {EditorInfo.Lang.currentLanguage}
        </Item>
        <TerminalIcon
          sx={{ m: 1 }}
          fontSize="large"
          titleAccess="Preview Console"
          onClick={handleOutputs}
        />
        <PlayArrowIcon sx={{ m: 1 }} fontSize="large" titleAccess="Run Code" />
      </Box>
    </div>
  );
}

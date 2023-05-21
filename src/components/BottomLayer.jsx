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
import { Stack } from "@mui/material";
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
        borderRadius: 15,
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
    <Box component="div">
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <Stack
          sx={{
            flexDirection: "row",
            bgcolor: "background.paper",

            justifyContent: "flex-start",
          }}
        >
          <Item>Ln 1, Col 28</Item>
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            bgcolor: "background.paper",

            justifyContent: "center",
          }}
        >
          <Item>Ln 1, Col 28</Item>
          <Item>Spaces: 2</Item>
          <Item titleaccess="Font-Size">{EditorInfo.Font.fontSize}</Item>
          <Item titleaccess="Font-Familye">{EditorInfo.Font.fontFamily}</Item>
          <Item titleaccess="Current Language">
            {EditorInfo.Lang.currentLanguage}
          </Item>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            bgcolor: "background.paper",

            justifyContent: "flex-end",
          }}
        >
          <TerminalIcon
            sx={{ m: 1 }}
            className="cursor-pointer"
            fontSize="large"
            titleaccess="Preview Console"
            onClick={handleOutputs}
          />
          <PlayArrowIcon
            className="cursor-pointer"
            sx={{ m: 1 }}
            fontSize="large"
            titleaccess="Run Code"
          />
        </Stack>
      </Box>
    </Box>
  );
}

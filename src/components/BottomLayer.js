import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TerminalIcon from "@mui/icons-material/Terminal";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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
        <Item>Ln 51, Col 23</Item>
        <Item>Spaces</Item>
        <Item>Font Size</Item>
        <Item>Current Language</Item>
        <TerminalIcon
          sx={{ m: 1 }}
          fontSize="large"
          titleAccess="Preview Console"
        />
        <PlayArrowIcon sx={{ m: 1 }} fontSize="large" titleAccess="Run Code" />
      </Box>
    </div>
  );
}

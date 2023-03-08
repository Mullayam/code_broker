import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Close, OpenInFull } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { ChangeOutputState } from "../redux/slices/PreviewOutput";
export default function EditorOutput({ height }) {
  const dispatch = useDispatch();
  let results = "show";
  let reOpen = false;
  if (height == 35) {
    results = "none";
    reOpen = true;
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: height,
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#E04D01",
          p: 0.5,
          fontWeight: "bold",
          fontFamily: "Noto Sans, Nunito Sans",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid black",
        }}
      >
        <Typography>Rendring HTML</Typography>
        {reOpen ? (
          <OpenInFull
            sx={{ mr: 1 }}
            onClick={() => {
              dispatch(ChangeOutputState(reOpen));
            }}
          />
        ) : (
          <Close
            sx={{ mr: 1 }}
            onClick={() => {
              dispatch(ChangeOutputState(reOpen));
            }}
          />
        )}
      </Box>
    </Box>
  );
}

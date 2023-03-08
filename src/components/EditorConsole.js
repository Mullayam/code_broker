import * as React from "react";
import { Stack } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { Close, DeleteForeverOutlined, OpenInFull } from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { ChangeTerminalState } from "../redux/slices/PreviewOutput";

export default function EditorConsole({ height }) {
  const dispatch = useDispatch();
  let results = "show";
  let reOpen = false;
  if (height == 35) {
    results = "none";
    reOpen = true;
  }
  console.log(results, reOpen);
  return (
    <Box
      sx={{
        width: "100%",
        height: height,
        color: "white",
        backgroundColor: "black",
      }}
    >
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          borderBottom: "1px solid white",
          alignItems: "center",
          p: 0.5,
        }}
      >
        <Typography
          sx={{
            justifyContent: "flex-start",
          }}
        >
          Console Preview
        </Typography>
        {reOpen ? (
          <OpenInFull
            onClick={() => dispatch(ChangeTerminalState(true))}
            sx={{
              justifyContent: "flex-end",
              ml: "auto",
              mr: "10px",
              color: "white",
            }}
          />
        ) : (
          <>
            <DeleteForeverOutlined
              onClick={() => alert("Clear Console")}
              sx={{
                justifyContent: "flex-end",
                ml: "auto",
                mr: "10px",

                color: "red",
                "&hover": {
                  backgroundColor: "white",
                  color: "red",
                },
              }}
            />
            <Close
              onClick={() => {
                dispatch(ChangeTerminalState(false));
              }}
            />
          </>
        )}
      </Box>
      <Stack sx={{ p: 1, display: results }}>
        <li className="terminal-output error">huis</li>
        <li className="terminal-output warn">huis</li>
        <li className="terminal-output">huis</li>
      </Stack>
    </Box>
  );
}

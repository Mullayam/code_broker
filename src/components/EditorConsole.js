import * as React from "react";
import { Stack } from "@mui/system";
import { Box, Typography } from "@mui/material";

export default function EditorConsole() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 428,
        color: "white",
        backgroundColor: "black",
      }}
    >
      <Typography
        sx={{
          justifyContent: "center",
          alignItems: "center",
          p: 0.5,
          display: "flex",
          borderBottom: "1px solid white",
        }}
      >
        Console Preview
      </Typography>
      <Stack sx={{ p: 1 }}>
        <li className="terminal-output error">huis</li>
        <li className="terminal-output warn">huis</li>
        <li className="terminal-output">huis</li>
      </Stack>
    </Box>
  );
}

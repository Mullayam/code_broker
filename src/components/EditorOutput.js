import * as React from "react";
import { Box, Typography } from "@mui/material";

export default function EditorOutput() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 425,
        backgroundColor: "white",
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
        Rendring HTML
      </Typography>
    </Box>
  );
}

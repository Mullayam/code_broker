import { useState } from "react";
import { Box } from "@mui/material";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
export const SidebarIconComponent = () => {
  const [newFileModal, setNewFileModal] = useState(false);

  return (
    <Box
      sx={{
        p: 1.5,
        marginBottom: 2,
      }}
    >
      <FiberNewIcon
        onClick={() => setNewFileModal(true)}
        fontSize="large"
        titleAccess="Create New File"
      />
      <DownloadForOfflineIcon fontSize="large" titleAccess="Download Files" />
      <LogoDevIcon fontSize="large" titleAccess="Run Dev Test" />
      <DisplaySettingsIcon fontSize="large" titleAccess="Editor Settings" />
    </Box>
  );
};

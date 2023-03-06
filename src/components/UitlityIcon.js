import { useState } from "react";
import { Box } from "@mui/material";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import {
  NewFileForm,
  DownloadFileDialog,
  EditorCustomizaion,
  InfoDialog,
  SaveFileDialog,
} from "../dialogs/";
export const SidebarIconComponent = ({ username }) => {
  const [newFileModal, setNewFileModal] = useState(false);
  const [downloadFileModal, setDownloadFileModal] = useState(false);
  const [editorSettings, setEditorSettings] = useState(false);
  // const [newFileModal, setNewFileModal] = useState(false);

  return (
    <>
      <Box
        sx={{
          p: 1.5,
          marginBottom: 2,
        }}
      >
        {/* Modal Open Clicks */}
        <FiberNewIcon
          onClick={() => setNewFileModal(true)}
          fontSize="large"
          titleAccess="Create New File"
        />

        <DownloadForOfflineIcon
          onClick={() => setDownloadFileModal(true)}
          fontSize="large"
          titleAccess="Download Files"
        />
        <LogoDevIcon fontSize="large" titleAccess="Run Dev Test" />
        <DisplaySettingsIcon
          onClick={() => setEditorSettings(true)}
          fontSize="large"
          titleAccess="Editor Settings"
        />
      </Box>
      {/* Modals */}
      <NewFileForm
        newFileModal={newFileModal}
        setNewFileModal={setNewFileModal}
      />
      <DownloadFileDialog
        openFileModal={downloadFileModal}
        username={username}
        handleFileModal={setDownloadFileModal}
      />
      <EditorCustomizaion
        editorSettings={editorSettings}
        setEditorSettings={setEditorSettings}
      />
      {/* <InfoDialog />
      <SaveFileDialog /> */}
    </>
  );
};

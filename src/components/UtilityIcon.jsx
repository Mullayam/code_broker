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
} from "../dialogs";
import { CallApi } from "../helpers/CallAPI";
export default function UtilityIcon({ username, roomId, info }) {
  const [newFileModal, setNewFileModal] = useState(false);
  const [downloadFileModal, setDownloadFileModal] = useState(false);
  const [editorSettings, setEditorSettings] = useState(false);
  const [room, setRooms] = useState([]);

  async function GetAllFiles() {
    const response = await CallApi(`allfiles/@${username}`, "GET", {});
    setRooms(response.data.data);
    setDownloadFileModal(`${response.data.status}`);
  }
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
          onClick={() => GetAllFiles()}
          fontSize="large"
          titleAccess="See Your Room"
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
        rooms={room}
        openFileModal={downloadFileModal}
        user={username}
        handleFileModal={setDownloadFileModal}
      />
      <EditorCustomizaion
        editorSettings={editorSettings}
        setEditorSettings={setEditorSettings}
        roomId={roomId}
        info={info}
      />
      {/* <InfoDialog />
      <SaveFileDialog /> */}
    </>
  );
}

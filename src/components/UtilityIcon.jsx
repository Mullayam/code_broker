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
    const response = await CallApi(
      `allfiles/${roomId}/@${username}`,
      "GET",
      {}
    );
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
          className="cursor-pointer"
          onClick={() => setNewFileModal(true)}
          fontSize="large"
          titleaccess="Create New File"
        />

        <DownloadForOfflineIcon
          className="cursor-pointer"
          onClick={() => GetAllFiles()}
          fontSize="large"
          titleaccess="See Your Room"
        />
        <LogoDevIcon
          className="cursor-pointer"
          fontSize="large"
          titleaccess="Run Dev Test"
        />
        <DisplaySettingsIcon
          className="cursor-pointer"
          onClick={() => setEditorSettings(true)}
          fontSize="large"
          titleaccess="Editor Settings"
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

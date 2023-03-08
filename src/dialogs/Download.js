import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import RefreshIcon from "@mui/icons-material/Refresh";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import { blue } from "@mui/material/colors";
import { PostApi } from "../helpers/CallAPI";
import { Box } from "@mui/material";
import { Test } from "./Test";

function FilesDialogRaw(props) {
  const {
    onClose,

    open,
    ...other
  } = props;
  let files = ["index.html"];
  const handleCancel = () => {
    onClose();
  };
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        List Of Files For Download <RefreshIcon />
      </DialogTitle>
      <DialogContent dividers>NothingsTo Show</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default function DownloadFileDialog({
  openFileModal,
  handleFileModal,
  user,
  rooms,
}) {
  const handleModalClose = (value) => {
    handleFileModal(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleRoomFiles = (roomId) => {
    setOpen(true);
  };
  const handleRoomFilesClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog onClose={handleModalClose} open={openFileModal}>
        <DialogTitle>Check Files in Rooms for {user} </DialogTitle>

        <Box
          sx={{
            width: "100%",
            maxWidth: "fit-content",
            bgcolor: "background.paper",
          }}
        >
          <List component="div" role="group">
            {rooms.map((rooms) => (
              <ListItem
                button
                divider
                aria-haspopup="true"
                aria-controls="room-id"
                aria-label={rooms}
                onClick={() => {
                  handleRoomFiles(rooms);
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <RoomPreferencesIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={rooms} secondary="5 Files" />
              </ListItem>
            ))}

            <FilesDialogRaw
              keepMounted
              open={open}
              onClose={handleRoomFilesClose}
            />
          </List>
        </Box>
      </Dialog>
    </div>
  );
}
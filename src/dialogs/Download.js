import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";

const emails = ["username@gmail.com", "user02@gmail.com"];

export default function DownloadFileDialog({
  openFileModal,
  handleFileModal,
  username,
}) {
  const handleListItemClick = (value) => {
    handleFileModal(false);
  };
  const handleClose = (value) => {
    handleFileModal(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={openFileModal}>
        <DialogTitle>Download Files for {username} </DialogTitle>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem disableGutters>
              <ListItemButton
                onClick={() => handleListItemClick(email)}
                key={email}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={() => handleListItemClick("addAccount")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add account" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

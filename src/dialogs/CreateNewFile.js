import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function NewFileForm({ newFileModal, setNewFileModal }) {
  const { RoomID, User } = useSelector((state) => state.RoomInfo);
  const [fileName, setFileName] = useState("");
  const handleClose = () => {
    setNewFileModal(false);
  };

  async function genrateNewFile() {
    let FileDetails = {
      name: fileName.split(".")[0],
      ext: fileName.split(".")[1],
    };
    let EditorInfo = {
      RoomID,
      User,
    };

    if (fileName === "") return toast.error("Please enter a file name");
    if (!fileName.includes(".")) {
      return toast.error("Please choose a valid Extension");
    }
    // const result = axios.post();
    return toast.success("created");
  }

  return (
    <div>
      <Dialog open={newFileModal} onClose={handleClose}>
        <DialogTitle>New File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a New File,
            <i>FileName Format : index.js,main.py,routes.php</i>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter FileName"
            type="text"
            value={fileName}
            fullWidth
            onChange={(e) => {
              setFileName(e.target.value);
            }}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={genrateNewFile}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

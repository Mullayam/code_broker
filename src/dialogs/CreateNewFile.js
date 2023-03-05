import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function NewFileForm({ newFileModal, setNewFileModal }) {
  const handleClose = () => {
    setNewFileModal(false);
  };

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
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { isVerified } from "../helpers/isProtected";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, clientRoomId }) {
  const [passwordField, setPasswordField] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const VerifyPassword = async () => {
    if (passwordField === "") {
      return toast.error("Please enter Password");
    }
    const result = await isVerified(passwordField, clientRoomId);
    if (result.status) {
      setOpen(false);
      setVerified(false);

      return toast.success("Room Successfully Unlocked");
    } else {
      setVerified(true);
      return toast.error(result.message);
    }
  };
  const handleClose = () => {
    if (verified) {
      return setOpen(false);
    } else {
      toast.error("Please Unlock Room First Or Leave");
      return setOpen(true);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Whoops, This Room is Password Protected?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please Enter Password to make Changes or Enter in Room.
          </DialogContentText>
          <TextField
            sx={{ mt: 2 }}
            required
            id="standard-basic"
            label="Password Required"
            variant="standard"
            type="password"
            value={passwordField}
            onChange={(e) => {
              setPasswordField(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={VerifyPassword}>Unlock Room</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

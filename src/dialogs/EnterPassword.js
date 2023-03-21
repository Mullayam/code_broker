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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BackGOpcacity } from "../redux/slices/ChangeTheme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, clientRoomId }) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordField, setPasswordField] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const VerifyPassword = async () => {
    if (passwordField === "") {
      setOpen(true);
      return toast.error("Please enter Password");
    }
    const result = await isVerified(passwordField, clientRoomId);

    if (result.status) {
      dispatch(BackGOpcacity(1));
      setOpen(false);
      setVerified(false);
      return toast.success(result.message);
    } else {
      setVerified(false);
      setOpen(true);
      dispatch(BackGOpcacity(0.1));
      return toast.error(result.message);
    }
  };
  const handleClose = () => {
    if (verified) {
      return setOpen(false);
    } else {
      toast.error("Please Unlock Room First Or Leave");
      setOpen(true);
      return;
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
          <Button onClick={() => Navigate("/")}>Leave</Button>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={VerifyPassword}>Unlock Room</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

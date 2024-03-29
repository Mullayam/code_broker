import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { RoomReducer, initialRoom } from "../hooks/getRooms";

const options = ["None"];

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const [room, setRooms] = React.useState([]);
  const radioGroupRef = React.useRef(null);
  async function GetAllFiles() {
    const response = await CallApi(`allfiles/@${username}`, "GET", {});
    setRooms(response.data.data);
    setDownloadFileModal(`${response.data.status}`);
  }
  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Your Files in this Room</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function RoomList({ show = "false" }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");
  const [state, dispatch] = React.useReducer(RoomReducer, initialRoom);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
        bgcolor: "background.paper",
        color: "black",
        borderRadius: 4,
        display: show,
      }}
    >
      <List component="div" role="group">
        {initialRoom.length > 0 &&
          initialRoom.map(({ roomId, files }, id) => (
            <ListItem
              button
              key={id}
              aria-controls="ringtone-menu"
              aria-label="phone ringtone"
              onClick={handleClickListItem}
            >
              <ListItemText
                primary={roomId}
                title={roomId}
                secondary={files + " Files"}
              />
            </ListItem>
          ))}

        <ConfirmationDialogRaw
          id="files-menus"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </Box>
  );
}

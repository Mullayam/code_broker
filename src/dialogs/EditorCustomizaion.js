import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function MaxWidthDialog({ editorSettings, setEditorSettings }) {
    
  const [passwordField, setPasswordField] = React.useState(false);
  // console.log(editorSettings, setEditorSettings);
  const handleClose = () => {
    setEditorSettings(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        sx={{ maxWidth: "100%" }}
        open={editorSettings}
        onClose={handleClose}
      >
        <DialogTitle>Editor Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set custom Setting for Editor like
            Themes,Languages,Font,Console,Output from here According to you
          </DialogContentText>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Box
                  noValidate
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: "auto",
                    width: "fit-content",
                  }}
                >
                  <FormControl sx={{ mt: 2, minWidth: 280 }}>
                    <InputLabel htmlFor="Font Family">Font Family</InputLabel>
                    <Select
                      autoFocus
                      // value={maxWidth}
                      // onChange={handleMaxWidthChange}
                      label="Font Family"
                    >
                      <MenuItem value="xs">xs</MenuItem>
                      <MenuItem value="sm">sm</MenuItem>
                      <MenuItem value="md">md</MenuItem>
                      <MenuItem value="lg">lg</MenuItem>
                      <MenuItem value="xl">xl</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 280 }}>
                    <InputLabel htmlFor="Font-Size">Font Size</InputLabel>
                    <Select
                      autoFocus
                      // value={maxWidth}
                      // onChange={handleMaxWidthChange}
                      label="Font Size"
                      inputProps={{
                        name: "Font-Size",
                        id: "FontSize",
                      }}
                    >
                      <MenuItem value="xs">xs</MenuItem>
                      <MenuItem value="sm">sm</MenuItem>
                      <MenuItem value="md">md</MenuItem>
                      <MenuItem value="lg">lg</MenuItem>
                      <MenuItem value="xl">xl</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 280 }}>
                    <InputLabel htmlFor="themes">Themes</InputLabel>
                    <Select
                      autoFocus
                      // value={maxWidth}
                      // onChange={handleMaxWidthChange}
                      label="Themes"
                    >
                      <MenuItem value="xs">Monkai</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 280 }}>
                    <InputLabel htmlFor="language">
                      Languages Support
                    </InputLabel>
                    <Select
                      autoFocus
                      // /value={maxWidth}
                      // onChange={handleMaxWidthChange}
                      label="language"
                    >
                      <MenuItem value="xs">xs</MenuItem>
                      <MenuItem value="sm">sm</MenuItem>
                      <MenuItem value="md">md</MenuItem>
                      <MenuItem value="lg">lg</MenuItem>
                      <MenuItem value="xl">xl</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  sx={{ mt: 1 }}
                  control={
                    <Switch
                      checked={true}
                      //  onChange={handleFullWidthChange}
                    />
                  }
                  label="Preview Console"
                />
                <FormControlLabel
                  sx={{ mt: 1 }}
                  control={
                    <Switch
                      checked={true}
                      //  onChange={handleFullWidthChange}
                    />
                  }
                  label="Output"
                />
                <Box display="flex" flexDirection="column">
                  <FormControlLabel
                    sx={{ mt: 1 }}
                    control={
                      <Switch
                        checked={passwordField}
                        onChange={() => setPasswordField(!passwordField)}
                      />
                    }
                    label="Password Protected"
                  />
                  {passwordField ? (
                    <TextField
                      required
                      id="standard-required"
                      label="Password Required"
                      defaultValue={"12345678"}
                      // className={classes.textField}
                      margin="normal"
                    />
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

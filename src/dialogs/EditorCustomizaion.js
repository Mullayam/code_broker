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
import { useDispatch, useSelector } from "react-redux";
import ThemeName from "../components/Theme";
import {
  ChangeLang,
  Defaults as LangDefault,
} from "../redux/slices/ChangeLanguage";
import { UpdateTheme, Defaults } from "../redux/slices/ChangeTheme";
import { UpdateFont, ChangeFontSize } from "../redux/slices/ChangeFont";

export default function EditorCustomization({
  editorSettings,
  setEditorSettings,
}) {
  const dispatch = useDispatch();
  const { Console, Lang, Font, Theme } = useSelector(
    (state) => state.EditorStore
  );

  const [passwordField, setPasswordField] = React.useState(false);

  const handleClose = () => {
    setEditorSettings(false);
  };
  const [inputs, setInputs] = React.useState({
    fontFamily: Font.fontFamily,
    fontSize: Font.fontSize,
    theme: Theme.activeTheme,
    activeLanguage: Lang.currentLanguage,
  });
  React.useEffect(() => {}, [inputs]);
  const handleChangeAction = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    dispatch(UpdateFont({ fontFamily: inputs.fontFamily }));
    dispatch(ChangeFontSize({ fontSize: inputs.fontSize }));
    dispatch(UpdateTheme({ theme: inputs.theme }));
    dispatch(ChangeLang({ language: inputs.activeLanguage }));
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
                  {/* Font Family */}
                  <FormControl sx={{ mt: 2, minWidth: 280 }}>
                    <InputLabel htmlFor="Font Family">Font Family</InputLabel>
                    <Select
                      autoFocus
                      value={inputs.fontFamily}
                      onChange={handleChangeAction}
                      label="Font Family"
                      inputProps={{
                        name: "fontFamily",
                      }}
                    >
                      <MenuItem value="cascadia">Cascadia</MenuItem>
                      <MenuItem value="consolas">Consolas</MenuItem>
                      <MenuItem value="helvetica">Helvetica</MenuItem>
                    </Select>
                  </FormControl>
                  {/* FontSize */}
                  <FormControl sx={{ mt: 2, minWidth: 280 }}>
                    <InputLabel htmlFor="Font-Size">Font Size</InputLabel>
                    <Select
                      autoFocus
                      value={inputs.fontSize}
                      onChange={handleChangeAction}
                      label="Font Size"
                      inputProps={{
                        name: "fontSize",
                      }}
                    >
                      <MenuItem value="10">10</MenuItem>
                      <MenuItem value="12">12</MenuItem>
                      <MenuItem value="14">14</MenuItem>
                      <MenuItem value="16">16</MenuItem>
                      <MenuItem value="18">18</MenuItem>
                      <MenuItem value="20">20</MenuItem>
                      <MenuItem value="22">22</MenuItem>
                      <MenuItem value="24">24</MenuItem>
                      <MenuItem value="32">32</MenuItem>
                      <MenuItem value="48">48</MenuItem>
                    </Select>
                  </FormControl>
                  {/* Themes */}
                  <FormControl sx={{ mt: 2, minWidth: 280 }}>
                    <InputLabel htmlFor="themes">Themes</InputLabel>
                    <Select
                      autoFocus
                      value={inputs.theme}
                      onChange={handleChangeAction}
                      label="Themes"
                      inputProps={{
                        name: "theme",
                      }}
                    >
                      <MenuItem value="monkai">Monkai</MenuItem>
                      {ThemeName.map((themes, i) => {
                        return (
                          <MenuItem key={i} value={themes}>
                            {themes}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {/* Change Lanuguage */}
                  <FormControl sx={{ mt: 2, minWidth: 280 }}>
                    <InputLabel htmlFor="language">
                      Languages Support
                    </InputLabel>
                    <Select
                      autoFocus
                      value={inputs.activeLanguage}
                      onChange={handleChangeAction}
                      label="language"
                      inputProps={{
                        name: "activeLanguage",
                      }}
                    >
                      <MenuItem value={inputs.activeLanguage} selected>
                        {inputs.activeLanguage}
                      </MenuItem>
                      <MenuItem value="php">PHP</MenuItem>
                      <MenuItem value="python">Python</MenuItem>
                      <MenuItem value="ruby">Ruby</MenuItem>
                      <MenuItem value="django">Django</MenuItem>
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

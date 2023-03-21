import React, { useState, useRef, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import ACTIONS from "../Actions";
import {
  Client,
  Editor,
  EditorOutput,
  EditorConsole,
  RoomList,
  UtilityIcon as SidebarIconComponent,
} from "../components/";
import { RenderOutput } from "../redux/slices/PreviewOutput";
import { EnterPassword } from "../dialogs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { initSocket } from "../socket";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import BottomLayer from "../components/BottomLayer";

import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/slices/RoomInfo";
import { isProtected } from "../helpers/isProtected";
import { ClickAwayListener } from "@mui/material";
import { BackGOpcacity } from "../redux/slices/ChangeTheme";
import { Stack } from "@mui/system";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const user = location.state?.username;
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const [passwordFieldOpen, setPasswordFieldOpen] = React.useState(true);

  const { Theme, Console } = useSelector((state) => state.EditorStore);
  const [info, setInfo] = useState(false);
  const { Terminal, HTMLOutput, DisplayBoth } = Console;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(add({ roomId, user }));
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    const CheckRoom = async function () {
      const result = await isProtected(roomId);

      if (result.status == "false") {
        setPasswordFieldOpen(false);
        return;
      } else {
        setInfo(true);
        dispatch(BackGOpcacity("0.1"));
        setPasswordFieldOpen(true);
      }
    };
    CheckRoom();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);
  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigator("/");
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ opacity: Theme.opacity }}>
      <div className="mainWrap">
        <div className="aside">
          <div className="asideInner">
            <div className="logo">
              <img className="logoImage" src="/code-sync.png" alt="logo" />
            </div>
            <SidebarIconComponent
              username={location.state.username || null}
              roomId={roomId}
              info={info}
            />
            <h3>Connected</h3>
            <div className="clientsList">
              {clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
          </div>

          <Box flexDirection="row">
            <Stack>
              <RoomList />
            </Stack>
            <IconButton size="large" onClick={copyRoomId}>
              <ContentCopyIcon
                titleAccess="Copy Room Id"
                fontSize="large"
                color="primary"
              />
            </IconButton>
            <IconButton size="large" onClick={leaveRoom}>
              <ExitToAppIcon
                titleAccess="Leave Room"
                fontSize="large"
                color="error"
              />
            </IconButton>
          </Box>
        </div>

        <div className="editorWrap">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid xs={DisplayBoth ? 7 : 12} md={DisplayBoth ? 8 : 12}>
                <Editor
                  socketRef={socketRef}
                  roomId={roomId}
                  onCodeChange={(code) => {
                    codeRef.current = code;
                  }}
                />
              </Grid>
              <Grid
                xs={DisplayBoth ? 5 : 12}
                md={DisplayBoth ? 4 : 12}
                divider={true}
              >
                {DisplayBoth ? (
                  <>
                    {HTMLOutput.show ? (
                      <>
                        {Terminal.show ? (
                          <>
                            <EditorOutput height={421} />
                            <EditorConsole height={421} />
                          </>
                        ) : (
                          <>
                            <EditorOutput height={806} />
                            <EditorConsole height={35} />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {Terminal.show ? (
                          <>
                            <EditorOutput height={35} />
                            <EditorConsole height={806} />
                          </>
                        ) : (
                          <>
                            <EditorOutput height={35} />
                            <EditorConsole height={35} />
                            {dispatch(RenderOutput(false))}
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>

      <BottomLayer />

      <ClickAwayListener>
        <EnterPassword
          open={passwordFieldOpen}
          setOpen={setPasswordFieldOpen}
          clientRoomId={roomId}
        />
      </ClickAwayListener>
    </Box>
  );
};

export default EditorPage;

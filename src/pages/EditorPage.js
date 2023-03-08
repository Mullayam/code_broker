import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import toast from "react-hot-toast";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import EditorOutput from "../components/EditorOutput";
import EditorConsole from "../components/EditorConsole";
import { initSocket } from "../socket";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import BottomLayer from "../components/BottomLayer";
import { SidebarIconComponent } from "../components/UitlityIcon";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/slices/RoomInfo";
import { isProtected } from "../helpers/isProtected";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const user = location.state?.username;
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const { Terminal, HTMLOutput, DisplayBoth } = useSelector(
    (state) => state.EditorStore.Console
  );
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
        return;
      } else {
        return <Navigate to="/protected-room" state={roomId} />;
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
    <Box>
      <div className="mainWrap">
        <div className="aside">
          <div className="asideInner">
            <div className="logo">
              <img className="logoImage" src="/code-sync.png" alt="logo" />
            </div>
            <SidebarIconComponent username={location.state.username || null} />
            <h3>Connected</h3>
            <div className="clientsList">
              {clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
          </div>
          <button className="btn copyBtn" onClick={copyRoomId}>
            Copy ROOM ID
          </button>
          <button className="btn leaveBtn" onClick={leaveRoom}>
            Leave
          </button>
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
                    {Terminal.show ? (
                      Terminal.show ? (
                        <EditorOutput height={421} />
                      ) : (
                        <EditorOutput height={35} />
                      )
                    ) : (
                      <EditorOutput height={807} />
                    )}
                    {HTMLOutput.show ? (
                      Terminal.show ? (
                        <EditorConsole height={421} />
                      ) : (
                        <EditorConsole height={35} />
                      )
                    ) : (
                      <EditorConsole height={807} />
                    )}
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>

      <BottomLayer />
    </Box>
  );
};

export default EditorPage;

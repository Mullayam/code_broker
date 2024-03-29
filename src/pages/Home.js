import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PostApi } from "../helpers/CallAPI";
const Home = () => {
  const navigate = useNavigate();
  async function GetAllFiles() {
    const response = await CallApi(`allfiles/@${username}`, "GET", {});
    setRooms(response.data.data);
    setDownloadFileModal(`${response.data.status}`);
  }
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = async () => {
    if (!roomId || !username) {
      toast.error("ROOM ID & username is required");
      return;
    }
    // create new dir here
    let RoomInfo = {
      roomId,
      user: `@${username}`,
    };
    const res = await PostApi("create/dir", { RoomInfo });
    if (res.data.code === "01") {
      toast.error(res.data.message);
      return;
    }
    navigate(`/editor/${roomId}/@${username}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/code-sync.png"
          alt="code-sync-logo"
        />

        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <span onClick={createNewRoom} className="createNewBtn">
              new room
            </span>
          </span>
        </div>
      </div>
      <footer>
        <h4>Developed By ENJOYS with 💛</h4>
      </footer>
    </div>
  );
};

export default Home;

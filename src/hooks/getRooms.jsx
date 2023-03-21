import { useReducer } from "react";
import { CallApi } from "../helpers/CallAPI";

// const room = await CallApi(`allfiles/@${username}`, "GET", {});

const initialRoom = [
  { roomId: "test", files: 5 },
  { roomId: "mullaym", files: 2 },
];

const RoomReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD":
      return { ...state, payload };
    case "REMOVE":
      return state.map((room) => {
        console.log(state);
      });
    default:
      return state;
  }
};

export { RoomReducer, initialRoom };

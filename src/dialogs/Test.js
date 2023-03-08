import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { PostApi } from "../helpers/CallAPI";
import { useSelector } from "react-redux";

export const Test = async () => {
  const { RoomInfo: RoomID, User } = useSelector((state) => state.RoomInfo);
  const result = await PostApi("room/single", { username: User, RoomID });
  let files = result.data.data;
  return (
    <div>
      {files.length > 0
        ? files.map((option) => (
            <FormControlLabel value={option} key={option} label={option} />
          ))
        : "No Files To Download"}
    </div>
  );
};

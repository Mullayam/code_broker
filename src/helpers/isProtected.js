import { PostApi } from "./CallAPI";

const isProtected = async (clientRoomId) => {
  let response = await PostApi(`protected`, { clientRoomId });
  return response.data;
};
const isVerified = async (clientPassword, clientRoomId) => {
  let response = await PostApi(`protected-room/verify/password`, {
    clientPassword,
    clientRoomId,
  });
  return response.data;
};
const MakeProtected = async (roomInfo) => {
  let response = await PostApi(`set/protect-room`, {
    roomInfo,
  });
  return response.data;
};
const deletePasswordFile = async (roomID) => {
  let response = await PostApi(`delete/protected-room`, {
    roomID,
  });
  return response.data;
};
export { isProtected, isVerified, MakeProtected, deletePasswordFile };

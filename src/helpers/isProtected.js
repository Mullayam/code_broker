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
export { isProtected, isVerified };

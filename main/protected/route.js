const CheckProtectedRoomOrNot = (req, res) => {
  const ProtectedRoomsList = require("./protectedFile.json");
  const { clientRoomId } = req.body;
  for (let RoomId of ProtectedRoomsList) {
    if (RoomId.roomId == clientRoomId) {
      return res
        .status(200)
        .json({ status: "true", message: "This Room is Password Protected" });
    } else {
      return res.status(200).json({
        status: "false",
        message: "This Room is not Password Protected",
      });
    }
  }
};
const VerifyRoomPasswords = (req, res) => {
  const ProtectedRoomsList = require("./protectedFile.json");
  const { clientPassword, clientRoomId } = req.body;
  if (clientRoomId.length !== 36) {
    return res
      .status(401)
      .json({ status: false, message: "Please Enter A valid Roomd Id" });
  }
  let status = false;
  let message = "";
  for (let RoomId in ProtectedRoomsList) {
    if (ProtectedRoomsList[RoomId].roomId == clientRoomId) {
      if (ProtectedRoomsList[RoomId].password == clientPassword) {
        status = true;
        message = "Successfully open";
        break;
      } else {
        status = false;
        message = "Room Password is Incorrect";
        break;
      }
    } else {
      status = false;
      message = "This Room is not Password Protected or not Found";
      break;
    }
  }
  return res.status(200).json({ status, message });
};
module.exports = { CheckProtectedRoomOrNot, VerifyRoomPasswords };

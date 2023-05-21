const path = require("path");
const fs = require("fs");
const CheckProtectedRoomOrNot = (req, res) => {
  const { clientRoomId } = req.body;
  let checkingDir = path.join(__dirname, `rooms`, clientRoomId);

  if (!fs.existsSync(`${checkingDir}.txt`)) {
    console.log(checkingDir);
    return res.status(200).json({
      status: "false",
      message: "This Room is not Password Protected",
    });
  } else {
    return res.status(200).json({
      status: "true",
      message: "This Room is  Password Protected",
    });
  }
};
const VerifyRoomPasswords = (req, res) => {
  const { clientPassword, clientRoomId } = req.body;
  const ProtectedRoomsList = path.join(__dirname, `rooms`, clientRoomId);
  let status, message;
  try {
    const data = fs.readFileSync(`${ProtectedRoomsList}.txt`, "utf8");
    if (data == clientPassword) {
      status = true;
      message = "Successfully open";
    } else {
      status = false;
      message = "Incorrect Password";
    }
  } catch (err) {
    status = false;
    message = "This Room is not Password Protected or not Found";
  }
  return res.status(200).json({
    status,
    message,
  });
};

module.exports = { CheckProtectedRoomOrNot, VerifyRoomPasswords };

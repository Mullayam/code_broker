const fs = require("fs");
const path = require("path");

class Secure {
  static async CreateSecureRoom(req, res) {
    const { RoomId, Password } = req.body.roomInfo;
    let FilePath = path.join(__dirname, "protected", "rooms");
    let CreateFileWithPassInside = await fs.writeFileSync(
      `${FilePath}/${RoomId}.txt`,
      Password
    );
    return res.status(200).json({
      status: true,
      message: "This Room is Protected",
    });
  }
}
module.exports = Secure;

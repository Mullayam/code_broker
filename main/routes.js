const router = require("express");
const FileActivity = require("./FileHandler");
 const {
   CheckProtectedRoomOrNot,
   VerifyRoomPasswords,
 } = require("./protected/route");

 const routes = router();

 routes.post("/protected", CheckProtectedRoomOrNot);
 routes.post("/protected-room/verify/password", VerifyRoomPasswords);
 routes.post("/create/dir", FileActivity.createNewDir);
 routes.post("/create/file", FileActivity.createNewFile);
 // routes.post("/execute", FileActivity.genrateOutput);
 routes.get("/allfiles/:username", FileActivity.getAllRooms);
 routes.post("/read/file", FileActivity.readFileContent);
 routes.post("/save/file", FileActivity.reWriteFileContent);
 routes.post("/get/single/", FileActivity.downloadFile);
 routes.post("/room/single/", FileActivity.getSpecificRoomFile);

module.exports = routes;

const router = require("express");
const FileActivity = require("./FileHandler");
const routes = router();

routes.post("/create/file", FileActivity.createNewFile);
// routes.post("/execute", FileActivity.genrateOutput);
// routes.get("/allfiles/", FileActivity.getAllFiles);
// routes.get("/get/single/", FileActivity.downloadFile);

module.exports = routes;

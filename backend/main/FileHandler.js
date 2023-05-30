const path = require("path");
const fs = require("fs");
const { exitCode } = require("process");

let CreateFileIn = path.join(__dirname, "createdRooms");

async function ExistDir(Username, RoomID) {
  let TempFiles = path.join(__dirname, "createdRooms");
  let createdDir = false;
  try {
    if (!fs.existsSync(`${TempFiles}`)) {
       

      if (!fs.existsSync(`${TempFiles}/${RoomID}/${Username}`)) {
        fs.mkdirSync(`${TempFiles}/${RoomID}/${Username}`, { recursive: true });
      } else {
        createdDir = true;
        return createdDir;
      }
    } else {
      fs.mkdirSync(`${TempFiles}/${RoomID}/${Username}`, { recursive: true });
      createdDir = true;
     
      return createdDir;
    }
    return createdDir;
  } catch (err) {
    console.error(err);
  }
}
async function ExistFile(userFilePath, fileName) {
  let checkingDir = path.join(
    __dirname,
    `createdRooms/${userFilePath}`,
    fileName
  );

  if (fs.existsSync(checkingDir)) {
    return true;
  } else {
    return false;
  }
}
async function PreloadedCode(Extension) {
  switch (Extension) {
    case "js":
      return 'console.log("Hello")';
    case "php":
      return '<?php echo "Hello Guys" ?>';

    default:
      return "Welcome To RealTime Editor";
  }
}

class FileActivity {
  static async createNewDir(req, res) {
    const {
      RoomInfo: { roomId, user },
    } = req.body;
    const dirCheck = fs.existsSync(`${CreateFileIn}/${roomId}/@${user}`);

    if (dirCheck) {
      const readDir = fs.readdirSync(`${CreateFileIn}/${roomId}`);
      if (readDir.length > 9) {
        if (readDir.includes(user)) {
          return res.status(200).json({
            code: "02",
            message: "",
          });
        }
        return res.status(200).json({
          code: "01",
          message: "This Room is full(9) of users,Please Join/Create Other",
        });
      }
    } else {
      let DirectoryToBeCreated = await ExistDir(user, roomId);
      if (typeof DirectoryToBeCreated === "undefined") {
        return res.status(200).json({
          status: "true",
          message: "New Directory Created",
        });
      } else {
        return res.status(200).json({
          status: "false",
          message: "Directory Already Exists",
        });
      }
    }
  }
  static async createNewFile(req, res) {
    const {
      FileDetails: { name, ext },
      RoomInfo: { roomId, user },
    } = req.body;
    let FullFileName = `${name}.${ext}`;

    let loadData = await PreloadedCode(ext);
    let FileExistOrNot = await ExistFile(`${roomId}/${user}`, FullFileName);

    if (FileExistOrNot) {
      return res.status(200).json({
        status: "false",
        message: "File Already Exists",
      });
    } else {
      await fs.writeFileSync(
        `${CreateFileIn}/${roomId}/${user}/${FullFileName}`,
        loadData
      );
    }

    return res.status(200).json({
      status: "true",
      message: "File Created",
    });
  }
  static async genrateOutput(req, res) {}
  static async readFileContent(req, res) {
    const {
      FileDetails: { name, ext },
      RoomInfo: { roomId, user },
    } = req.body;
    let FullFileName = `${name}.${ext}`;
    let FileExistOrNot = await ExistFile(`${user}/${roomId}`, FullFileName);
    if (!FileExistOrNot) {
      return res.status(404).json({
        status: "false",
        message: "File Not Exists",
      });
    } else {
      try {
        const data = fs.readFileSync(
          `${CreateFileIn}/${user}/${roomId}/${FullFileName}`,
          "utf8"
        );
        return res.status(404).json({
          status: "true",
          data: data,
        });
      } catch (err) {
        return res.status(500).json({
          status: "false",
          message: err,
        });
      }
    }
  }
  static async reWriteFileContent(req, res) {
    const {
      FileDetails: { name, ext },
      RoomInfo: { roomId, user },
      code,
    } = req.body;
    let FullFileName = `${name}.${ext}`;
    let FileExistOrNot = await ExistFile(`${user}/${roomId}`, FullFileName);
    if (!FileExistOrNot) {
      return res.status(404).json({
        status: "false",
        message: "File Not Exists,First Create File",
      });
    } else {
      try {
        await fs.writeFileSync(
          `${CreateFileIn}/${user}/${roomId}/${FullFileName}`,
          code
        );

        return res.status(200).json({
          status: "true",
          message: "File Saved Successfully",
        });
      } catch (err) {
        return res.status(500).json({
          status: "false",
          message: err,
        });
      }
    }
  }
  static async downloadFile(req, res) {
    const {
      FileDetails: { name, ext },
      RoomInfo: { roomId, user },
    } = req.body;
    let FullFileName = `${name}.${ext}`;
    let FileExistOrNot = await ExistFile(`${user}/${roomId}`, FullFileName);
    if (!FileExistOrNot) {
      return res.status(404).json({
        status: "false",
        message: "File Not Exists,First Create File",
      });
    } else {
      try {
        const FullFilePath = `${CreateFileIn}/${user}/${roomId}/${FullFileName}`;
        res.download(FullFilePath, function (err) {
          if (err) {
            console.log(err);
          }
        });

        //  download all
        // if(true){
        //   for(let i = 0; i < FullFilePath.length;){

        //   }
        //       res.zip([
        //         {
        //           path: folderPath + "/multiple_one_gfg.txt",
        //           name: "one_gfg.txt",
        //         },
        //         {
        //           path: folderPath + "/multiple_two_gfg.txt",
        //           name: "two_gfg.txt",
        //         },
        //         {
        //           path: folderPath + "/multiple_three_gfg.txt",
        //           name: "three_gfg.txt",
        //         },
        //       ]);
        // }
        return res.status(200).json({
          status: "true",
          message: "File Downloaded",
        });
      } catch (err) {
        return res.status(500).json({
          status: "false",
          message: err,
        });
      }
    }
  }
  static async getAllRooms(req, res) {
    const { roomId, username } = req.params;
    let Files = [];
    try {
      fs.readdirSync(`${CreateFileIn}/${roomId}/${username}`).map(
        (fileName) => {
          Files.push({
            fileName,
          });
          return Files;
        }
      );
      return res.status(200).json({
        status: "true",
        message: "Some Room are Found For this username",
        data: Files,
      });
    } catch (error) {
      return res.status(500).json({
        status: "false",
        message: error,
      });
    }
  }
  static async getSpecificRoomFile(req, res) {
    const { username, roomId } = req.body;
    let FileName = [];
    try {
      fs.readdirSync(`${CreateFileIn}/${username}/${roomId}`).map(
        (fileName) => {
          return FileName.push(fileName);
        }
      );
      return res.status(200).json({
        status: "true",
        message: `Some File are Found For this username in room ${roomId}S`,
        data: FileName,
      });
    } catch (error) {
      return res.status(500).json({
        status: "false",
        message: error,
      });
    }
  }
  static async getFileInRoom(username, RoomId) {
    let count = fs.readdirSync(`${CreateFileIn}/${username}/${RoomId}`);
    return count;
  }
}
module.exports = FileActivity;

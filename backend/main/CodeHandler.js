const PackageManager = require("./pkgInstaller");
// const Compiler = require("./lang/compiler");
class CodeHandler {
  static async DirectoryFileExecutedResponse(req, res) {
    // const { FileExtension } = req.body;
  }
  static async NpmPackageManager(req, res) {
    const { ExecutableCommand } = req.body;
    const ExecuteHere = await PackageManager(ExecutableCommand);
    ExecuteHere.stdout.on("data", (data) => {
      return new Promise((resolve) => {
        resolve(data);
        console.log(data);
      });
    });

    // return res.send(200).json({ status: true });
  }
  static async LiveCodeExecutedResponse(req, res) {
    // const { FileExtension } = req.body;
  }
}
module.exports = CodeHandler;

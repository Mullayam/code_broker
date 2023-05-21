const exec = require("child_process").exec;

async function npmInstall(command) {
  return await exec(`${command}`);
}

module.exports = npmInstall;

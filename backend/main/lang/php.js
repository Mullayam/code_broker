const runner = require("child_process");
const php = runner.spawn("php");
const phpString = `<?php echo "hi";?>`; // you can use <?php

const { exec } = require("child_process");

exec(`echo "${phpString}" | php`, (error, stdout, stderr) => {
  console.log(stdout); // prints "1"
});
// You can remove this if you want output as Buffer
php.stdout.setEncoding("utf8");
php.stdout.on("data", console.log);
php.stderr.on("data", console.error);

php.stdin.write(phpString);
php.stdin.end();

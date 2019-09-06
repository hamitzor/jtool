const fs = require('fs')
const path = require('path')

module.exports = rootDir => new Promise((resolve, reject) => {
   fs.readdir(path.resolve(rootDir, "src"), (err, files) => {
      console.log(files)
   })
})

const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
   console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
   console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
   console.log(`child process exited with code ${code}`);
});
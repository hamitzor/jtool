const spawn = require('child_process').spawn
const { isJavaInstalled } = require('./util')

module.exports = (files, buildDir) => new Promise((resolve, reject) => {
   if (files.length) {
      isJavaInstalled().then(exists => exists ? spawn('javac', ['-d', buildDir, ...files])
         .stderr.on('data', data => reject(data.toString()))
         .on('close', code => resolve(code))
         .on('error', err => reject(err)) : reject('Java is not installed'))
   }
   else {
      resolve()
   }
})
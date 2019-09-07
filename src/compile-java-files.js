const spawn = require('child_process').spawn
const { javaExists } = require('./util')

module.exports = (files, buildDir) => new Promise((resolve, reject) => {
   javaExists().then(exists => exists ? spawn('javac', ['-d', buildDir, ...files])
      .stderr.on('data', data => resolve(data))
      .on('close', code => resolve(code))
      .on('error', err => resolve(err)) : reject('Java is not installed'))
})
const spawn = require('child_process').spawn
const { isJavaInstalled, getPackageOfTestClass } = require('./util')
const path = require('path')

const runClassfile = (className, package, classpath) => new Promise((resolve, reject) => {
   isJavaInstalled().then(exists => {
      if (exists) {
         const java = spawn('java', ['-classpath', classpath, `${package}.${className}`])
         java.stdout.on('data', data => console.log(data.toString()))
         java.stderr.on('data', data => reject(data.toString()))
         java.on('close', code => resolve(code))
         java.on('error', err => reject(err))
      }
      else {
         reject('Java is not installed')
      }
   })
})

module.exports = (className, buildDir) =>
   getPackageOfTestClass(className, buildDir)
      .then(package => runClassfile(`${className}Test`, package, `${process.env.CLASSPATH}${path.delimiter}${buildDir}`))
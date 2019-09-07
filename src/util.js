const path = require('path')
const glob = require("glob")
const { spawn } = require('child_process')

exports.isJavaInstalled = (env = process.env) => new Promise((resolve) => {
   const locaterCommand = exports.isWin() ? 'where' : 'which'
   spawn(locaterCommand, ['javac'], { env })
      .on('close', code => {
         resolve(code === 0)
      })
})

exports.isWin = () => require('os').platform().includes('win')

exports.absoluteRootDir = () => path.parse(process.cwd()).root

exports.walkUpAndFindProjectRoot = cwd => new Promise((resolve, reject) => {
   glob("jtool.config.json", { cwd }, (err, files) => {
      if (err)
         reject(err)
      const upperDirectory = path.resolve(cwd, "..")
      if (upperDirectory === exports.absoluteRootDir()) {
         resolve(null)
      }
      else if (!files.length) {
         resolve(exports.walkUpAndFindProjectRoot(upperDirectory))
      }
      else {
         resolve(cwd)
      }
   })
})

exports.findJavaFiles = cwd => new Promise((resolve, reject) => {
   glob("**/*.java", { cwd }, (err, files) => {
      if (err)
         reject(err)
      resolve(files.map(file => path.resolve(cwd, file)))
   })
})

exports.formatTemplate = (template, variables) => {
   Object.keys(variables).forEach(name => {
      template = template.replace(new RegExp(`{{${name}}}`, 'g'), variables[name])
   })
   return template
}

exports.extractPackageNameFromPath = dir => {
   const dirs = dir.split(path.sep).reverse()
   const javaIndex = dirs.indexOf('java')
   let packageName = 'main'
   if (javaIndex !== -1 && (dirs.indexOf('main') === javaIndex + 1 || dirs.indexOf('test') === javaIndex + 1)) {
      packageName = dirs.slice(0, javaIndex).reverse().join('.')
   }
   return packageName.length ? packageName : 'main'
}

exports.getPackageOfTestClass = (className, buildDir) => new Promise((resolve, reject) => {
   glob(`**/${className}Test.class`, { cwd: buildDir }, (err, files) => {
      if (err || !files.length) {
         reject(`${className}Test.class is not found`)
      }
      else {
         resolve(path.dirname(files[0]).split('/').join('.'))
      }
   })
})
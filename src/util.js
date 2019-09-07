const path = require('path')
const glob = require("glob")
const { spawn } = require('child_process')

exports.javaExists = (env = process.env) => new Promise((resolve) => {
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
      resolve(files)
   })
})

exports.formatTemplate = (template, variables) => {
   Object.keys(variables).forEach(name => {
      template = template.replace(new RegExp(`{{${name}}}`, 'g'), variables[name])
   })
   return template
}

exports.extractPackageNameFromDir = dir => {
   const dirs = dir.split(path.sep).reverse()
   const javaIndex = dirs.indexOf('java')
   let packageName = 'main'
   if (javaIndex !== -1 && dirs.indexOf('main') === javaIndex + 1) {
      packageName = dirs.slice(0, javaIndex).reverse().join('.')
   }
   return packageName.length ? packageName : 'main'
}
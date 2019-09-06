const fs = require('fs')
const path = require('path')
const fsPromises = fs.promises

//@TODO: implement the actual walk
exports.findJavaFiles = dir => fsPromises.readdir(dir)

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
   return packageName
}
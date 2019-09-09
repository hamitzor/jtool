const path = require('path')
const util = require('./util')
const compileFiles = require('./compile-files')

exports.createJavaFile = (dir, name, type) => {
   return require('./create-java-file')(path.resolve(process.cwd(), dir), name, type)
}

exports.createProject = (name, packageName, firstClass) => {
   return require('./create-project')(path.resolve(process.cwd(), name), name, packageName, firstClass)
}

exports.runTest = className => util.walkUpAndFindProjectRoot(process.cwd())
   .then(projectRoot => projectRoot === null ?
      Promise.reject('This directory is not inside of an jtool project') :
      util.findJavaFiles(projectRoot)
         .then(files => compileFiles(files, path.resolve(projectRoot, 'build')))
         .then(() => require('./run-test')(className, path.resolve(projectRoot, 'build'))))
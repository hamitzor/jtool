const fs = require('fs')
const path = require('path')
const createJavaFile = require('./create-java-file')
const createJsonFile = require('./create-json-file')

module.exports = (rootDir, name, packageName, firstClass, javaVersion = "11") => new Promise((resolve, reject) => {
   fs.exists(rootDir, exists => {
      if (exists) {
         fs.exists(path.resolve(rootDir, "jtool.config.json"), exists => {
            if (exists) {
               reject("Project already exists.")
            }
            else {
               reject("Directory already exists.")
            }
         })
      }
      else {
         const packageDirs = packageName.split('.')
         const mainSourcesDir = path.resolve(rootDir, 'src/main/java', ...packageDirs)
         const testSourcesDir = path.resolve(rootDir, 'src/test/java', ...packageDirs)
         fs.mkdir(mainSourcesDir, { recursive: true }, err => {
            if (err)
               reject(err)
            else
               fs.mkdir(testSourcesDir, { recursive: true }, err => {
                  if (err)
                     reject(err)
                  else
                     createJsonFile(rootDir, "jtool.config", "configJson", { projectName: name, javaVersion })
                        .then(() => createJavaFile(mainSourcesDir, firstClass, "class"))
                        .then(() => createJavaFile(testSourcesDir, firstClass + "Test", "testClass"))
                        .then(() => resolve())
                        .catch(err => reject(err))
               })
         })

      }
   })
})
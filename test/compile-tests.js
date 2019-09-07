const expect = require('chai').expect
const os = require('os')
const path = require('path')
const createJavaFile = require('../src/create-java-file')
const compileJavaFiles = require('../src/compile-files')
const util = require('../src/util')
const fs = require('fs')

describe('compileJavaFiles', () => {
   const fakeProjectPath = path.resolve(os.tmpdir(), `compile-files-demo${Date.now()}`)
   const packageDir = path.resolve(fakeProjectPath, 'main/java/com/hamitzor')
   before(() => {
      fs.mkdirSync(packageDir, { recursive: true })
   })

   it('should compile all files if not empty', done => {
      createJavaFile(packageDir, 'A')
         .then(() => createJavaFile(packageDir, 'B'))
         .then(() => createJavaFile(path.resolve(packageDir, '..'), 'C'))
         .then(() => createJavaFile(path.resolve(packageDir, '..'), 'D'))
         .then(() => createJavaFile(path.resolve(packageDir, '../..'), 'E'))
         .then(() => createJavaFile(path.resolve(packageDir, '../..'), 'F'))
         .then(() => createJavaFile(fakeProjectPath, 'G'))
         .then(() => createJavaFile(fakeProjectPath, 'H'))
         .then(() => util.findJavaFiles(fakeProjectPath))
         .then(files => compileJavaFiles(files, path.resolve(fakeProjectPath, 'build')))
         .then(() => {
            const expectedClassFiles = [
               'com/hamitzor/A.class',
               'com/hamitzor/B.class',
               'com/C.class',
               'com/D.class',
               'main/G.class',
               'main/H.class',
               'main/E.class',
               'main/F.class',
            ].map(f => path.resolve(fakeProjectPath, 'build', f))

            expectedClassFiles.forEach(classFile => {
               expect(fs.existsSync(classFile)).to.be.true
            })
            done()
         })
         .catch(err => done({ err }))
   })

   it('should compile nothing if empty', done => {
      compileJavaFiles([], path.resolve(fakeProjectPath, 'build'))
         .then(() => done())
         .catch(err => done({ err }))
   })

})
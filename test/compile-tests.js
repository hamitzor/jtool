const expect = require('chai').expect
const os = require('os')
const path = require('path')
const createJavaFile = require('../src/create-java-file')
const compileJavaFiles = require('../src/compile-java-files')
const util = require('../src/util')
const fs = require('fs')

describe('compileJavaFiles', () => {
   const fakeProjectDir = path.resolve(os.tmpdir(), 'compile-files-demo' + Date.now())
   const packageDir = path.resolve(fakeProjectDir, 'main/java/com/hamitzor')
   before(() => {
      fs.mkdirSync(packageDir, { recursive: true })
   })

   it('should compile all java files', done => {
      createJavaFile(packageDir, 'A')
         .then(() => createJavaFile(packageDir, 'B'))
         .then(() => createJavaFile(path.resolve(packageDir, '..'), 'C'))
         .then(() => createJavaFile(path.resolve(packageDir, '..'), 'D'))
         .then(() => createJavaFile(path.resolve(packageDir, '../..'), 'E'))
         .then(() => createJavaFile(path.resolve(packageDir, '../..'), 'F'))
         .then(() => createJavaFile(fakeProjectDir, 'G'))
         .then(() => createJavaFile(fakeProjectDir, 'H'))
         .then(() => util.findJavaFiles(fakeProjectDir))
         .then(files => {
            return compileJavaFiles(files.map(file => path.resolve(fakeProjectDir, file)), path.resolve(fakeProjectDir, 'build'))
         })
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
            ].map(f => path.resolve(fakeProjectDir, 'build', f))

            expectedClassFiles.forEach(classFile => {
               expect(fs.existsSync(classFile)).to.be.true
            })
            done()
         })
         .catch(err => done({ err }))
   })

})
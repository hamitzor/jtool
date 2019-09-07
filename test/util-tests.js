const expect = require('chai').expect
const util = require('../src/util')
const path = require('path')
const fs = require('fs')
const os = require('os')

describe('util.formatTemplate', () => {
   it('should replace placeholders with values', () => {
      const variables = {
         packageName: 'com.hamitzor',
         className: 'Main'
      }
      expect(util.formatTemplate("package {{packageName}}\n\npublic class {{className}} {\n\t\n}", variables))
         .to
         .eql("package com.hamitzor\n\npublic class Main {\n\t\n}")
   })
})

describe('util.extractPackageNameFromPath', () => {
   it('should extract', () => {
      expect(util.extractPackageNameFromPath(path.resolve("/home/user/projects/a/src/main/java/com/hamitzor")))
         .to
         .eql("com.hamitzor")
   })

   it('should not extract', () => {
      expect(util.extractPackageNameFromPath(path.resolve("/home/user/projects/hamitzor")))
         .to
         .eql("main")
   })
})

describe('util.walkUpAndFindProjectRoot', () => {
   const now = Date.now()
   fs.mkdirSync(path.resolve(os.tmpdir(), `find-project-root-demo${now}/test-project/a/b/c/d`), { recursive: true })
   fs.writeFileSync(path.resolve(os.tmpdir(), `find-project-root-demo${now}/test-project/jtool.config.json`), "")
   it('should find project root', done => {
      util.walkUpAndFindProjectRoot(path.resolve(os.tmpdir(), `find-project-root-demo${now}/test-project/a/b/c`))
         .then(projectRoot => {
            expect(projectRoot).to.eql(path.resolve(os.tmpdir(), `find-project-root-demo${now}/test-project`))
            done()
         })
         .catch(err => done(err))
   })
   fs.mkdirSync(path.resolve(os.tmpdir(), `find-project-root-demo-2-${now}/test-project/a/b/c/d`), { recursive: true })
   it('should not find project root', done => {
      util.walkUpAndFindProjectRoot(path.resolve(os.tmpdir(), `find-project-root-demo-2-${now}/test-project/a/b/c`))
         .then(projectRoot => {
            expect(projectRoot).to.equal(null)
            done()
         })
         .catch(err => done(err))
   })
})

describe('util.absoluteRootDir', () => {
   it('should find absolute dir', () => {
      const platform = os.platform()
      const absoluteRootDir = util.absoluteRootDir()
      switch (platform) {
         case 'win32':
            expect(absoluteRootDir).to.match(/^[A-Z]:\\$/)
            break
         case 'linux':
         case 'darwin':
            expect(absoluteRootDir).to.eql('/')
            break
      }
   })
})

describe('util.findJavaFiles', () => {
   const testFiles = [
      '1.java',
      '2.java',
      'a/3.java',
      'a/4.java',
      'a/b/5.java',
      'a/b/6.java'
   ]
   const now = Date.now()
   const tempPath = path.resolve(os.tmpdir(), `find-java-files-demo${now}`)
   fs.mkdirSync(path.resolve(tempPath, `a/b`), { recursive: true })
   testFiles.forEach(file => fs.writeFileSync(path.resolve(tempPath, file), ""))
   it('should find java files', done => {
      util.findJavaFiles(tempPath)
         .then(files => {
            expect(files).to.eql(testFiles.map(file => path.resolve(tempPath, file)))
            done()
         })
         .catch(err => done(err))
   })
})

describe('util.getPackageOfTestClass', () => {
   const now = Date.now()
   const tempDir = path.resolve(os.tmpdir(), `get-package-of-test-class${now}/test/a/b/c`)
   fs.mkdirSync(tempDir, { recursive: true })
   fs.writeFileSync(path.resolve(tempDir, 'CarTest.class'), "")
   it('should get package of test class', done => {
      util.getPackageOfTestClass('Car', path.resolve(os.tmpdir(), `get-package-of-test-class${now}`))
         .then(package => {
            expect(package).to.eql('test.a.b.c')
            done()
         })
         .catch(err => done(err))
   })
})
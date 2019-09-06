const expect = require('chai').expect
const os = require('os')
const path = require('path')
const createJavaFile = require('../src/create-java-file')
const createJsonFile = require('../src/create-json-file')
const fs = require('fs')

describe('createFile', () => {
   const fakeProjectDir = path.resolve(os.tmpdir(), 'e11a93b/testproject')
   const packageDir = path.resolve(fakeProjectDir, 'main/java/com/hamitzor')
   before(() => {
      fs.mkdirSync(packageDir, { recursive: true })
   })

   it('should create .java file with Ford class and com.hamitzor package', done => {
      createJavaFile(packageDir, "Ford", "class")
         .then(() => {
            fs.readFile(path.resolve(packageDir, 'Ford.java'), (err, data) => {
               if (err)
                  done(err)
               expect(data.toString())
                  .to
                  .eql('package com.hamitzor;\n\npublic class Ford {\n\t\n}')
               done()
            })
         })
         .catch(err => done(err))
   })

   it('should create .java file with CarBrand interface and com.hamitzor package', done => {
      createJavaFile(packageDir, "CarBrand", "interface")
         .then(() => {
            fs.readFile(path.resolve(packageDir, 'CarBrand.java'), (err, data) => {
               if (err)
                  done(err)
               expect(data.toString())
                  .to
                  .eql('package com.hamitzor;\n\npublic interface CarBrand {\n\t\n}')
               done()
            })
         })
         .catch(err => done(err))
   })

   it('should create .java file with FordTest test class and com.hamitzor package', done => {
      createJavaFile(packageDir, "FordTest", "testClass")
         .then(() => {
            fs.readFile(path.resolve(packageDir, 'FordTest.java'), (err, data) => {
               if (err)
                  done(err)
               expect(data.toString())
                  .to
                  .eql("package com.hamitzor;\n\npublic class FordTest {\n\n\tpublic static void main (String[] args) {\n\t\tSystem.out.println(\"Tests for FordTest class\");\n\t}\n\n}")
               done()
            })
         })
         .catch(err => done(err))
   })

   it('should create .java file with Ford class and main package', done => {
      createJavaFile(fakeProjectDir, "Ford", "class")
         .then(() => {
            fs.readFile(path.resolve(fakeProjectDir, 'Ford.java'), (err, data) => {
               if (err)
                  done(err)
               expect(data.toString())
                  .to
                  .eql('package main;\n\npublic class Ford {\n\t\n}')
               done()
            })
         })
         .catch(err => done(err))
   })

   it('should create .java file with CarBrand interface and main package', done => {
      createJavaFile(fakeProjectDir, "CarBrand", "interface")
         .then(() => {
            fs.readFile(path.resolve(fakeProjectDir, 'CarBrand.java'), (err, data) => {
               if (err)
                  done(err)
               expect(data.toString())
                  .to
                  .eql('package main;\n\npublic interface CarBrand {\n\t\n}')
               done()
            })
         })
         .catch(err => done(err))
   })

   it('should create .java file with FordTest test class and main package', done => {
      createJavaFile(fakeProjectDir, "FordTest", "testClass")
         .then(() => {
            fs.readFile(path.resolve(fakeProjectDir, 'FordTest.java'), (err, data) => {
               if (err)
                  done(err)
               expect(data.toString())
                  .to
                  .eql("package main;\n\npublic class FordTest {\n\n\tpublic static void main (String[] args) {\n\t\tSystem.out.println(\"Tests for FordTest class\");\n\t}\n\n}")
               done()
            })
         })
         .catch(err => done(err))
   })

   it('should create jtool.config.json', done => {
      createJsonFile(fakeProjectDir, "jtool.config", "configJson", { projectName: "Test", javaVersion: "11" })
         .then(() => {
            fs.readFile(path.resolve(fakeProjectDir, 'jtool.config.json'), (err, data) => {
               if (err)
                  done(err)
               expect(data.toString())
                  .to
                  .eql("{\n\t\"projectName\": \"Test\",\n\t\"javaVersion\": \"11\"\n}")
               done()
            })
         })
         .catch(err => done(err))
   })

})
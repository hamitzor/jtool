const expect = require('chai').expect
const os = require('os')
const path = require('path')
const createJavaFile = require('../src/create-java-file')
const createJsonFile = require('../src/create-json-file')
const fs = require('fs')

describe('createFile', () => {
   const fakeDir = path.resolve(os.tmpdir(), `create-file-tests${Date.now()}`)
   const packageDir = path.resolve(fakeDir, 'main/java/com/hamitzor')
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
      createJavaFile(fakeDir, "Ford", "class")
         .then(() => {
            fs.readFile(path.resolve(fakeDir, 'Ford.java'), (err, data) => {
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
      createJavaFile(fakeDir, "CarBrand", "interface")
         .then(() => {
            fs.readFile(path.resolve(fakeDir, 'CarBrand.java'), (err, data) => {
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
      createJavaFile(fakeDir, "FordTest", "testClass")
         .then(() => {
            fs.readFile(path.resolve(fakeDir, 'FordTest.java'), (err, data) => {
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
      createJsonFile(fakeDir, "jtool.config", "configJson", { projectName: "Test" })
         .then(() => {
            fs.readFile(path.resolve(fakeDir, 'jtool.config.json'), (err, data) => {
               if (err)
                  done(err)
               expect(data.toString())
                  .to
                  .eql("{\n\t\"projectName\": \"Test\"\n}")
               done()
            })
         })
         .catch(err => done(err))
   })

})
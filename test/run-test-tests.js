const path = require('path')
const createProject = require('../src/create-project')
const fs = require('fs')
const runTest = require('../src/run-test')
const compileJavaFiles = require('../src/compile-files')
const os = require('os')
const util = require('../src/util')

const CarJavaClass = `
   package com.hamitzor;

   public class Car {
      public String getBrand () {
         return "Ford";
      }
   }

`
const CarTestClass = `
   package com.hamitzor;

   public class CarTest {
      public static void main (String[] args) {
         Car car = new Car();
         System.out.println("Test is executed. Car's name is " + car.getBrand() );
      }
   }
`

describe('runTest', () => {
   it('should run java class properly', done => {
      const containerPath = path.resolve(os.tmpdir(), `run-test${Date.now()}`)
      fs.mkdirSync(containerPath, { recursive: true })
      createProject(path.resolve(containerPath, 'test-project'), 'test-project', 'com.hamitzor', 'Car')
         .then(() => {
            fs.writeFileSync(path.resolve(containerPath, 'test-project/src/main/java/com/hamitzor/Car.java'), CarJavaClass)
            fs.writeFileSync(path.resolve(containerPath, 'test-project/src/test/java/com/hamitzor/CarTest.java'), CarTestClass)
            return util.findJavaFiles(path.resolve(containerPath, 'test-project'))
               .then(files => compileJavaFiles(files, path.resolve(containerPath, 'test-project/build')))
               .then(() => runTest('Car', path.resolve(containerPath, 'test-project/build')))
         })
         .then(() => done())
         .catch(err => done(err))
   })
})

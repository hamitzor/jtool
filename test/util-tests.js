const expect = require('chai').expect
const util = require('../src/util')

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
      expect(util.extractPackageNameFromPath("/home/user/projects/a/src/main/java/com/hamitzor"))
         .to
         .eql("com.hamitzor")
   })

   it('should not extract', () => {
      expect(util.extractPackageNameFromPath("/home/user/projects/hamitzor"))
         .to
         .eql("main")
   })
})

describe('util.findJavaFiles', () => {
   util.findJavaFiles('/home/hamit/projects/java/old-projects/java-demos/spring-demo')
      .then(files => {
         console.log(files)
      })
      .catch(err => {
         console.log(err)
      })
})
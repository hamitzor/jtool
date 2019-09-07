const expect = require('chai').expect
const os = require('os')
const path = require('path')
const createProject = require('../src/create-project')
const fs = require('fs')
const util = require('../src/util')
const templates = require('../config/templates.json')

describe('createProject', () => {

   it('should create project properly', done => {
      const containerPath = path.resolve(os.tmpdir(), `create-project-tests${Date.now()}`)
      fs.mkdirSync(containerPath, { recursive: true })
      createProject(path.resolve(containerPath, 'test-project'), 'test-project', 'com.hamitzor', 'Car')
         .then(() => {
            expect(fs.existsSync(path.resolve(containerPath, 'test-project/jtool.config.json'))).to.be.true
            expect(fs.existsSync(path.resolve(containerPath, 'test-project/src/main/java/com/hamitzor/Car.java'))).to.be.true
            expect(fs.existsSync(path.resolve(containerPath, 'test-project/src/test/java/com/hamitzor/CarTest.java'))).to.be.true
            expect(fs.readFileSync(path.resolve(containerPath, 'test-project/jtool.config.json')).toString()).to.eql(util.formatTemplate(templates.configJson, { projectName: 'test-project' }))
            expect(fs.readFileSync(path.resolve(containerPath, 'test-project/src/main/java/com/hamitzor/Car.java')).toString()).to.eql(util.formatTemplate(templates.class, { packageName: 'com.hamitzor', className: 'Car' }))
            expect(fs.readFileSync(path.resolve(containerPath, 'test-project/src/test/java/com/hamitzor/CarTest.java')).toString()).to.eql(util.formatTemplate(templates.testClass, { packageName: 'com.hamitzor', className: 'CarTest' }))
            done()
         })
         .catch(err => done(err))
   })

   it('should complain about same named directory', done => {
      const containerPath = path.resolve(os.tmpdir(), `create-project-tests${Date.now()}`)
      const projectPath = path.resolve(containerPath, 'duplicated')
      fs.mkdirSync(projectPath, { recursive: true })
      createProject(projectPath, 'duplicated', 'com.hamitzor', 'Car')
         .then(() => done("Should not create a project"))
         .catch(err => {
            expect(err).to.eql("Directory already exists.")
            done()
         })
         .catch(err => done(err))
   })

   it('should complain about same named directory', done => {
      const containerPath = path.resolve(os.tmpdir(), `create-project-tests${Date.now()}/duplicated`)
      const projectPath = path.resolve(containerPath, 'duplicated')
      fs.mkdirSync(projectPath, { recursive: true })
      fs.writeFileSync(path.resolve(projectPath, 'jtool.config.json'), '')
      createProject(projectPath, 'duplicated', 'com.hamitzor', 'Car')
         .then(() => done("Should not create a project"))
         .catch(err => {
            expect(err).to.eql("Project already exists.")
            done()
         })
         .catch(err => done(err))
   })

})

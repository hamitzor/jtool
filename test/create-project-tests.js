const expect = require('chai').expect
const os = require('os')
const path = require('path')
const createProject = require('../src/create-project')
const fs = require('fs')
 /*
describe('createProject', () => {
  
   const fakeProjectsDir = path.resolve(os.tmpdir(), 'e11a93c', 'projects')
   before(() => {
      fs.mkdirSync(fakeProjectsDir, { recursive: true })
   })

   
   it('should create a project', done => {
      createProject(path.resolve(fakeProjectsDir, 'first-project'), 'first-project', 'com.hamitzor', 'Car')
         .then(() => done())
         .catch(err => done(err))
   })
   
})
*/
const expect = require('chai').expect
const os = require('os')
const path = require('path')
const createFile = require('../src/create-file')
const fs = require('fs')

describe('createFile', () => {
    const fakeProjectDir = path.resolve(os.tmpdir(), 'e11a93b', 'testproject')
    const packageDir = path.resolve(fakeProjectDir, 'main', 'java', 'com', 'hamitzor')
    before(() => {
        fs.mkdirSync(packageDir, { recursive: true })
    })

    it('should create .java file with Ford class and com.hamitzor package', done => {
        createFile(packageDir, "Ford", "class")
        fs.readFile(path.resolve(packageDir, 'Ford.java'), (err, data) => {
            if (err)
                done(err)
            expect(data.toString())
                .to
                .eql('package com.hamitzor;\n\npublic class Ford {\n\t\n\n}')
            done()
        })
    })

    it('should create .java file with CarBrand interface and com.hamitzor package', done => {
        createFile(packageDir, "CarBrand", "interface")
        fs.readFile(path.resolve(packageDir, 'CarBrand.java'), (err, data) => {
            if (err)
                done(err)
            expect(data.toString())
                .to
                .eql('package com.hamitzor;\n\npublic interface CarBrand {\n\t\n\n}')
            done()
        })
    })

    it('should create .java file with FordTest test class and com.hamitzor package', done => {
        createFile(packageDir, "FordTest", "testClass")
        fs.readFile(path.resolve(packageDir, 'FordTest.java'), (err, data) => {
            if (err)
                done(err)
            expect(data.toString())
                .to
                .eql("package com.hamitzor;\n\npublic class FordTest {\n\n\tpublic static void main (String[] args) {\n\t\tSystem.out.println(\"Tests for class FordTest\");\n\t}\n\n}")
            done()
        })
    })

    it('should create .java file with Ford class and main package', done => {
        createFile(fakeProjectDir, "Ford", "class")
        fs.readFile(path.resolve(fakeProjectDir, 'Ford.java'), (err, data) => {
            if (err)
                done(err)
            expect(data.toString())
                .to
                .eql('package main;\n\npublic class Ford {\n\t\n\n}')
            done()
        })
    })

    it('should create .java file with CarBrand interface and main package', done => {
        createFile(fakeProjectDir, "CarBrand", "interface")
        fs.readFile(path.resolve(fakeProjectDir, 'CarBrand.java'), (err, data) => {
            if (err)
                done(err)
            expect(data.toString())
                .to
                .eql('package main;\n\npublic interface CarBrand {\n\t\n\n}')
            done()
        })
    })

    it('should create .java file with FordTest test class and main package', done => {
        createFile(fakeProjectDir, "FordTest", "testClass")
        fs.readFile(path.resolve(fakeProjectDir, 'FordTest.java'), (err, data) => {
            if (err)
                done(err)
            expect(data.toString())
                .to
                .eql("package main;\n\npublic class FordTest {\n\n\tpublic static void main (String[] args) {\n\t\tSystem.out.println(\"Tests for class FordTest\");\n\t}\n\n}")
            done()
        })
    })

})
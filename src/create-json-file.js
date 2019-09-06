const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')
const templates = require('../config/templates.json')
const { formatTemplate } = require('./util')

module.exports = (dir, name, type, data) => fsPromises.writeFile(path.resolve(dir, `${name}.json`), formatTemplate(templates[type], data))
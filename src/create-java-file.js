const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')
const templates = require('../config/templates.json')
const { formatTemplate, extractPackageNameFromPath } = require('./util')

module.exports = (dir, name, type) =>
   fsPromises.writeFile(path.resolve(dir, `${name}.java`), formatTemplate(templates[type], { packageName: extractPackageNameFromPath(dir), className: name }))
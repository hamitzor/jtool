const fs = require('fs')
const path = require('path')
const templates = require('../config/templates.json')
const { formatTemplate, extractPackageNameFromDir: extractPackageNameFromPath } = require('./util')

module.exports = (dir, name, type) => new Promise((resolve, reject) => {
   fs.writeFile(path.resolve(dir, `${name}.java`), formatTemplate(templates[type], { packageName: extractPackageNameFromPath(dir), className: name }), err => {
      if (err)
         reject(err)
      else
         resolve()
   })
})
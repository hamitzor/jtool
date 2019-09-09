const fs = require('fs')
const path = require('path')
const templates = require('../config/templates.json')
const { formatTemplate, extractPackageNameFromPath } = require('./util')

module.exports = (dir, name, type = 'class') => new Promise((resolve, reject) => {
   const file = path.resolve(dir, `${name}.java`)
   fs.writeFile(file, formatTemplate(templates[type], { packageName: extractPackageNameFromPath(dir), className: name }), err => {
      if (err)
         reject(err)
      else
         resolve(file)
   })
})
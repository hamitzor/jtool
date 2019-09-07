const fs = require('fs')
const path = require('path')
const templates = require('../config/templates.json')
const { formatTemplate } = require('./util')

module.exports = (dir, name, type, data) => new Promise((resolve, reject) => {
   fs.writeFile(path.resolve(dir, `${name}.json`), formatTemplate(templates[type], data), err => {
      if (err)
         reject(err)
      else
         resolve()
   })
})
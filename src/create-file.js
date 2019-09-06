const fs = require('fs')
const path = require('path')
const templates = require('../config/templates.json')
const { formatTemplate, extractPackageNameFromPath } = require('./util')

module.exports = (dir, name, type) => {
    const packageName = extractPackageNameFromPath(dir)
    fs.writeFileSync(path.resolve(dir, `${name}.java`), formatTemplate(templates[type], { packageName, className: name }))
}
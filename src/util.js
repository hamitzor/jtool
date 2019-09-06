exports.formatTemplate = (template, variables) => {
    Object.keys(variables).forEach(name => {
        template = template.replace(new RegExp(`{${name}}`, 'g'), variables[name])
    })
    return template
}

exports.extractPackageNameFromPath = path => {
    const dirs = path.split('/').reverse()
    const javaIndex = dirs.indexOf('java')
    let packageName = 'main'
    if (javaIndex !== -1 && dirs.indexOf('main') === javaIndex + 1) {
        packageName = dirs.slice(0, javaIndex).reverse().join('.')
    }
    return packageName
}
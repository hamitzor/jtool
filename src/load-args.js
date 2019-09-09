const yargs = require('yargs')
const controllers = require('./controllers')
const path = require('path')


yargs.command('create-project <project_name> <first_package> [first_class]', 'create a new project',
   yargs => {
      yargs
         .positional('project_name', {
            describe: 'name of the project. project directory will also have this name'
         })
         .positional('first_package', {
            describe: 'first package to be created',
            required: true
         })
         .positional('first_class', {
            describe: 'first class to be created',
            default: 'Main'
         })
   },
   argv => {
      console.info('Creating project...')
      controllers.createProject(argv.project_name, argv.first_package, argv.first_class)
         .then(name => console.info(`${name} created.`))
         .catch(err => console.error(err))
   }
)

yargs.command('create-class <class_name> [directory]', 'create a new class',
   yargs => {
      yargs
         .positional('class_name', {
            describe: 'name of the class.'
         })
         .positional('directory', {
            describe: 'directory to create class file in',
            default: '.'
         })
   },
   argv => {
      console.info('Creating class...')
      controllers.createJavaFile(argv.directory, argv.class_name)
         .then(file => console.info(`${path.relative(process.cwd(), file)} created.`))
   }
)

yargs.command('create-interface <interface_name> [directory]', 'create a new interface',
   yargs => {
      yargs
         .positional('interface_name', {
            describe: 'name of the interface.'
         })
         .positional('directory', {
            describe: 'directory to create interface file in',
            default: '.'
         })
   },
   argv => {
      console.info('Creating interface...')
      controllers.createJavaFile(argv.directory, argv.INTERFACE_NAME, 'interface')
         .then(file => console.info(`${path.relative(process.cwd(), file)} created.`))
   }
)

yargs.command('create-test-class <test_class_name> [directory]', 'create a new test class',
   yargs => {
      yargs
         .positional('test_class_name', {
            describe: 'name of the test class. example: if Main given MainTest is created.'
         })
         .positional('directory', {
            describe: 'directory to create class file in',
            default: '.'
         })
   },
   argv => {
      console.info('Creating class...')
      controllers.createJavaFile(argv.directory, argv.test_class_name + "Test", 'testClass')
         .then(file => console.info(`${path.relative(process.cwd(), file)} created.`))
   }
)

yargs.command('run-test <class_name>', 'run test class',
   yargs => {
      yargs
         .positional('class_name', {
            describe: 'name of the class. example: Main given MainTest class executed'
         })
   },
   argv => {
      controllers.runTest(argv.class_name)
         .catch(err => console.error(err))
   }
)

yargs.option('quiet', {
   alias: 'q',
   default: false
})

module.exports = yargs.argv
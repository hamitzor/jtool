const yargs = require('yargs')
const controllers = require('./controllers')
const path = require('path')


yargs.command('create-project <PROJECT_NAME> <FIRST_PACKAGE> [FIRST_CLASS]', 'create a new project',
   yargs => {
      yargs
         .positional('PROJECT_NAME', {
            describe: 'name of the project. project directory will also have this name'
         })
         .positional('FIRST_PACKAGE', {
            describe: 'first package to be created',
            required: true
         })
         .positional('FIRST_CLASS', {
            describe: 'first class to be created',
            default: 'Main'
         })
   },
   argv => {
      console.info('Creating project...')
      controllers.createProject(argv.PROJECT_NAME, argv.FIRST_PACKAGE, argv.FIRST_CLASS)
         .then(name => console.info(`${name} created.`))
         .catch(err => console.error(err))
   }
)

yargs.command('create-class <CLASS_NAME> [DIRECTORY]', 'create a new class',
   yargs => {
      yargs
         .positional('CLASS_NAME', {
            describe: 'name of the class.'
         })
         .positional('DIRECTORY', {
            describe: 'directory to create class file in',
            default: '.'
         })
   },
   argv => {
      console.info('Creating class...')
      controllers.createJavaFile(argv.DIRECTORY, argv.CLASS_NAME)
         .then(file => console.info(`${path.relative(process.cwd(), file)} created.`))
   }
)

yargs.command('create-interface <INTERFACE_NAME> [DIRECTORY]', 'create a new interface',
   yargs => {
      yargs
         .positional('INTERFACE_NAME', {
            describe: 'name of the interface.'
         })
         .positional('DIRECTORY', {
            describe: 'directory to create interface file in',
            default: '.'
         })
   },
   argv => {
      console.info('Creating interface...')
      controllers.createJavaFile(argv.DIRECTORY, argv.INTERFACE_NAME, 'interface')
         .then(file => console.info(`${path.relative(process.cwd(), file)} created.`))
   }
)

yargs.command('create-test-class <TEST_CLASS_NAME> [DIRECTORY]', 'create a new test class',
   yargs => {
      yargs
         .positional('TEST_CLASS_NAME', {
            describe: 'name of the test class. example: if Main given MainTest is created.'
         })
         .positional('DIRECTORY', {
            describe: 'directory to create class file in',
            default: '.'
         })
   },
   argv => {
      console.info('Creating class...')
      controllers.createJavaFile(argv.DIRECTORY, argv.TEST_CLASS_NAME + "Test", 'testClass')
         .then(file => console.info(`${path.relative(process.cwd(), file)} created.`))
   }
)

yargs.command('run-test <CLASS_NAME>', 'run test class',
   yargs => {
      yargs
         .positional('CLASS_NAME', {
            describe: 'name of the class. example: Main given MainTest class executed'
         })
   },
   argv => {
      controllers.runTest(argv.CLASS_NAME)
         .catch(err => console.error(err))
   }
)

yargs.option('quiet', {
   alias: 'q',
   default: false
})

module.exports = yargs.argv
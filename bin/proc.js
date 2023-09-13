const { spawn } = require('child_process');

// JavaScript code to be executed in the child process
const jsCode = `
const initCmd = require('../dist/lib/cmds/init');
const buildCmd = require('../dist/lib/cmds/build');
const Config = require('../dist/lib/config');

const certInfo = {
    fullName: 'weqe',
    organizationalUnit: 'qweqwe',
    organization: 'qwe',
    country: 'we',
    keyPassword: '123456',
    keystorePassword: '123456',
}

process.env['BUBBLEWRAP_KEYSTORE_PASSWORD'] = certInfo.keystorePassword;
process.env['BUBBLEWRAP_KEY_PASSWORD'] = certInfo.keyPassword;

const dd = async () => {
    const config = await Config.loadOrCreateConfig(undefined, undefined, undefined);
    const d = await initCmd.init({manifest: 'https://candles.gogagan.in/manifest.json', directory: "./build", certInfo}, config)
    const process = require('process')
    process.chdir('./build')
    console.log(process.cwd())
    await buildCmd.build(config, {})
}

dd();
`;

// Run the Node.js interpreter with the JavaScript code as an argument
const childProcess = spawn('node', ['-e', jsCode], { stdio: 'inherit' });

// Listen for when the child process exits
childProcess.on('exit', (code) => {
    console.log(process.cwd())
    if (code === 0) {
        console.log('Child process executed successfully.');
    } else {
        console.error(`Child process exited with code ${code}.`);
    }
});

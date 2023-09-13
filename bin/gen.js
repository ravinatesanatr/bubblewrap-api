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
    // const process = require('process')
    // process.chdir('./build')
    await buildCmd.build(config, {})
}

dd();

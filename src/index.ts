
const {init} = require('./lib/cmds/init')
const {build} = require('./lib/cmds/build')
const {loadOrCreateConfig} = require('./lib/config')

module.exports = {
    init, build, loadOrCreateConfig
};

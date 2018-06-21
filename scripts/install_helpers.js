#!/usr/bin/env node

const logger = require('./logger');
logger.setLogTag("react-native-launch-navigator[install_helpers]");
const path = require('path');
const exec = require('child_process').execSync;
const projectDirectory = path.resolve(process.cwd()+'/../..');

logger.debug("cwd="+projectDirectory);

helpers = {};


helpers.runCommand = function(command){
    let rnCommand = 'react-native '+command+' react-native-launch-navigator';
    logger.debug("command="+rnCommand);
    exec(rnCommand, {
        cwd: projectDirectory
    }, {stdio: 'inherit'});
    logger.debug("finished");
};

module.exports = helpers;
#!/usr/bin/env node
const logger = require('./logger');
logger.setLogTag("react-native-launch-navigator[postinstall]");

const helpers = require('./helpers');
if(!helpers.isOSX() || !helpers.hasiOSProject()) return logger.debug("Aborting as iOS env not detected");

const ios_helpers = require('./ios.link_helpers');
ios_helpers.podInstall();


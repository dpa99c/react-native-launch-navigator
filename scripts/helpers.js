/*********************
 * Module dependencies
 *********************/

const MODULE_NAME = "react-native-launch-navigator";

const path = require('path');
const fs = require('fs');

const logger = require('./logger');
logger.setLogTag(MODULE_NAME+"[helpers]");

/*********************
 * Private properties
 *********************/
let helpers = {};

let directory = {};
directory.scripts = path.join(__dirname);
directory.module = path.join(directory.scripts, '..');
directory.modules = path.join(directory.module, '..');
directory.project = path.join(directory.modules, '..');
directory.androidProject = path.join(directory.project, 'android');
directory.iosProject = path.join(directory.project, 'ios');

logger.debug("scripts=" + directory.scripts);
logger.debug("module=" + directory.module);
logger.debug("modules=" + directory.modules);
logger.debug("project="+directory.project);
logger.debug("androidProject="+directory.androidProject);
logger.debug("iosProject="+directory.iosProject);

helpers.directory = directory;


/*********************
 * Public properties
 *********************/

/*********************
 * Private functions
 *********************/


/*********************
 * Public functions
 *********************/
helpers.hasAndroidProject = function(){
    return !! directory.androidProject;
};

helpers.hasiOSProject = function(){
    return !! directory.iosProject;
};

helpers.isOSX = function(){
    return process.platform === "darwin";
};

helpers.isWindows = function(){
    return /^win/.test(process.platform);
};


module.exports = helpers;

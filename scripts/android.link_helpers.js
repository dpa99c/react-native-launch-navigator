/*********************
 * Module dependencies
 *********************/

const MODULE_NAME = "react-native-launch-navigator";

const path = require('path');
const fs = require('fs');

const logger = require('./logger');
logger.setLogTag(MODULE_NAME+"[android_link_helpers]");

/*********************
 * Private properties
 *********************/
let helpers = {};

const scriptsDirectory = path.join(__dirname);
const moduleDirectory = path.join(scriptsDirectory, '..');
const modulesDirectory = path.join(moduleDirectory, '..');
const projectDirectory = path.join(modulesDirectory, '..');
const sourceDirectory = path.join(projectDirectory, 'android');
const gradleSettingsFilepath = path.join(sourceDirectory, 'settings.gradle');

logger.debug("scriptsDirectory=" + scriptsDirectory);
logger.debug("moduleDirectory=" + moduleDirectory);
logger.debug("modulesDirectory=" + modulesDirectory);
logger.debug("projectDirectory="+projectDirectory);
logger.debug("sourceDirectory="+sourceDirectory);


/*********************
 * Public properties
 *********************/

/*********************
 * Private functions
 *********************/


/*********************
 * Public functions
 *********************/
helpers.isLinked = function(){
    let gradleSettings = fs.readFileSync(gradleSettingsFilepath, 'utf-8');
    let isLinked = !!gradleSettings.match(MODULE_NAME);
    logger.debug("is already linked: "+isLinked);
    return isLinked;
};


module.exports = helpers;
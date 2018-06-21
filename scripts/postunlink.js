#!/usr/bin/env node
const helpers = require('./link_helpers');
const logger = require('./logger');
logger.setLogTag("react-native-launch-navigator[postunlink]");

logger.debug("running");
let schemesToRemove, tempFile;
if(helpers.moduleJsonExists(helpers.tempFileName)){
    tempFile = helpers.readModuleJson(helpers.tempFileName);
    schemesToRemove = tempFile.schemes;
}else{
    schemesToRemove = helpers.plist.LSApplicationQueriesSchemes;
}

if(!schemesToRemove || schemesToRemove.length === 0 || !Array.isArray(helpers.plist.LSApplicationQueriesSchemes) || helpers.plist.LSApplicationQueriesSchemes.length === 0){
    logger.log("No target query schemes to remove from project plist");
    return;
}

// Remove from plist
for(let scheme of schemesToRemove){
    const idx = helpers.plist.LSApplicationQueriesSchemes.indexOf(scheme);
    if(idx !== -1){
        helpers.plist.LSApplicationQueriesSchemes.splice(idx, 1);
    }
}

if (helpers.plist.LSApplicationQueriesSchemes.length === 0) {
    delete helpers.plist.LSApplicationQueriesSchemes;
}
helpers.writePlist(helpers.plist);
logger.log("Removed target query schemes from project plist");

// Remove temp file
if(tempFile) {
    helpers.removeModuleJson(helpers.tempFileName);
}
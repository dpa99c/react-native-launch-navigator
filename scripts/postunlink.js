#!/usr/bin/env node
const logger = require('./logger');
logger.setLogTag("react-native-launch-navigator[postunlink]");

const helpers = require('./helpers');
if(!helpers.isOSX() || !helpers.hasiOSProject()) return logger.debug("Aborting as iOS env not detected");

const ios_helpers = require('./ios.link_helpers');

logger.debug("running");
let schemesToRemove, tempFile;
if(ios_helpers.moduleJsonExists(ios_helpers.tempFileName)){
    tempFile = ios_helpers.readModuleJson(ios_helpers.tempFileName);
    schemesToRemove = tempFile.schemes;
}else{
    schemesToRemove = ios_helpers.plist.LSApplicationQueriesSchemes;
}

if(!schemesToRemove || schemesToRemove.length === 0 || !Array.isArray(ios_helpers.plist.LSApplicationQueriesSchemes) || ios_helpers.plist.LSApplicationQueriesSchemes.length === 0){
    logger.log("No target query schemes to remove from project plist");
    return;
}

// Remove from plist
for(let scheme of schemesToRemove){
    const idx = ios_helpers.plist.LSApplicationQueriesSchemes.indexOf(scheme);
    if(idx !== -1){
        ios_helpers.plist.LSApplicationQueriesSchemes.splice(idx, 1);
    }
}

if (ios_helpers.plist.LSApplicationQueriesSchemes.length === 0) {
    delete ios_helpers.plist.LSApplicationQueriesSchemes;
}
ios_helpers.writePlist(ios_helpers.plist);
logger.log("Removed target query schemes from project plist");

// Remove temp file
if(tempFile) {
    ios_helpers.removeModuleJson(ios_helpers.tempFileName);
}

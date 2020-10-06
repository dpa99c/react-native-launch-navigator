#!/usr/bin/env node
const logger = require('./logger');
logger.setLogTag("react-native-launch-navigator[postlink]");

const helpers = require('./helpers');
if(!helpers.isOSX() || !helpers.hasiOSProject()) return logger.debug("Aborting as iOS env not detected");


const ios_helpers = require('./ios.link_helpers');

logger.debug("running");
const packageJson = ios_helpers.readModuleJson('package.json');
const sourceQuerySchemes = packageJson.iosQuerySchemes;
const currentQuerySchemes = ios_helpers.plist.LSApplicationQueriesSchemes || [];
let targetQuerySchemes = [];

for(let scheme of sourceQuerySchemes){
    if(!currentQuerySchemes.includes(scheme)){
        targetQuerySchemes.push(scheme);
    }
}

if(targetQuerySchemes.length === 0){
    logger.log("All target query schemes already exist in project plist");
    return;
}

// Add to plist
if(!ios_helpers.plist.LSApplicationQueriesSchemes) ios_helpers.plist.LSApplicationQueriesSchemes = [];
for(let scheme of targetQuerySchemes){
    ios_helpers.plist.LSApplicationQueriesSchemes.push(scheme);
}
ios_helpers.writePlist(ios_helpers.plist);

// Record added schemes in temp file
const tempFileContents = {schemes: targetQuerySchemes};
ios_helpers.writeModuleJson(ios_helpers.tempFileName, tempFileContents);
logger.log("Added target queryschemes to project plist");

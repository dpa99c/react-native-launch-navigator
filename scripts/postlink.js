#!/usr/bin/env node
const helpers = require('./link_helpers');
const logger = require('./logger');
logger.setLogTag("react-native-launch-navigator[postlink]");

logger.debug("running");
const packageJson = helpers.readModuleJson('package.json');
const sourceQuerySchemes = packageJson.rnpm.iosQuerySchemes;
const currentQuerySchemes = helpers.plist.LSApplicationQueriesSchemes || [];
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
if(!helpers.plist.LSApplicationQueriesSchemes) helpers.plist.LSApplicationQueriesSchemes = [];
for(let scheme of targetQuerySchemes){
    helpers.plist.LSApplicationQueriesSchemes.push(scheme);
}
helpers.writePlist(helpers.plist);

// Record added schemes in temp file
const tempFileContents = {schemes: targetQuerySchemes};
helpers.writeModuleJson(helpers.tempFileName, tempFileContents);
logger.log("Added target queryschemes to project plist");
#!/usr/bin/env node

const helpers = require('./install_helpers');
const ios_helpers = require('./ios.link_helpers');
const android_helpers = require('./android.link_helpers');
const LOG_TAG = "react-native-launch-navigator: ";

if(ios_helpers.isLinked() || android_helpers.isLinked()){
    console.log(LOG_TAG+"auto-unlinking");
    helpers.runCommand("unlink");
}else{
    console.log(LOG_TAG+"skipping auto-unlinking (not linked)");
}
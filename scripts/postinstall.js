#!/usr/bin/env node

const ios_helpers = require('./ios.link_helpers');

// Install Pods
console.log("react-native-launch-navigator: pod install");
ios_helpers.podInstall();
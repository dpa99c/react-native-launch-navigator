/**
 * @providesModule react-native-launch-navigator
 * @flow
 */
'use strict';

import {Platform, NativeModules} from 'react-native';
import RNLogger from './RNLogger';

let ln;
if(Platform.OS === "ios"){
    ln = require('./ios');
}else if(Platform.OS === "android"){
    ln = require('./android');
}else{
    throw "Unsupported platform: " + Platform.OS;
}


/*********************
 * Internal properties
 *********************/
let RNLaunchNavigator = NativeModules.RNLaunchNavigator;
let Logger = new RNLogger(RNLaunchNavigator);

/********************
 * Internal functions
 ********************/


/******************
 * Public API
 ******************/
ln.enableDebug = RNLaunchNavigator.enableDebug;

/**
 * Returns a list indicating which apps are installed and available on the current device.
 * @return {Promise}
 * resolve - Will be passed a key/value object where the key is the app name and the value is a boolean indicating whether the app is available.
 * reject - Will be passed a single string argument containing the error message.
 */
ln.getAvailableApps = function(){
    return RNLaunchNavigator.getAvailableApps();
};

/**
 * Determines if the given app is installed and available on the current device.
 * @param {string} appName - name of the app to check availability for. Define as a constant using ln.APP
 * @return {Promise}
 * resolve - Will be passed a single boolean argument indicating the availability of the app.
 * reject - Will be passed a single string argument containing the error message.
 */
ln.isAppAvailable = function(appName){
    return RNLaunchNavigator.isAppAvailable(appName);
};

/**
 * Returns the display name of the specified app.
 * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
 * @return {string} - app display name. e.g. "Google Maps".
 */
ln.getAppDisplayName = function(app){
    ln.util.validateApp(app);
    return ln.APP_NAMES[app];
};

/**
 * Returns list of supported apps on a given platform.
 * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.IOS`.
 * @return {string[]} - apps supported on specified platform as a list of `launchnavigator.APP` constants.
 */
ln.getAppsForPlatform = function(platform){
    ln.util.validatePlatform(platform);
    return ln.APPS_BY_PLATFORM[platform];
};



/**
 * Indicates if an app on a given platform supports specification of launch mode.
 * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
 * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.ANDROID`.
 * @return {boolean} - true if app/platform combination supports specification of transport mode.
 */
ln.supportsLaunchMode = function(app, platform) {
    ln.util.validateApp(app);
    ln.util.validatePlatform(platform);
    return !!ln.SUPPORTS_LAUNCH_MODE[platform] && ln.util.arrayContainsValue(ln.SUPPORTS_LAUNCH_MODE[platform], app);
};


/**
 * Indicates if an app on a given platform supports specification of a custom nickname for start location.
 * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
 * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.IOS`.
 * @return {boolean} - true if app/platform combination supports specification of start location.
 */
ln._supportsStartName = function(app, platform){
    ln.util.validateApp(app);
    ln.util.validatePlatform(platform);
    return !!ln.SUPPORTS_START_NAME[platform] && ln.util.arrayContainsValue(ln.SUPPORTS_START_NAME[platform], app);
};

/**
 * Indicates if an app on a given platform supports specification of start location.
 * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
 * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.IOS`.
 * @return {boolean} - true if app/platform combination supports specification of start location.
 */
ln._supportsStart = function(app, platform){
    ln.util.validateApp(app);
    ln.util.validatePlatform(platform);
    return !!ln.SUPPORTS_START[platform] && ln.util.arrayContainsValue(ln.SUPPORTS_START[platform], app);
};

/**
 * Indicates if an app on a given platform supports specification of a custom nickname for destination location.
 * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
 * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.IOS`.
 * @return {boolean} - true if app/platform combination supports specification of destination location.
 */
ln._supportsDestName = function(app, platform){
    ln.util.validateApp(app);
    ln.util.validatePlatform(platform);
    return !!ln.SUPPORTS_DEST_NAME[platform] && ln.util.arrayContainsValue(ln.SUPPORTS_DEST_NAME[platform], app);
};

/**
 * Indicates if an app on a given platform supports specification of transport mode.
 * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
 * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.IOS`.
 * @return {boolean} - true if app/platform combination supports specification of transport mode.
 */
ln._supportsTransportMode = function(app, platform){
    ln.util.validateApp(app);
    ln.util.validatePlatform(platform);
    return !!ln.TRANSPORT_MODES[platform] && ln.util.objectContainsKey(ln.TRANSPORT_MODES[platform], app);
};

/*******************
 * Utility functions
 *******************/
ln.util = {};
ln.util.arrayContainsValue = function (a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
};

ln.util.objectContainsKey = function (o, key) {
    for(var k in o){
        if(k === key){
            return true;
        }
    }
    return false;
};

ln.util.objectContainsValue = function (o, value) {
    for(var k in o){
        if(o[k] === value){
            return true;
        }
    }
    return false;
};

ln.util.countKeysInObject = function (o){
    var count = 0;
    for(var k in o){
        count++;
    }
    return count;
};

ln.util.isValidApp = function(app){
    if(app === "none") return true; // native chooser
    return ln.util.objectContainsValue(ln.APP, app);
};

ln.util.isValidPlatform = function(platform){
    return ln.util.objectContainsValue(ln.PLATFORM, platform);
};

ln.util.isValidTransportMode = function(transportMode) {
    return ln.util.objectContainsValue(ln.TRANSPORT_MODE, transportMode);
};

ln.util.validateApp = function(app){
    if(!ln.util.isValidApp(app)){
        throw new Error("'"+app+"' is not a recognised app");
    }
};

ln.util.validatePlatform = function(platform){
    if(!ln.util.isValidPlatform(platform)){
        throw new Error("'"+platform+"' is not a recognised platform");
    }
};

ln.util.validateTransportMode = function(transportMode){
    if(!ln.util.isValidTransportMode(transportMode)){
        throw new Error("'"+transportMode+"' is not a recognised transport mode");
    }
};

ln.util.extractCoordsFromLocationString = function(location){
    if(location && typeof(location) === "string" && location.match(ln.COORDS_REGEX)){
        location = location.replace(/\s*/g,'');
        var parts = location.split(",");
        location = [parts[0], parts[1]];
    }
    return location;
};

ln.util.isValidLaunchMode = function(launchMode){
    for(var LAUNCH_MODE in ln.LAUNCH_MODE){
        if(launchMode === ln.LAUNCH_MODE[LAUNCH_MODE]) return true;
    }
    return false;
};

ln.util.validateLaunchMode = function(launchMode){
    if(!ln.util.isValidLaunchMode(launchMode)){
        throw new Error("'"+launchMode+"' is not a recognised launch mode");
    }
};

ln.util.conformNavigateOptions = function(args){
    var options;
    if(args.length > 1 && typeof args[1] === "function"){
        // assume (dest, success, error, opts)
        options = (args.length > 3 && typeof args[3] === "object") ? args[3] : {};
        options.successCallback = args[1];
        if(args.length > 2 && typeof args[2] === "function"){
            options.errorCallback = args[2];
        }
    }else{
        // assume (dest, opts)
        options = (args.length > 1 && typeof args[1] === "object") ? args[1] : {};
    }
    return options;
};

module.exports = ln;
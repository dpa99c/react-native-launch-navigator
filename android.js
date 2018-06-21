'use strict';

import {NativeModules} from 'react-native';
let ln = require('./constants');

/*********************
 * Internal properties
 *********************/
let RNLaunchNavigator = NativeModules.RNLaunchNavigator;

/******************
 * Public Constants
 ******************/

/**
 * Launch modes supported by Google Maps on Android
 * @type {object}
 */
ln.LAUNCH_MODE = {
    MAPS: "maps",
    TURN_BY_TURN: "turn-by-turn",
    GEO: "geo"
};

// Add the Android-specific option to pass in for geo: protocol, letting the native app chooser decide.
ln.APP.GEO = "geo";
ln.SUPPORTS_DEST_NAME[ln.PLATFORM.ANDROID].push(ln.APP.GEO);
ln.APPS_BY_PLATFORM[ln.PLATFORM.ANDROID].splice(1, 0, ln.APP.GEO); //insert at [1] below [User select]
ln.APP_NAMES[ln.APP.GEO] = "Other navigation apps";

/********************
 * Internal functions
 ********************/
var _constructor = function () {
    discoverGeoApps();
};

// Add apps that support the geo: protocol
var discoverGeoApps = function (){
    RNLaunchNavigator.getGeoApps().then((supportedApps) => {
        for(var appName in supportedApps){
            var packageName = supportedApps[appName];
            ln.APP[appName.toUpperCase().replace(" ","_")] = packageName;
            ln.APP_NAMES[packageName] = appName;
            ln.APPS_BY_PLATFORM[ln.PLATFORM.ANDROID].push(packageName);
            ln.SUPPORTS_DEST_NAME[ln.PLATFORM.ANDROID].push(packageName);
        }
    });
};

/******************
 * Public API
 ******************/


/**
 * Opens navigator app to navigate to given destination, specified by either place name or lat/lon.
 * If a start location is not also specified, current location will be used for the start.
 *
 * @param {string/number[]} destination (required) - destination location to use for navigation.
 * Either:
 * - a {string} containing the address. e.g. "Buckingham Palace, London"
 * - an {array}, where the first element is the latitude and the second element is a longitude, as decimal numbers. e.g. [50.1, -4.0]
 *
 * @param {object} options (optional) - optional parameters:
 *
 * - {string} app - navigation app to use for directions, as a constant. e.g. LaunchNavigator.APP.WAZE
 * If not specified, defaults to Google Maps.
 *
 * - {string} destinationName - nickname to display in app for destination. e.g. "Bob's House".
 *
 * - {mixed} start - start location to use for navigation. If not specified, the current location of the device will be used.
 * Either:
 *      - a {string} containing the address. e.g. "Buckingham Palace, London"
 *      - a {string} containing a latitude/longitude coordinate. e.g. "50.1. -4.0"
 *      - an {array}, where the first element is the latitude and the second element is a longitude, as decimal numbers. e.g. [50.1, -4.0]
 *
 * - {string} startName - nickname to display in app for start. e.g. "My Place".
 *
 * - {string} transportMode - transportation mode for navigation.
 * Can only be specified if navigationMode == "turn-by-turn".
 * Accepted values are "driving", "walking", "bicycling" or "transit".
 * Defaults to "driving" if not specified.
 *
 * - {string} launchMode - mode in which to open Google Maps app:
 *   - `LaunchNavigator.LAUNCH_MODE.MAPS` or `LaunchNavigator.LAUNCH_MODE.TURN_BY_TURN`
 *   - Defaults to `LaunchNavigator.LAUNCH_MODE.MAPS` if not specified.
 *
 * - {object} extras - a key/value map of extra app-specific parameters. For example, to tell Google Maps to display Satellite view in "maps" launch mode: `{"t": "k"}`
 *
 * - {string} appSelectionDialogHeader - text to display in the native picker which enables user to select which navigation app to launch.
 * Defaults to "Select app for navigation" if not specified.
 *
 * - {string} appSelectionCancelButton - text to display for the cancel button in the native picker which enables user to select which navigation app to launch.
 * Defaults to "Cancel" if not specified.
 *
 * - {array} appSelectionList - list of apps, defined as `LaunchNavigator.APP` constants, which should be displayed in the picker if the app is available.
 * This can be used to restrict which apps are displayed, even if they are installed. By default, all available apps will be displayed.
 *
 * - {boolean} enableGeocoding - if true, and input location type(s) doesn't match those required by the app, use geocoding to obtain the address/coords as required. Defaults to true.
 *
 * @return Promise
 * resolve - invoke when the navigation app is successfully launched.
 * reject - if an error is encountered while launching the app.
 * A single string argument containing the error message will be passed.
 */
ln.navigate = function(destination, options) {
    options = ln.util.conformNavigateOptions(arguments);

    var dType, sType = "none";

    // Input validation
    var throwError = function(errMsg){
        throw new Error(errMsg);
    };

    if(!destination){
        throwError("No destination was specified");
    }

    if(options.extras && typeof  options.extras !== "object"){
        throwError("'options.extras' must be a key/value object");
    }

    options.enableGeocoding = typeof options.enableGeocoding !== "undefined" ? options.enableGeocoding : true;

    destination = ln.util.extractCoordsFromLocationString(destination);
    if(typeof(destination) === "object"){
        if(typeof destination.length === "undefined") throw "destination must be a string or an array";
        dType = "pos";
    }else{
        dType = "name";
    }

    if(options.start){
        options.start = ln.util.extractCoordsFromLocationString(options.start);
        if(typeof(options.start) === "object"){
            if(typeof options.start.length === "undefined") throw "start must be a string or an array";
            sType = "pos";
        }else{
            sType = "name";
        }
    }

    var transportMode = null;
    if(options.transportMode){
        ln.util.validateTransportMode(options.transportMode);
        transportMode = options.transportMode.charAt(0);
    }

    // Default to Google Maps if not specified
    if(!options.app) options.app = ln.APP.GOOGLE_MAPS;
    ln.util.validateApp(options.app);

    if(!options.launchMode) options.launchMode = ln.LAUNCH_MODE.MAPS;
    ln.util.validateLaunchMode(options.launchMode);

    if(options.extras) options.extras = JSON.stringify(options.extras);

    return RNLaunchNavigator.navigate({
        app: options.app,
        dType: dType,
        dest: destination,
        destNickname: options.destinationName,
        sType: sType,
        start: options.start,
        startNickname: options.startName,
        transportMode: transportMode,
        launchMode: options.launchMode,
        extras: options.extras,
        enableGeocoding: options.enableGeocoding
    });
};


/**
 * Indicates if an app on a given platform supports specification of transport mode.
 * Android-specific implementation supports additional specification of launch mode.
 * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
 * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
 * @param {string} launchMode (optional) - only applies to Google Maps on Android. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.
 * @return {boolean} - true if app/platform combination supports specification of transport mode.
 */
ln.supportsTransportMode = function(app, platform, launchMode){
    ln.util.validateApp(app);
    ln.util.validatePlatform(platform);

    var result;
    if(launchMode && platform === ln.PLATFORM.ANDROID && app === ln.APP.GOOGLE_MAPS){
        ln.util.validateLaunchMode(launchMode);
        result = launchMode === ln.LAUNCH_MODE.TURN_BY_TURN;
    }else{
        result = ln._supportsTransportMode(app, platform);
    }
    return result;
};

/**
 * Returns the list of transport modes supported by an app on a given platform.
 * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
 * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
 * @param {string} launchMode (optional) - only applies to Google Maps on Android. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.
 * @return {string[]} - list of transports modes as constants in `LaunchNavigator.TRANSPORT_MODE`.
 * If app/platform combination doesn't support specification of transport mode, the list will be empty;
 */
ln.getTransportModes = function(app, platform, launchMode){
    if(ln.supportsTransportMode(app, platform, launchMode)){
        return ln.TRANSPORT_MODES[platform][app];
    }
    return [];
};

/**
 * Indicates if an app on a given platform supports specification of start location.
 * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
 * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
 * @param {string} launchMode (optional) - only applies to Google Maps on Android. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.
 * @return {boolean} - true if app/platform combination supports specification of start location.
 */
ln.supportsStart = function(app, platform, launchMode){
    ln.util.validateApp(app);
    ln.util.validatePlatform(platform);

    let result;
    if(launchMode && platform === ln.PLATFORM.ANDROID && app === ln.APP.GOOGLE_MAPS){
        ln.util.validateLaunchMode(launchMode);
        result = launchMode === ln.LAUNCH_MODE.MAPS;
    }else{
        result = ln._supportsStart(app, platform);
    }
    return result;
};


/**
 * Indicates if an app on a given platform supports specification of a custom nickname for destination location.
 * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
 * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
 * @param {string} launchMode (optional) - only applies to Google Maps on Android. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.
 * @return {boolean} - true if app/platform combination supports specification of destination location.
 */
ln.supportsDestName = function(app, platform, launchMode){
    ln.util.validateApp(app);
    ln.util.validatePlatform(platform);
    let result;
    if(launchMode && platform === ln.PLATFORM.ANDROID && app === ln.APP.GOOGLE_MAPS){
        ln.util.validateLaunchMode(launchMode);
        result = launchMode === ln.LAUNCH_MODE.GEO;
    }else{
        result = ln._supportsDestName(app, platform);
    }
    return result;
};

// Map directly to public API
ln.supportsStartName = function() {
    ln._supportsStartName.apply(this, arguments);
};

/************
 * Bootstrap
 ************/
_constructor();

/************
 * Export
 ************/
module.exports = ln;
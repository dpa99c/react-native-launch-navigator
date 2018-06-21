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

// Launch modes for Apple Maps
ln.LAUNCH_MODE = {
    URI_SCHEME: "uri_scheme",
    MAPKIT: "mapkit"
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
 * If not specified, defaults to Apple Maps.
 *
 * - {string} destinationName - nickname to display in app for destination. e.g. "Bob's House".
 *
 * - {mixed} start - start location to use for navigation. If not specified, the current location of the device will be used.
 * Either:
 *      - a {string} containing the address. e.g. "Buckingham Palace, London"
 *      - an {array}, where the first element is the latitude and the second element is a longitude, as decimal numbers. e.g. [50.1, -4.0]
 *
 * - {string} startName - nickname to display in app for start. e.g. "My Place".
 *
 * - {string} transportMode - transportation mode for navigation.
 * Defaults to "driving" if not specified.
 *
 * - {string} launchMode - method to use to open Apple Maps app:
 *   - `LaunchNavigator.LAUNCH_MODE.URI_SCHEME` or `LaunchNavigator.MAPKIT`
 *   - Defaults to `LaunchNavigator.LAUNCH_MODE.URI_SCHEME` if not specified.
 *
 * - {object} extras - a key/value map of extra app-specific parameters. For example, to tell Google Maps to display Satellite view in "maps" launch mode: `{"t": "k"}`
 *
 * - {boolean} enableGeocoding - if true, and input location type(s) doesn't match those required by the app, use geocoding to obtain the address/coords as required. Defaults to TRUE.
 *
 * @return Promise
 * resolve - invoke when the navigation app is successfully launched.
 * reject - if an error is encountered while launching the app.
 * A single string argument containing the error message will be passed.
 */
ln.navigate = function(destination, options) {
    options = ln.util.conformNavigateOptions(arguments);

    // Set defaults
    options.transportMode = options.transportMode ? options.transportMode : ln.TRANSPORT_MODE.DRIVING;
    options.enableGeocoding = typeof options.enableGeocoding !== "undefined" ? options.enableGeocoding : true;
    options.launchMode = typeof options.launchMode !== "undefined" ? options.launchMode : ln.LAUNCH_MODE.URI_SCHEME;

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
    if(options.extras) options.extras = JSON.stringify(options.extras);

    // Default to Apple Maps if not specified
    if(!options.app) options.app = ln.APP.APPLE_MAPS;
    ln.util.validateApp(options.app);
    ln.util.validateTransportMode(options.transportMode);

    // Process options
    destination = ln.util.extractCoordsFromLocationString(destination);
    if(typeof(destination) === "object"){
        if(typeof destination.length === "undefined") throw "destination must be a string or an array";
        destination = destination.join(",");
        options.destType = "coords";
    }else{
        options.destType = "name";
    }

    options.start = ln.util.extractCoordsFromLocationString(options.start);
    if(!options.start){
        options.startType = "none";
    }else if(typeof(options.start) === "object"){
        if(typeof options.start.length === "undefined") throw "start must be a string or an array";
        options.start = options.start.join(",");
        options.startType = "coords";
    }else{
        options.startType = "name";
    }

    return RNLaunchNavigator.navigate({
        appName: options.app,
        destType: options.destType,
        dest: destination,
        destName: options.destinationName,
        startType: options.startType,
        start: options.start,
        startName: options.startName,
        transportMode: options.transportMode,
        launchMode: options.launchMode,
        extras: options.extras,
        enableGeocoding: options.enableGeocoding
    });

};

/**
 * Returns the list of transport modes supported by an app on a given platform.
 * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
 * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
 * @return {string[]} - list of transports modes as constants in `LaunchNavigator.TRANSPORT_MODE`.
 * If app/platform combination doesn't support specification of transport mode, the list will be empty;
 */
ln.getTransportModes = function(app, platform){
    if(ln.supportsTransportMode(app, platform)){
        return ln.TRANSPORT_MODES[platform][app];
    }
    return [];
};

/**
 * Indicates if an app on a given platform supports specification of a custom nickname for destination location.
 * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.APPLE_MAPS`.
 * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
 * @param {string} launchMode (optional) - only applies to Apple Maps on iOS. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPKIT`.
 * @return {boolean} - true if app/platform combination supports specification of destination location.
 */
ln.supportsDestName = function(app, platform, launchMode){
    ln.util.validateApp(app);
    ln.util.validatePlatform(platform);
    let result;
    if(launchMode && platform === ln.PLATFORM.IOS && app === ln.APP.APPLE_MAPS){
        ln.util.validateLaunchMode(launchMode);
        result = launchMode === ln.LAUNCH_MODE.MAPKIT;
    }else{
        result = ln._supportsDestName(app, platform);
    }
    return result;
};


/**
 * Indicates if an app on a given platform supports specification of a custom nickname for start location.
 * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.APPLE_MAPS`.
 * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g.
 * @param {string} launchMode (optional) - only applies to Apple Maps on iOS. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPKIT`.
 * @return {boolean} - true if app/platform combination supports specification of start location.
 */
ln.supportsStartName = function(app, platform, launchMode){
    ln.util.validateApp(app);
    ln.util.validatePlatform(platform);
    let result;
    if(launchMode && platform === ln.PLATFORM.IOS && app === ln.APP.APPLE_MAPS){
        ln.util.validateLaunchMode(launchMode);
        result = launchMode === ln.LAUNCH_MODE.MAPKIT;
    }else{
        result = ln._supportsStartName(app, platform);
    }
    return result;
};

// Map directly to public API
ln.supportsStart = function() {
    return ln._supportsStart.apply(this, arguments);
};
ln.supportsTransportMode = function() {
    return ln._supportsTransportMode.apply(this, arguments);
};

/************
 * Export
 ************/
module.exports = ln;
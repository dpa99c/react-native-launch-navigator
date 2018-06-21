// Type definitions for react-native-launch-navigator
// Project: https://github.com/dpa99c/react-native-launch-navigator
// Definitions by: Dave Alden <https://github.com/dpa99c>
// Usage: import { LaunchNavigator, LaunchNavigatorOptions } from 'react-native-launch-navigator';

export interface LaunchNavigatorOptions {

    /**
     * name of the navigation app to use for directions.
     * Specify using LaunchNavigator.APP constants.
     * e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
     */
    app?: string;

    /**
     * nickname to display in app for destination. e.g. "Bob's House".
     */
    destinationName?: string;

    /**
     * Start point of the navigation.
     * If not specified, the current device location will be used.
     * Either:
     *  - a {string} containing the address. e.g. "Buckingham Palace, London"
     *  - a {string} containing a latitude/longitude coordinate. e.g. "50.1. -4.0"
     *  - an {array}, where the first element is the latitude and the second element is a longitude, as decimal numbers. e.g. [50.1, -4.0]
     */
    start?: string | number[];

    /**
     * nickname to display in app for start . e.g. "My House".
     */
    startName?: string;

    /**
     * Transportation mode for navigation: "driving", "walking" or "transit". Defaults to "driving" if not specified.
     */
    transportMode?: string;

    /**
     * Android: mode in which to open Google Maps app.
     * `LaunchNavigator.LAUNCH_MODE.MAPS` or `LaunchNavigator.LAUNCH_MODE.TURN_BY_TURN`
     * Defaults to `LaunchNavigator.LAUNCH_MODE.MAPS` if not specified.
     * 
     * iOS: method to use to open Apple Maps app.
     * `LaunchNavigator.LAUNCH_MODE.URI_SCHEME` or `LaunchNavigator.LAUNCH_MODE.MAPKIT`
     * Defaults to `LaunchNavigator.LAUNCH_MODE.URI_SCHEME` if not specified.
     */
    launchMode?: string;

    /**
     * a key/value map of extra app-specific parameters. For example, to tell Google Maps on Android to display Satellite view in "maps" launch mode: `{"t": "k"}`
     */
    extras?: any;

    /**
     * If true, and input location type(s) doesn't match those required by the app, use geocoding to obtain the address/coords as required. Defaults to true.
     */
    enableGeocoding?: boolean;
}

export interface LaunchNavigator {

    /**
     * Supported platforms
     */
    PLATFORM: any;

    /**
     * string constants, used to identify apps in native code
     */
    APP: any;

    /**
     * All possible transport modes
     */
    TRANSPORT_MODE: any;

    /**
     * Launch modes supported by Google Maps on Android
     */
    LAUNCH_MODE: any;


    /**
     * Launches navigator app
     * @param destination {string|number[]} Location name or coordinates (as string or array)
     * Either:
     * - a {string} containing the address. e.g. "Buckingham Palace, London"
     * - a {string} containing a latitude/longitude coordinate. e.g. "50.1. -4.0"
     * - an {array}, where the first element is the latitude and the second element is a longitude, as decimal numbers. e.g. [50.1, -4.0]
     * @param options {LaunchNavigatorOptions}
     * @return Promise
     * - resolved when the navigation app is successfully launched
     * - rejected if an error is encountered while launching the app. Will be passed a single string argument containing the error message.
     */
    navigate: (
        destination: string | number[], 
        options?: LaunchNavigatorOptions
    ) => Promise;
    
    logEvent: (name: string, params?: any, valueToSum?: number) => void;

    /**
     * Determines if the given app is installed and available on the current device.
     * @param app {string} appName - name of the app to check availability for. Define as a constant using `LaunchNavigator.APP`.
     * @return {boolean} - indicates the availability of the specified app.
     */
    isAppAvailable: (
        app: string
    ) => boolean;

    /**
     * Returns a list indicating which apps are installed and available on the current device.
     * @return {object} - a key/value object where the key is the app name as a constant in `LaunchNavigator.APP` and the value is a boolean indicating whether the app is available.
     */
    getAvailableApps: () => object;

    /**
     * Returns the display name of the specified app.
     * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
     * @return {string} - app display name. e.g. "Google Maps".
     */
    getAppDisplayName: (app: string) => string;

    /**
     * Returns list of supported apps on a given platform.
     * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
     * @return {array} - apps supported on specified platform as a list of `LaunchNavigator.APP` constants.
     */
    getAppsForPlatform: (platform: string) => string[];

    /**
     * Indicates if an app on a given platform supports specification of transport mode.
     * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
     * @param {string} launchMode - (optional) Only applies to Google Maps on Android. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.
     * @return {boolean} - true if app/platform combination supports specification of transport mode.
     */
    supportsTransportMode: (
        app: string,
        platform: string,
        launchMode?: string
    ) => boolean;

    /**
     * Returns the list of transport modes supported by an app on a given platform.
     * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
     * @param {string} launchMode - (optional) Only applies to Google Maps on Android. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.
     * @return {array} - list of transports modes as constants in `LaunchNavigator.TRANSPORT_MODE`.
     * If app/platform combination doesn't support specification of transport mode, the list will be empty;
     */
    getTransportModes: (
        app: string,
        platform: string,
        launchMode?: string
    ) => string[];

    /**
     * Indicates if an app on a given platform supports specification of launch mode.
     * Note that currently only Google Maps on Android does.
     * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.ANDROID`.
     * @return {boolean} - true if app/platform combination supports specification of transport mode.
     */
    supportsLaunchMode: (
        app: string,
        platform: string
    ) => boolean;

    /**
     * Indicates if an app on a given platform supports specification of start location.
     * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
     * @param {string} launchMode - (optional) Only applies to Google Maps on Android. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.
     * @return {boolean} - true if app/platform combination supports specification of start location.
     */
    supportsStart: (
        app: string,
        platform: string,
        launchMode?: string
    ) => boolean;

    /**
     * Indicates if an app on a given platform supports specification of a custom nickname for start location.
     * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
     * @param {string} launchMode - (optional) Only applies to Apple Maps on iOS. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPKIT`.
     * @return {boolean} - true if app/platform combination supports specification of start location.
     */
    supportsStartName: (
        app: string,
        platform: string,
        launchMode?: string
    ) => boolean;

    /**
     * Indicates if an app on a given platform supports specification of a custom nickname for destination location.
     * @param {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
     * @param {string} launchMode - (optional) Applies to Google Maps on Android and Apple Maps on iOS. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.
     * @return {boolean} - true if app/platform combination supports specification of destination location.
     */
    supportsDestName: (
        app: string,
        platform: string,
        launchMode?: string
    ) => boolean;

    /**
     * Enables debug log output from the plugin to the JS and native consoles. By default debug is disabled.
     * @param enabled {boolean}
     */
    enableDebug: (
        enabled: boolean
    ) => void;
}
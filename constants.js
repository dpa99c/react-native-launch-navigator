'use strict';

/*********************
 * Internal properties
 *********************/
let ln = {};

/******************
 * Public Constants
 ******************/

/**
 * Supported platforms
 * @type {object}
 */
ln.PLATFORM = {
    ANDROID: "android",
    IOS: "ios"
};

/**
 * string constants, used to identify apps in native code
 * @type {object}
 */
ln.APP = {
    APPLE_MAPS: "apple_maps",
    GOOGLE_MAPS: "google_maps",
    WAZE: "waze",
    CITYMAPPER: "citymapper",
    NAVIGON: "navigon",
    TRANSIT_APP: "transit_app",
    YANDEX: "yandex",
    UBER: "uber",
    TOMTOM: "tomtom",
    BING_MAPS: "bing_maps",
    SYGIC: "sygic",
    HERE_MAPS: "here_maps",
    MOOVIT: "moovit",
    LYFT: "lyft",
    MAPS_ME: "maps_me",
    CABIFY: "cabify",
    BAIDU: "baidu",
    TAXIS_99: "taxis_99",
    GAODE: "gaode"
};

/**
 * Explicitly supported apps by platform
 * @type {object}
 */
ln.APPS_BY_PLATFORM = {};
ln.APPS_BY_PLATFORM[ln.PLATFORM.ANDROID] = [
    ln.APP.GOOGLE_MAPS,
    ln.APP.CITYMAPPER,
    ln.APP.UBER,
    ln.APP.WAZE,
    ln.APP.YANDEX,
    ln.APP.SYGIC,
    ln.APP.HERE_MAPS,
    ln.APP.MOOVIT,
    ln.APP.LYFT,
    ln.APP.MAPS_ME,
    ln.APP.CABIFY,
    ln.APP.BAIDU,
    ln.APP.TAXIS_99,
    ln.APP.GAODE
];
ln.APPS_BY_PLATFORM[ln.PLATFORM.IOS] = [
    ln.APP.APPLE_MAPS,
    ln.APP.GOOGLE_MAPS,
    ln.APP.WAZE,
    ln.APP.CITYMAPPER,
    ln.APP.NAVIGON,
    ln.APP.TRANSIT_APP,
    ln.APP.YANDEX,
    ln.APP.UBER,
    ln.APP.TOMTOM,
    ln.APP.SYGIC,
    ln.APP.HERE_MAPS,
    ln.APP.MOOVIT,
    ln.APP.LYFT,
    ln.APP.MAPS_ME,
    ln.APP.CABIFY,
    ln.APP.BAIDU,
    ln.APP.TAXIS_99,
    ln.APP.GAODE
];

/**
 * Stock maps app that is always present on each platform
 * @type {object}
 */
ln.STOCK_APP = {};
ln.STOCK_APP[ln.PLATFORM.ANDROID] = ln.APP.GOOGLE_MAPS;
ln.STOCK_APP[ln.PLATFORM.IOS] = ln.APP.APPLE_MAPS;

/**
 * Display names for supported apps
 * @type {object}
 */
ln.APP_NAMES = {};
ln.APP_NAMES[ln.APP.APPLE_MAPS] = "Apple Maps";
ln.APP_NAMES[ln.APP.GOOGLE_MAPS] = "Google Maps";
ln.APP_NAMES[ln.APP.WAZE] = "Waze";
ln.APP_NAMES[ln.APP.CITYMAPPER] = "Citymapper";
ln.APP_NAMES[ln.APP.NAVIGON] = "Navigon";
ln.APP_NAMES[ln.APP.TRANSIT_APP] = "Transit App";
ln.APP_NAMES[ln.APP.YANDEX] = "Yandex Navigator";
ln.APP_NAMES[ln.APP.UBER] = "Uber";
ln.APP_NAMES[ln.APP.TOMTOM] = "Tomtom";
ln.APP_NAMES[ln.APP.BING_MAPS] = "Bing Maps";
ln.APP_NAMES[ln.APP.SYGIC] = "Sygic";
ln.APP_NAMES[ln.APP.HERE_MAPS] = "HERE Maps";
ln.APP_NAMES[ln.APP.MOOVIT] = "Moovit";
ln.APP_NAMES[ln.APP.LYFT] = "Lyft";
ln.APP_NAMES[ln.APP.MAPS_ME] = "MAPS.ME";
ln.APP_NAMES[ln.APP.CABIFY] = "Cabify";
ln.APP_NAMES[ln.APP.BAIDU] = "Baidu Maps";
ln.APP_NAMES[ln.APP.TAXIS_99] = "99 Taxi";
ln.APP_NAMES[ln.APP.GAODE] = "Gaode Maps (Amap)";

/**
 * All possible transport modes
 * @type {object}
 */
ln.TRANSPORT_MODE = {
    DRIVING: "driving",
    WALKING: "walking",
    BICYCLING: "bicycling",
    TRANSIT: "transit"
};

/**
 * Supported transport modes by apps and platform
 * @type {object}
 */
ln.TRANSPORT_MODES = {};
// Android
ln.TRANSPORT_MODES[ln.PLATFORM.ANDROID] = {};
ln.TRANSPORT_MODES[ln.PLATFORM.ANDROID][ln.APP.GOOGLE_MAPS] = [ // Only launchMode=turn-by-turn
    ln.TRANSPORT_MODE.DRIVING,
    ln.TRANSPORT_MODE.WALKING,
    ln.TRANSPORT_MODE.BICYCLING,
    ln.TRANSPORT_MODE.TRANSIT
];
ln.TRANSPORT_MODES[ln.PLATFORM.ANDROID][ln.APP.SYGIC] = [
    ln.TRANSPORT_MODE.DRIVING,
    ln.TRANSPORT_MODE.WALKING
];
ln.TRANSPORT_MODES[ln.PLATFORM.ANDROID][ln.APP.MAPS_ME] = [
    ln.TRANSPORT_MODE.DRIVING,
    ln.TRANSPORT_MODE.WALKING,
    ln.TRANSPORT_MODE.BICYCLING,
    ln.TRANSPORT_MODE.TRANSIT
];
ln.TRANSPORT_MODES[ln.PLATFORM.ANDROID][ln.APP.BAIDU] = [
    ln.TRANSPORT_MODE.DRIVING,
    ln.TRANSPORT_MODE.WALKING,
    ln.TRANSPORT_MODE.BICYCLING,
    ln.TRANSPORT_MODE.TRANSIT
];
ln.TRANSPORT_MODES[ln.PLATFORM.ANDROID][ln.APP.GAODE] = [
    ln.TRANSPORT_MODE.DRIVING,
    ln.TRANSPORT_MODE.WALKING,
    ln.TRANSPORT_MODE.BICYCLING,
    ln.TRANSPORT_MODE.TRANSIT
];

// iOS
ln.TRANSPORT_MODES[ln.PLATFORM.IOS] = {};
ln.TRANSPORT_MODES[ln.PLATFORM.IOS][ln.APP.GOOGLE_MAPS] = [
    ln.TRANSPORT_MODE.DRIVING,
    ln.TRANSPORT_MODE.WALKING,
    ln.TRANSPORT_MODE.BICYCLING,
    ln.TRANSPORT_MODE.TRANSIT
];
ln.TRANSPORT_MODES[ln.PLATFORM.IOS][ln.APP.APPLE_MAPS] = [
    ln.TRANSPORT_MODE.DRIVING,
    ln.TRANSPORT_MODE.WALKING,
    ln.TRANSPORT_MODE.TRANSIT
];
ln.TRANSPORT_MODES[ln.PLATFORM.IOS][ln.APP.SYGIC] = [
    ln.TRANSPORT_MODE.DRIVING,
    ln.TRANSPORT_MODE.WALKING
];
ln.TRANSPORT_MODES[ln.PLATFORM.IOS][ln.APP.MAPS_ME] = [
    ln.TRANSPORT_MODE.DRIVING,
    ln.TRANSPORT_MODE.WALKING,
    ln.TRANSPORT_MODE.BICYCLING,
    ln.TRANSPORT_MODE.TRANSIT
];
ln.TRANSPORT_MODES[ln.PLATFORM.IOS][ln.APP.BAIDU] = [
    ln.TRANSPORT_MODE.DRIVING,
    ln.TRANSPORT_MODE.WALKING,
    ln.TRANSPORT_MODE.BICYCLING,
    ln.TRANSPORT_MODE.TRANSIT
];
ln.TRANSPORT_MODES[ln.PLATFORM.IOS][ln.APP.GAODE] = [
    ln.TRANSPORT_MODE.DRIVING,
    ln.TRANSPORT_MODE.WALKING,
    ln.TRANSPORT_MODE.BICYCLING,
    ln.TRANSPORT_MODE.TRANSIT
];

/**
 * Apps by platform that support specifying a start location
 * @type {object}
 */
ln.SUPPORTS_START = {};
ln.SUPPORTS_START[ln.PLATFORM.ANDROID] = [
    ln.APP.GOOGLE_MAPS, // Only launchMode=maps
    ln.APP.CITYMAPPER,
    ln.APP.UBER,
    ln.APP.YANDEX,
    ln.APP.HERE_MAPS,
    ln.APP.MOOVIT,
    ln.APP.LYFT,
    ln.APP.MAPS_ME,
    ln.APP.CABIFY,
    ln.APP.BAIDU,
    ln.APP.TAXIS_99,
    ln.APP.GAODE
];
ln.SUPPORTS_START[ln.PLATFORM.IOS] = [
    ln.APP.APPLE_MAPS,
    ln.APP.GOOGLE_MAPS,
    ln.APP.CITYMAPPER,
    ln.APP.TRANSIT_APP,
    ln.APP.YANDEX,
    ln.APP.UBER,
    ln.APP.HERE_MAPS,
    ln.APP.MOOVIT,
    ln.APP.LYFT,
    ln.APP.MAPS_ME,
    ln.APP.CABIFY,
    ln.APP.BAIDU,
    ln.APP.TAXIS_99,
    ln.APP.GAODE
];
/**
 * Apps by platform that support specifying a start nickname
 * @type {object}
 */
ln.SUPPORTS_START_NAME = {};
ln.SUPPORTS_START_NAME[ln.PLATFORM.ANDROID] = [
    ln.APP.CITYMAPPER,
    ln.APP.UBER,
    ln.APP.HERE_MAPS,
    ln.APP.MOOVIT,
    ln.APP.CABIFY,
    ln.APP.BAIDU,
    ln.APP.TAXIS_99,
    ln.APP.GAODE
];
ln.SUPPORTS_START_NAME[ln.PLATFORM.IOS] = [
    ln.APP.APPLE_MAPS, // Only launchMode=mapkit
    ln.APP.CITYMAPPER,
    ln.APP.UBER,
    ln.APP.HERE_MAPS,
    ln.APP.MOOVIT,
    ln.APP.CABIFY,
    ln.APP.BAIDU,
    ln.APP.TAXIS_99,
    ln.APP.GAODE
];

/**
 * Apps by platform that support specifying a destination nickname
 * @type {object}
 */
ln.SUPPORTS_DEST_NAME = {};
ln.SUPPORTS_DEST_NAME[ln.PLATFORM.ANDROID] = [
    ln.APP.GOOGLE_MAPS, // only launchMode=geo
    ln.APP.CITYMAPPER,
    ln.APP.UBER,
    ln.APP.HERE_MAPS,
    ln.APP.MOOVIT,
    ln.APP.CABIFY,
    ln.APP.BAIDU,
    ln.APP.TAXIS_99,
    ln.APP.GAODE
];
ln.SUPPORTS_DEST_NAME[ln.PLATFORM.IOS] = [
    ln.APP.APPLE_MAPS, // Only launchMode=mapkit
    ln.APP.CITYMAPPER,
    ln.APP.NAVIGON,
    ln.APP.UBER,
    ln.APP.TOMTOM,
    ln.APP.HERE_MAPS,
    ln.APP.MOOVIT,
    ln.APP.CABIFY,
    ln.APP.BAIDU,
    ln.APP.TAXIS_99,
    ln.APP.GAODE
];

/**
 * Apps by platform that support specifying a launch mode
 * @type {object}
 */
ln.SUPPORTS_LAUNCH_MODE = {};
ln.SUPPORTS_LAUNCH_MODE[ln.PLATFORM.ANDROID] = [
    ln.APP.GOOGLE_MAPS
];
ln.SUPPORTS_LAUNCH_MODE[ln.PLATFORM.IOS] = [
    ln.APP.APPLE_MAPS
];

ln.COORDS_REGEX = /^[-\d.]+,[\s]*[-\d.]+$/;

/************
 * Export
 ************/
module.exports = ln;
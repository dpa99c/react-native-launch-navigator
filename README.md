React Native Launch Navigator [![Latest Stable Version](https://img.shields.io/npm/v/react-native-launch-navigator.svg)](https://www.npmjs.com/package/react-native-launch-navigator) [![Total Downloads](https://img.shields.io/npm/dt/react-native-launch-navigator.svg)](https://npm-stat.com/charts.html?package=react-native-launch-navigator)
===================================================================================================================================================================================================================================================================================================================================================================================================================================

A React Native module for launching today's most popular navigation/ride apps to navigate to a destination.

Platforms: Android and iOS.

Key features:

- Single, clean API to abstract away the gory details of each 3rd party app's custom URI scheme
- Detects which supported apps are installed/available on the user's device
- API to detect which features are supported by which apps on which platforms
- Growing list of [supported apps](#supported-navigation-apps)


<!-- Comment out until gifs are resized -->
 <p align="center">
  <img width="300" src="http://i.imgur.com/QiUu2NQ.gif" />
  <span>&nbsp;</span>
  <img width="300" src="http://i.imgur.com/Ox7taYH.gif" />
</p>

Launch Navigator functionality is also available as a [Cordova/Phonegap plugin](https://github.com/dpa99c/phonegap-launch-navigator).

<!-- DONATE -->
[![donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG_global.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZRD3W47HQ3EMJ)

I dedicate a considerable amount of my free time to developing and maintaining my Open Source software.
To help ensure this module is kept updated, new features are added and bugfixes are implemented quickly, please donate a couple of dollars (or a little more if you can stretch) as this will help me to afford to dedicate time to its maintenance. Please consider donating if you're using this software in an app that makes you money, if you're being paid to make the app, if you're asking for new features or priority bug fixes.
<!-- END DONATE -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [General concepts](#general-concepts)
  - [App detection, selection and launching](#app-detection-selection-and-launching)
  - [Geocoding and input format of start/destination locations](#geocoding-and-input-format-of-startdestination-locations)
- [Supported navigation apps](#supported-navigation-apps)
  - [Adding support for more apps](#adding-support-for-more-apps)
- [Installation](#installation)
- [Usage](#usage)
  - [Simple usage](#simple-usage)
    - [Navigate to a destination address from current location.](#navigate-to-a-destination-address-from-current-location)
    - [Navigate to a destination with specified start location](#navigate-to-a-destination-with-specified-start-location)
    - [Navigate using latitude/longitude coordinates](#navigate-using-latitudelongitude-coordinates)
  - [Advanced usage](#advanced-usage)
    - [Navigate using a specific app](#navigate-using-a-specific-app)
    - [List all of the apps supported by the current platform](#list-all-of-the-apps-supported-by-the-current-platform)
    - [List apps available on the current device](#list-apps-available-on-the-current-device)
- [Supported parameters](#supported-parameters)
  - [Transport modes](#transport-modes)
- [Module API](#module-api)
  - [Constants](#constants)
    - [PLATFORM](#platform)
    - [APP](#app)
    - [APP_NAMES](#app_names)
    - [TRANSPORT_MODE](#transport_mode)
    - [LAUNCH_MODE](#launch_mode)
  - [API methods](#api-methods)
    - [navigate()](#navigate)
    - [isAppAvailable()](#isappavailable)
    - [getAvailableApps()](#getavailableapps)
    - [getAppDisplayName()](#getappdisplayname)
    - [getAppsForPlatform()](#getappsforplatform)
    - [supportsTransportMode()](#supportstransportmode)
    - [getTransportModes()](#gettransportmodes)
    - [supportsDestName()](#supportsdestname)
    - [supportsStart()](#supportsstart)
    - [supportsStartName()](#supportsstartname)
    - [supportsLaunchMode()](#supportslaunchmode)
    - [enableDebug()](#enabledebug)
    - [setGoogleApiKey()](#setgoogleapikey)
- [Example project](#example-project)
- [Platform-specifics](#platform-specifics)
  - [Android](#android)
    - [Google API key for Android](#google-api-key-for-android)
    - [`geo:` URI scheme](#geo-uri-scheme)
    - [Google Maps launch modes](#google-maps-launch-modes)
  - [iOS](#ios)
    - ["Removing" Apple Maps](#removing-apple-maps)
    - [Apple Maps launch modes](#apple-maps-launch-modes)
- [App-specifics](#app-specifics)
  - [Lyft](#lyft)
  - [99 Taxi](#99-taxi)
- [Reporting issues](#reporting-issues)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# General concepts

## App detection, selection and launching
- The module will detect which supported navigation apps are available on the device.
- The API allows you to programmatically:
    - check which apps are available on the current device
    - check which apps support which navigation options
    - launch a specific app for navigation

## Geocoding and input format of start/destination locations
- Some navigation apps require that destination/start locations be specified as coordinates, and others require an address.
    - See [App location support type wiki page](https://github.com/dpa99c/phonegap-launch-navigator/wiki/App-location-type-support) for details of which apps support which location types.
- By default, this module will appropriately geocode or reverse-geocode the locations you provide to ensure the app receives the location in the required format.
- However, geocoding requires use of a remote service, so an internet connection is required.
- If `navigate()` is passed a location type which the selected app doesn't support, the error callback will be invoked if:
  - geocoding is disabled by passing `enableGeocoding: false` in the options object
  - there is no internet connection to perform the remote geocode operation
  - geocoding fails (e.g. an address cannot be found for the given lat/long coords)

# Supported navigation apps

The module currently supports launching the following navigation apps:

Android

* [Google Maps](https://play.google.com/store/apps/details?id=com.google.android.apps.maps)
* [Waze](https://play.google.com/store/apps/details?id=com.waze)
* [Citymapper](https://play.google.com/store/apps/details?id=com.citymapper.app.release)
* [Uber](https://play.google.com/store/apps/details?id=com.ubercab)
* [Yandex Navigator](https://play.google.com/store/apps/details?id=ru.yandex.yandexnavi)
* [Sygic](https://play.google.com/store/apps/details?id=com.sygic.aura)
* [HERE Maps](https://play.google.com/store/apps/details?id=com.here.app.maps)
* [Moovit](https://play.google.com/store/apps/details?id=com.tranzmate)
* [Lyft](https://play.google.com/store/apps/details?id=me.lyft.android)
* [MAPS.ME](https://play.google.com/store/apps/details?id=com.mapswithme.maps.pro)
* [Cabify](https://play.google.com/store/apps/details?id=com.cabify.rider)
* [99 Taxi](https://play.google.com/store/apps/details?id=com.taxis99&hl=en)
* [Baidu Maps](https://play.google.com/store/apps/details?id=com.baidu.BaiduMap)
* [Gaode](https://play.google.com/store/apps/details?id=com.autonavi.minimap&hl=en)
* _Any installed app that supports the [`geo:` URI scheme](http://developer.android.com/guide/components/intents-common.html#Maps)_

iOS

* [Apple Maps](http://www.apple.com/uk/ios/maps/)
* [Google Maps](https://itunes.apple.com/gb/app/google-maps/id585027354?mt=8)
* [Waze](https://itunes.apple.com/gb/app/waze-gps-maps-social-traffic/id323229106?mt=8)
* [Citymapper](https://itunes.apple.com/gb/app/citymapper-london-hong-kong/id469463298?mt=8)
* [Garmin Navigon](https://itunes.apple.com/us/developer/garmin-wuerzburg-gmbh/id320198400)
* [Transit App](https://itunes.apple.com/us/app/transit-app-real-time-tracker/id498151501?mt=8)
* [Yandex Navigator](https://itunes.apple.com/gb/app/yandex.navigator/id474500851?mt=8)
* [Uber](https://itunes.apple.com/gb/app/uber/id368677368?mt=8)
* [Tomtom](https://itunes.apple.com/gb/developer/tomtom/id326055452)
* [Sygic](https://itunes.apple.com/gb/app/sygic-gps-navigation-offline/id585193266?mt=8)
* [HERE Maps](https://itunes.apple.com/gb/app/here-maps-offline-navigation/id955837609?mt=8)
* [Moovit](https://itunes.apple.com/us/app/moovit-your-local-transit/id498477945?mt=8)
* [Lyft](https://itunes.apple.com/us/app/lyft/id529379082?mt=8)
* [MAPS.ME](https://itunes.apple.com/us/app/maps-me-offline-map-with-navigation-directions/id510623322?mt=8)
* [Cabify](https://itunes.apple.com/us/app/cabify-enjoy-the-ride/id476087442?mt=8)
* [99 Taxi](https://itunes.apple.com/gb/app/99-taxi-and-private-drivers/id553663691?mt=8)
* [Baidu Maps](https://itunes.apple.com/us/app/%E7%99%BE%E5%BA%A6%E5%9C%B0%E5%9B%BE-%E5%85%AC%E4%BA%A4%E5%9C%B0%E9%93%81%E5%87%BA%E8%A1%8C%E5%BF%85%E5%A4%87%E7%9A%84%E6%99%BA%E8%83%BD%E5%AF%BC%E8%88%AA/id452186370?mt=8)
* [Gaode](https://itunes.apple.com/cn/app/%E9%AB%98%E5%BE%B7%E5%9C%B0%E5%9B%BE-%E7%B2%BE%E5%87%86%E5%9C%B0%E5%9B%BE-%E5%AF%BC%E8%88%AA%E5%BF%85%E5%A4%87/id461703208?mt=8)


## Adding support for more apps

This module is a work in progress. I'd like it to support launching of as many popular navigation apps as possible.

If there's another navigation app which you think should be explicitly supported and **it provides a mechanism to externally launch it**,
open an issue containing a link or details of how the app should be invoked.

**Don't** just open an issue saying "Add support for Blah" without first finding out if/how it can be externally launched.
I don't have time to research launch mechanisms for every suggested app, so I will close such issues immediately.

# Installation

    npm install --save react-native-launch-navigator

Module linking is fully automatic: the module will link/unlink itself on module install/uninstall via hook scripts.
It will also add/remove the custom URL schemes for supported navigation apps to the iOS app plist file.

# Usage

Import the module into your app:

    import LaunchNavigator from 'react-native-launch-navigator';

## Simple usage

On Android, don't forget to set your [Google API key](#google-api-key-for-android):

    if(Platform.OS === "android") LaunchNavigator.setGoogleApiKey("your_api_key");

### Navigate to a destination address from current location.

Uses default OS navigation app (Google Maps on Android / Apple Maps on iOS).

    LaunchNavigator.navigate("London, UK")
        .then(() => console.log("Launched navigator"))
        .catch((err) => console.error("Error launching navigator: "+err));

### Navigate to a destination with specified start location

    LaunchNavigator.navigate("London, UK", {
        start: "Manchester, UK"
    })
        .then(() => console.log("Launched navigator"))
        .catch((err) => console.error("Error launching navigator: "+err));

### Navigate using latitude/longitude coordinates

Coordinates can be specified as a string or array

    LaunchNavigator.navigate([50.279306, -5.163158], {
        start: "50.342847, -4.749904"
    })
        .then(() => console.log("Launched navigator"))
        .catch((err) => console.error("Error launching navigator: "+err));

## Advanced usage

### Navigate using a specific app

    let app = null;

    if(LaunchNavigator.isAppAvailable(LaunchNavigator.APP.WAZE)){
        app = LaunchNavigator.APP.WAZE;
    }else{
        console.warn("Waze not available - falling back to default navigation app");
    }

    LaunchNavigator.navigate("London, UK", {
        app: app
    });
        .then(() => console.log("Launched navigator"))
        .catch((err) => console.error("Error launching navigator: "+err));

### List all of the apps supported by the current platform

    if(Platform.OS === "android"){
        platform = LaunchNavigator.PLATFORM.ANDROID;
    }else if(Platform.OS == "ios"){
        platform = LaunchNavigator.PLATFORM.IOS;
    }

    LaunchNavigator.getAppsForPlatform(platform).forEach((app) => {
        console.log(LaunchNavigator.getAppDisplayName(app) + " is supported");
    });

### List apps available on the current device

    let apps = LaunchNavigator.getAvailableApps();
    for(let app in apps){
        console.log(LaunchNavigator.getAppDisplayName(app) + (apps[app] ? " is" : " isn't") +" available");
    }

# Supported parameters

Different apps support different input parameters on different platforms.
Any input parameters not supported by a specified app will be ignored.

The following table enumerates which apps support which parameters.

| Platform | App                            | Dest | Dest name | Start | Start name | Transport mode | Free |
|----------|--------------------------------|:----:|:---------:|:-----:|:----------:|:--------------:|:----:|
| Android  | Google Maps (Map mode)         |   X  |           |   X   |            |                |   X  |
| Android  | Google Maps (Turn-by-turn mode)|   X  |           |       |            |        X       |   X  |
| Android  | Waze                           |   X  |           |       |            |                |   X  |
| Android  | CityMapper                     |   X  |     X     |   X   |      X     |                |   X  |
| Android  | Uber                           |   X  |     X     |   X   |      X     |                |   X  |
| Android  | Yandex                         |   X  |           |   X   |            |                |   X  |
| Android  | Sygic                          |   X  |           |       |            |        X       |   X  |
| Android  | HERE Maps                      |   X  |     X     |   X   |      X     |                |   X  |
| Android  | Moovit                         |   X  |     X     |   X   |      X     |                |   X  |
| Android  | Lyft                           |   X  |           |   X   |            |                |   X  |
| Android  | MAPS.ME                        |   X  |           |   X   |            |        X       |   X  |
| Android  | _Geo: URI scheme_              |   X  |     X     |       |            |                |  N/A |
| Android  | Cabify                         |   X  |     X     |   X   |      X     |                |   X  |
| Android  | Baidu Maps                     |   X  |     X<sup>[\[1\]](#apple_baidu_maps_nicknames_uri)</sup>     |   X   |      X<sup>[\[1\]](#apple_baidu_maps_nicknames_uri)</sup>     |        X       |   X  |
| Android  | 99 Taxi                        |   X  |     X     |   X   |      X     |                |   X  |
| Android  | Gaode Maps                     |   X  |     X     |   X   |      X     |        X       |   X  |
| iOS      | Apple Maps - URI scheme        |   X  |           |   X   |            |        X       |   X  |
| iOS      | Apple Maps - MapKit class      |   X  |     X     |   X   |      X     |        X       |   X  |
| iOS      | Google Maps                    |   X  |           |   X   |            |        X       |   X  |
| iOS      | Waze                           |   X  |           |       |            |                |   X  |
| iOS      | Citymapper                     |   X  |     X     |   X   |      X     |                |   X  |
| iOS      | Navigon                        |   X  |     X     |       |            |                |      |
| iOS      | Transit App                    |   X  |           |   X   |            |                |   X  |
| iOS      | Yandex                         |   X  |           |   X   |            |                |   X  |
| iOS      | Uber                           |   X  |     X     |   X   |            |                |   X  |
| iOS      | Tomtom                         |   X  |     X     |       |            |                |      |
| iOS      | Sygic                          |   X  |           |       |            |        X       |   X  |
| iOS      | HERE Maps                      |   X  |     X     |   X   |      X     |                |   X  |
| iOS      | Moovit                         |   X  |     X     |   X   |      X     |                |   X  |
| iOS      | Lyft                           |   X  |           |   X   |            |                |   X  |
| iOS      | MAPS.ME                        |   X  |           |   X   |            |        X       |   X  |
| iOS      | Cabify                         |   X  |     X     |   X   |      X     |                |   X  |
| iOS      | Baidu Maps                     |   X  |     X<sup>[\[1\]](#apple_baidu_maps_nicknames_uri)</sup>     |   X   |      X<sup>[\[1\]](#apple_baidu_maps_nicknames_uri)</sup>     |        X       |   X  |
| iOS      | 99 Taxi                        |   X  |     X     |   X   |      X     |                |   X  |
| iOS      | Gaode Maps                     |   X  |     X     |   X   |      X     |        X       |   X  |

<a name="baidu_maps_nicknames">[1]</a>: Only supported when Start or Dest is specified as lat/lon (e.g. "50,-4")

Table columns:

* Dest - destination location specified as lat/lon (e.g. "50,-4") or address (e.g. "London")
* Dest name - nickname for destination location (e.g. "Bob's house")
* Start - start location specified as lat/lon (e.g. "50,-4") or address (e.g. "London")
* Start name - nickname for start location (e.g. "Bob's house")
* Transport mode - mode of transport to use for route planning (e.g. "walking")
* Free - is the app free or does it cost money?


## Transport modes

Apps that support specifying transport mode.

| Platform | App                            | Driving | Walking | Bicycling | Transit |
|----------|--------------------------------|:-------:|:-------:|:---------:|:-------:|
| Android  | Google Maps (Turn-by-turn mode)|    X    |    X    |     X     |    X    |
| Android  | Sygic                          |    X    |    X    |           |         |
| Android  | MAPS.ME                        |    X    |    X    |     X     |    X    |
| Android  | Baidu Maps                     |    X    |    X    |     X     |    X    |
| Android  | Gaode Maps                     |    X    |    X    |     X     |    X    |
| iOS      | Apple Maps                     |    X    |    X    |           |         |
| iOS      | Google Maps                    |    X    |    X    |     X     |    X    |
| iOS      | Sygic                          |    X    |    X    |           |         |
| iOS      | MAPS.ME                        |    X    |    X    |     X     |    X    |
| iOS      | Baidu Maps                     |    X    |    X    |     X     |    X    |
| iOS      | Gaode Maps                     |    X    |    X    |     X     |    X    |


# Module API

All of the module constants and functions should be referenced from the namespace used to import the module, for example:

    import LaunchNavigator from 'react-native-launch-navigator';
    let android = LaunchNavigator.PLATFORM.ANDROID;

## Constants

### PLATFORM

Supported platforms:

- `LaunchNavigator.PLATFORM.ANDROID`
- `LaunchNavigator.PLATFORM.IOS`

### APP

Supported apps:

- `LaunchNavigator.APP.GEO` (Android) - invokes a native chooser, allowing users to select an app which supports the `geo:` URI scheme for navigation
- `LaunchNavigator.APP.GOOGLE_MAPS` (Android & iOS)
- `LaunchNavigator.APP.WAZE` (Android & iOS)
- `LaunchNavigator.APP.CITYMAPPER` (Android & iOS)
- `LaunchNavigator.APP.UBER` (Android & iOS)
- `LaunchNavigator.APP.APPLE_MAPS` (iOS)
- `LaunchNavigator.APP.NAVIGON` (iOS)
- `LaunchNavigator.APP.TRANSIT_APP` (iOS)
- `LaunchNavigator.APP.YANDEX` (Android & iOS)
- `LaunchNavigator.APP.TOMTOM` (iOS)
- `LaunchNavigator.APP.SYGIC` (Android & iOS)
- `LaunchNavigator.APP.HERE_MAPS` (Android & iOS)
- `LaunchNavigator.APP.MOOVIT` (Android & iOS)
- `LaunchNavigator.APP.LYFT` (Android & iOS)
- `LaunchNavigator.APP.MAPS_ME` (Android & iOS)
- `LaunchNavigator.APP.CABIFY` (Android & iOS)
- `LaunchNavigator.APP.BAIDU` (Android & iOS)
- `LaunchNavigator.APP.TAXIS_99` (Android & iOS)
- `LaunchNavigator.APP.GAODE` (Android & iOS)

### APP_NAMES

Display names for supported apps, referenced by `LaunchNavigator.APP`.

e.g. `LaunchNavigator.APP_NAMES[LaunchNavigator.APP.GOOGLE_MAPS] == "Google Maps"`
x
### TRANSPORT_MODE

Transport modes for navigation:

- `LaunchNavigator.TRANSPORT_MODE.DRIVING`
- `LaunchNavigator.TRANSPORT_MODE.WALKING`
- `LaunchNavigator.TRANSPORT_MODE.BICYCLING`
- `LaunchNavigator.TRANSPORT_MODE.TRANSIT`

### LAUNCH_MODE

Launch modes supported by Google Maps on Android (see [Google Maps launch modes](#googlemapslaunchmodes)):

- `LaunchNavigator.LAUNCH_MODE.MAPS` - Maps view
- `LaunchNavigator.LAUNCH_MODE.TURN_BY_TURN` - Navigation view
- `LaunchNavigator.LAUNCH_MODE.GEO` - Navigation view via `geo:` URI scheme

Launch modes supported by Apple Maps on iOS (see [Apple Maps launch modes](#applemapslaunchmodes):

- `LaunchNavigator.LAUNCH_MODE.URI_SCHEME`: use the URI scheme launch method. Default if not specified.
- `LaunchNavigator.LAUNCH_MODE.MAPKIT`: use the MapKit class launch method.


## API methods

### navigate()
Launches a navigation app with a specified destination.

    LaunchNavigator.navigate(destination, options);

#### Parameters
- destination (required): destination location to use for navigation.
Either:
    - a {string} containing the address. e.g. "Buckingham Palace, London"
    - a {string} containing a latitude/longitude coordinate. e.g. "50.1. -4.0"
    - an {array} where the first element is the latitude and the second element is a longitude, as decimal numbers. e.g. [50.1, -4.0]
- options - optional parameters:
    - {string} app - name of the navigation app to use for directions.
    Specify using `LaunchNavigator.APP` constants.  e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
    If not specified, defaults to user selection via native picker UI.
    - {string} destinationName - nickname to display in app for destination. e.g. "Bob's House".
    - start (optional): start location to use for navigation.
    If not specified, the current device location will be used.
    Either:
        - a {string} containing the address. e.g. "Buckingham Palace, London"
        - a {string} containing a latitude/longitude coordinate. e.g. "50.1. -4.0"
        - an {array} where the first element is the latitude and the second element is a longitude, as decimal numbers. e.g. [50.1, -4.0]
    - {string} startName - nickname to display in app for start. e.g. "My Place".
    - {string} transportMode - transportation mode for navigation.
        - Defaults to "driving" if not specified.
        - Specify using `LaunchNavigator.TRANSPORT_MODE` constants.
    - {string} launchMode - mode in which to open default navigation app for platform:
            - Android: mode in which to open Google Maps app
                - `LaunchNavigator.LAUNCH_MODE.MAPS` or `LaunchNavigator.LAUNCH_MODE.TURN_BY_TURN`
                - Defaults to `LaunchNavigator.LAUNCH_MODE.MAPS` if not specified.
            - iOS: method to use to open Apple Maps app
                - `LaunchNavigator.LAUNCH_MODE.URI_SCHEME` or `LaunchNavigator.LAUNCH_MODE.MAPKIT`
                - Defaults to `LaunchNavigator.LAUNCH_MODE.URI_SCHEME` if not specified.
    - {object} extras - a key/value map of extra app-specific parameters. For example, to tell Google Maps on Android to display Satellite view in "maps" launch mode: `{"t": "k"}`
        - These will be appended to the URL used to invoke the app, e.g. `google_maps://?t=k&...`
        - See [Supported app URL scheme documentation wiki page](https://github.com/dpa99c/phonegap-launch-navigator/wiki/Supported-app-URL-scheme-documentation) for links to find app-specific parameters.
    - {boolean} enableGeocoding - if true, and input location type(s) doesn't match those required by the app, use geocoding to obtain the address/coords as required. Defaults to true.

#### Returns
- {Promise}
    - resolved when the navigation app is successfully launched.
    - rejected if an error is occurred. Rejected with args:
        - {string} - error message

### isAppAvailable()
Determines if the given app is installed and available on the current device.

    let app = LaunchNavigator.APP.WAZE;
    LaunchNavigator.isAppAvailable(app)
        .then((isAvailable) => {
            console.log(LaunchNavigator.getAppDisplayName(app)+" is available: "+isAvailable);
        })
        .catch((error) => {
            console.error(error);
        });

#### Parameters
- {string} appName - name of the app to check availability for. Define as a constant using `LaunchNavigator.APP`.

#### Returns
- {Promise}
    - resolved with:
        - {boolean} - indicates the availability of the specified app.
    - rejected if an error is occurred. Rejected with args:
        - {string} - error message

### getAvailableApps()
Returns a list indicating which apps are installed and available on the current device for the current platform.

    LaunchNavigator.getAvailableApps()
        .then((apps) => {
            for(let app in apps){
                console.log(LaunchNavigator.getAppDisplayName(app)+" is "+(apps[app] ? "available" : "unavailable"));
            }
        })
        .catch((error) => {
            console.error(error);
        });

#### Returns
- {Promise}
    - resolved with:
        - {object} - a key/value object where the key is the app name as a constant in `LaunchNavigator.APP` and the value is a boolean indicating whether the app is available.
    - rejected if an error is occurred. Rejected with args:
        - {string} - error message

### getAppDisplayName()
Returns the display name of the specified app.

    let name = LaunchNavigator.getAppDisplayName(LaunchNavigator.APP.WAZE);

#### Parameters
- {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.

#### Returns
- {string} - app display name. e.g. "Google Maps".

### getAppsForPlatform()
Returns list of supported apps on a given platform.

    let apps = LaunchNavigator.getAppsForPlatform(platform);

#### Parameters
- {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.

#### Returns
- {array} - apps supported on specified platform as a list of `LaunchNavigator.APP` constants.


### supportsTransportMode()
Indicates if an app on a given platform supports specification of transport mode.

    let isSupported = LaunchNavigator.supportsTransportMode(app, platform, launchMode);

#### Parameters
- {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
- {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
- {string} launchMode - (optional) Only applies to Google Maps on Android. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.

#### Returns
- {boolean} - true if app/platform(/launch mode) combination supports specification of transport mode.

### getTransportModes()
Returns the list of transport modes supported by an app on a given platform.

    let transportModes = LaunchNavigator.getTransportModes(app, platform, launchMode);

#### Parameters
- {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
- {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
- {string} launchMode - (optional) Only applies to Google Maps on Android. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.

#### Returns
- {boolean} - {array} - list of transports modes as constants in `LaunchNavigator.TRANSPORT_MODE`.
If app/platform(/launch mode) combination doesn't support specification of transport mode, the list will be empty;


### supportsDestName()
Indicates if an app on a given platform supports specification of a custom nickname for destination location.

    let isSupported = LaunchNavigator.supportsDestName(app, platform, launchMode);

#### Parameters
- {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
- {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
- {string} launchMode - (optional) Applies to Google Maps on Android and Apple Maps on iOS. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.

#### Returns
- {boolean} - true if app/platform(/launch mode) combination supports specification of a custom nickname for destination location.


### supportsStart()
Indicates if an app on a given platform supports specification of start location.

    let isSupported = LaunchNavigator.supportsStart(app, platform, launchMode);

#### Parameters
- {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
- {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
- {string} launchMode - (optional) Only applies to Google Maps on Android. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPS`.

#### Returns
- {boolean} - true if app/platform(/launch mode) combination supports specification of start location.


### supportsStartName()
Indicates if an app on a given platform supports specification of a custom nickname for start location.

    let isSupported = LaunchNavigator.supportsStartName(app, platform, launchMode);

#### Parameters
- {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
- {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.IOS`.
- {string} launchMode - (optional) Only applies to Apple Maps on iOS. Specified as a constant in `LaunchNavigator.LAUNCH_MODE`. e.g. `LaunchNavigator.LAUNCH_MODE.MAPKIT`.

#### Returns
- {boolean} - true if app/platform(/launch mode) combination supports specification of a custom nickname for start location.

### supportsLaunchMode()
Indicates if an app on a given platform supports specification of launch mode.
- Currently only Google Maps on Android and Apple Maps on iOS supports this.

    let isSupported = LaunchNavigator.supportsLaunchMode(app, platform);

#### Parameters
- {string} app - specified as a constant in `LaunchNavigator.APP`. e.g. `LaunchNavigator.APP.GOOGLE_MAPS`.
- {string} platform - specified as a constant in `LaunchNavigator.PLATFORM`. e.g. `LaunchNavigator.PLATFORM.ANDROID`.

#### Returns
- {boolean} - true if app/platform combination supports specification of launch mode.

### enableDebug()
Enables debug log output from the module to the JS and native consoles. By default debug is disabled.

    LaunchNavigator.enableDebug(true);

#### Parameters
- {boolean} enabled - Whether to enable debug.

### setGoogleApiKey()
Enables specification of the Google API key to use for accessing Google's Geocoding API.
If you fail to set this on Android before attempting to use this module to launch a navigation app which requires a lat/lon coordinates as input, the module will raise an error if the input location is an address because it requires geocoding to a lat/lon coordinate.
See [Google API key for Android](#google-api-key-for-android) for more information.

Android only. Calling on iOS will have no effect.

    LaunchNavigator.setGoogleApiKey("your_api_key");

#### Parameters
- {boolean} enabled - Whether to enable debug.

# Example project

The example project can be used to build and run a React Native app for Android & iOS:

https://github.com/dpa99c/react-native-launch-navigator-example

It demonstrates how this module can be used and validates its functionality.

# Platform-specifics

## Android

### Google API key for Android
- On Android, this module uses [Google's Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) to geocode input addresses to lat/lon coordinates in order to support navigation apps which only allow input locations to be specified as lat/lon coordinates.
- Google now requires that an API key be specified in order to use the Geocoding API, so you'll need to obtain an API key and specify it via [`setGoogleApiKey()`](#setgoogleapikey).
- For more information on how to obtain an API key, see the [Google documentation](https://developers.google.com/maps/documentation/geocoding/get-api-key).

### `geo:` URI scheme
- Running on Android, in addition to discovering which explicitly supported apps are installed, the module will also detect which installed apps support using the `geo:` URI scheme for use in navigation.
These are returned in the list of available apps.

- By specifying the `app` option as `LaunchNavigator.APP.GEO`, the module will invoke a native Android chooser, to allow the user to select an app which supports the `geo:` URI scheme for navigation.


### Google Maps launch modes
Google Maps on Android can be launched using 3 launch modes by specifying the `launchMode` option as a `LaunchNavigator.LAUNCH_MODE` constant to `navigate()`:

- Maps mode (`LaunchNavigator.LAUNCH_MODE.MAPS`) - launches in Map view. Enables start location to be specified, but not transport mode or destination name. Default if not specified.
- Turn-by-turn mode (`LaunchNavigator.LAUNCH_MODE.TURN_BY_TURN`) - launches in Navigation view. Enables transport mode to be specified, but not start location or destination name.
- Geo mode (`LaunchNavigator.LAUNCH_MODE.GEO`) - invokes Navigation view via `geo`: URI scheme. Enables destination name to be specified, but not start location or transport mode.


## iOS

### "Removing" Apple Maps
  - Since iOS 10, it is possible to "remove" built-in Apple apps, including Maps, from the Home screen.
  - Not that removing is not the same as uninstalling - the app is still actually present on the device, just the icon is removed from the Home screen.
  - Therefore it's not possible detect if Apple Maps is unavailable - `LaunchNavigator.availableApps()` will always report it as present.
  - The best that can be done is to gracefully handle the error when attempting to open Apple Maps using `LaunchNavigator.navigate()`
  - For reference, see [this SO question](http://stackoverflow.com/questions/39603120/how-to-check-if-apple-maps-is-installed) and the [Apple documentation](https://support.apple.com/en-gb/HT204221).
  
### Apple Maps launch modes

Apple Maps app on iOS can be launched using 2 launch methods by specifying the `launchMode` option as a `LaunchNavigator.LAUNCH_MODE` constant to `navigate()`:
- `LaunchNavigator.LAUNCH_MODE.URI_SCHEME`: use the URI scheme launch method. Default if not specified.
- `LaunchNavigator.LAUNCH_MODE.MAPKIT`: use the MapKit class launch method.

#### URI scheme launch method
- Launches the app using the [Apple Maps URI scheme](https://developer.apple.com/library/content/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html)
- The default method used by the module.
- Supports input location types of both coordinates and address string without requiring remote geocoding service (works offline)
- Doesn't support specifying nicknames for start/destination locations.

#### MapKit class launch method
- Launches the app using the [MapKit class](https://developer.apple.com/documentation/mapkit/mkmapitem/1452207-openmapswithitems?language=objc) to launch Apple Maps
- Only supports input location type of coordinates without requiring remote geocoding service (works offline)
- An input location type of an address (formatted as a single string) requires use of remote geocoding service (requires internet connection)
    - MapKit class input requires an address which is formatted as an [address dictionary](https://developer.apple.com/documentation/contacts/cnpostaladdress), in which the address is split into known fields such as street, city and state.  
- Support specifying nicknames for start/destination locations.
- Provides [additional launch options](https://developer.apple.com/documentation/mapkit/mkmapitem/launch_options_dictionary_keys?language=objc) which are not available via the URI scheme launch method.

# App-specifics

## Lyft

On both Android and iOS, the "ride type" will default to "Lyft" unless otherwise specified in the `extras` list as `id`. 

See the [Lyft documentation](https://developer.lyft.com/v1/docs/deeplinking) for URL scheme details and other supported ride types.

## 99 Taxi
On both Android and iOS, the extra parameters `client_id` and `deep_link_product_id` are required by 99 Taxi

- `client_id` should follow the pattern `MAP_***` where `***` is the client name given by the 99 Team.
    - If not specified defaults to `client_id=MAP_123`
- `deep_link_product_id` identifies the ride category
    - Currently supported values are:
        - `316` - POP ride
        - `326` - TOP ride
        - `327` - Taxis ride
    - If not specified defaults to `deep_link_product_id=316`     

On Android, 99 Taxi is currently the only app where `options.start` is a **required** parameter when calling `navigate()`
- If `navigate()` is called without a start location and the selected app is 99 Taxi, the error callback will be invoked and the 99 Taxi app will not be launched
- In order for this module to automatically provide start location to 99 Taxi (if it's not already specified), the native Android implementation needs to be enhanced to:
    - check/request runtime permission to use location
    - add the necessary permission entries to the `AndroidManifest.xml`
    - check/request high accuracy location is enabled (no point in requesting a low-accuracy city-level position if you want a pickup at your exact current address)
    - request a high accuracy position to determine the user's current location
    - handle errors cases such as:
        - User denies location permission
        - User denies high accuracy mode permission
        - Location cannot be retrieved
- Currently, I don't have time to do all of the above just for the case of 99 Taxi
    - However I'm willing to accept a PR request which implements the necessary native Android features.
- Otherwise/until then, you'll need to manually specify the start location for 99 Taxi

# Reporting issues

Before reporting issues with this module, please first do the following:

- Check the existing lists of [open issues](https://github.com/dpa99c/react-native-launch-navigator/issues) and [closed issues](https://github.com/dpa99c/react-native-launch-navigator/issues?q=is%3Aissue+is%3Aclosed)
    - Also check the [list of issues for this module's sister Cordova plugin](https://github.com/dpa99c/phonegap-launch-navigator) as it's been around longer and native issues apply equally to this React Native module.
- Check your target country is supported for turn-by-turn by the native navigation app
  - [Apple Maps country list for iOS](https://www.apple.com/ios/feature-availability/#maps-turn-by-turn-navigation)
  - [Google Maps country list for Android](https://support.google.com/gmm/answer/3137767?hl=en-GB)
- If possible, test using the [example project](https://github.com/dpa99c/react-native-launch-navigator-example) to eliminate the possibility of a bug in your code rather than the module.


When reporting issues, please give the following information:

- A clear description of the problem

- OS version(s) and device (or emulator) model(s) on which the problem was observed

- Code example of calling the module which results in the observed issue

- Example parameters (locations or place names) which results in the observed issue

**Issues which fail to give a clear description of the problem as described above will be closed immediately**

License
================

The MIT License

Copyright (c) 2018 Dave Alden (Working Edge Ltd.)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

# CHANGELOG


## 1.0.9
- (types) bugfix: Apply patch to fix `index.d.ts`
- Merge [PR#38](https://github.com/dpa99c/react-native-launch-navigator/pull/38): Android 11 (API 30) target support

## 1.0.8
- Merge [PR#30](https://github.com/dpa99c/react-native-launch-navigator/pull/30): Fix for Android X
- Merge [PR#31](https://github.com/dpa99c/react-native-launch-navigator/pull/30):  (Android) discover apps on `getAvailableApps()` call
- (iOS) Rework hook scripts to detect development platform and projects so as to only run iOS-specific hooks if iOS platform project exists and development platform is OSX.
    - Resolves [#36](https://github.com/dpa99c/react-native-launch-navigator/issues/36)
-  (Doc): Remove erroneous reference to native picker UI and make it clear that none is provided out-of-the-box.
    - Resolves [#33](https://github.com/dpa99c/react-native-launch-navigator/issues/33)
- (iOS): Remove postinstall/postlink scripts and document manual process to replace them.
    - Resolves [#34](https://github.com/dpa99c/react-native-launch-navigator/issues/34)

## 1.0.7
- Merge [PR#18](https://github.com/dpa99c/react-native-launch-navigator/pull/18): Use project's minSdkVersion if available
- Merge [PR#20](https://github.com/dpa99c/react-native-launch-navigator/pull/20): Update `build.gradle` to use `implementation` instead of deprecated `compile` directive.

## 1.0.6
- Support for React Native 0.60.x
    - Fixes [#15](https://github.com/dpa99c/react-native-launch-navigator/issues/15) and [#16](https://github.com/dpa99c/react-native-launch-navigator/issues/16).

## 1.0.5
- Pass `navigate=yes` to Waze on Android if input type is an address. See https://github.com/dpa99c/phonegap-launch-navigator/issues/213.
- Fix checks for empty strings/objects on iOS.
- iOS fix: Make LNEmptyCoord static to scope it to the class.
- Merge [PR#10](https://github.com/dpa99c/react-native-launch-navigator/pull/10): Fixed `LaunchNavigator.navigate` never resolving the returned promise when AppleMaps/MapKit is used on iOS

## 1.0.4
Fix check for empty extras parameter on iOS. See [dpa99c/phonegap-launch-navigator#212](https://github.com/dpa99c/phonegap-launch-navigator/issues/212).

## 1.0.3
Enable specification of Google API key for geocoding on Android. See [dpa99c/phonegap-launch-navigator#211](https://github.com/dpa99c/phonegap-launch-navigator/issues/211).

## 1.0.2
Fix auto-linking scripts to prevent multiple linking/unlinking attempts. Resolves [#2](https://github.com/dpa99c/react-native-launch-navigator/issues/2).

## 1.0.1
Set FLAG_ACTIVITY_NEW_TASK on Android when launching intent to invoke navigation apps. Resolves [#1](https://github.com/dpa99c/react-native-launch-navigator/issues/1).

## 1.0.0
Initial release: functionality ported from [phonegap-launch-navigator](https://github.com/dpa99c/phonegap-launch-navigator)


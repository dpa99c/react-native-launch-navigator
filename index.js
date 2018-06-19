/**
 * @providesModule react-native-launch-navigator
 * @flow
 */
'use strict';
import {NativeModules} from 'react-native';
import {Platform} from 'react-native';

let LaunchNavigator = NativeModules.RNLaunchNavigator;


module.exports = LaunchNavigator;

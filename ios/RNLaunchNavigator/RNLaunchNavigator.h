#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "LN_LaunchNavigator.h"

@interface RNLaunchNavigator : RCTEventEmitter <RCTBridgeModule>
@property (nonatomic, retain) LN_LaunchNavigator* launchNavigator;

@end

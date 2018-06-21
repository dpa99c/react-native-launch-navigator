#import "WE_Logger.h"
#import <React/RCTEventEmitter.h>

@interface WE_ReactNativeLogger : WE_Logger

@property (nonatomic, weak) RCTEventEmitter <RCTBridgeModule>* eventEmitter;
@property (nonatomic, retain) NSString* logTag;

-(id)init:(RCTEventEmitter <RCTBridgeModule>*)eventEmitter logTag:(NSString*)logTag;
-(NSArray*)getEventNames;
-(void)error:(NSString*) msg;
-(void)warn:(NSString*) msg;
-(void)info:(NSString*) msg;
-(void)debug:(NSString*) msg;
-(void)verbose:(NSString*) msg;

@end

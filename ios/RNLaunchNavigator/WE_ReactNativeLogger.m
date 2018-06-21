#import "WE_ReactNativeLogger.h"
#import <React/RCTConvert.h>

@implementation WE_ReactNativeLogger;
@synthesize eventEmitter;
@synthesize logTag;

/**********************
* Internal properties
**********************/
static NSArray* eventNames;

/*******************
* Public API
*******************/
-(id)init:(RCTEventEmitter <RCTBridgeModule>*)eventEmitter logTag:(NSString*)logTag{
    if(self = [super init]){
      self.eventEmitter = eventEmitter;
      self.logTag = logTag;
      eventNames = @[
        @"console.error",
        @"console.warn",
        @"console.info",
        @"console.log",
        @"console.debug"
      ];
    }
    return self;
}

-(void)error:(NSString*) msg{
    [self log:msg jsLogLevel:@"error" nsLogLevel:@"error"];
}

-(void)warn:(NSString*) msg{
    [self log:msg jsLogLevel:@"warn" nsLogLevel:@"warn"];
}

-(void)info:(NSString*) msg{
    [self log:msg jsLogLevel:@"info" nsLogLevel:@"info"];
}

-(void)debug:(NSString*) msg{
    [self log:msg jsLogLevel:@"log" nsLogLevel:@"debug"];
}

-(void)verbose:(NSString*) msg{
    [self log:msg jsLogLevel:@"debug" nsLogLevel:@"verbose"];
}

-(NSArray*)getEventNames{
  return eventNames;
}

/*********************
*  Internal functions
**********************/
- (void)log: (NSString*)msg jsLogLevel:(NSString*)jsLogLevel nsLogLevel:(NSString*)nsLogLevel
{
    if(self.enabled){
      NSLog(@"%@[%@]: %@", self.logTag, nsLogLevel, msg);
      [self.eventEmitter sendEventWithName:[NSString stringWithFormat:@"console.%@",jsLogLevel] body:@{@"logTag": [RCTConvert NSString:self.logTag], @"message": [RCTConvert NSString:msg]}];
    }
}
@end

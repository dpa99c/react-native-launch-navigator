#import "RNLaunchNavigator.h"
#import "WE_ReactNativeLogger.h"

@interface RNLaunchNavigator()
@end

@implementation RNLaunchNavigator
@synthesize launchNavigator;

// Internal constants
static NSString*const ERROR_CODE_EXCEPTION = @"EXCEPTION";
static NSString*const ERROR_CODE_ERROR = @"ERROR";
static long ERROR_CODE_EXCEPTION_CODE = 0;

// Internal variables;
static WE_ReactNativeLogger* logger;
static BOOL isListening = false;
static BOOL isLoggerEnabled = false;

RCT_EXPORT_MODULE(RNLaunchNavigator)

/********************************/
#pragma mark - overrides
/********************************/
- (instancetype)init{
  if(self = [super init]){
    logger = [[WE_ReactNativeLogger alloc] init:self logTag:@"RNLaunchNavigator[native]"];
    self.launchNavigator = [[LN_LaunchNavigator alloc] init:[[WE_ReactNativeLogger alloc] init:self logTag:@"LaunchNavigator[native]"]];
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup{
  return YES;
}

- (NSArray<NSString*>*) supportedEvents{
  NSMutableArray* events = [NSMutableArray arrayWithArray:[logger getEventNames]];
  return [events copy];
}

- (void)startObserving{
  isListening = YES;
  [self applyLoggerEnabled];
}

- (void)stopObserving{
  isListening = NO;
  [self applyLoggerEnabled];
}

/**********************************/
#pragma mark - module API functions
/**********************************/
RCT_EXPORT_METHOD(enableDebug:(BOOL)enabled){
  [self _setLoggerEnabled:enabled];
}

RCT_EXPORT_METHOD(isAppAvailable:(NSString*) app
                  resolve:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject)
{
  @try {
    BOOL result = [self.launchNavigator isAppAvailable:app];
    resolve([NSNumber numberWithBool:result]);
  }
  @catch (NSException* exception) {
    [logger error: exception.reason];
    reject(ERROR_CODE_EXCEPTION, exception.reason, [self exceptionToError:exception]);
  }
}

RCT_EXPORT_METHOD(getAvailableApps:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject)
{
  @try {
    NSDictionary* results = [launchNavigator availableApps];
    resolve(results);
  }
  @catch (NSException* exception) {
    [logger error: exception.reason];
    reject(ERROR_CODE_EXCEPTION, exception.reason, [self exceptionToError:exception]);
  }
}

RCT_EXPORT_METHOD(navigate:(NSDictionary*) params
                  resolve:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject)
{
  @try {
    NSString* logMsg = @"Called navigate() with args: ";
    for(id object in params){
      NSString* key = object;
      NSString* value = [params objectForKey:key];
      logMsg = [NSString stringWithFormat:@"%@ %@=%@;", logMsg, key, value];
    }
    [logger debug:logMsg];
    
    [launchNavigator navigate:params
      success:^(void) {
        resolve(nil);
      }
      fail:^(NSString* errorMsg) {
        reject(ERROR_CODE_ERROR, errorMsg, nil);
      }
     ];
    
    
  }
  @catch (NSException* exception) {
    [logger error: exception.reason];
    reject(ERROR_CODE_EXCEPTION, exception.reason, [self exceptionToError:exception]);
  }
}


/********************************/
#pragma mark - internal functions
/********************************/
-(void)_setLoggerEnabled:(BOOL)enabled{
  isLoggerEnabled = enabled;
  [self applyLoggerEnabled];
}

-(void)applyLoggerEnabled{
  BOOL enabled = isListening && isLoggerEnabled;
  [logger setEnabled:enabled];
  [[self.launchNavigator getLogger] setEnabled:enabled];
}

- (NSError*) exceptionToError: (NSException*)exception
{
  NSMutableDictionary * info = [NSMutableDictionary dictionary];
  [info setValue:ERROR_CODE_EXCEPTION forKey:@"ExceptionCode"];
  [info setValue:exception.name forKey:@"ExceptionName"];
  [info setValue:exception.reason forKey:@"ExceptionReason"];
  [info setValue:exception.callStackReturnAddresses forKey:@"ExceptionCallStackReturnAddresses"];
  [info setValue:exception.callStackSymbols forKey:@"ExceptionCallStackSymbols"];
  [info setValue:exception.userInfo forKey:@"ExceptionUserInfo"];
  return [[NSError alloc] initWithDomain:[[NSBundle mainBundle] bundleIdentifier] code:ERROR_CODE_EXCEPTION_CODE userInfo:info];
}

@end

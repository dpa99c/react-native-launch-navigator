#import "TestModule.h"

@interface TestModule()
@end

@implementation TestModule

// Internal constants
static NSString*const MODULE_NAME = @"TestModule";
static NSString*const ERROR_CODE_EXCEPTION = @"EXCEPTION";
static long ERROR_CODE_EXCEPTION_CODE = 0;

RCT_EXPORT_MODULE(TestModule)

/********************************/
#pragma mark - API
/********************************/
RCT_EXPORT_METHOD(setAndGetStringWithPromise:(NSString*) message
                  resolve:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject)
{
    @try {
      [self checkMessageForError:message];
      [self logDebug:[NSString stringWithFormat:@"setAndGetStringWithPromise: message=%@", message]];
      resolve(message);
    }
    @catch (NSException* exception) {
        [self logError: exception.reason];
        reject(ERROR_CODE_EXCEPTION, exception.reason, [self exceptionToError:exception]);
    }
}

RCT_EXPORT_METHOD(setAndGetStringWithCallbacks:(NSString*) message
                  onError:(RCTResponseErrorBlock)onError
                  onSuccess:(RCTResponseSenderBlock)onSuccess)
{
    @try {
      [self checkMessageForError:message];
      [self logDebug:[NSString stringWithFormat:@"setAndGetStringWithCallbacks: message=%@", message]];
      onSuccess(@[message]);
    }
    @catch (NSException* exception) {
        [self logError: exception.reason];
        onError([self exceptionToError:exception]);
    }
}

- (void) checkMessageForError: (NSString*) message
{
  if([message isEqualToString:@"error"]){
    @throw([NSException exceptionWithName:@"Forced exception" reason:@"An exception was forced" userInfo:nil]);
  }
}

/********************************/
#pragma mark - utility
/********************************/

- (void)logDebug: (NSString*)msg
{
  NSLog(@"%@: %@", MODULE_NAME, msg);
}

- (void)logError: (NSString*)msg
{
  NSLog(@"%@ ERROR: %@", MODULE_NAME, msg);
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

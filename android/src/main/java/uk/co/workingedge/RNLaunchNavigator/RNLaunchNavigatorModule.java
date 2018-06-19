package uk.co.workingedge.RNLaunchNavigator;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.util.Map;
import java.util.HashMap;

public class RNLaunchNavigatorModule extends ReactContextBaseJavaModule {

	private static final String MODULE_NAME = "RNLaunchNavigator";
    private static final String ERROR_CODE_EXCEPTION = "EXCEPTION";

    public RNLaunchNavigatorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("LOG_TAG", MODULE_NAME);
        return constants;
    }


    @ReactMethod
    public void setAndGetStringWithPromise(final String message, Promise promise){
        try{
            Log.i(MODULE_NAME, "setAndGetStringWithPromise="+message);
            checkMessageForError(message);
            promise.resolve(message);
        }catch (Exception e){
            handleExceptionWithPromise(promise, e);
        }
    }

    @ReactMethod
    public void setAndGetMapWithPromise(String message, Promise promise){
        try{
            Log.i(MODULE_NAME, "setAndGetMapWithPromise="+message);
            checkMessageForError(message);
            WritableMap map = Arguments.createMap();
            map.putString("message", message);
            promise.resolve(map);
        }catch (Exception e){
            handleExceptionWithPromise(promise, e);
        }
    }

    private void checkMessageForError(String message) throws Exception{
    	if(message.equals("error")){
        	throw new Exception("Forced exception");
        }
    }

    private void handleExceptionWithPromise(Promise promise, Exception e){
    	promise.reject(ERROR_CODE_EXCEPTION, e);
    }
}
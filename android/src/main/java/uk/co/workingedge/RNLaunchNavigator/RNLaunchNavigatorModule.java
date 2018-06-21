package uk.co.workingedge.RNLaunchNavigator;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONObject;

import java.util.Map;
import java.util.HashMap;

import uk.co.workingedge.LaunchNavigator;

public class RNLaunchNavigatorModule extends ReactContextBaseJavaModule {
    private static final String NATIVE = "[native]";
	private static final String MODULE_NAME = "RNLaunchNavigator";
    private static final String LOG_TAG = MODULE_NAME+NATIVE;
    private static final String ERROR_CODE_EXCEPTION = "EXCEPTION";
    private static final String ERROR_CODE_ERROR = "ERROR";

    private LaunchNavigator launchNavigator = null;
    private RNLogger logger = null;


    public RNLaunchNavigatorModule(ReactApplicationContext reactContext) {
        super(reactContext);
        try {
            logger = new RNLogger(reactContext, LOG_TAG);
            launchNavigator = new LaunchNavigator(getReactApplicationContext(), new RNLogger(reactContext, LaunchNavigator.LOG_TAG+NATIVE));
        }catch (Exception e){
            Log.e(MODULE_NAME, "Exception initializing :"+e.getMessage());
        }
    }

    /************
     * Overrides
     ************/
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("LOG_TAG", LOG_TAG);
        return constants;
    }

    /*********************
     * Module API methods
     *********************/
    @ReactMethod
    public void enableDebug(final Boolean enabled){
        this.logger.setEnabled(enabled);
        this.launchNavigator.getLogger().setEnabled(enabled);
    }

    @ReactMethod
    public void getGeoApps(Promise promise){
        try{
            logger.debug("getGeoApps");
            JSONObject oApps = launchNavigator.getGeoApps();
            ReadableMap mApps = RNUtils.convertJsonToMap(oApps);
            promise.resolve(mApps);
        }catch (Exception e){
            handleExceptionWithPromise(promise, e);
        }
    }

    @ReactMethod
    public void getAvailableApps(Promise promise){
        try{
            logger.debug("getAvailableApps");
            JSONObject oApps = launchNavigator.getAvailableApps();
            ReadableMap mApps = RNUtils.convertJsonToMap(oApps);
            promise.resolve(mApps);
        }catch (Exception e){
            handleExceptionWithPromise(promise, e);
        }
    }

    @ReactMethod
    public void isAppAvailable(String appName, Promise promise){
        try{
            logger.debug("isAppAvailable");
            boolean available = launchNavigator.isAppAvailable(appName);
            promise.resolve(available);
        }catch (Exception e){
            handleExceptionWithPromise(promise, e);
        }
    }

    @ReactMethod
    public void navigate(ReadableMap args, Promise promise){
        try{
            logger.debug("navigate");
            String error = launchNavigator.navigate(RNUtils.convertMapToJson(args));
            if(error == null){
                promise.resolve(true);
            }else{
                promise.reject(ERROR_CODE_ERROR, error);
            }
        }catch (Exception e){
            handleExceptionWithPromise(promise, e);
        }
    }

    /******************
     * Internal methods
     ******************/

    private void handleExceptionWithPromise(Promise promise, Exception e){
    	promise.reject(ERROR_CODE_EXCEPTION, e);
    }
}
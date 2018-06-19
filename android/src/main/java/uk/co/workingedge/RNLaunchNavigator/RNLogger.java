/*
 * Copyright (c) 2018 Dave Alden  (http://github.com/dpa99c)
 * Copyright (c) 2018 Working Edge Ltd. (http://www.workingedge.co.uk)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 */
package uk.co.workingedge.RNLaunchNavigator;

import uk.co.workingedge.ILogger;
import android.util.Log;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class RNLogger implements ILogger {

    /**********************
     * Internal properties
     **********************/
    private boolean enabled = false;
    private ReactContext reactContext;
    private String logTag;

    /*******************
     * Constructors
     *******************/
    public RNLogger(ReactContext reactContext, String logTag) {
        initialize(reactContext, logTag);
    }

    public RNLogger(ReactContext reactContext, String logTag, boolean enabled) {
        initialize(reactContext, logTag);
        setEnabled(enabled);
    }

    /*******************
     * Public API
     *******************/
    @Override
    public void setEnabled(boolean enabled){
        this.enabled = enabled;
    }

    @Override
    public boolean getEnabled(){
        return this.enabled;
    }

    @Override
    public void error(String msg) {
        Log.e(logTag, msg);
        logToReactConsole(msg, "error");
    }

    @Override
    public void warn(String msg) {
        Log.w(logTag, msg);
        logToReactConsole(msg, "warn");
    }

    @Override
    public void info(String msg) {
        Log.i(logTag, msg);
        logToReactConsole(msg, "info");
    }

    @Override
    public void debug(String msg) {
        Log.d(logTag, msg);
        logToReactConsole(msg, "log");
    }

    @Override
    public void verbose(String msg) {
        Log.v(logTag, msg);
        logToReactConsole(msg, "debug");
    }

    /*******************
     * Internal methods
     *******************/
    private void initialize(ReactContext reactContext, String logTag){
        this.reactContext = reactContext;
        this.logTag = logTag;
    }

    private void logToReactConsole(String message, String logLevel){
        if(enabled){
            WritableMap map = Arguments.createMap();
            map.putString("message", message);
            reactContext
              .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
              .emit("console."+logLevel, map);
        }
    }
}
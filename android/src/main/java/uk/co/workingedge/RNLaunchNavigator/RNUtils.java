package uk.co.workingedge.RNLaunchNavigator;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

/**
 * @author Mihovil Kovačević
 * @since 03-27-2017
 */
public class RNUtils {
    /**
     *
     * @param jsonObject
     * @return map
     * @throws JSONException
     */
    public static WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = new WritableNativeMap();

        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof  Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof  Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String)  {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
        return map;
    }

    /**
     *
     * @param jsonArray
     * @return
     * @throws JSONException
     */
    public static WritableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {
        WritableArray array = new WritableNativeArray();

        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof JSONObject) {
                array.pushMap(convertJsonToMap((JSONObject) value));
            } else if (value instanceof  JSONArray) {
                array.pushArray(convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                array.pushBoolean((Boolean) value);
            } else if (value instanceof  Integer) {
                array.pushInt((Integer) value);
            } else if (value instanceof  Double) {
                array.pushDouble((Double) value);
            } else if (value instanceof String)  {
                array.pushString((String) value);
            } else {
                array.pushString(value.toString());
            }
        }
        return array;
    }

    /**
     *
     * @param readableMap
     * @return
     * @throws JSONException
     */
    public static JSONObject convertMapToJson(ReadableMap readableMap) throws JSONException {
        JSONObject object = new JSONObject();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            switch (readableMap.getType(key)) {
                case Null:
                    object.put(key, JSONObject.NULL);
                    break;
                case Boolean:
                    object.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    object.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    object.put(key, readableMap.getString(key));
                    break;
                case Map:
                    object.put(key, convertMapToJson(readableMap.getMap(key)));
                    break;
                case Array:
                    object.put(key, convertArrayToJson(readableMap.getArray(key)));
                    break;
            }
        }
        return object;
    }

    /**
     *
     * @param readableArray
     * @return
     * @throws JSONException
     */
    public static JSONArray convertArrayToJson(ReadableArray readableArray) throws JSONException {
        JSONArray array = new JSONArray();
        for (int i = 0; i < readableArray.size(); i++) {
            switch (readableArray.getType(i)) {
                case Null:
                    break;
                case Boolean:
                    array.put(readableArray.getBoolean(i));
                    break;
                case Number:
                    array.put(readableArray.getDouble(i));
                    break;
                case String:
                    array.put(readableArray.getString(i));
                    break;
                case Map:
                    array.put(convertMapToJson(readableArray.getMap(i)));
                    break;
                case Array:
                    array.put(convertArrayToJson(readableArray.getArray(i)));
                    break;
            }
        }
        return array;
    }

    /**
     *
     * @param readableArray
     * @return WritableArray
     */
    public static WritableArray convertReadableArrayToWritableArray(@Nullable ReadableArray readableArray) {
        WritableArray array = Arguments.createArray();
        if(null == readableArray) {
            return array;
        }
        for(int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            switch (type) {
                case Null:
                    continue;
                case Boolean:
                    array.pushBoolean(readableArray.getBoolean(i));
                    break;
                case Number:
                    array.pushDouble(readableArray.getDouble(i));
                    break;
                case String:
                    array.pushString(readableArray.getString(i));
                    break;
                case Map:
                    array.pushMap(convertReadableMapToWritableMap(readableArray.getMap(i)));
                    break;
                case Array:
                    array.pushArray(convertReadableArrayToWritableArray(readableArray.getArray(i)));
                    break;
            }
        }
        return array;
    }

    /**
     *
     * @param readableMap
     * @return WritableMap
     */
    public static WritableMap convertReadableMapToWritableMap(@Nullable ReadableMap readableMap) {
        WritableMap map = Arguments.createMap();
        if(null == readableMap) {
            return map;
        }
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);
            switch (type) {
                case Null:
                    continue;
                case Boolean:
                    map.putBoolean(key, readableMap.getBoolean(key));
                    break;
                case String:
                    map.putString(key, readableMap.getString(key));
                    break;
                case Number:
                    map.putDouble(key, readableMap.getDouble(key));
                    break;
                case Map:
                    map.putMap(key, convertReadableMapToWritableMap(readableMap.getMap(key)));
                    break;
                case Array:
                    map.putArray(key, convertReadableArrayToWritableArray(readableMap.getArray(key)));
                    break;
            }
        }
        return map;
    }
}
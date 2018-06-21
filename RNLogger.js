'use strict';
import { NativeModule, NativeEventEmitter } from 'react-native';

export default class RNLogger {
    nativeModule;

    /********************
     * Internal functions
     ********************/
    _addListeners() {
        const customModuleEmitter = new NativeEventEmitter(this.nativeModule);
        customModuleEmitter.addListener('console.error', this._error.bind(this));
        customModuleEmitter.addListener('console.warn', this._warn.bind(this));
        customModuleEmitter.addListener('console.info', this._info.bind(this));
        customModuleEmitter.addListener('console.log', this._log.bind(this));
        customModuleEmitter.addListener('console.debug', this._debug.bind(this));
    }

    _createLogStatementFromEvent(ev){
        return ev.logTag + ": " + ev.message;
    }

    _error(ev){
        console.log(this._createLogStatementFromEvent(ev));
    }

    _warn(ev){
        console.warn(this._createLogStatementFromEvent(ev));
    }

    _info(ev){
        console.info(this._createLogStatementFromEvent(ev));
    }

    _log(ev){
        console.log(this._createLogStatementFromEvent(ev));
    }

    _debug(ev){
        console.debug(this._createLogStatementFromEvent(ev));
    }

    /************
     * Public API 
     ************/
    constructor(nativeModule) {
        this.nativeModule = nativeModule;
        this._addListeners();
    }
}

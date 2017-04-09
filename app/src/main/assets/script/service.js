// 在 iOS 上，小程序的 javascript 代码是运行在 JavaScriptCore 中，是由 WKWebView 来渲染的，环境有 iOS8、iOS9、iOS10
// 在 Android 上，小程序的 javascript 代码是通过 X5 JSCore来解析，是由 X5 基于 Mobile Chrome 37 内核来渲染的
// 在 开发工具上， 小程序的 javascript 代码是运行在 nwjs 中，是由 Chrome Webview 来渲染的

!function (global) { //ServiceJSBridge 对象兼容层
    if ("function" == typeof logxx && logxx("jsbridge start"), !global.ServiceJSBridge) {

        var hasDocument = global.hasOwnProperty("document"),
            isIOS = !1,
            callbacks = {},
            callbackIndex = 0,
            defaultEventHandlers = {},
            eventPrefix = "custom_event_",
            handlers = {};
        if (hasDocument) {
            var userAgent = global.navigator.userAgent,
                isAndroid = userAgent.indexOf("Android") != -1;
            isIOS = !isAndroid
        }
        var postMessage = function (event, paramsString, callbackId) { //postMessage
                if (isIOS) global.webkit.messageHandlers.invokeHandler.postMessage({
                    C: event,
                    paramsString: paramsString,
                    callbackId: callbackId
                });
                else {
                    var jsCoreHandleResult = WeixinJSCore.invokeHandler(event, paramsString, callbackId);
                    if ("undefined" != typeof jsCoreHandleResult && "function" == typeof callbacks[callbackId] && "" !== jsCoreHandleResult) {
                        try {
                            jsCoreHandleResult = JSON.parse(jsCoreHandleResult)
                        } catch (e) {
                            jsCoreHandleResult = {}
                        }
                        callbacks[callbackId](jsCoreHandleResult),
                            delete callbacks[callbackId]
                    }
                }
            },
            publishHandler = function (event, paramsString, webviewIds) { //publishHandler
                isIOS ? global.webkit.messageHandlers.publishHandler.postMessage({
                        event: event,
                        paramsString: paramsString,
                        webviewIds: webviewIds
                    }) : WeixinJSCore.publishHandler(event, paramsString, webviewIds)
            },
            invoke = function (event, params, callback) { //postMessage
                var paramsString = JSON.stringify(params || {}),
                    callbackId = ++callbackIndex;
                callbacks[callbackId] = callback,
                    postMessage(event, paramsString, callbackId)
            },
            invokeCallbackHandler = function (callbackId, params) {
                var callback = callbacks[callbackId];
                "function" == typeof callback && callback(params),
                    delete callbacks[callbackId]
            },
            on = function (eventName, handler) {
                defaultEventHandlers[eventName] = handler
            },
            publish = function (eventName, params, webviewIds) { //publishHandler
                webviewIds = webviewIds || [],
                    webviewIds = JSON.stringify(webviewIds);
                var event = eventPrefix + eventName,
                    paramsString = JSON.stringify(params);
                publishHandler(event, paramsString, webviewIds)
            },
            subscribe = function (eventName, handler) {
                handlers[eventPrefix + eventName] = handler
            },
            subscribeHandler = function (eventName, event, params, o) { //执行注册的回调
                var handler;
                handler = eventName.indexOf(eventPrefix) != -1 ? handlers[eventName] : defaultEventHandlers[eventName],
                "function" == typeof handler && handler(event, params, o)
            };
        global.ServiceJSBridge = {
            invoke: invoke,
            invokeCallbackHandler: invokeCallbackHandler,
            on: on,
            publish: publish,
            subscribe: subscribe,
            subscribeHandler: subscribeHandler
        }
    }
}(this);
var Reporter =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _errorType = __webpack_require__(1);

	var errorType = _interopRequireWildcard(_errorType);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function checkWXjsbridge(e) {
	    "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1);
	}
	function invoke() {
	    //invoke
	    var e = arguments;
	    checkWXjsbridge(function () {
	        WeixinJSBridge.invoke.apply(WeixinJSBridge, e);
	    });
	}
	function publish() {
	    //publish
	    var e = arguments;
	    checkWXjsbridge(function () {
	        WeixinJSBridge.publish.apply(WeixinJSBridge, e);
	    });
	}
	function getUpdateTime() {
	    //get wx.version.updateTime
	    return "undefined" != typeof wx ? wx.version && wx.version.updateTime || "" : "";
	}
	function _reportKeyValue() {
	    !reportKeyValues || reportKeyValues.length <= 0 || (invoke("reportKeyValue", {
	        dataArray: reportKeyValues
	    }), reportKeyValues = []);
	}
	function _reportIDKey() {
	    !reportIDKeys || reportIDKeys.length <= 0 || (invoke("reportIDKey", {
	        dataArray: reportIDKeys
	    }), reportIDKeys = []);
	}
	function systemLog() {
	    !systemLogs || systemLogs.length <= 0 || (invoke("systemLog", {
	        dataArray: systemLogs
	    }), systemLogs = []);
	}
	function getPlatName() {
	    //get platname
	    return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 ? "android" : "" : "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios";
	}
	function reportMessage(e) {
	    //
	    return function () {
	        try {
	            return e.apply(e, arguments);
	        } catch (e) {
	            console.error("reporter error:" + e.message);
	        }
	    };
	}
	function _defindGeter(e) {
	    defineObj.__defineGetter__(e, function () {
	        return reportMessage(reportUtil[e]);
	    });
	}
	var reportIDKeyLength = 1,
	    reportKeyValueLength = 20,
	    systemLogLength = 50,
	    timeLength = 50,
	    reportKeyTime = 50,
	    reportIDKeyTime = 20,
	    logTime = 50,
	    speedReportTemp = 500,
	    slowReportTemp = 500,
	    errorReportTemp = 3,
	    errorReportSize = 3,
	    slowReportLength = 3,
	    errorReportLength = 50,
	    slowReportValueLength = 50,
	    reportKeyValues = [],
	    reportIDKeys = [],
	    systemLogs = [],
	    reportKeyTimePre = 0,
	    reportIDKeyPre = 0,
	    logTimePre = 0,
	    submitPre = 0,
	    slowReportTime = 0,
	    speedReportMap = {},
	    errorReportMap = {},
	    slowReportMap = {};
	"function" == typeof logxx && logxx("reporter-sdk start");
	var isIOS = "ios" === getPlatName();
	var isDevtools = ("devtools" === getPlatName(), function () {});
	var reportUtil = { //log report obj
	    surroundThirdByTryCatch: function surroundThirdByTryCatch(e, t) {
	        return function () {
	            var n;
	            try {
	                var o = Date.now();
	                n = e.apply(e, arguments);
	                var r = Date.now() - o;
	                r > 1e3 && reportUtil.slowReport({
	                    key: "apiCallback",
	                    cost: r,
	                    extend: t
	                });
	            } catch (e) {
	                reportUtil.thirdErrorReport({
	                    error: e,
	                    extend: t
	                });
	            }
	            return n;
	        };
	    },
	    slowReport: function slowReport(e) {
	        var key = e.key,
	            cost = e.cost,
	            extend = e.extend,
	            force = e.force,
	            slowValueType = errorType.SlowValueType[key],
	            now = Date.now();
	        if (slowValueType && (force || !(now - slowReportTime < slowReportTemp)) && !(Object.keys(slowReportMap).length > slowReportValueLength || (slowReportMap[extend] || (slowReportMap[extend] = 0), slowReportMap[extend]++, slowReportMap[extend] > slowReportLength))) {
	            slowReportTime = now;
	            var s = cost + "," + encodeURIComponent(extend) + "," + slowValueType;
	            reportUtil.reportKeyValue({
	                key: "Slow",
	                value: s,
	                force: !0
	            });
	        }
	    },
	    speedReport: function speedReport(e) {
	        var key = e.key,
	            data = e.data,
	            timeMark = e.timeMark,
	            force = e.force,
	            SpeedValueType = errorType.SpeedValueType[key],
	            now = Date.now(),
	            s = 0,
	            nativeTime = timeMark.nativeTime;
	        if (SpeedValueType && (force || !(now - (speedReportMap[SpeedValueType] || 0) < speedReportTemp)) && timeMark.startTime && timeMark.endTime && (1 != SpeedValueType && 2 != SpeedValueType || nativeTime)) {
	            data && (s = JSON.stringify(data).length), speedReportMap[SpeedValueType] = now;
	            var u = SpeedValueType + "," + timeMark.startTime + "," + nativeTime + "," + nativeTime + "," + timeMark.endTime + "," + s;
	            reportUtil.reportKeyValue({
	                key: "Speed",
	                value: u,
	                force: true
	            });
	        }
	    },
	    reportKeyValue: function reportKeyValue(e) {
	        var key = e.key,
	            value = e.value,
	            force = e.force;
	        errorType.KeyValueType[key] && (!force && Date.now() - reportKeyTimePre < reportKeyTime || (reportKeyTimePre = Date.now(), reportKeyValues.push({
	            key: errorType.KeyValueType[key],
	            value: value
	        }), reportKeyValues.length >= reportKeyValueLength && _reportKeyValue()));
	    },
	    reportIDKey: function reportIDKey(e) {
	        var id = e.id,
	            key = e.key,
	            force = e.force;
	        errorType.IDKeyType[key] && (!force && Date.now() - reportIDKeyPre < reportIDKeyTime || (reportIDKeyPre = Date.now(), reportIDKeys.push({
	            id: id ? id : isIOS ? "356" : "358",
	            key: errorType.IDKeyType[key],
	            value: 1
	        }), reportIDKeys.length >= reportIDKeyLength && _reportIDKey()));
	    },
	    thirdErrorReport: function thirdErrorReport(e) {
	        var error = e.error,
	            extend = e.extend;
	        reportUtil.errorReport({
	            key: "thirdScriptError",
	            error: error,
	            extend: extend
	        });
	    },
	    errorReport: function errorReport(e) {
	        var key = e.key,
	            error = e.error,
	            extend = e.extend;
	        if (errorType.ErrorType[key]) {
	            var r = extend ? error.message + ";" + extend : error.message,
	                f = key + "\n" + r + "\n" + error.stack;
	            if (console.error(f), "undefined" != typeof window && "undefined" != typeof window.__webviewId__ ? publish("WEBVIEW_ERROR_MSG", {
	                data: {
	                    msg: f
	                },
	                options: {
	                    timestamp: Date.now()
	                }
	            }) : reportUtil.triggerErrorMessage(f), !(Object.keys(errorReportMap).length > errorReportLength)) {
	                var l = errorType.ErrorType[key] + "," + error.name + "," + encodeURIComponent(r) + "," + encodeURIComponent(error.stack) + "," + encodeURIComponent(getUpdateTime());
	                errorReportMap[l] || (errorReportMap[l] = 0), errorReportMap[l]++, "thirdScriptError" === key && errorReportMap[l] > errorReportTemp || errorReportMap[l] > errorReportSize || (reportUtil.reportIDKey({
	                    key: key
	                }), reportUtil.reportKeyValue({
	                    key: "Error",
	                    value: l
	                }), _reportIDKey(), _reportKeyValue(), systemLog());
	            }
	        }
	    },
	    log: function log(e, t) {
	        e && "string" == typeof e && (!t && Date.now() - logTimePre < logTime || (logTimePre = Date.now(), systemLogs.push(e + ""), systemLogs.length >= systemLogLength && systemLog()));
	    },
	    submit: function submit() {
	        Date.now() - submitPre < timeLength || (submitPre = Date.now(), _reportIDKey(), _reportKeyValue(), systemLog());
	    },
	    registerErrorListener: function registerErrorListener(e) {
	        "function" == typeof e && (isDevtools = e);
	    },
	    unRegisterErrorListener: function unRegisterErrorListener() {
	        isDevtools = function isDevtools() {};
	    },
	    triggerErrorMessage: function triggerErrorMessage(e) {
	        isDevtools(e);
	    }
	};
	var defineObj = {};
	for (var K in reportUtil) {
	    _defindGeter(K);
	}

	"undefined" != typeof window && (window.onbeforeunload = function () {
	    reportUtil.submit();
	});
	module.exports = defineObj;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var IDKeyType = exports.IDKeyType = {
	    login: 1,
	    login_cancel: 2,
	    login_fail: 3,
	    request_fail: 4,
	    connectSocket_fail: 5,
	    closeSocket_fail: 6,
	    sendSocketMessage_fail: 7,
	    uploadFile_fail: 8,
	    downloadFile_fail: 9,
	    redirectTo_fail: 10,
	    navigateTo_fail: 11,
	    navigateBack_fail: 12,
	    appServiceSDKScriptError: 13,
	    webviewSDKScriptError: 14,
	    jsEnginScriptError: 15,
	    thirdScriptError: 16,
	    webviewScriptError: 17,
	    exparserScriptError: 18,
	    startRecord: 19,
	    startRecord_fail: 20,
	    getLocation: 21,
	    getLocation_fail: 22,
	    chooseLocation: 23,
	    chooseLocation_fail: 24,
	    openAddress: 25,
	    openAddress_fail: 26,
	    openLocation: 27,
	    openLocation_fail: 28,
	    makePhoneCall: 29,
	    makePhoneCall_fail: 30,
	    operateWXData: 31,
	    operateWXData_fail: 32,
	    checkLogin: 33,
	    checkLogin_fail: 34,
	    refreshSession: 35,
	    refreshSession_fail: 36,
	    chooseVideo: 37,
	    chooseVideo_fail: 38,
	    chooseImage: 39,
	    chooseImage_fail: 40,
	    verifyPaymentPassword: 41,
	    verifyPaymentPassword_fail: 42,
	    requestPayment: 43,
	    requestPayment_fail: 44,
	    bindPaymentCard: 45,
	    bindPaymentCard_fail: 46,
	    requestPaymentToBank: 47,
	    requestPaymentToBank_fail: 48,
	    openDocument: 49,
	    openDocument_fail: 50,
	    chooseContact: 51,
	    chooseContact_fail: 52,
	    operateMusicPlayer: 53,
	    operateMusicPlayer_fail: 54,
	    getMusicPlayerState_fail: 55,
	    playVoice_fail: 56,
	    setNavigationBarTitle_fail: 57,
	    switchTab_fail: 58,
	    getImageInfo_fail: 59,
	    enableCompass_fail: 60,
	    enableAccelerometer_fail: 61,
	    getStorage_fail: 62,
	    setStorage_fail: 63,
	    clearStorage_fail: 64,
	    removeStorage_fail: 65,
	    getStorageInfo_fail: 66,
	    getStorageSync_fail: 67,
	    setStorageSync_fail: 68,
	    addCard_fail: 69,
	    openCard_fail: 70
	};
	var KeyValueType = exports.KeyValueType = {
	    Speed: "13544",
	    Error: "13582",
	    Slow: "13968"
	};
	var SpeedValueType = exports.SpeedValueType = {
	    webview2AppService: 1,
	    appService2Webview: 2,
	    funcReady: 3,
	    firstGetData: 4,
	    firstRenderTime: 5,
	    reRenderTime: 6,
	    forceUpdateRenderTime: 7,
	    appRoute2newPage: 8,
	    newPage2pageReady: 9,
	    thirdScriptRunTime: 10,
	    pageframe: 11,
	    WAWebview: 12
	};
	var SlowValueType = exports.SlowValueType = {
	    apiCallback: 1,
	    pageInvoke: 2
	};
	var ErrorType = exports.ErrorType = {
	    appServiceSDKScriptError: 1,
	    webviewSDKScriptError: 2,
	    jsEnginScriptError: 3,
	    thirdScriptError: 4,
	    webviewScriptError: 5,
	    exparserScriptError: 6
	};

/***/ }
/******/ ]);
var wxs =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _pubsub = __webpack_require__(13);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _utils = __webpack_require__(14);

	var _utils2 = _interopRequireDefault(_utils);

	var _Animation = __webpack_require__(15);

	var _Animation2 = _interopRequireDefault(_Animation);

	var _createAudio = __webpack_require__(16);

	var _createAudio2 = _interopRequireDefault(_createAudio);

	var _createVideo = __webpack_require__(19);

	var _createVideo2 = _interopRequireDefault(_createVideo);

	var _map = __webpack_require__(20);

	var _map2 = _interopRequireDefault(_map);

	var _configFlags = __webpack_require__(18);

	var _configFlags2 = _interopRequireDefault(_configFlags);

	var _context = __webpack_require__(21);

	var _context2 = _interopRequireDefault(_context);

	var _canvas = __webpack_require__(22);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _appContextSwitch = __webpack_require__(24);

	var _appContextSwitch2 = _interopRequireDefault(_appContextSwitch);

	__webpack_require__(25);

	__webpack_require__(26);

	__webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addGetterForWX(apiKey) {
	    WX.__defineGetter__(apiKey, function () {
	        return _utils2.default.surroundByTryCatchFactory(WXAPIs[apiKey], "wxs." + apiKey);
	    });
	}

	function paramCheck(apiName, params, paramTpl) {
	    var res = _utils2.default.paramCheck(params, paramTpl);
	    return !res || (logErr(apiName, params, apiName + ":fail parameter error: " + res), !1);
	}

	function checkUrl(e, t) {
	    //判断当前页面是否在app.json里
	    var n = /^(.*)\.html/gi.exec(t.url);
	    return !n || __wxConfig__.pages.indexOf(n[1]) !== -1 || (logErr(e, t, e + ":fail url not in app.json"), !1);
	}

	"function" == typeof logxx && logxx("sdk start");

	var callbackFunc = function callbackFunc() {},
	    T = {},
	    currUrl = "",
	    appRouteCallbacks = [],
	    x = [],
	    P = void 0,
	    WX = {},
	    I = ("devtools" === _utils2.default.getPlatform(), !1),
	    O = !1,
	    E = [],
	    R = [],
	    j = void 0,
	    curWebViewId = void 0;

	"devtools" === _utils2.default.getPlatform() && _pubsub2.default.subscribe("SPECIAL_PAGE_EVENT", function (event) {
	    var data = event.data,
	        eventName = event.eventName,
	        ext = event.ext,
	        webViewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	    if (data && "input" == data.type && "function" == typeof P) {
	        var res = P({
	            data: data,
	            eventName: eventName,
	            webviewId: webViewId
	        }),
	            value = data.detail.value;
	        if (ext && ext.setKeyboardValue) {} else if ("Object" === _utils2.default.getDataType(res)) {
	            var params = {};
	            value != res.value && (params.value = res.value + "");
	            isNaN(parseInt(res.cursor)) || (params.cursor = parseInt(res.cursor));
	            _pubsub2.default.publish("setKeyboardValue", params, [webViewId]);
	        } else {
	            value != res && _pubsub2.default.publish("setKeyboardValue", {
	                value: res + "",
	                cursor: -1
	            }, [webViewId]);
	        }
	    }
	});

	var logErr = function logErr(apiName) {
	    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
	        errMsg = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
	    console.error(errMsg);
	    Reporter.triggerErrorMessage(errMsg);
	    var fail = Reporter.surroundThirdByTryCatch(options.fail || callbackFunc, "at api " + apiName + " fail callback function"),
	        complete = Reporter.surroundThirdByTryCatch(options.complete || callbackFunc, "at api " + apiName + " complete callback function");
	    fail({
	        errMsg: errMsg
	    });
	    complete({
	        errMsg: errMsg
	    });
	};

	var WXAPIs = { //wx对象
	    invoke: _pubsub2.default.invoke,
	    on: _pubsub2.default.on,
	    drawCanvas: _canvas2.default.drawCanvas,
	    createContext: _canvas2.default.createContext,
	    createCanvasContext: _canvas2.default.createCanvasContext,
	    canvasToTempFilePath: _canvas2.default.canvasToTempFilePath,
	    reportIDKey: function reportIDKey(e, t) {},
	    reportKeyValue: function reportKeyValue(e, t) {},
	    onPullDownRefresh: function onPullDownRefresh(e) {
	        console.log("onPullDownRefresh has been removed from api list");
	    },
	    setNavigationBarTitle: function setNavigationBarTitle() {
	        var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        paramCheck("setNavigationBarTitle", params, {
	            title: ""
	        }) && _pubsub2.default.invokeMethod("setNavigationBarTitle", params);
	    },
	    showNavigationBarLoading: function showNavigationBarLoading(e) {
	        _pubsub2.default.invokeMethod("showNavigationBarLoading", e);
	    },
	    hideNavigationBarLoading: function hideNavigationBarLoading(e) {
	        _pubsub2.default.invokeMethod("hideNavigationBarLoading", e);
	    },
	    stopPullDownRefresh: function stopPullDownRefresh(e) {
	        _pubsub2.default.invokeMethod("stopPullDownRefresh", e);
	    },
	    redirectTo: function redirectTo(params) {
	        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
	        if (paramCheck("redirectTo", params, { url: "" })) {
	            params.url = _utils2.default.getRealRoute(currUrl, params.url);
	            params.url = _utils2.default.encodeUrlQuery(params.url);
	            checkUrl("redirectTo", params) && _pubsub2.default.invokeMethod("redirectTo", params, {
	                afterSuccess: function afterSuccess() {
	                    currUrl = params.url;
	                }
	            });
	        }
	    },
	    navigateTo: function navigateTo(params) {
	        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
	        if (paramCheck("navigateTo", params, { url: "" })) {
	            params.url = _utils2.default.getRealRoute(currUrl, params.url);
	            params.url = _utils2.default.encodeUrlQuery(params.url);
	            checkUrl("navigateTo", params) && _pubsub2.default.invokeMethod("navigateTo", params, {
	                afterSuccess: function afterSuccess() {
	                    currUrl = params.url;
	                    _context2.default.notifyCurrentRoutetoContext(currUrl);
	                }
	            });
	        }
	    },
	    switchTab: function switchTab() {
	        var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        if (paramCheck("switchTab", params, { url: "" })) {
	            /\?.*$/.test(params.url) && (console.warn("wxs.switchTab: url 不支持 queryString"), params.url = params.url.replace(/\?.*$/, ""));
	            params.url = _utils2.default.getRealRoute(currUrl, params.url);
	            params.url = _utils2.default.encodeUrlQuery(params.url);
	            checkUrl("switchTab", params) && _pubsub2.default.invokeMethod("switchTab", params, {
	                afterSuccess: function afterSuccess() {
	                    currUrl = params.url;
	                    _context2.default.notifyCurrentRoutetoContext(currUrl);
	                }
	            });
	        }
	    },
	    navigateBack: function navigateBack() {
	        var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        "number" != typeof params.delta ? params.delta = 1 : (params.delta = parseInt(params.delta), params.delta < 1 && (params.delta = 1));
	        _pubsub2.default.invokeMethod("navigateBack", params);
	    },
	    getStorage: function getStorage(params) {
	        if (paramCheck("getStorage", params, { key: "" })) {
	            _pubsub2.default.invokeMethod("getStorage", params, {
	                beforeSuccess: function beforeSuccess(res) {
	                    res.data = _utils2.default.stringToAnyType(res.data, res.dataType);
	                    delete res.dataType;
	                },
	                afterFail: function afterFail() {
	                    var res = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	                    if (res.errMsg && res.errMsg.indexOf("data not found") > 0) return !1;
	                }
	            });
	        }
	    },
	    getStorageSync: function getStorageSync(key) {
	        if (paramCheck("getStorageSync", key, "")) {
	            var rt,
	                apiName = "ios" === _utils2.default.getPlatform() ? "getStorage" : "getStorageSync";
	            _pubsub2.default.invokeMethod(apiName, { key: key }, {
	                beforeAll: function beforeAll() {
	                    var res = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	                    rt = _utils2.default.stringToAnyType(res.data, res.dataType);
	                },
	                afterFail: function afterFail() {
	                    var res = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	                    if (res.errMsg && res.errMsg.indexOf("data not found") > 0) return !1;
	                }
	            });
	            return rt;
	        }
	    },
	    setStorage: function setStorage(params) {
	        if (paramCheck("setStorage", params, { key: "" })) {
	            try {
	                var opt = _utils2.default.anyTypeToString(params.data),
	                    data = opt.data,
	                    dataType = opt.dataType;
	                _pubsub2.default.invokeMethod("setStorage", {
	                    key: params.key,
	                    data: data,
	                    dataType: dataType,
	                    success: params.success,
	                    fail: params.fail,
	                    complete: params.complete
	                });
	            } catch (e) {
	                "function" == typeof params.fail && params.fail({
	                    errMsg: "setStorage:fail " + e.message
	                }), "function" == typeof params.complete && params.complete({
	                    errMsg: "setStorage:fail " + e.message
	                });
	            }
	        }
	    },
	    setStorageSync: function setStorageSync(key) {
	        var value = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
	        if (paramCheck("setStorage", key, "")) {
	            var apiName = "ios" === _utils2.default.getPlatform() ? "setStorage" : "setStorageSync",
	                dataObj = _utils2.default.anyTypeToString(value),
	                data = dataObj.data,
	                dataType = dataObj.dataType;
	            _pubsub2.default.invokeMethod(apiName, {
	                key: key,
	                data: data,
	                dataType: dataType
	            });
	        }
	    },
	    removeStorage: function removeStorage(params) {
	        paramCheck("removeStorage", params, { key: "" }) && _pubsub2.default.invokeMethod("removeStorage", params);
	    },
	    removeStorageSync: function removeStorageSync(key) {
	        paramCheck("removeStorageSync", key, "") && _pubsub2.default.invokeMethod("removeStorageSync", {
	            key: key
	        });
	    },
	    clearStorage: function clearStorage(key) {
	        _pubsub2.default.invokeMethod("clearStorage", key);
	    },
	    clearStorageSync: function clearStorageSync() {
	        var apiName = "ios" === _utils2.default.getPlatform() ? "clearStorage" : "clearStorageSync";
	        _pubsub2.default.invokeMethod(apiName);
	    },
	    getStorageInfo: function getStorageInfo(key) {
	        _pubsub2.default.invokeMethod("getStorageInfo", key);
	    },
	    getStorageInfoSync: function getStorageInfoSync() {
	        var rt = void 0;
	        _pubsub2.default.invokeMethod("getStorageInfoSync", {}, {
	            beforeAll: function beforeAll(t) {
	                rt = t;
	                delete t.errMsg;
	            }
	        });
	        return rt;
	    },
	    request: function request() {
	        var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        if (paramCheck("request", params, { url: "" })) {
	            if (_utils2.default.validateUrl(params.url) === !1) return logErr("request", params, 'request:fail invalid url "' + params.url + '"');
	            if ("function" === params.data) return logErr("request", params, "request:fail data should not be Function");
	            var headerType = _utils2.default.getDataType(params.header);
	            params.header = params.header || {};
	            params.header = _utils2.default.convertObjectValueToString(params.header);
	            "Undefined" !== headerType && "Object" !== headerType && (console.warn("wxs.request: header must be an object"), params.header = {});
	            params.header = Object.keys(params.header).reduce(function (res, cur) {
	                "content-type" === cur.toLowerCase() ? res[cur.toLowerCase()] = params.header[cur] : res[cur] = params.header[cur];
	                return res;
	            }, {});
	            params.method && (params.method = params.method.toUpperCase());
	            var headers = params.header || {},
	                requestMethod = "GET";
	            "string" == typeof params.method && (requestMethod = params.method.toUpperCase());
	            var data;
	            params.dataType = params.dataType || "json";
	            headers["content-type"] = headers["content-type"] || "application/json";
	            data = !params.data ? "" : "string" != typeof params.data ? headers["content-type"].indexOf("application/x-www-form-urlencoded") > -1 ? _utils2.default.urlEncodeFormData(params.data, !0) : headers["content-type"].indexOf("application/json") > -1 ? JSON.stringify(params.data) : "object" === _typeof(params.data) ? JSON.stringify(params.data) : data.toString() : params.data;
	            "GET" == requestMethod && (params.url = _utils2.default.addQueryStringToUrl(params.url, params.data));
	            _pubsub2.default.invokeMethod("request", {
	                url: params.url,
	                data: data,
	                header: headers,
	                method: requestMethod,
	                success: params.success,
	                fail: params.fail,
	                complete: params.complete
	            }, {
	                beforeSuccess: function beforeSuccess(res) {
	                    if ("json" === params.dataType) {
	                        try {
	                            res.data = JSON.parse(res.data);
	                        } catch (e) {}
	                    }
	                    res.statusCode = parseInt(res.statusCode);
	                }
	            });
	        }
	    },
	    connectSocket: function connectSocket(e) {
	        if (paramCheck("connectSocket", e, {
	            url: ""
	        })) {
	            "object" !== _typeof(e.header) && "undefined" != typeof e.header && (console.warn("connectSocket: header must be an object"), delete e.header);
	            var t = {};
	            e.header && (t = _utils2.default.convertObjectValueToString(e.header)), _pubsub2.default.invokeMethod("connectSocket", _utils2.default.assign({}, e, {
	                header: t
	            }), {
	                beforeSuccess: function beforeSuccess(e) {
	                    e.statusCode = parseInt(e.statusCode);
	                }
	            });
	        }
	    },
	    closeSocket: function closeSocket(e) {
	        _pubsub2.default.invokeMethod("closeSocket", e);
	    },
	    sendSocketMessage: function sendSocketMessage(e) {
	        var t = _utils2.default.getDataType(e.data);
	        "devtools" === _utils2.default.getPlatform() ? _pubsub2.default.invokeMethod("sendSocketMessage", e) : "String" === t ? _pubsub2.default.invokeMethod("sendSocketMessage", e) : "ArrayBuffer" === t && _pubsub2.default.invokeMethod("sendSocketMessage", _utils2.default.assign(e, {
	            data: _utils2.default.arrayBufferToBase64(e.data),
	            isBuffer: !0
	        }));
	    },
	    onSocketOpen: function onSocketOpen(e) {
	        paramCheck("onSocketOpen", e, callbackFunc) && _pubsub2.default.onMethod("onSocketOpen", Reporter.surroundThirdByTryCatch(e, "at onSocketOpen callback function"));
	    },
	    onSocketClose: function onSocketClose(e) {
	        paramCheck("onSocketClose", e, callbackFunc) && _pubsub2.default.onMethod("onSocketClose", Reporter.surroundThirdByTryCatch(e, "at onSocketClose callback function"));
	    },
	    onSocketMessage: function onSocketMessage(e) {
	        if (paramCheck("onSocketMessage", e, callbackFunc)) {
	            var t = Reporter.surroundThirdByTryCatch(e, "at onSocketMessage callback function");
	            _pubsub2.default.onMethod("onSocketMessage", function (e) {
	                "devtools" !== _utils2.default.getPlatform() && e.isBuffer === !0 && (e.data = _utils2.default.base64ToArrayBuffer(e.data)), delete e.isBuffer, "devtools" === _utils2.default.getPlatform() && "Blob" === _utils2.default.getDataType(e.data) ? _utils2.default.blobToArrayBuffer(e.data, function (n) {
	                    e.data = n, t(e);
	                }) : t(e);
	            });
	        }
	    },
	    onSocketError: function onSocketError(e) {
	        _pubsub2.default.onMethod("onSocketError", Reporter.surroundThirdByTryCatch(e, "at onSocketError callback function"));
	    },
	    uploadFile: function uploadFile(e) {
	        if (paramCheck("uploadFile", e, {
	            url: "",
	            filePath: "",
	            name: ""
	        })) {
	            "object" !== _typeof(e.header) && "undefined" != typeof e.header && (console.warn("uploadFile: header must be an object"), delete e.header), "object" !== _typeof(e.formData) && "undefined" != typeof e.formData && (console.warn("uploadFile: formData must be an object"), delete e.formData);
	            var t = {},
	                n = {};
	            e.header && (t = _utils2.default.convertObjectValueToString(e.header)), e.formData && (n = _utils2.default.convertObjectValueToString(e.formData)), _pubsub2.default.invokeMethod("uploadFile", _utils2.default.assign({}, e, {
	                header: t,
	                formData: n
	            }), {
	                beforeSuccess: function beforeSuccess(e) {
	                    e.statusCode = parseInt(e.statusCode);
	                }
	            });
	        }
	    },
	    downloadFile: function downloadFile(e) {
	        paramCheck("downloadFile", e, {
	            url: ""
	        }) && _pubsub2.default.invokeMethod("downloadFile", e, {
	            beforeSuccess: function beforeSuccess(e) {
	                e.statusCode = parseInt(e.statusCode);
	                var t = [200, 304];
	                t.indexOf(e.statusCode) === -1 && delete e.tempFilePath;
	            }
	        });
	    },
	    chooseImage: function chooseImage() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        _pubsub2.default.invokeMethod("chooseImage", _utils2.default.assign({
	            count: 9,
	            sizeType: ["original", "compressed"],
	            sourceType: ["album", "camera"]
	        }, e));
	    },
	    previewImage: function previewImage(e) {
	        paramCheck("previewImage", e, {
	            urls: [""]
	        }) && _pubsub2.default.invokeMethod("previewImage", e);
	    },
	    getImageInfo: function getImageInfo(e) {
	        paramCheck("getImageInfo", e, {
	            src: ""
	        }) && (/^(http|https):\/\//.test(e.src) ? _pubsub2.default.invokeMethod("downloadFile", {
	            url: e.src
	        }, {
	            afterSuccess: function afterSuccess(t) {
	                e.src = t.tempFilePath, _pubsub2.default.invokeMethod("getImageInfo", e, {
	                    beforeSuccess: function beforeSuccess(t) {
	                        t.path = e.src;
	                    }
	                });
	            },
	            afterFail: function afterFail() {
	                logErr("getImageInfo", e, "getImageInfo:fail download image fail");
	            }
	        }) : /^wxfile:\/\//.test(e.src) ? _pubsub2.default.invokeMethod("getImageInfo", e, {
	            beforeSuccess: function beforeSuccess(t) {
	                t.path = e.src;
	            }
	        }) : (e.src = _utils2.default.getRealRoute(currUrl, e.src, !1), _pubsub2.default.invokeMethod("getImageInfo", e, {
	            beforeSuccess: function beforeSuccess(t) {
	                t.path = e.src;
	            }
	        })));
	    },
	    startRecord: function startRecord(e) {
	        WXAPIs.appStatus === _configFlags2.default.AppStatus.BACK_GROUND && WXAPIs.hanged === !1 || _pubsub2.default.invokeMethod("startRecord", e);
	    },
	    stopRecord: function stopRecord(e) {
	        _pubsub2.default.invokeMethod("stopRecord", e);
	    },
	    playVoice: function playVoice(e) {
	        paramCheck("playVoice", e, {
	            filePath: ""
	        }) && _pubsub2.default.invokeMethod("playVoice", e);
	    },
	    pauseVoice: function pauseVoice(e) {
	        _pubsub2.default.invokeMethod("pauseVoice", e);
	    },
	    stopVoice: function stopVoice(e) {
	        _pubsub2.default.invokeMethod("stopVoice", e);
	    },
	    onVoicePlayEnd: function onVoicePlayEnd(e) {
	        _pubsub2.default.onMethod("onVoicePlayEnd", Reporter.surroundThirdByTryCatch(e, "at onVoicePlayEnd callback function"));
	    },
	    chooseVideo: function chooseVideo() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        e.sourceType = e.sourceType || ["album", "camera"], e.camera = e.camera || ["front", "back"], _pubsub2.default.invokeMethod("chooseVideo", e);
	    },
	    getLocation: function getLocation(e) {
	        console.log("getLocation", e, WXAPIs.appStatus, WXAPIs.hanged), WXAPIs.appStatus === _configFlags2.default.AppStatus.BACK_GROUND && WXAPIs.hanged === !1 || _pubsub2.default.invokeMethod("getLocation", e);
	    },
	    openLocation: function openLocation() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        paramCheck("openLocation", e, {
	            latitude: .1,
	            longitude: .1
	        }) && _pubsub2.default.invokeMethod("openLocation", e);
	    },
	    chooseLocation: function chooseLocation() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        _pubsub2.default.invokeMethod("chooseLocation", e);
	    },
	    getNetworkType: function getNetworkType(e) {
	        _pubsub2.default.invokeMethod("getNetworkType", e);
	    },
	    getSystemInfo: function getSystemInfo(e) {
	        var t = _utils2.default.getPlatform();
	        _pubsub2.default.invokeMethod("getSystemInfo", e, {
	            beforeSuccess: function beforeSuccess(e) {
	                e.platform = t;
	            }
	        });
	    },
	    getSystemInfoSync: function getSystemInfoSync(e) {
	        var t = {},
	            n = _utils2.default.getPlatform();
	        return _pubsub2.default.invokeMethod("getSystemInfo", {}, {
	            beforeSuccess: function beforeSuccess() {
	                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	                t = e, t.platform = n, delete e.errMsg;
	            }
	        }), t;
	    },
	    onAccelerometerChange: function onAccelerometerChange(e) {
	        I || (_pubsub2.default.invokeMethod("enableAccelerometer", {
	            enable: !0
	        }), I = !0), E.push(Reporter.surroundThirdByTryCatch(e, "at onAccelerometerChange callback function"));
	    },
	    onCompassChange: function onCompassChange(e) {
	        O || (_pubsub2.default.invokeMethod("enableCompass", {
	            enable: !0
	        }), O = !0), R.push(Reporter.surroundThirdByTryCatch(e, "at onCompassChange callback function"));
	    },
	    reportAction: function reportAction(e) {
	        _pubsub2.default.invokeMethod("reportAction", e);
	    },
	    getBackgroundAudioPlayerState: function getBackgroundAudioPlayerState(e) {
	        _pubsub2.default.invokeMethod("getMusicPlayerState", e, {
	            beforeAll: function beforeAll(e) {
	                e.errMsg = e.errMsg.replace("getBackgroundAudioPlayerState", "getMusicPlayerState");
	            }
	        });
	    },
	    playBackgroundAudio: function playBackgroundAudio() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        WXAPIs.appStatus === _configFlags2.default.AppStatus.BACK_GROUND && WXAPIs.hanged === !1 || _pubsub2.default.invokeMethod("operateMusicPlayer", _utils2.default.assign({
	            operationType: "play"
	        }, e), {
	            beforeAll: function beforeAll(e) {
	                e.errMsg = e.errMsg.replace("operateMusicPlayer", "playBackgroundAudio");
	            }
	        });
	    },
	    pauseBackgroundAudio: function pauseBackgroundAudio() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        _pubsub2.default.invokeMethod("operateMusicPlayer", _utils2.default.assign({
	            operationType: "pause"
	        }, e), {
	            beforeAll: function beforeAll(e) {
	                e.errMsg = e.errMsg.replace("operateMusicPlayer", "pauseBackgroundAudio");
	            }
	        });
	    },
	    seekBackgroundAudio: function seekBackgroundAudio() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        paramCheck("seekBackgroundAudio", e, {
	            position: 1
	        }) && _pubsub2.default.invokeMethod("operateMusicPlayer", _utils2.default.assign({
	            operationType: "seek"
	        }, e), {
	            beforeAll: function beforeAll(e) {
	                e.errMsg = e.errMsg.replace("operateMusicPlayer", "seekBackgroundAudio");
	            }
	        });
	    },
	    stopBackgroundAudio: function stopBackgroundAudio() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        console.log("stopBackgroundAudio"), _pubsub2.default.invokeMethod("operateMusicPlayer", _utils2.default.assign({
	            operationType: "stop"
	        }, e), {
	            beforeAll: function beforeAll(e) {
	                e.errMsg = e.errMsg.replace("operateMusicPlayer", "stopBackgroundAudio");
	            }
	        });
	    },
	    onBackgroundAudioPlay: function onBackgroundAudioPlay(e) {
	        _pubsub2.default.onMethod("onMusicPlay", Reporter.surroundThirdByTryCatch(e, "at onBackgroundAudioPlay callback function"));
	    },
	    onBackgroundAudioPause: function onBackgroundAudioPause(e) {
	        _pubsub2.default.onMethod("onMusicPause", Reporter.surroundThirdByTryCatch(e, "at onBackgroundAudioPause callback function"));
	    },
	    onBackgroundAudioStop: function onBackgroundAudioStop(e) {
	        _pubsub2.default.onMethod("onMusicEnd", Reporter.surroundThirdByTryCatch(e, "at onBackgroundAudioStop callback function"));
	    },
	    login: function login(e) {
	        _pubsub2.default.invokeMethod("login", e);
	    },
	    checkLogin: function checkLogin(e) {
	        _pubsub2.default.invokeMethod("checkLogin", e);
	    },
	    checkSession: function checkSession(e) {
	        j && clearTimeout(j), _pubsub2.default.invokeMethod("refreshSession", e, {
	            beforeSuccess: function beforeSuccess(e) {
	                j = setTimeout(function () {
	                    _pubsub2.default.invokeMethod("refreshSession");
	                }, 1e3 * e.expireIn), delete e.err_code, delete e.expireIn;
	            },
	            beforeAll: function beforeAll(e) {
	                e.errMsg = e.errMsg.replace("refreshSession", "checkSession");
	            }
	        });
	    },
	    authorize: function authorize(e) {
	        _pubsub2.default.invokeMethod("authorize", e);
	    },
	    getUserInfo: function getUserInfo(e) {
	        _pubsub2.default.invokeMethod("operateWXData", _utils2.default.assign({
	            data: {
	                api_name: "webapi_getuserinfo",
	                data: e.data || {}
	            }
	        }, e), {
	            beforeAll: function beforeAll(e) {
	                e.errMsg = e.errMsg.replace("operateWXData", "getUserInfo");
	            },
	            beforeSuccess: function beforeSuccess(e) {
	                "android" === _utils2.default.getPlatform() && (e.data = JSON.parse(e.data)), e.rawData = e.data.data;
	                try {
	                    e.userInfo = JSON.parse(e.data.data), e.signature = e.data.signature, e.data.encryptData && (console.group(new Date() + " encryptData 字段即将废除"), console.warn("请使用 encryptedData 和 iv 字段进行解密，详见：https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html"), console.groupEnd(), e.encryptData = e.data.encryptData), e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data;
	                } catch (e) {}
	            }
	        });
	    },
	    getFriends: function getFriends(e) {
	        _pubsub2.default.invokeMethod("operateWXData", {
	            data: {
	                api_name: "webapi_getfriends",
	                data: e.data || {}
	            },
	            success: e.success,
	            fail: e.fail,
	            complete: e.complete
	        }, {
	            beforeAll: function beforeAll(e) {
	                e.errMsg = e.errMsg.replace("operateWXData", "getFriends");
	            },
	            beforeSuccess: function beforeSuccess(e) {
	                "android" === _utils2.default.getPlatform() && (e.data = JSON.parse(e.data)), e.rawData = e.data.data;
	                try {
	                    e.friends = JSON.parse(e.data.data), e.signature = e.data.signature, delete e.data;
	                } catch (e) {}
	            }
	        });
	    },
	    requestPayment: function requestPayment(e) {
	        paramCheck("requestPayment", e, {
	            timeStamp: "",
	            nonceStr: "",
	            package: "",
	            signType: "",
	            paySign: ""
	        }) && _pubsub2.default.invokeMethod("requestPayment", e);
	    },
	    verifyPaymentPassword: function verifyPaymentPassword(e) {
	        _pubsub2.default.invokeMethod("verifyPaymentPassword", e);
	    },
	    bindPaymentCard: function bindPaymentCard(e) {
	        _pubsub2.default.invokeMethod("bindPaymentCard", e);
	    },
	    requestPaymentToBank: function requestPaymentToBank(e) {
	        _pubsub2.default.invokeMethod("requestPaymentToBank", e);
	    },
	    addCard: function addCard(e) {
	        paramCheck("addCard", e, {
	            cardList: []
	        }) && _pubsub2.default.invokeMethod("addCard", e);
	    },
	    openCard: function openCard(e) {
	        paramCheck("openCard", e, {
	            cardList: []
	        }) && _pubsub2.default.invokeMethod("openCard", e);
	    },
	    scanCode: function scanCode() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        paramCheck("scanCode", e, {}) && _pubsub2.default.invokeMethod("scanCode", e, {
	            beforeSuccess: function beforeSuccess(e) {
	                "string" == typeof e.path && (e.path = e.path.replace(/\.html$/, ""), e.path = e.path.replace(/\.html\?/, "?"));
	            }
	        });
	    },
	    openAddress: function openAddress(e) {
	        _pubsub2.default.invokeMethod("openAddress", e);
	    },
	    saveFile: function saveFile(e) {
	        paramCheck("saveFile", e, {
	            tempFilePath: ""
	        }) && _pubsub2.default.invokeMethod("saveFile", e);
	    },
	    openDocument: function openDocument(e) {
	        paramCheck("openDocument", e, {
	            filePath: ""
	        }) && _pubsub2.default.invokeMethod("openDocument", e);
	    },
	    chooseContact: function chooseContact(e) {
	        _pubsub2.default.invokeMethod("chooseContact", e);
	    },
	    makePhoneCall: function makePhoneCall() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        paramCheck("makePhoneCall", e, {
	            phoneNumber: ""
	        }) && _pubsub2.default.invokeMethod("makePhoneCall", e);
	    },
	    onAppRoute: function onAppRoute(e, t) {
	        appRouteCallbacks.push(e);
	    },
	    onAppRouteDone: function onAppRouteDone(e, t) {
	        x.push(e);
	    },
	    onAppEnterBackground: function onAppEnterBackground(e) {
	        _appContextSwitch2.default.onAppEnterBackground.call(WXAPIs, e);
	    },
	    onAppEnterForeground: function onAppEnterForeground(e) {
	        _appContextSwitch2.default.onAppEnterForeground.call(WXAPIs, e);
	    },
	    setAppData: function setAppData(e) {
	        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
	            n = arguments[2];
	        arguments[3];
	        if (t.forceUpdate = "undefined" != typeof t.forceUpdate && t.forceUpdate, _utils2.default.isObject(e) === !1) throw new _utils2.default.AppServiceSdkKnownError("setAppData:data should be an object");
	        !function () {
	            var o = !1,
	                r = {},
	                i = function i(e, t, n) {
	                o = !0, r[e] = t, "Array" === n || "Object" === n ? T[e] = JSON.parse(JSON.stringify(t)) : T[e] = t;
	            };
	            for (var a in e) {
	                var s = e[a],
	                    c = T[a],
	                    l = _utils2.default.getDataType(c),
	                    d = _utils2.default.getDataType(s);
	                l !== d ? i(a, s, d) : "Array" == l || "Object" == l ? JSON.stringify(c) !== JSON.stringify(s) && i(a, s, d) : "String" == l || "Number" == l || "Boolean" == l ? c.toString() !== s.toString() && i(a, s, d) : "Date" == l ? c.getTime().toString() !== s.getTime().toString() && i(a, s, d) : c !== s && i(a, s, d);
	            }
	            t.forceUpdate ? _pubsub2.default.publish("appDataChange", {
	                data: e,
	                option: {
	                    timestamp: Date.now(),
	                    forceUpdate: !0
	                }
	            }, n) : o && _pubsub2.default.publish("appDataChange", {
	                data: r
	            }, n);
	        }();
	    },
	    onPageEvent: function onPageEvent(e, t) {
	        console.warn("'onPageEvent' is deprecated, use 'Page[eventName]'");
	    },
	    createAnimation: function createAnimation() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        if (paramCheck("createAnimation", e, {})) return new _Animation2.default(e);
	    },
	    createAudioContext: function createAudioContext(e) {
	        return _createAudio2.default.call(WXAPIs, e, curWebViewId);
	    },
	    createVideoContext: function createVideoContext(e) {
	        return _createVideo2.default.call(WXAPIs, e, curWebViewId);
	    },
	    createMapContext: function createMapContext(e) {
	        return new _map2.default.MapContext(e);
	    },
	    onWebviewEvent: function onWebviewEvent(e, t) {
	        P = e, _pubsub2.default.subscribe("PAGE_EVENT", function (t) {
	            var n = t.data,
	                o = t.eventName,
	                r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	            e({
	                data: n,
	                eventName: o,
	                webviewId: r
	            });
	        });
	    },
	    onNativeEvent: function onNativeEvent(e) {
	        ["onCanvasTouchStart", "onCanvasTouchMove", "onCanvasTouchEnd"].forEach(function (t) {
	            _pubsub2.default.onMethod(t, function (n, o) {
	                e({
	                    data: n,
	                    eventName: t,
	                    webviewId: o
	                });
	            });
	        });
	    },
	    hideKeyboard: function hideKeyboard(e) {
	        "devtools" == _utils2.default.getPlatform() ? _pubsub2.default.publish("hideKeyboard", {}) : _pubsub2.default.invokeMethod("hideKeyboard", e);
	    },
	    getPublicLibVersion: function getPublicLibVersion() {
	        var e = void 0;
	        return _pubsub2.default.invokeMethod("getPublicLibVersion", {
	            complete: function complete(t) {
	                t.version ? e = t.version : (e = t, delete e.errMsg);
	            }
	        }), e;
	    },
	    showModal: function showModal() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	            t = {
	            title: "",
	            content: "",
	            confirmText: "确定",
	            cancelText: "取消",
	            showCancel: !0,
	            confirmColor: "#3CC51F",
	            cancelColor: "#000000"
	        };
	        if (t = _utils2.default.extend(t, e), paramCheck("showModal", t, {
	            title: "",
	            content: "",
	            confirmText: "",
	            cancelText: "",
	            confirmColor: "",
	            cancelColor: ""
	        })) return t.confirmText.length > 4 ? void logErr("showModal", e, "showModal:fail confirmText length should not large then 4") : t.cancelText.length > 4 ? void logErr("showModal", e, "showModal:fail cancelText length should not large then 4") : _pubsub2.default.invokeMethod("showModal", t, {
	            beforeSuccess: function beforeSuccess(e) {
	                e.confirm = Boolean(e.confirm);
	            }
	        });
	    },
	    showToast: function showToast() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	            t = {
	            duration: 1500,
	            title: "",
	            icon: "success",
	            mask: !1
	        };
	        t = _utils2.default.extend(t, e), delete t.image, ["success", "loading"].indexOf(t.icon) < 0 && (t.icon = "success"), t.duration > 1e4 && (t.duration = 1e4), paramCheck("showToast", t, {
	            duration: 1,
	            title: "",
	            icon: ""
	        }) && _pubsub2.default.invokeMethod("showToast", t);
	    },
	    hideToast: function hideToast(e) {
	        _pubsub2.default.invokeMethod("hideToast", e);
	    },
	    showActionSheet: function showActionSheet() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	            t = {
	            itemList: [],
	            itemColor: "#000000"
	        };
	        if (t = _utils2.default.extend(t, e), t.cancelText = "取消", t.cancelColor = "#000000", paramCheck("showActionSheet", t, {
	            itemList: ["1"],
	            itemColor: ""
	        })) return e.itemList.length > 6 ? void logErr("showActionSheet", e, "showActionSheet:fail parameter error: itemList should not be large than 6") : _pubsub2.default.invokeMethod("showActionSheet", t, {
	            beforeCancel: function beforeCancel(t) {
	                try {
	                    "function" == typeof e.success && e.success({
	                        errMsg: "showActionSheet:ok",
	                        cancel: !0
	                    });
	                } catch (e) {
	                    Reporter.thirdErrorReport({
	                        error: e,
	                        extend: "showActionSheet success callback error"
	                    });
	                }
	            }
	        });
	    },
	    getSavedFileList: function getSavedFileList() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        _pubsub2.default.invokeMethod("getSavedFileList", e);
	    },
	    getSavedFileInfo: function getSavedFileInfo() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        paramCheck("getSavedFileInfo", e, {
	            filePath: ""
	        }) && _pubsub2.default.invokeMethod("getSavedFileInfo", e);
	    },
	    removeSavedFile: function removeSavedFile() {
	        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	        paramCheck("removeSavedFile", e, {
	            filePath: ""
	        }) && _pubsub2.default.invokeMethod("removeSavedFile", e);
	    }
	};

	WXAPIs.onAppEnterBackground(), WXAPIs.onAppEnterForeground(), WXAPIs.appStatus = _configFlags2.default.AppStatus.FORE_GROUND, WXAPIs.hanged = !1, _pubsub2.default.subscribe("INVOKE_METHOD", function (e, t) {
	    var n = e.name,
	        o = e.args;
	    WXAPIs[n](o, !0);
	}), _pubsub2.default.subscribe("WEBVIEW_ERROR_MSG", function (e, t) {
	    var n = e.msg;
	    Reporter.triggerErrorMessage(n);
	}), _pubsub2.default.onMethod("onAppRoute", function (params) {
	    var webviewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	    if (params.path = params.path.substring(0, params.path.length - 5), params.webviewId = params.webviewId ? params.webviewId : webviewId, currUrl = params.path, "appLaunch" !== params.openType) {
	        for (var n in params.query) {
	            params.query[n] = decodeURIComponent(params.query[n]);
	        }
	    }
	    if ("navigateBack" == params.openType || "redirectTo" == params.openType) {
	        _canvas2.default.clearOldWebviewCanvas();
	    }
	    _canvas2.default.notifyWebviewIdtoCanvas(params.webviewId);
	    _map2.default.notifyWebviewIdtoMap(params.webviewId);
	    curWebViewId = params.webviewId;
	    appRouteCallbacks.forEach(function (callback) {
	        callback(params);
	    });
	}), _pubsub2.default.onMethod("onAppRouteDone", function (e) {
	    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	    e.path = e.path.substring(0, e.path.length - 5), e.webviewId = "undefined" != typeof e.webviewId ? e.webviewId : t, currUrl = e.path, x.forEach(function (t) {
	        t(e);
	    }), _pubsub2.default.publish("onAppRouteDone", {}, [t]);
	}), _pubsub2.default.onMethod("onKeyboardValueChange", function (e) {
	    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
	        n = e.value,
	        o = e.cursor;
	    if (e.data && "function" == typeof P) {
	        var r = JSON.parse(e.data);
	        if (r.bindinput) {
	            var i;
	            try {
	                i = P({
	                    data: {
	                        type: "input",
	                        target: r.target,
	                        currentTarget: r.target,
	                        timeStamp: Date.now(),
	                        touches: [],
	                        detail: {
	                            value: e.value,
	                            cursor: e.cursor
	                        }
	                    },
	                    eventName: r.bindinput,
	                    webviewId: t
	                });
	            } catch (e) {
	                throw new _utils2.default.AppServiceSdkKnownError("bind key input error");
	            }
	            if (r.setKeyboardValue) if (void 0 === i || null === i || i === !1) ;else if ("Object" === _utils2.default.getDataType(i)) {
	                var a = {
	                    inputId: e.inputId
	                };
	                n != i.value && (a.value = i.value + ""), isNaN(parseInt(i.cursor)) || (a.cursor = parseInt(i.cursor), "undefined" == typeof a.value && (a.value = n), a.cursor > a.value.length && (a.cursor = -1)), _pubsub2.default.invokeMethod("setKeyboardValue", a);
	            } else n != i && _pubsub2.default.invokeMethod("setKeyboardValue", {
	                value: i + "",
	                cursor: -1,
	                inputId: e.inputId
	            });
	        }
	    }
	    _pubsub2.default.publish("setKeyboardValue", {
	        value: n,
	        cursor: o,
	        inputId: e.inputId
	    }, [t]);
	});

	var getTouchInfo = function getTouchInfo(e, t, n) {
	    //返回touch信息
	    var touches = [],
	        changedTouches = [];
	    if ("onTouchStart" === t) {
	        for (var i in e) {
	            touches.push(e[i]);
	        }var a = {
	            x: n.touch.x,
	            y: n.touch.y,
	            identifier: n.touch.id
	        };
	        changedTouches.push(a), touches.push(a);
	    } else if ("onTouchMove" === t) for (var s in e) {
	        var c = e[s],
	            u = !1;
	        for (var f in n.touches) {
	            var l = {
	                x: n.touches[f].x,
	                y: n.touches[f].y,
	                identifier: n.touches[f].id
	            };
	            if (l.identifier === c.identifier && (c.x !== l.x || c.y !== l.y)) {
	                touches.push(l), changedTouches.push(l), u = !0;
	                break;
	            }
	        }
	        u || touches.push(c);
	    } else if ("onTouchEnd" === t) {
	        var d = {
	            x: n.touch.x,
	            y: n.touch.y,
	            identifier: n.touch.id
	        };
	        for (var p in e) {
	            var h = e[p];
	            h.identifier === d.identifier ? changedTouches.push(d) : touches.push(h);
	        }
	    } else if ("onTouchCancel" === t) for (var v in n.touches) {
	        var g = {
	            x: n.touches[v].x,
	            y: n.touches[v].y,
	            identifier: n.touches[v].id
	        };
	        changedTouches.push(g);
	    } else if ("onLongPress" === t) {
	        var y = {
	            x: n.touch.x,
	            y: n.touch.y,
	            identifier: n.touch.id
	        };
	        for (var b in e) {
	            e[b].identifier === y.identifier ? touches.push(y) : touches.push(e[b]);
	        }changedTouches.push(y);
	    }
	    return {
	        touches: touches,
	        changedTouches: changedTouches
	    };
	},
	    touchEvents = {
	    onTouchStart: "touchstart",
	    onTouchMove: "touchmove",
	    onTouchEnd: "touchend",
	    onTouchCancel: "touchcancel",
	    onLongPress: "longtap"
	};

	["onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel", "onLongPress"].forEach(function (e) {
	    _pubsub2.default.onMethod(e, function (t) {
	        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
	            o = JSON.parse(t.data),
	            r = o.canvasNumber;
	        _canvas2.default.canvasInfo.hasOwnProperty(r) || console.error("No such canvas " + r + " register in " + n + ", but trigger " + e + " event.");
	        var i = _canvas2.default.canvasInfo[r].data;
	        if (i[e] && "function" == typeof P) {
	            var a = getTouchInfo(i.lastTouches, e, t),
	                s = a.touches,
	                c = a.changedTouches;
	            i.lastTouches = s, "onTouchMove" === e && 0 === c.length || P({
	                data: {
	                    type: touchEvents[e],
	                    timeStamp: new Date() - i.startTime,
	                    target: i.target,
	                    touches: s,
	                    changedTouches: c
	                },
	                eventName: i[e],
	                webviewId: n
	            });
	        }
	    });
	}), ["onVideoPlay", "onVideoPause", "onVideoEnded", "onVideoTimeUpdate", "onVideoClickFullScreenBtn", "onVideoClickDanmuBtn"].forEach(function (e) {
	    _pubsub2.default.onMethod(e, function () {
	        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	            n = arguments[1],
	            o = "bind" + e.substring(7).toLowerCase(),
	            r = JSON.parse(t.data),
	            i = r.handlers,
	            a = r.event,
	            s = r.createdTimestamp;
	        if (i[o] && "function" == typeof P) {
	            var c = {
	                type: o.substring(4),
	                target: a.target,
	                currentTarget: a.currentTarget,
	                timeStamp: Date.now() - s,
	                detail: {}
	            };
	            "bindtimeupdate" === o && (c.detail = {
	                currentTime: t.position
	            }), P({
	                data: c,
	                eventName: i[o],
	                webviewId: n
	            });
	        }
	    });
	}), _pubsub2.default.onMethod("onAccelerometerChange", function () {
	    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	    arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	    E.forEach(function (t) {
	        "function" == typeof t && t(e);
	    });
	}), _pubsub2.default.onMethod("onCompassChange", function () {
	    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	    arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	    R.forEach(function (t) {
	        "function" == typeof t && t(e);
	    });
	}), _pubsub2.default.onMethod("onError", function () {
	    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	    arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	    console.error("thirdScriptError", "\n", "sdk uncaught third Error", "\n", e.message, "\n", e.stack);
	}), _pubsub2.default.onMethod("onMapMarkerClick", function () {
	    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	    if (e.data && "function" == typeof P) {
	        var n = JSON.parse(e.data);
	        n.bindmarkertap && P({
	            data: {
	                markerId: n.markerId
	            },
	            eventName: n.bindmarkertap,
	            webviewId: t
	        });
	    }
	}), _pubsub2.default.onMethod("onMapControlClick", function () {
	    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	    if (e.data && "function" == typeof P) {
	        var n = JSON.parse(e.data);
	        n.bindcontroltap && P({
	            data: {
	                controlId: n.controlId
	            },
	            eventName: n.bindcontroltap,
	            webviewId: t
	        });
	    }
	}), _pubsub2.default.onMethod("onMapRegionChange", function () {
	    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
	        n = _map2.default.mapInfo[t + "_" + e.mapId];
	    n && n.bindregionchange && "function" == typeof P && P({
	        data: {
	            type: e.type
	        },
	        eventName: n.bindregionchange,
	        webviewId: t
	    });
	}), _pubsub2.default.onMethod("onMapClick", function () {
	    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
	        n = _map2.default.mapInfo[t + "_" + e.mapId];
	    n && n.bindtap && "function" == typeof P && P({
	        data: {},
	        eventName: n.bindtap,
	        webviewId: t
	    });
	});
	for (var W in WXAPIs) {
	    addGetterForWX(W);
	}module.exports = WX;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(14);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function invoke() {
	    //ServiceJSBridge.invoke
	    ServiceJSBridge.invoke.apply(ServiceJSBridge, arguments);
	}

	function on() {
	    //ServiceJSBridge.on
	    ServiceJSBridge.on.apply(ServiceJSBridge, arguments);
	}

	function publish() {
	    //ServiceJSBridge.publish
	    var args = Array.prototype.slice.call(arguments);
	    args[1] = {
	        data: args[1],
	        options: {
	            timestamp: Date.now()
	        }
	    }, ServiceJSBridge.publish.apply(ServiceJSBridge, args);
	}

	function subscribe() {
	    //ServiceJSBridge.subscribe
	    var args = Array.prototype.slice.call(arguments),
	        callback = args[1];
	    args[1] = function (params, n) {
	        var data = params.data,
	            options = params.options,
	            timeMark = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
	            timestamp = options && options.timestamp || 0,
	            curTime = Date.now();
	        "function" == typeof callback && callback(data, n);
	        Reporter.speedReport({
	            key: "webview2AppService",
	            data: data || {},
	            timeMark: {
	                startTime: timestamp,
	                endTime: curTime,
	                nativeTime: timeMark.nativeTime || 0
	            }
	        });
	    };
	    ServiceJSBridge.subscribe.apply(ServiceJSBridge, args);
	}

	function invokeMethod(apiName) {
	    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
	        innerFns = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
	        params = {};
	    for (var i in options) {
	        "function" == typeof options[i] && (params[i] = Reporter.surroundThirdByTryCatch(options[i], "at api " + apiName + " " + i + " callback function"), delete options[i]);
	    }
	    var sysEventFns = {};
	    for (var s in innerFns) {
	        "function" == typeof innerFns[s] && (sysEventFns[s] = _utils2.default.surroundByTryCatchFactory(innerFns[s], "at api " + apiName + " " + s + " callback function"));
	    }
	    invoke(apiName, options, function (res) {
	        res.errMsg = res.errMsg || apiName + ":ok";
	        var isOk = 0 === res.errMsg.indexOf(apiName + ":ok"),
	            isCancel = 0 === res.errMsg.indexOf(apiName + ":cancel"),
	            isFail = 0 === res.errMsg.indexOf(apiName + ":fail");
	        if ("function" == typeof sysEventFns.beforeAll && sysEventFns.beforeAll(res), isOk) {
	            "function" == typeof sysEventFns.beforeSuccess && sysEventFns.beforeSuccess(res), "function" == typeof params.success && params.success(res), "function" == typeof sysEventFns.afterSuccess && sysEventFns.afterSuccess(res);
	        } else if (isCancel) {
	            res.errMsg = res.errMsg.replace(apiName + ":cancel", apiName + ":fail cancel"), "function" == typeof params.fail && params.fail(res), "function" == typeof sysEventFns.beforeCancel && sysEventFns.beforeCancel(res), "function" == typeof params.cancel && params.cancel(res), "function" == typeof sysEventFns.afterCancel && sysEventFns.afterCancel(res);
	        } else if (isFail) {
	            "function" == typeof sysEventFns.beforeFail && sysEventFns.beforeFail(res), "function" == typeof params.fail && params.fail(res);
	            var rt = !0;
	            "function" == typeof sysEventFns.afterFail && (rt = sysEventFns.afterFail(res)), rt !== !1 && Reporter.reportIDKey({
	                key: apiName + "_fail"
	            });
	        }
	        "function" == typeof params.complete && params.complete(res), "function" == typeof sysEventFns.afterAll && sysEventFns.afterAll(res);
	    });
	    Reporter.reportIDKey({
	        key: apiName
	    });
	}

	function onMethod(apiName, callback) {
	    //onMethod
	    on(apiName, _utils2.default.surroundByTryCatchFactory(callback, "at api " + apiName + " callback function"));
	}

	exports.default = {
	    invoke: invoke,
	    on: on,
	    publish: publish,
	    subscribe: subscribe,
	    invokeMethod: invokeMethod,
	    onMethod: onMethod
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function surroundByTryCatchFactory(func, funcName) {
	    //返回函数e
	    return function () {
	        try {
	            return func.apply(func, arguments);
	        } catch (e) {
	            if ("[object Error]" === Object.prototype.toString.apply(e)) {
	                if ("AppServiceSdkKnownError" == e.type) throw e;
	                Reporter.errorReport({
	                    key: "appServiceSDKScriptError",
	                    error: e,
	                    extend: funcName
	                });
	            }
	        }
	    };
	}

	function anyTypeToString(data) {
	    //把e转成string并返回一个对象
	    var dataType = Object.prototype.toString.call(data).split(" ")[1].split("]")[0];
	    if ("Array" == dataType || "Object" == dataType) try {
	        data = JSON.stringify(data);
	    } catch (e) {
	        throw e.type = "AppServiceSdkKnownError", e;
	    } else data = "String" == dataType || "Number" == dataType || "Boolean" == dataType ? data.toString() : "Date" == dataType ? data.getTime().toString() : "Undefined" == dataType ? "undefined" : "Null" == dataType ? "null" : "";
	    return {
	        data: data,
	        dataType: dataType
	    };
	}

	function stringToAnyType(e, t) {
	    //把e解码回来，和前面a相对应
	    return e = "String" == t ? e : "Array" == t || "Object" == t ? JSON.parse(e) : "Number" == t ? parseFloat(e) : "Boolean" == t ? "true" == e : "Date" == t ? new Date(parseInt(e)) : "Undefined" == t ? void 0 : "Null" == t ? null : "";
	}

	function getDataType(e) {
	    //get data type
	    return Object.prototype.toString.call(e).split(" ")[1].split("]")[0];
	}

	function isObject(e) {
	    return "Object" === getDataType(e);
	}

	function paramCheck(e, t) {
	    //比较e\t
	    var result,
	        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "parameter",
	        o = getDataType(t),
	        r = getDataType(e);
	    if (r != o) return n + " should be " + o + " instead of " + r + ";";
	    switch (result = "", o) {
	        case "Object":
	            for (var i in t) {
	                result += paramCheck(e[i], t[i], n + "." + i);
	            }break;
	        case "Array":
	            if (e.length < t.length) return n + " should have at least " + t.length + " item;";
	            for (var a = 0; a < t.length; ++a) {
	                result += paramCheck(e[a], t[a], n + "[" + a + "]");
	            }}
	    return result;
	}

	function getRealRoute(e, t) {
	    var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
	    if (n && (t = addHTMLSuffix(t)), 0 === t.indexOf("/")) return t.substr(1);
	    if (0 === t.indexOf("./")) return getRealRoute(e, t.substr(2), !1);
	    var o,
	        r,
	        i = t.split("/");
	    for (o = 0, r = i.length; o < r && ".." === i[o]; o++) {}
	    i.splice(0, o);
	    var t = i.join("/"),
	        a = e.length > 0 ? e.split("/") : [];
	    a.splice(a.length - o - 1, o + 1);
	    var s = a.concat(i),
	        c = s.join("/");
	    return c;
	}

	function getPlatform() {
	    //return platform
	    return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 ? "android" : "" : "android" === __wxConfig__.platform ? "android" : "devtools" === __wxConfig__.platform ? "devtools" : "ios";
	}

	function urlEncodeFormData(data) {
	    //把对象生成queryString
	    var moreThanOneArguments = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
	    if ("object" !== ("undefined" == typeof data ? "undefined" : _typeof(data))) return data;
	    var n = [];
	    for (var o in data) {
	        if (data.hasOwnProperty(o)) if (moreThanOneArguments) try {
	            n.push(encodeURIComponent(o) + "=" + encodeURIComponent(data[o]));
	        } catch (t) {
	            n.push(o + "=" + data[o]);
	        } else n.push(o + "=" + data[o]);
	    }return n.join("&");
	}

	function addQueryStringToUrl(originalUrl, newParams) {
	    //生成url t:param obj
	    if ("string" == typeof originalUrl && "object" === ("undefined" == typeof newParams ? "undefined" : _typeof(newParams)) && Object.keys(newParams).length > 0) {
	        var urlComponents = originalUrl.split("?"),
	            host = urlComponents[0],
	            oldParams = (urlComponents[1] || "").split("&").reduce(function (e, t) {
	            if ("string" == typeof t && t.length > 0) {
	                var n = t.split("="),
	                    o = n[0],
	                    r = n[1];
	                e[o] = r;
	            }
	            return e;
	        }, {}),
	            refinedNewParams = Object.keys(newParams).reduce(function (e, n) {
	            return "object" === _typeof(newParams[n]) ? e[encodeURIComponent(n)] = encodeURIComponent(JSON.stringify(newParams[n])) : e[encodeURIComponent(n)] = encodeURIComponent(newParams[n]), e;
	        }, {});
	        return host + "?" + urlEncodeFormData(assign(oldParams, refinedNewParams));
	    }
	    return originalUrl;
	}

	function validateUrl(e) {
	    return (/^(http|https):\/\/.*/i.test(e)
	    );
	}

	function assign() {
	    //endext 对象合并
	    for (var e = arguments.length, args = Array(e), n = 0; n < e; n++) {
	        args[n] = arguments[n];
	    }return args.reduce(function (e, t) {
	        for (var n in t) {
	            e[n] = t[n];
	        }return e;
	    }, {});
	}

	function encodeUrlQuery(url) {
	    //把url中的参数encode
	    if ("string" == typeof url) {
	        var t = url.split("?"),
	            n = t[0],
	            o = (t[1] || "").split("&").reduce(function (e, t) {
	            if ("string" == typeof t && t.length > 0) {
	                var n = t.split("="),
	                    o = n[0],
	                    r = n[1];
	                e[o] = r;
	            }
	            return e;
	        }, {}),
	            r = [];
	        for (var i in o) {
	            o.hasOwnProperty(i) && r.push(i + "=" + encodeURIComponent(o[i]));
	        }return r.length > 0 ? n + "?" + r.join("&") : url;
	    }
	    return url;
	}

	function addHTMLSuffix(e) {
	    //给url加上。html的扩展名
	    if ("string" != typeof e) throw new A("wxs.redirectTo: invalid url:" + e);
	    var t = e.split("?")[0],
	        n = e.split("?")[1];
	    return t += ".html", "undefined" != typeof n ? t + "?" + n : t;
	}

	function extend(e, t) {
	    //t合并到e对象
	    for (var n in t) {
	        e[n] = t[n];
	    }return e;
	}

	function arrayBufferToBase64(e) {
	    for (var t = "", n = new Uint8Array(e), o = n.byteLength, r = 0; r < o; r++) {
	        t += String.fromCharCode(n[r]);
	    }return btoa(t);
	}

	function base64ToArrayBuffer(e) {
	    for (var t = atob(e), n = t.length, o = new Uint8Array(n), r = 0; r < n; r++) {
	        o[r] = t.charCodeAt(r);
	    }return o.buffer;
	}

	function blobToArrayBuffer(e, t) {
	    //readAsArrayBuffer t:callback
	    var fileReader = new FileReader();
	    fileReader.onload = function () {
	        t(this.result);
	    }, fileReader.readAsArrayBuffer(e);
	}

	function convertObjectValueToString(e) {
	    //把对象元素都转成字符串
	    return Object.keys(e).reduce(function (t, n) {
	        return "string" == typeof e[n] ? t[n] = e[n] : "number" == typeof e[n] ? t[n] = e[n] + "" : t[n] = Object.prototype.toString.apply(e[n]), t;
	    }, {});
	}

	var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
	    return typeof e === "undefined" ? "undefined" : _typeof2(e);
	} : function (e) {
	    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
	};

	var words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	    btoa = btoa || function (e) {
	    for (var t, n, o = String(e), r = "", i = 0, a = words; o.charAt(0 | i) || (a = "=", i % 1); r += a.charAt(63 & t >> 8 - i % 1 * 8)) {
	        if (n = o.charCodeAt(i += .75), n > 255) throw new Error('"btoa" failed');
	        t = t << 8 | n;
	    }
	    return r;
	},
	    atob = atob || function (e) {
	    var t = String(e).replace(/=+$/, ""),
	        n = "";
	    if (t.length % 4 === 1) throw new Error('"atob" failed');
	    for (var o, r, i = 0, a = 0; r = t.charAt(a++); ~r && (o = i % 4 ? 64 * o + r : r, i++ % 4) ? n += String.fromCharCode(255 & o >> (-2 * i & 6)) : 0) {
	        r = words.indexOf(r);
	    }return n;
	};

	exports.default = {
	    surroundByTryCatchFactory: surroundByTryCatchFactory,
	    getDataType: getDataType,
	    isObject: isObject,
	    paramCheck: paramCheck,
	    getRealRoute: getRealRoute,
	    getPlatform: getPlatform,
	    urlEncodeFormData: urlEncodeFormData,
	    addQueryStringToUrl: addQueryStringToUrl,
	    validateUrl: validateUrl,
	    assign: assign,
	    encodeUrlQuery: encodeUrlQuery,
	    extend: extend,
	    arrayBufferToBase64: arrayBufferToBase64,
	    base64ToArrayBuffer: base64ToArrayBuffer,
	    blobToArrayBuffer: blobToArrayBuffer,
	    convertObjectValueToString: convertObjectValueToString,
	    anyTypeToString: surroundByTryCatchFactory(anyTypeToString, "anyTypeToString"),
	    stringToAnyType: surroundByTryCatchFactory(stringToAnyType, "stringToAnyType"),
	    AppServiceSdkKnownError: function (_Error) {
	        _inherits(AppServiceSdkKnownError, _Error);

	        function AppServiceSdkKnownError(e) {
	            _classCallCheck(this, AppServiceSdkKnownError);

	            var _this = _possibleConstructorReturn(this, (AppServiceSdkKnownError.__proto__ || Object.getPrototypeOf(AppServiceSdkKnownError)).call(this, "APP-SERVICE-SDK:" + e));

	            _this.type = "AppServiceSdkKnownError";
	            return _this;
	        }

	        return AppServiceSdkKnownError;
	    }(Error)
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function toArray(e) {
	    // 把e转成array
	    if (Array.isArray(e)) {
	        for (var t = 0, n = Array(e.length); t < e.length; t++) {
	            n[t] = e[t];
	        }return n;
	    }
	    return Array.from(e);
	}

	var Animation = function () {
	    function Animation() {
	        _classCallCheck(this, Animation);

	        var option = arguments.length <= 0 ? undefined : arguments[0];
	        this.actions = [];
	        this.currentTransform = [];
	        this.currentStepAnimates = [];
	        this.option = {
	            transition: {
	                duration: typeof option.duration !== 'undefined' ? option.duration : 400,
	                timingFunction: typeof option.timingFunction !== 'undefined' ? option.timingFunction : 'linear',
	                delay: typeof option.delay !== 'undefined' ? option.delay : 0
	            },
	            transformOrigin: option.transformOrigin || '50% 50% 0'
	        };
	    }

	    _createClass(Animation, [{
	        key: 'export',
	        value: function _export() {
	            var temp = this.actions;
	            return this.actions = [], { actions: temp };
	        }
	    }, {
	        key: 'step',
	        value: function step() {
	            var that = this,
	                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	            return this.currentStepAnimates.forEach(function (t) {
	                t.type !== 'style' ? that.currentTransform[t.type] = t : that.currentTransform[t.type + '.' + t.args[0]] = t;
	            }), this.actions.push({
	                animates: Object.keys(this.currentTransform).reduce(function (t, o) {
	                    return [].concat(toArray(t), [that.currentTransform[o]]);
	                }, []),
	                option: {
	                    transformOrigin: typeof t.transformOrigin !== 'undefined' ? t.transformOrigin : this.option.transformOrigin,
	                    transition: {
	                        duration: typeof t.duration !== 'undefined' ? t.duration : this.option.transition.duration,
	                        timingFunction: typeof t.timingFunction !== 'undefined' ? t.timingFunction : this.option.transition.timingFunction,
	                        delay: typeof t.delay !== 'undefined' ? t.delay : this.option.transition.delay
	                    }
	                }
	            }), this.currentStepAnimates = [], this;
	        }
	    }, {
	        key: 'matrix',
	        value: function matrix() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
	                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
	                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
	                o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
	                r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
	                i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1;
	            return this.currentStepAnimates.push({
	                type: 'matrix',
	                args: [e, t, n, o, r, i]
	            }), this;
	        }
	    }, {
	        key: 'matrix3d',
	        value: function matrix3d() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
	                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
	                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
	                o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
	                r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
	                i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1,
	                a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
	                s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0,
	                c = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0,
	                u = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : 0,
	                f = arguments.length > 10 && void 0 !== arguments[10] ? arguments[10] : 1,
	                l = arguments.length > 11 && void 0 !== arguments[11] ? arguments[11] : 0,
	                d = arguments.length > 12 && void 0 !== arguments[12] ? arguments[12] : 0,
	                p = arguments.length > 13 && void 0 !== arguments[13] ? arguments[13] : 0,
	                h = arguments.length > 14 && void 0 !== arguments[14] ? arguments[14] : 0,
	                v = arguments.length > 15 && void 0 !== arguments[15] ? arguments[15] : 1;
	            return this.currentStepAnimates.push({
	                type: 'matrix3d',
	                args: [e, t, n, o, r, i, a, s, c, u, f, l, d, p, h, v]
	            }), this.stepping = !1, this;
	        }
	    }, {
	        key: 'rotate',
	        value: function rotate() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
	            return this.currentStepAnimates.push({
	                type: 'rotate',
	                args: [e]
	            }), this;
	        }
	    }, {
	        key: 'rotate3d',
	        value: function rotate3d() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
	                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
	                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
	                o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
	            return this.currentStepAnimates.push({
	                type: 'rotate3d',
	                args: [e, t, n, o]
	            }), this.stepping = !1, this;
	        }
	    }, {
	        key: 'rotateX',
	        value: function rotateX() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
	            return this.currentStepAnimates.push({
	                type: 'rotateX',
	                args: [e]
	            }), this.stepping = !1, this;
	        }
	    }, {
	        key: 'rotateY',
	        value: function rotateY() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
	            return this.currentStepAnimates.push({
	                type: 'rotateY',
	                args: [e]
	            }), this.stepping = !1, this;
	        }
	    }, {
	        key: 'rotateZ',
	        value: function rotateZ() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
	            return this.currentStepAnimates.push({
	                type: 'rotateZ',
	                args: [e]
	            }), this.stepping = !1, this;
	        }
	    }, {
	        key: 'scale',
	        value: function scale() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
	                t = arguments[1];
	            return t = typeof t !== 'undefined' ? t : e, this.currentStepAnimates.push({
	                type: 'scale',
	                args: [e, t]
	            }), this;
	        }
	    }, {
	        key: 'scale3d',
	        value: function scale3d() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
	                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
	                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
	            return this.currentStepAnimates.push({
	                type: 'scale3d',
	                args: [e, t, n]
	            }), this;
	        }
	    }, {
	        key: 'scaleX',
	        value: function scaleX() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
	            return this.currentStepAnimates.push({
	                type: 'scaleX',
	                args: [e]
	            }), this;
	        }
	    }, {
	        key: 'scaleY',
	        value: function scaleY() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
	            return this.currentStepAnimates.push({
	                type: 'scaleY',
	                args: [e]
	            }), this;
	        }
	    }, {
	        key: 'scaleZ',
	        value: function scaleZ() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
	            return this.currentStepAnimates.push({
	                type: 'scaleZ',
	                args: [e]
	            }), this;
	        }
	    }, {
	        key: 'skew',
	        value: function skew() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
	                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	            return this.currentStepAnimates.push({
	                type: 'skew',
	                args: [e, t]
	            }), this;
	        }
	    }, {
	        key: 'skewX',
	        value: function skewX() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
	            return this.currentStepAnimates.push({
	                type: 'skewX',
	                args: [e]
	            }), this;
	        }
	    }, {
	        key: 'skewY',
	        value: function skewY() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
	            return this.currentStepAnimates.push({
	                type: 'skewY',
	                args: [e]
	            }), this;
	        }
	    }, {
	        key: 'translate',
	        value: function translate() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
	                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	            return this.currentStepAnimates.push({
	                type: 'translate',
	                args: [e, t]
	            }), this;
	        }
	    }, {
	        key: 'translate3d',
	        value: function translate3d() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
	                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
	                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
	            return this.currentStepAnimates.push({
	                type: 'translate3d',
	                args: [e, t, n]
	            }), this;
	        }
	    }, {
	        key: 'translateX',
	        value: function translateX() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
	            return this.currentStepAnimates.push({
	                type: 'translateX',
	                args: [e]
	            }), this;
	        }
	    }, {
	        key: 'translateY',
	        value: function translateY() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
	            return this.currentStepAnimates.push({
	                type: 'translateY',
	                args: [e]
	            }), this;
	        }
	    }, {
	        key: 'translateZ',
	        value: function translateZ() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
	            return this.currentStepAnimates.push({
	                type: 'translateZ',
	                args: [e]
	            }), this;
	        }
	    }, {
	        key: 'opacity',
	        value: function opacity(e) {
	            return this.currentStepAnimates.push({
	                type: 'style',
	                args: ['opacity', e]
	            }), this;
	        }
	    }, {
	        key: 'backgroundColor',
	        value: function backgroundColor(e) {
	            return this.currentStepAnimates.push({
	                type: 'style',
	                args: ['backgroundColor', e]
	            }), this;
	        }
	    }, {
	        key: 'width',
	        value: function width(e) {
	            return typeof e === 'number' && (e += 'px'), this.currentStepAnimates.push({
	                type: 'style',
	                args: ['width', e]
	            }), this;
	        }
	    }, {
	        key: 'height',
	        value: function height(e) {
	            return typeof e === 'number' && (e += 'px'), this.currentStepAnimates.push({
	                type: 'style',
	                args: ['height', e]
	            }), this;
	        }
	    }, {
	        key: 'left',
	        value: function left(e) {
	            return typeof e === 'number' && (e += 'px'), this.currentStepAnimates.push({
	                type: 'style',
	                args: ['left', e]
	            }), this;
	        }
	    }, {
	        key: 'right',
	        value: function right(e) {
	            return typeof e === 'number' && (e += 'px'), this.currentStepAnimates.push({
	                type: 'style',
	                args: ['right', e]
	            }), this;
	        }
	    }, {
	        key: 'top',
	        value: function top(e) {
	            return typeof e === 'number' && (e += 'px'), this.currentStepAnimates.push({
	                type: 'style',
	                args: ['top', e]
	            }), this;
	        }
	    }, {
	        key: 'bottom',
	        value: function bottom(e) {
	            return typeof e === 'number' && (e += 'px'), this.currentStepAnimates.push({
	                type: 'style',
	                args: ['bottom', e]
	            }), this;
	        }
	    }]);

	    return Animation;
	}();

	exports.default = Animation;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(13);

	__webpack_require__(14);

	var _EventEmitter = __webpack_require__(17);

	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	var _configFlags = __webpack_require__(18);

	var _configFlags2 = _interopRequireDefault(_configFlags);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function createAudio(e, t) {
	    var n = this,
	        o = new Audio(e, t);
	    return o._getAppStatus = function () {
	        return n.appStatus;
	    }, o._getHanged = function () {
	        return n.hanged;
	    }, this.onAppEnterBackground(function () {
	        o.pause();
	    }), o;
	}

	var c = {},
	    eventEmitter2 = new _EventEmitter2.default.EventEmitter2();

	ServiceJSBridge.subscribe("audioInsert", function (e, t) {
	    var n = e.audioId;
	    c[t + "_" + n] = !0, eventEmitter2.emit("audioInsert_" + t + "_" + n);
	});

	var Audio = function () {
	    function Audio(t, n) {
	        _classCallCheck(this, Audio);

	        if ("string" != typeof t) throw new Error("audioId should be a String");
	        this.audioId = t;
	        this.webviewId = n;
	    }

	    _createClass(Audio, [{
	        key: 'setSrc',
	        value: function setSrc(e) {
	            this._sendAction({
	                method: "setSrc",
	                data: e
	            });
	        }
	    }, {
	        key: 'play',
	        value: function play() {
	            var e = this._getAppStatus();
	            this._getHanged();
	            e === _configFlags2.default.AppStatus.BACK_GROUND || this._sendAction({
	                method: "play"
	            });
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this._sendAction({
	                method: "pause"
	            });
	        }
	    }, {
	        key: 'seek',
	        value: function seek(e) {
	            this._sendAction({
	                method: "setCurrentTime",
	                data: e
	            });
	        }
	    }, {
	        key: '_ready',
	        value: function _ready(e) {
	            c[this.webviewId + "_" + this.audioId] ? e() : eventEmitter2.on("audioInsert_" + this.webviewId + "_" + this.audioId, function () {
	                e();
	            });
	        }
	    }, {
	        key: '_sendAction',
	        value: function _sendAction(e) {
	            var t = this;
	            this._ready(function () {
	                ServiceJSBridge.publish("audio_" + t.audioId + "_actionChanged", e, [t.webviewId]);
	            });
	        }
	    }]);

	    return Audio;
	}();

	exports.default = createAudio;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// ****
	// 源码看这里 https://github.com/asyncly/EventEmitter2
	// ****


	var o,
	    _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
	    return typeof e === "undefined" ? "undefined" : _typeof2(e);
	} : function (e) {
	    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
	};

	function init() {
	    this._events = {}, this._conf && configure.call(this, this._conf);
	}

	function configure(e) {
	    e ? (this._conf = e, e.delimiter && (this.delimiter = e.delimiter), this._events.maxListeners = e.maxListeners !== i ? e.maxListeners : defaultMaxListeners, e.wildcard && (this.wildcard = e.wildcard), e.newListener && (this.newListener = e.newListener), e.verboseMemoryLeak && (this.verboseMemoryLeak = e.verboseMemoryLeak), this.wildcard && (this.listenerTree = {})) : this._events.maxListeners = defaultMaxListeners;
	}

	function c(e, t) {
	    var n = "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.";
	    this.verboseMemoryLeak ? (n += " Event name: %s.", console.error(n, e, t)) : console.error(n, e), console.trace && console.trace();
	}

	function EventEmitter2(e) {
	    this._events = {}, this.newListener = !1, this.verboseMemoryLeak = !1, configure.call(this, e);
	}

	function f(e, t, n, o) {
	    if (!n) return [];
	    var r,
	        i,
	        a,
	        s,
	        c,
	        u,
	        l,
	        d = [],
	        p = t.length,
	        h = t[o],
	        v = t[o + 1];
	    if (o === p && n._listeners) {
	        if ("function" == typeof n._listeners) return e && e.push(n._listeners), [n];
	        for (r = 0, i = n._listeners.length; r < i; r++) {
	            e && e.push(n._listeners[r]);
	        }return [n];
	    }
	    if ("*" === h || "**" === h || n[h]) {
	        if ("*" === h) {
	            for (a in n) {
	                "_listeners" !== a && n.hasOwnProperty(a) && (d = d.concat(f(e, t, n[a], o + 1)));
	            }return d;
	        }
	        if ("**" === h) {
	            l = o + 1 === p || o + 2 === p && "*" === v, l && n._listeners && (d = d.concat(f(e, t, n, p)));
	            for (a in n) {
	                "_listeners" !== a && n.hasOwnProperty(a) && ("*" === a || "**" === a ? (n[a]._listeners && !l && (d = d.concat(f(e, t, n[a], p))), d = d.concat(f(e, t, n[a], o))) : d = a === v ? d.concat(f(e, t, n[a], o + 2)) : d.concat(f(e, t, n[a], o)));
	            }return d;
	        }
	        d = d.concat(f(e, t, n[h], o + 1));
	    }
	    if (s = n["*"], s && f(e, t, s, o + 1), c = n["**"]) if (o < p) {
	        c._listeners && f(e, t, c, p);
	        for (a in c) {
	            "_listeners" !== a && c.hasOwnProperty(a) && (a === v ? f(e, t, c[a], o + 2) : a === h ? f(e, t, c[a], o + 1) : (u = {}, u[a] = c[a], f(e, t, {
	                "**": u
	            }, o + 1)));
	        }
	    } else c._listeners ? f(e, t, c, p) : c["*"] && c["*"]._listeners && f(e, t, c["*"], p);
	    return d;
	}

	function l(e, t) {
	    e = "string" == typeof e ? e.split(this.delimiter) : e.slice();
	    for (var n = 0, o = e.length; n + 1 < o; n++) {
	        if ("**" === e[n] && "**" === e[n + 1]) return;
	    }for (var r = this.listenerTree, a = e.shift(); a !== i;) {
	        if (r[a] || (r[a] = {}), r = r[a], 0 === e.length) return r._listeners ? ("function" == typeof r._listeners && (r._listeners = [r._listeners]), r._listeners.push(t), !r._listeners.warned && this._events.maxListeners > 0 && r._listeners.length > this._events.maxListeners && (r._listeners.warned = !0, c.call(this, r._listeners.length, a))) : r._listeners = t, !0;
	        a = e.shift();
	    }
	    return !0;
	}

	var isArray = Array.isArray ? Array.isArray : function (e) {
	    return "[object Array]" === Object.prototype.toString.call(e);
	},
	    defaultMaxListeners = 10;

	EventEmitter2.EventEmitter2 = EventEmitter2, EventEmitter2.prototype.delimiter = ".", EventEmitter2.prototype.setMaxListeners = function (e) {
	    e !== i && (this._events || init.call(this), this._events.maxListeners = e, this._conf || (this._conf = {}), this._conf.maxListeners = e);
	}, EventEmitter2.prototype.event = "", EventEmitter2.prototype.once = function (e, t) {
	    return this.many(e, 1, t), this;
	}, EventEmitter2.prototype.many = function (e, t, n) {
	    function o() {
	        0 === --t && r.off(e, o), n.apply(this, arguments);
	    }

	    var r = this;
	    if ("function" != typeof n) throw new Error("many only accepts instances of Function");
	    return o._origin = n, this.on(e, o), r;
	}, EventEmitter2.prototype.emit = function () {
	    this._events || init.call(this);
	    var e = arguments[0];
	    if ("newListener" === e && !this.newListener && !this._events.newListener) return !1;
	    var t,
	        n,
	        o,
	        r,
	        i,
	        s = arguments.length;
	    if (this._all && this._all.length) {
	        if (i = this._all.slice(), s > 3) for (t = new Array(s), r = 0; r < s; r++) {
	            t[r] = arguments[r];
	        }for (o = 0, n = i.length; o < n; o++) {
	            switch (this.event = e, s) {
	                case 1:
	                    i[o].call(this, e);
	                    break;
	                case 2:
	                    i[o].call(this, e, arguments[1]);
	                    break;
	                case 3:
	                    i[o].call(this, e, arguments[1], arguments[2]);
	                    break;
	                default:
	                    i[o].apply(this, t);
	            }
	        }
	    }
	    if (this.wildcard) {
	        i = [];
	        var c = "string" == typeof e ? e.split(this.delimiter) : e.slice();
	        f.call(this, i, c, this.listenerTree, 0);
	    } else {
	        if (i = this._events[e], "function" == typeof i) {
	            switch (this.event = e, s) {
	                case 1:
	                    i.call(this);
	                    break;
	                case 2:
	                    i.call(this, arguments[1]);
	                    break;
	                case 3:
	                    i.call(this, arguments[1], arguments[2]);
	                    break;
	                default:
	                    for (t = new Array(s - 1), r = 1; r < s; r++) {
	                        t[r - 1] = arguments[r];
	                    }i.apply(this, t);
	            }
	            return !0;
	        }
	        i && (i = i.slice());
	    }
	    if (i && i.length) {
	        if (s > 3) for (t = new Array(s - 1), r = 1; r < s; r++) {
	            t[r - 1] = arguments[r];
	        }for (o = 0, n = i.length; o < n; o++) {
	            switch (this.event = e, s) {
	                case 1:
	                    i[o].call(this);
	                    break;
	                case 2:
	                    i[o].call(this, arguments[1]);
	                    break;
	                case 3:
	                    i[o].call(this, arguments[1], arguments[2]);
	                    break;
	                default:
	                    i[o].apply(this, t);
	            }
	        }return !0;
	    }
	    if (!this._all && "error" === e) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
	    return !!this._all;
	}, EventEmitter2.prototype.emitAsync = function () {
	    this._events || init.call(this);
	    var e = arguments[0];
	    if ("newListener" === e && !this.newListener && !this._events.newListener) return Promise.resolve([!1]);
	    var t,
	        n,
	        o,
	        r,
	        i,
	        s = [],
	        c = arguments.length;
	    if (this._all) {
	        if (c > 3) for (t = new Array(c), r = 1; r < c; r++) {
	            t[r] = arguments[r];
	        }for (o = 0, n = this._all.length; o < n; o++) {
	            switch (this.event = e, c) {
	                case 1:
	                    s.push(this._all[o].call(this, e));
	                    break;
	                case 2:
	                    s.push(this._all[o].call(this, e, arguments[1]));
	                    break;
	                case 3:
	                    s.push(this._all[o].call(this, e, arguments[1], arguments[2]));
	                    break;
	                default:
	                    s.push(this._all[o].apply(this, t));
	            }
	        }
	    }
	    if (this.wildcard) {
	        i = [];
	        var u = "string" == typeof e ? e.split(this.delimiter) : e.slice();
	        f.call(this, i, u, this.listenerTree, 0);
	    } else i = this._events[e];
	    if ("function" == typeof i) switch (this.event = e, c) {
	        case 1:
	            s.push(i.call(this));
	            break;
	        case 2:
	            s.push(i.call(this, arguments[1]));
	            break;
	        case 3:
	            s.push(i.call(this, arguments[1], arguments[2]));
	            break;
	        default:
	            for (t = new Array(c - 1), r = 1; r < c; r++) {
	                t[r - 1] = arguments[r];
	            }s.push(i.apply(this, t));
	    } else if (i && i.length) {
	        if (c > 3) for (t = new Array(c - 1), r = 1; r < c; r++) {
	            t[r - 1] = arguments[r];
	        }for (o = 0, n = i.length; o < n; o++) {
	            switch (this.event = e, c) {
	                case 1:
	                    s.push(i[o].call(this));
	                    break;
	                case 2:
	                    s.push(i[o].call(this, arguments[1]));
	                    break;
	                case 3:
	                    s.push(i[o].call(this, arguments[1], arguments[2]));
	                    break;
	                default:
	                    s.push(i[o].apply(this, t));
	            }
	        }
	    } else if (!this._all && "error" === e) return arguments[1] instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
	    return Promise.all(s);
	}, EventEmitter2.prototype.on = function (e, t) {
	    if ("function" == typeof e) return this.onAny(e), this;
	    if ("function" != typeof t) throw new Error("on only accepts instances of Function");
	    return this._events || init.call(this), this.emit("newListener", e, t), this.wildcard ? (l.call(this, e, t), this) : (this._events[e] ? ("function" == typeof this._events[e] && (this._events[e] = [this._events[e]]), this._events[e].push(t), !this._events[e].warned && this._events.maxListeners > 0 && this._events[e].length > this._events.maxListeners && (this._events[e].warned = !0, c.call(this, this._events[e].length, e))) : this._events[e] = t, this);
	}, EventEmitter2.prototype.onAny = function (e) {
	    if ("function" != typeof e) throw new Error("onAny only accepts instances of Function");
	    return this._all || (this._all = []), this._all.push(e), this;
	}, EventEmitter2.prototype.addListener = EventEmitter2.prototype.on, EventEmitter2.prototype.off = function (e, t) {
	    function n(e) {
	        if (e !== i) {
	            var t = Object.keys(e);
	            for (var o in t) {
	                var a = t[o],
	                    s = e[a];
	                s instanceof Function || "object" !== ("undefined" == typeof s ? "undefined" : _typeof(s)) || null === s || (Object.keys(s).length > 0 && n(e[a]), 0 === Object.keys(s).length && delete e[a]);
	            }
	        }
	    }

	    if ("function" != typeof t) throw new Error("removeListener only takes instances of Function");
	    var o,
	        a = [];
	    if (this.wildcard) {
	        var s = "string" == typeof e ? e.split(this.delimiter) : e.slice();
	        a = f.call(this, null, s, this.listenerTree, 0);
	    } else {
	        if (!this._events[e]) return this;
	        o = this._events[e], a.push({
	            _listeners: o
	        });
	    }
	    for (var c = 0; c < a.length; c++) {
	        var u = a[c];
	        if (o = u._listeners, isArray(o)) {
	            for (var l = -1, p = 0, h = o.length; p < h; p++) {
	                if (o[p] === t || o[p].listener && o[p].listener === t || o[p]._origin && o[p]._origin === t) {
	                    l = p;
	                    break;
	                }
	            }if (l < 0) continue;
	            return this.wildcard ? u._listeners.splice(l, 1) : this._events[e].splice(l, 1), 0 === o.length && (this.wildcard ? delete u._listeners : delete this._events[e]), this.emit("removeListener", e, t), this;
	        }
	        (o === t || o.listener && o.listener === t || o._origin && o._origin === t) && (this.wildcard ? delete u._listeners : delete this._events[e], this.emit("removeListener", e, t));
	    }
	    return n(this.listenerTree), this;
	}, EventEmitter2.prototype.offAny = function (e) {
	    var t,
	        n = 0,
	        o = 0;
	    if (e && this._all && this._all.length > 0) {
	        for (t = this._all, n = 0, o = t.length; n < o; n++) {
	            if (e === t[n]) return t.splice(n, 1), this.emit("removeListenerAny", e), this;
	        }
	    } else {
	        for (t = this._all, n = 0, o = t.length; n < o; n++) {
	            this.emit("removeListenerAny", t[n]);
	        }this._all = [];
	    }
	    return this;
	}, EventEmitter2.prototype.removeListener = EventEmitter2.prototype.off, EventEmitter2.prototype.removeAllListeners = function (e) {
	    if (0 === arguments.length) return !this._events || init.call(this), this;
	    if (this.wildcard) for (var t = "string" == typeof e ? e.split(this.delimiter) : e.slice(), n = f.call(this, null, t, this.listenerTree, 0), o = 0; o < n.length; o++) {
	        var r = n[o];
	        r._listeners = null;
	    } else this._events && (this._events[e] = null);
	    return this;
	}, EventEmitter2.prototype.listeners = function (e) {
	    if (this.wildcard) {
	        var t = [],
	            n = "string" == typeof e ? e.split(this.delimiter) : e.slice();
	        return f.call(this, t, n, this.listenerTree, 0), t;
	    }
	    return this._events || init.call(this), this._events[e] || (this._events[e] = []), isArray(this._events[e]) || (this._events[e] = [this._events[e]]), this._events[e];
	}, EventEmitter2.prototype.listenerCount = function (e) {
	    return this.listeners(e).length;
	}, EventEmitter2.prototype.listenersAny = function () {
	    return this._all ? this._all : [];
	}, o = function () {
	    return EventEmitter2;
	}();

	exports.default = o;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// module6

	exports.default = {
	    LOG_LIMIT: 1024,
	    AppStatus: {
	        FORE_GROUND: 0,
	        BACK_GROUND: 1,
	        LOCLOCKK: 2
	    }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pubsub = __webpack_require__(13);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _utils = __webpack_require__(14);

	var _utils2 = _interopRequireDefault(_utils);

	var _EventEmitter = __webpack_require__(17);

	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	var _configFlags = __webpack_require__(18);

	var _configFlags2 = _interopRequireDefault(_configFlags);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function createVideo(e, t) {
	    var n = this,
	        o = new VideoControl(e, t);
	    return o._getAppStatus = function () {
	        return n.appStatus;
	    }, o._getHanged = function () {
	        return n.hanged;
	    }, this.onAppEnterBackground(function () {
	        o.pause();
	    }), o;
	}

	var notIOS = "ios" !== (0, _utils2.default.getPlatform)(),
	    l = {},
	    EventEmitter = new _EventEmitter2.default.EventEmitter2();

	ServiceJSBridge.subscribe("videoPlayerInsert", function (e, t) {
	    var n = e.domId,
	        o = e.videoPlayerId;
	    l[n] = l[n] || o, EventEmitter.emit("videoPlayerInsert", n);
	});

	ServiceJSBridge.subscribe("videoPlayerRemoved", function (e, t) {
	    var n = e.domId;
	    e.videoPlayerId;
	    delete l[n];
	});

	var VideoControl = function () {
	    function VideoControl(t) {
	        _classCallCheck(this, VideoControl);

	        if ("string" != typeof t) throw new Error("video ID should be a String");
	        this.domId = t;
	    }

	    _createClass(VideoControl, [{
	        key: 'play',
	        value: function play() {
	            var appStatus = this._getAppStatus();
	            appStatus === _configFlags2.default.AppStatus.BACK_GROUND || appStatus === _configFlags2.default.AppStatus.LOCK || this._invokeMethod("play");
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this._invokeMethod("pause");
	        }
	    }, {
	        key: 'seek',
	        value: function seek(e) {
	            this._invokeMethod("seek", [e]);
	        }
	    }, {
	        key: 'sendDanmu',
	        value: function sendDanmu(e) {
	            var t = e.text,
	                n = e.color;
	            this._invokeMethod("sendDanmu", [t, n]);
	        }
	    }, {
	        key: '_invokeMethod',
	        value: function _invokeMethod(e, t) {
	            function n() {
	                notIOS ? (this.action = {
	                    method: e,
	                    data: t
	                }, this._sendAction()) : (0, _pubsub2.default.invokeMethod)("operateVideoPlayer", {
	                    data: t,
	                    videoPlayerId: l[this.domId],
	                    type: e
	                });
	            }

	            var o = this;
	            "number" == typeof l[this.domId] ? n.apply(this) : EventEmitter.on("videoPlayerInsert", function (e) {
	                n.apply(o);
	            });
	        }
	    }, {
	        key: '_sendAction',
	        value: function _sendAction() {
	            ServiceJSBridge.publish("video_" + this.domId + "_actionChanged", this.action);
	        }
	    }]);

	    return VideoControl;
	}();

	exports.default = createVideo;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //1-8 map相关事件和方法

	var _pubsub = __webpack_require__(13);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _utils = __webpack_require__(14);

	var _utils2 = _interopRequireDefault(_utils);

	var _EventEmitter = __webpack_require__(17);

	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function notifyWebviewIdtoMap(e) {
	    webviewID = e;
	}

	var u = {},
	    mapInfo = {},
	    EventEmitter = new _EventEmitter2.default.EventEmitter2(),
	    webviewID = 0,
	    p = 0;

	ServiceJSBridge.subscribe("mapInsert", function (e, t) {
	    var n = e.domId,
	        o = e.mapId,
	        bindregionchange = e.bindregionchange,
	        bindtap = e.bindtap,
	        showLocation = e.showLocation,
	        s = t + "_" + n;
	    u[s] = u[s] || o, mapInfo[t + "_" + o] = {
	        bindregionchange: bindregionchange,
	        bindtap: bindtap,
	        showLocation: showLocation
	    }, EventEmitter.emit("mapInsert");
	});

	var MapContext = function () {
	    function MapContext(t) {
	        _classCallCheck(this, MapContext);

	        var that = this;
	        if ("string" != typeof t) throw new Error("map ID should be a String");
	        this.domId = t;

	        ServiceJSBridge.subscribe("doMapActionCallback", function (event, t) {
	            var o = event.callbackId;
	            "getMapCenterLocation" === event.method && o && "function" == typeof that[o] && (that[o]({
	                longitude: event.longitude,
	                latitude: event.latitude
	            }), delete that[o]);
	        });
	    }

	    _createClass(MapContext, [{
	        key: '_invoke',
	        value: function _invoke(e, t) {
	            var n = (0, _utils2.default.getPlatform)();
	            if ("ios" === n || "android" === n) {
	                var o = mapInfo[webviewID + "_" + t.mapId];
	                if ("moveToMapLocation" === e) return void (o && o.showLocation ? (0, _pubsub2.default.invokeMethod)(e, t) : console.error("only show-location set to true can invoke moveToLocation"));
	                (0, _pubsub2.default.invokeMethod)(e, t);
	            } else {
	                t.method = e;
	                var r = "callback" + webviewID + "_" + t.mapId + "_" + p++;
	                this[r] = t.success, t.callbackId = r, (0, _pubsub2.default.publish)("doMapAction" + t.mapId, t, [webviewID]);
	            }
	        }
	    }, {
	        key: '_invokeMethod',
	        value: function _invokeMethod(e, t) {
	            var n = this,
	                o = webviewID + "_" + this.domId;
	            "number" == typeof u[o] || u[o] ? (t.mapId = u[o], this._invoke(e, t)) : EventEmitter.on("mapInsert", function () {
	                t.mapId = u[o], n._invoke(e, t);
	            });
	        }
	    }, {
	        key: 'getCenterLocation',
	        value: function getCenterLocation() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	            this._invokeMethod("getMapCenterLocation", e);
	        }
	    }, {
	        key: 'moveToLocation',
	        value: function moveToLocation() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	            this._invokeMethod("moveToMapLocation", e);
	        }
	    }]);

	    return MapContext;
	}();

	exports.default = {
	    notifyWebviewIdtoMap: notifyWebviewIdtoMap,
	    MapContext: MapContext, //class
	    mapInfo: mapInfo
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // Canvas Context API


	var _utils = __webpack_require__(14);

	var _utils2 = _interopRequireDefault(_utils);

	var _canvas = __webpack_require__(22);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _predefinedColor = __webpack_require__(23);

	var predefinedColor = _interopRequireWildcard(_predefinedColor);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function notifyCurrentRoutetoContext(e) {
	    y = e;
	}

	function isNum(e) {
	    return "number" == typeof e;
	}

	function parseColorValue(e) {
	    var t = null;
	    if (null != (t = /^#([0-9|A-F|a-f]{6})$/.exec(e))) {
	        var n = parseInt(t[1].slice(0, 2), 16),
	            o = parseInt(t[1].slice(2, 4), 16),
	            r = parseInt(t[1].slice(4), 16);
	        return [n, o, r, 255];
	    }

	    if (null != (t = /^rgb\((.+)\)$/.exec(e))) return t[1].split(",").map(function (e) {
	        return parseInt(e.trim());
	    }).concat(255);

	    if (null != (t = /^rgba\((.+)\)$/.exec(e))) return t[1].split(",").map(function (e, t) {
	        return 3 == t ? Math.floor(255 * parseFloat(e.trim())) : parseInt(e.trim());
	    });

	    var i = e.toLowerCase();

	    if (predefinedColor.predefinedColor.hasOwnProperty(i)) {
	        t = /^#([0-9|A-F|a-f]{6})$/.exec(predefinedColor.predefinedColor[i]);
	        var n = parseInt(t[1].slice(0, 2), 16),
	            o = parseInt(t[1].slice(2, 4), 16),
	            r = parseInt(t[1].slice(4), 16);
	        return [n, o, r, 255];
	    }

	    console.group("非法颜色: " + e);
	    console.error("不支持颜色：" + e);
	    console.groupEnd();
	}

	function deepCopy(e) {
	    //复制对象
	    if (Array.isArray(e)) {
	        var t = [];
	        return e.forEach(function (e) {
	            t.push(deepCopy(e));
	        }), t;
	    }
	    if ("object" == ("undefined" == typeof e ? "undefined" : _typeof(e))) {
	        var t = {};
	        for (var n in e) {
	            t[n] = deepCopy(e[n]);
	        }return t;
	    }
	    return e;
	}

	var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
	    return typeof e === 'undefined' ? 'undefined' : _typeof2(e);
	} : function (e) {
	    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === 'undefined' ? 'undefined' : _typeof2(e);
	},
	    transformAndOthersAPI = ["scale", "rotate", "translate", "save", "restore"],
	    drawingAPI = ["drawImage", "fillText", "fill", "stroke", "fillRect", "strokeRect", "clearRect"],
	    drawPathAPI = ["beginPath", "moveTo", "lineTo", "rect", "arc", "quadraticCurveTo", "bezierCurveTo", "closePath"],
	    styleAPI = ["setFillStyle", "setStrokeStyle", "setGlobalAlpha", "setShadow", "setFontSize", "setLineCap", "setLineJoin", "setLineWidth", "setMiterLimit"],
	    y = "";

	var ColorStop = function () {
	    function ColorStop(t, n) {
	        _classCallCheck(this, ColorStop);

	        this.type = t;
	        this.data = n;
	        this.colorStop = [];
	    }

	    _createClass(ColorStop, [{
	        key: 'addColorStop',
	        value: function addColorStop(e, t) {
	            this.colorStop.push([e, parseColorValue(t)]);
	        }
	    }]);

	    return ColorStop;
	}();

	var Context = function () {
	    function Context(t) {
	        _classCallCheck(this, Context);

	        this.actions = [];
	        this.path = [];
	        this.canvasId = t;
	    }

	    _createClass(Context, [{
	        key: 'getActions',
	        value: function getActions() {
	            var e = deepCopy(this.actions);
	            return this.actions = [], this.path = [], e;
	        }
	    }, {
	        key: 'clearActions',
	        value: function clearActions() {
	            this.actions = [], this.path = [];
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
	                t = this.canvasId,
	                n = deepCopy(this.actions);
	            this.actions = [], this.path = [], (0, _canvas2.default.drawCanvas)({
	                canvasId: t,
	                actions: n,
	                reserve: e
	            });
	        }
	    }, {
	        key: 'createLinearGradient',
	        value: function createLinearGradient(e, t, n, o) {
	            return new ColorStop("linear", [e, t, n, o]);
	        }
	    }, {
	        key: 'createCircularGradient',
	        value: function createCircularGradient(e, t, n) {
	            return new ColorStop("radial", [e, t, n]);
	        }
	    }]);

	    return Context;
	}();

	[].concat(transformAndOthersAPI, drawingAPI).forEach(function (e) {
	    "fill" == e || "stroke" == e ? Context.prototype[e] = function () {
	        this.actions.push({
	            method: e + "Path",
	            data: deepCopy(this.path)
	        });
	    } : "fillRect" === e ? Context.prototype[e] = function (e, t, n, o) {
	        this.actions.push({
	            method: "fillPath",
	            data: [{
	                method: "rect",
	                data: [e, t, n, o]
	            }]
	        });
	    } : "strokeRect" === e ? Context.prototype[e] = function (e, t, n, o) {
	        this.actions.push({
	            method: "strokePath",
	            data: [{
	                method: "rect",
	                data: [e, t, n, o]
	            }]
	        });
	    } : "fillText" == e ? Context.prototype[e] = function (t, n, o) {
	        this.actions.push({
	            method: e,
	            data: [t.toString(), n, o]
	        });
	    } : "drawImage" == e ? Context.prototype[e] = function (t, n, o, r, a) {
	        "devtools" == (0, _utils2.default.getPlatform)() || /wxfile:\/\//.test(t) || (t = (0, _utils2.default.getRealRoute)(y, t).replace(/.html$/, "")), isNum(r) && isNum(a) ? data = [t, n, o, r, a] : data = [t, n, o], this.actions.push({
	            method: e,
	            data: data
	        });
	    } : Context.prototype[e] = function () {
	        this.actions.push({
	            method: e,
	            data: [].slice.apply(arguments)
	        });
	    };
	});
	drawPathAPI.forEach(function (e) {
	    "beginPath" == e ? Context.prototype[e] = function () {
	        this.path = [];
	    } : "lineTo" == e ? Context.prototype.lineTo = function () {
	        0 == this.path.length ? this.path.push({
	            method: "moveTo",
	            data: [].slice.apply(arguments)
	        }) : this.path.push({
	            method: "lineTo",
	            data: [].slice.apply(arguments)
	        });
	    } : Context.prototype[e] = function () {
	        this.path.push({
	            method: e,
	            data: [].slice.apply(arguments)
	        });
	    };
	});
	styleAPI.forEach(function (e) {
	    "setFillStyle" == e || "setStrokeStyle" == e ? Context.prototype[e] = function () {
	        var t = arguments[0];
	        "string" == typeof t ? this.actions.push({
	            method: e,
	            data: ["normal", parseColorValue(t)]
	        }) : "object" == ("undefined" == typeof t ? "undefined" : _typeof(t)) && t instanceof ColorStop && this.actions.push({
	            method: e,
	            data: [t.type, t.data, t.colorStop]
	        });
	    } : "setGlobalAlpha" === e ? Context.prototype[e] = function () {
	        var t = [].slice.apply(arguments, [0, 1]);
	        t[0] = Math.floor(255 * parseFloat(t[0])), this.actions.push({
	            method: e,
	            data: t
	        });
	    } : "setShadow" == e ? Context.prototype[e] = function () {
	        var t = [].slice.apply(arguments, [0, 4]);
	        t[3] = parseColorValue(t[3]), this.actions.push({
	            method: e,
	            data: t
	        });
	    } : Context.prototype[e] = function () {
	        this.actions.push({
	            method: e,
	            data: [].slice.apply(arguments, [0, 1])
	        });
	    };
	});

	exports.default = {
	    notifyCurrentRoutetoContext: notifyCurrentRoutetoContext,
	    Context: Context
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _pubsub = __webpack_require__(13);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _context = __webpack_require__(21);

	var _context2 = _interopRequireDefault(_context);

	var _utils = __webpack_require__(14);

	var _utils2 = _interopRequireDefault(_utils);

	var _EventEmitter = __webpack_require__(17);

	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function canvasDesString(e, t) {
	    return e + "canvas" + t;
	}

	function clearOldWebviewCanvas() {
	    for (var e in canvasIDs) {
	        if (0 == e.indexOf(webviewID + "canvas")) {
	            canvasIDs[e];
	            delete canvasIDs[e];
	        }
	    }
	}

	function notifyWebviewIdtoCanvas(e) {
	    webviewID = e;
	}

	function invokeDrawCanvas(e, t) {
	    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
	        o = arguments[3],
	        r = arguments[4],
	        i = arguments[5],
	        a = (0, _utils2.default.getPlatform)();
	    "ios" == a || "android" == a ? ServiceJSBridge.invoke("drawCanvas", {
	        canvasId: e,
	        reserve: n,
	        actions: t
	    }, function (e) {
	        e.errMsg && /ok/.test(e.errMsg) ? "function" == typeof o && o(e) : "function" == typeof r && r(e), "function" == typeof i && i(e);
	    }) : ServiceJSBridge.publish("canvas" + e + "actionsChanged", {
	        actions: t,
	        reserve: n
	    });
	}

	function drawCanvas(e) {
	    var t = e.canvasId,
	        n = e.actions,
	        r = e.reserve,
	        i = e.success,
	        s = e.fail,
	        c = e.complete;
	    if (t && Array.isArray(n)) {
	        var u = canvasDesString(webviewID, t);
	        if ("number" == typeof canvasIDs[u]) {
	            var f = canvasIDs[u];
	            invokeDrawCanvas(f, n, r, i, s, c);
	        } else y[u] = y[u] || [], y[u] = y[u].concat({
	            actions: n,
	            reserve: r,
	            success: i,
	            fail: s,
	            complete: c
	        });
	    }
	}

	function canvasToTempFilePathImpl(obj) {
	    var platform = (0, _utils2.default.getPlatform)();
	    "ios" === platform || "android" === platform ? (0, _pubsub2.default.invokeMethod)("canvasToTempFilePath", obj) : (ServiceJSBridge.subscribe("onCanvasToDataUrl_" + obj.canvasId, function (t) {
	        var n = t.dataUrl;
	        (0, _pubsub2.default.invokeMethod)("base64ToTempFilePath", (0, _utils2.default.assign)({
	            base64Data: n
	        }, obj), {
	            beforeAll: function beforeAll(e) {
	                e.errMsg = e.errMsg.replace("base64ToTempFilePath", "canvasToTempFilePath");
	            }
	        });
	    }), (0, _pubsub2.default.publish)("invokeCanvasToDataUrl_" + obj.canvasId, {
	        canvasId: obj.canvasId
	    }));
	}

	function canvasToTempFilePath(obj) {
	    if (obj.canvasId) {
	        var t = canvasDesString(webviewID, obj.canvasId);
	        if ("number" == typeof canvasIDs[t]) obj.canvasId = canvasIDs[t], canvasToTempFilePathImpl(obj);else {
	            var n = {
	                errMsg: "canvasToTempFilePath: fail canvas is empty"
	            };
	            "function" == typeof obj.fail && obj.fail(n), "function" == typeof obj.complete && obj.complete(n);
	        }
	    }
	}

	var webviewID = (new _EventEmitter2.default.EventEmitter2(), 0),
	    canvasInfo = {},
	    canvasIDs = {},
	    y = {};

	ServiceJSBridge.subscribe("canvasInsert", function (event, t) {
	    var canvasId = event.canvasId,
	        canvasNumber = event.canvasNumber,
	        data = event.data,
	        s = canvasDesString(webviewID, canvasId);

	    canvasInfo[canvasNumber] = {
	        lastTouches: [],
	        data: data
	    };

	    canvasIDs[s] = canvasIDs[s] || canvasNumber;

	    Array.isArray(y[s]) && (y[s].forEach(function (e) {
	        invokeDrawCanvas(canvasNumber, e.actions, e.reserve, e.success, e.fail, e.complete);
	    }), delete y[s]);
	});

	ServiceJSBridge.subscribe("canvasRemove", function (e, t) {
	    var n = e.canvasId,
	        r = canvasDesString(webviewID, n);
	    canvasIDs[r] && delete canvasIDs[r];
	});

	var createContext = function createContext() {
	    return new _context2.default.Context();
	},
	    createCanvasContext = function createCanvasContext(e) {
	    return new _context2.default.Context(e);
	};

	exports.default = {
	    canvasInfo: canvasInfo,
	    clearOldWebviewCanvas: clearOldWebviewCanvas,
	    notifyWebviewIdtoCanvas: notifyWebviewIdtoCanvas,
	    drawCanvas: drawCanvas,
	    canvasToTempFilePath: canvasToTempFilePath,
	    createContext: createContext,
	    createCanvasContext: createCanvasContext
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// module14 predefinedColor

	var predefinedColor = exports.predefinedColor = {
	    aliceblue: "#f0f8ff",
	    antiquewhite: "#faebd7",
	    aqua: "#00ffff",
	    aquamarine: "#7fffd4",
	    azure: "#f0ffff",
	    beige: "#f5f5dc",
	    bisque: "#ffe4c4",
	    black: "#000000",
	    blanchedalmond: "#ffebcd",
	    blue: "#0000ff",
	    blueviolet: "#8a2be2",
	    brown: "#a52a2a",
	    burlywood: "#deb887",
	    cadetblue: "#5f9ea0",
	    chartreuse: "#7fff00",
	    chocolate: "#d2691e",
	    coral: "#ff7f50",
	    cornflowerblue: "#6495ed",
	    cornsilk: "#fff8dc",
	    crimson: "#dc143c",
	    cyan: "#00ffff",
	    darkblue: "#00008b",
	    darkcyan: "#008b8b",
	    darkgoldenrod: "#b8860b",
	    darkgray: "#a9a9a9",
	    darkgrey: "#a9a9a9",
	    darkgreen: "#006400",
	    darkkhaki: "#bdb76b",
	    darkmagenta: "#8b008b",
	    darkolivegreen: "#556b2f",
	    darkorange: "#ff8c00",
	    darkorchid: "#9932cc",
	    darkred: "#8b0000",
	    darksalmon: "#e9967a",
	    darkseagreen: "#8fbc8f",
	    darkslateblue: "#483d8b",
	    darkslategray: "#2f4f4f",
	    darkslategrey: "#2f4f4f",
	    darkturquoise: "#00ced1",
	    darkviolet: "#9400d3",
	    deeppink: "#ff1493",
	    deepskyblue: "#00bfff",
	    dimgray: "#696969",
	    dimgrey: "#696969",
	    dodgerblue: "#1e90ff",
	    firebrick: "#b22222",
	    floralwhite: "#fffaf0",
	    forestgreen: "#228b22",
	    fuchsia: "#ff00ff",
	    gainsboro: "#dcdcdc",
	    ghostwhite: "#f8f8ff",
	    gold: "#ffd700",
	    goldenrod: "#daa520",
	    gray: "#808080",
	    grey: "#808080",
	    green: "#008000",
	    greenyellow: "#adff2f",
	    honeydew: "#f0fff0",
	    hotpink: "#ff69b4",
	    indianred: "#cd5c5c",
	    indigo: "#4b0082",
	    ivory: "#fffff0",
	    khaki: "#f0e68c",
	    lavender: "#e6e6fa",
	    lavenderblush: "#fff0f5",
	    lawngreen: "#7cfc00",
	    lemonchiffon: "#fffacd",
	    lightblue: "#add8e6",
	    lightcoral: "#f08080",
	    lightcyan: "#e0ffff",
	    lightgoldenrodyellow: "#fafad2",
	    lightgray: "#d3d3d3",
	    lightgrey: "#d3d3d3",
	    lightgreen: "#90ee90",
	    lightpink: "#ffb6c1",
	    lightsalmon: "#ffa07a",
	    lightseagreen: "#20b2aa",
	    lightskyblue: "#87cefa",
	    lightslategray: "#778899",
	    lightslategrey: "#778899",
	    lightsteelblue: "#b0c4de",
	    lightyellow: "#ffffe0",
	    lime: "#00ff00",
	    limegreen: "#32cd32",
	    linen: "#faf0e6",
	    magenta: "#ff00ff",
	    maroon: "#800000",
	    mediumaquamarine: "#66cdaa",
	    mediumblue: "#0000cd",
	    mediumorchid: "#ba55d3",
	    mediumpurple: "#9370db",
	    mediumseagreen: "#3cb371",
	    mediumslateblue: "#7b68ee",
	    mediumspringgreen: "#00fa9a",
	    mediumturquoise: "#48d1cc",
	    mediumvioletred: "#c71585",
	    midnightblue: "#191970",
	    mintcream: "#f5fffa",
	    mistyrose: "#ffe4e1",
	    moccasin: "#ffe4b5",
	    navajowhite: "#ffdead",
	    navy: "#000080",
	    oldlace: "#fdf5e6",
	    olive: "#808000",
	    olivedrab: "#6b8e23",
	    orange: "#ffa500",
	    orangered: "#ff4500",
	    orchid: "#da70d6",
	    palegoldenrod: "#eee8aa",
	    palegreen: "#98fb98",
	    paleturquoise: "#afeeee",
	    palevioletred: "#db7093",
	    papayawhip: "#ffefd5",
	    peachpuff: "#ffdab9",
	    peru: "#cd853f",
	    pink: "#ffc0cb",
	    plum: "#dda0dd",
	    powderblue: "#b0e0e6",
	    purple: "#800080",
	    rebeccapurple: "#663399",
	    red: "#ff0000",
	    rosybrown: "#bc8f8f",
	    royalblue: "#4169e1",
	    saddlebrown: "#8b4513",
	    salmon: "#fa8072",
	    sandybrown: "#f4a460",
	    seagreen: "#2e8b57",
	    seashell: "#fff5ee",
	    sienna: "#a0522d",
	    silver: "#c0c0c0",
	    skyblue: "#87ceeb",
	    slateblue: "#6a5acd",
	    slategray: "#708090",
	    slategrey: "#708090",
	    snow: "#fffafa",
	    springgreen: "#00ff7f",
	    steelblue: "#4682b4",
	    tan: "#d2b48c",
	    teal: "#008080",
	    thistle: "#d8bfd8",
	    tomato: "#ff6347",
	    turquoise: "#40e0d0",
	    violet: "#ee82ee",
	    wheat: "#f5deb3",
	    white: "#ffffff",
	    whitesmoke: "#f5f5f5",
	    yellow: "#ffff00",
	    yellowgreen: "#9acd32"
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _pubsub = __webpack_require__(13);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _EventEmitter = __webpack_require__(17);

	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	var _configFlags = __webpack_require__(18);

	var _configFlags2 = _interopRequireDefault(_configFlags);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var eventEmitter = new _EventEmitter2.default(); //1-15 绑定AppEnterForeground与AppEnterBackground

	(0, _pubsub2.default.onMethod)("onAppEnterForeground", function () {
	  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	  eventEmitter.emit("onAppEnterForeground", e);
	});
	(0, _pubsub2.default.onMethod)("onAppEnterBackground", function () {
	  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	  eventEmitter.emit("onAppEnterBackground", e);
	});

	var onAppEnterForeground = function onAppEnterForeground(e) {
	  var t = this;
	  "function" == typeof e && setTimeout(e, 0);
	  eventEmitter.on("onAppEnterForeground", function (n) {
	    (0, _pubsub2.default.publish)("onAppEnterForeground", n), t.appStatus = _configFlags2.default.AppStatus.FORE_GROUND, "function" == typeof e && e(n);
	  });
	};

	var onAppEnterBackground = function onAppEnterBackground(e) {
	  var t = this;
	  eventEmitter.on("onAppEnterBackground", function (n) {
	    n = n || {}(0, _pubsub2.default.publish)("onAppEnterBackground", n);
	    "hide" === n.mode ? t.appStatus = _configFlags2.default.AppStatus.LOCK : t.appStatus = _configFlags2.default.AppStatus.BACK_GROUND, "close" === n.mode ? t.hanged = !1 : "hang" === n.mode && (t.hanged = !0), "function" == typeof e && e(n);
	  });
	};

	exports.default = {
	  onAppEnterForeground: onAppEnterForeground,
	  onAppEnterBackground: onAppEnterBackground
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	if ("undefined" == typeof navigator) try {
	    eval("const GeneratorFunction = Object.getPrototypeOf(function *() {}).constructor; const canvas = new GeneratorFunction('', 'console.log(0)'); canvas().__proto__.__proto__.next = () => {};");
	} catch (e) {}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// rewrite Function adn SetTimeout setInterval

	(function (e) {
	    var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
	        return typeof e === "undefined" ? "undefined" : _typeof2(e);
	    } : function (e) {
	        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
	    };

	    __webpack_require__(13);
	    /*
	        if ("undefined" != typeof Function) {
	            Function;
	            e = {},
	                Function.constructor = function () {
	                },
	                Function.prototype.constructor = function () {
	                },
	                Function = function () {
	                    if (arguments.length > 0 && "return this" === arguments[arguments.length - 1])
	                        return function () {
	                            return e
	                        }
	                },
	                Object.defineProperty(Function.constructor.__proto__, "apply", {
	                    writable: !1,
	                    configurable: !1,
	                    value: Function.prototype.constructor.apply
	                })
	        }
	    */
	    // "undefined" != typeof eval && (eval = void 0),
//	    "undefined" != typeof navigator && !function () {
//	        var e = setTimeout;
//	        setTimeout = function setTimeout(n, o) {
//	            if ("function" != typeof n) throw new TypeError("setTimetout expects a function as first argument but got " + ("undefined" == typeof n ? "undefined" : _typeof(n)) + ".");
//	            var r = Reporter.surroundThirdByTryCatch(n, "at setTimeout callback function");
//	            return e(r, o);
//	        };
//	        var n = setInterval;
//	        setInterval = function setInterval(e, o) {
//	            if ("function" != typeof e) throw new TypeError("setInterval expects a function as first argument but got " + ("undefined" == typeof e ? "undefined" : _typeof(e)) + ".");
//	            Reporter.surroundThirdByTryCatch(e, "at setInterval callback function");
//	            return n(e, o);
//	        };
//	    }();
	}).call(exports, function () {
	    return this;
	}());

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _pubsub = __webpack_require__(13);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _utils = __webpack_require__(14);

	var _utils2 = _interopRequireDefault(_utils);

	var _configFlags = __webpack_require__(18);

	var _configFlags2 = _interopRequireDefault(_configFlags);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	"undefined" != typeof __wxConfig__ && __wxConfig__.debug && "devtools" !== _utils2.default.getPlatform() && !function () {
	    var logQueue = [],
	        viewIds = [],
	        consoleMethods = ["log", "warn", "error", "info", "debug"];
	    consoleMethods.forEach(function (key) {
	        var consoleMethod = console[key];
	        console[key] = function () {
	            logQueue.length > _configFlags2.default.LOG_LIMIT && logQueue.shift();
	            var logArr = Array.prototype.slice.call(arguments);

	            logQueue.push({
	                method: key,
	                log: logArr
	            });

	            consoleMethod.apply(console, arguments), viewIds.length > 0 && _pubsub2.default.publish(key, {
	                log: logArr
	            }, viewIds);
	        };
	    }), _pubsub2.default.subscribe("DOMContentLoaded", function (n, viewId) {
	        viewIds.push(viewId);
	        _pubsub2.default.publish("initLogs", {
	            logs: logQueue
	        }, [viewId]);
	    });
	}(), "undefined" == typeof console.group && (console.group = function () {}), "undefined" == typeof console.groupEnd && (console.groupEnd = function () {}); //1-11 线上针对debug相关函数做处理

/***/ }
/******/ ]);
var __appServiceEngine__ =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

		/******/ 		// Check if module is in cache
		/******/ 		if(installedModules[moduleId])
		/******/ 			return installedModules[moduleId].exports;

		/******/ 		// Create a new module (and put it into the cache)
		/******/ 		var module = installedModules[moduleId] = {
			/******/ 			exports: {},
			/******/ 			id: moduleId,
			/******/ 			loaded: false
			/******/ 		};

		/******/ 		// Execute the module function
		/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ 		// Flag the module as loaded
		/******/ 		module.loaded = true;

		/******/ 		// Return the exports of the module
		/******/ 		return module.exports;
		/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _pageInit = __webpack_require__(39);

		var _pageInit2 = _interopRequireDefault(_pageInit);

		var _eventHandle = __webpack_require__(108);

		var _eventHandle2 = _interopRequireDefault(_eventHandle);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		Object.defineProperty(exports, "Page", {
			enumerable: true,
			get: function get() {
				return _pageInit2.default.pageHolder;
			}
		});
		Object.defineProperty(exports, "getCurrentPages", {
			enumerable: true,
			get: function get() {
				return _pageInit2.default.getCurrentPages;
			}
		});
		Object.defineProperty(exports, "App", {
			enumerable: true,
			get: function get() {
				return _eventHandle2.default.appHolder;
			}
		});
		Object.defineProperty(exports, "getApp", {
			enumerable: true,
			get: function get() {
				return _eventHandle2.default.getApp;
			}
		});

		/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(2), __esModule: true };

		/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		var core  = __webpack_require__(3)
			, $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
		module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
			return $JSON.stringify.apply($JSON, arguments);
		};

		/***/ },
	/* 3 */
	/***/ function(module, exports) {

		var core = module.exports = {version: '2.4.0'};
		if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

		/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(5), __esModule: true };

		/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(6);
		module.exports = __webpack_require__(3).Object.keys;

		/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		// 19.1.2.14 Object.keys(O)
		var toObject = __webpack_require__(7)
			, $keys    = __webpack_require__(9);

		__webpack_require__(24)('keys', function(){
			return function keys(it){
				return $keys(toObject(it));
			};
		});

		/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {

		// 7.1.13 ToObject(argument)
		var defined = __webpack_require__(8);
		module.exports = function(it){
			return Object(defined(it));
		};

		/***/ },
	/* 8 */
	/***/ function(module, exports) {

		// 7.2.1 RequireObjectCoercible(argument)
		module.exports = function(it){
			if(it == undefined)throw TypeError("Can't call method on  " + it);
			return it;
		};

		/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		// 19.1.2.14 / 15.2.3.14 Object.keys(O)
		var $keys       = __webpack_require__(10)
			, enumBugKeys = __webpack_require__(23);

		module.exports = Object.keys || function keys(O){
				return $keys(O, enumBugKeys);
			};

		/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		var has          = __webpack_require__(11)
			, toIObject    = __webpack_require__(12)
			, arrayIndexOf = __webpack_require__(15)(false)
			, IE_PROTO     = __webpack_require__(19)('IE_PROTO');

		module.exports = function(object, names){
			var O      = toIObject(object)
				, i      = 0
				, result = []
				, key;
			for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
			// Don't enum bug & hidden keys
			while(names.length > i)if(has(O, key = names[i++])){
				~arrayIndexOf(result, key) || result.push(key);
			}
			return result;
		};

		/***/ },
	/* 11 */
	/***/ function(module, exports) {

		var hasOwnProperty = {}.hasOwnProperty;
		module.exports = function(it, key){
			return hasOwnProperty.call(it, key);
		};

		/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {

		// to indexed object, toObject with fallback for non-array-like ES3 strings
		var IObject = __webpack_require__(13)
			, defined = __webpack_require__(8);
		module.exports = function(it){
			return IObject(defined(it));
		};

		/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {

		// fallback for non-array-like ES3 and non-enumerable old V8 strings
		var cof = __webpack_require__(14);
		module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
			return cof(it) == 'String' ? it.split('') : Object(it);
		};

		/***/ },
	/* 14 */
	/***/ function(module, exports) {

		var toString = {}.toString;

		module.exports = function(it){
			return toString.call(it).slice(8, -1);
		};

		/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {

		// false -> Array#indexOf
		// true  -> Array#includes
		var toIObject = __webpack_require__(12)
			, toLength  = __webpack_require__(16)
			, toIndex   = __webpack_require__(18);
		module.exports = function(IS_INCLUDES){
			return function($this, el, fromIndex){
				var O      = toIObject($this)
					, length = toLength(O.length)
					, index  = toIndex(fromIndex, length)
					, value;
				// Array#includes uses SameValueZero equality algorithm
				if(IS_INCLUDES && el != el)while(length > index){
					value = O[index++];
					if(value != value)return true;
					// Array#toIndex ignores holes, Array#includes - not
				} else for(;length > index; index++)if(IS_INCLUDES || index in O){
					if(O[index] === el)return IS_INCLUDES || index || 0;
				} return !IS_INCLUDES && -1;
			};
		};

		/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {

		// 7.1.15 ToLength
		var toInteger = __webpack_require__(17)
			, min       = Math.min;
		module.exports = function(it){
			return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
		};

		/***/ },
	/* 17 */
	/***/ function(module, exports) {

		// 7.1.4 ToInteger
		var ceil  = Math.ceil
			, floor = Math.floor;
		module.exports = function(it){
			return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
		};

		/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {

		var toInteger = __webpack_require__(17)
			, max       = Math.max
			, min       = Math.min;
		module.exports = function(index, length){
			index = toInteger(index);
			return index < 0 ? max(index + length, 0) : min(index, length);
		};

		/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {

		var shared = __webpack_require__(20)('keys')
			, uid    = __webpack_require__(22);
		module.exports = function(key){
			return shared[key] || (shared[key] = uid(key));
		};

		/***/ },
	/* 20 */
	/***/ function(module, exports, __webpack_require__) {

		var global = __webpack_require__(21)
			, SHARED = '__core-js_shared__'
			, store  = global[SHARED] || (global[SHARED] = {});
		module.exports = function(key){
			return store[key] || (store[key] = {});
		};

		/***/ },
	/* 21 */
	/***/ function(module, exports) {

		// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
		var global = module.exports = typeof window != 'undefined' && window.Math == Math
			? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
		if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

		/***/ },
	/* 22 */
	/***/ function(module, exports) {

		var id = 0
			, px = Math.random();
		module.exports = function(key){
			return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
		};

		/***/ },
	/* 23 */
	/***/ function(module, exports) {

		// IE 8- don't enum bug keys
		module.exports = (
			'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
		).split(',');

		/***/ },
	/* 24 */
	/***/ function(module, exports, __webpack_require__) {

		// most Object methods by ES6 should accept primitives
		var $export = __webpack_require__(25)
			, core    = __webpack_require__(3)
			, fails   = __webpack_require__(34);
		module.exports = function(KEY, exec){
			var fn  = (core.Object || {})[KEY] || Object[KEY]
				, exp = {};
			exp[KEY] = exec(fn);
			$export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
		};

		/***/ },
	/* 25 */
	/***/ function(module, exports, __webpack_require__) {

		var global    = __webpack_require__(21)
			, core      = __webpack_require__(3)
			, ctx       = __webpack_require__(26)
			, hide      = __webpack_require__(28)
			, PROTOTYPE = 'prototype';

		var $export = function(type, name, source){
			var IS_FORCED = type & $export.F
				, IS_GLOBAL = type & $export.G
				, IS_STATIC = type & $export.S
				, IS_PROTO  = type & $export.P
				, IS_BIND   = type & $export.B
				, IS_WRAP   = type & $export.W
				, exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
				, expProto  = exports[PROTOTYPE]
				, target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
				, key, own, out;
			if(IS_GLOBAL)source = name;
			for(key in source){
				// contains in native
				own = !IS_FORCED && target && target[key] !== undefined;
				if(own && key in exports)continue;
				// export native or passed
				out = own ? target[key] : source[key];
				// prevent global pollution for namespaces
				exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
					// bind timers to global for call from export context
					: IS_BIND && own ? ctx(out, global)
					// wrap global constructors for prevent change them in library
					: IS_WRAP && target[key] == out ? (function(C){
					var F = function(a, b, c){
						if(this instanceof C){
							switch(arguments.length){
								case 0: return new C;
								case 1: return new C(a);
								case 2: return new C(a, b);
							} return new C(a, b, c);
						} return C.apply(this, arguments);
					};
					F[PROTOTYPE] = C[PROTOTYPE];
					return F;
					// make static versions for prototype methods
				})(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
				// export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
				if(IS_PROTO){
					(exports.virtual || (exports.virtual = {}))[key] = out;
					// export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
					if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
				}
			}
		};
		// type bitmap
		$export.F = 1;   // forced
		$export.G = 2;   // global
		$export.S = 4;   // static
		$export.P = 8;   // proto
		$export.B = 16;  // bind
		$export.W = 32;  // wrap
		$export.U = 64;  // safe
		$export.R = 128; // real proto method for `library`
		module.exports = $export;

		/***/ },
	/* 26 */
	/***/ function(module, exports, __webpack_require__) {

		// optional / simple context binding
		var aFunction = __webpack_require__(27);
		module.exports = function(fn, that, length){
			aFunction(fn);
			if(that === undefined)return fn;
			switch(length){
				case 1: return function(a){
					return fn.call(that, a);
				};
				case 2: return function(a, b){
					return fn.call(that, a, b);
				};
				case 3: return function(a, b, c){
					return fn.call(that, a, b, c);
				};
			}
			return function(/* ...args */){
				return fn.apply(that, arguments);
			};
		};

		/***/ },
	/* 27 */
	/***/ function(module, exports) {

		module.exports = function(it){
			if(typeof it != 'function')throw TypeError(it + ' is not a function!');
			return it;
		};

		/***/ },
	/* 28 */
	/***/ function(module, exports, __webpack_require__) {

		var dP         = __webpack_require__(29)
			, createDesc = __webpack_require__(37);
		module.exports = __webpack_require__(33) ? function(object, key, value){
			return dP.f(object, key, createDesc(1, value));
		} : function(object, key, value){
			object[key] = value;
			return object;
		};

		/***/ },
	/* 29 */
	/***/ function(module, exports, __webpack_require__) {

		var anObject       = __webpack_require__(30)
			, IE8_DOM_DEFINE = __webpack_require__(32)
			, toPrimitive    = __webpack_require__(36)
			, dP             = Object.defineProperty;

		exports.f = __webpack_require__(33) ? Object.defineProperty : function defineProperty(O, P, Attributes){
			anObject(O);
			P = toPrimitive(P, true);
			anObject(Attributes);
			if(IE8_DOM_DEFINE)try {
				return dP(O, P, Attributes);
			} catch(e){ /* empty */ }
			if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
			if('value' in Attributes)O[P] = Attributes.value;
			return O;
		};

		/***/ },
	/* 30 */
	/***/ function(module, exports, __webpack_require__) {

		var isObject = __webpack_require__(31);
		module.exports = function(it){
			if(!isObject(it))throw TypeError(it + ' is not an object!');
			return it;
		};

		/***/ },
	/* 31 */
	/***/ function(module, exports) {

		module.exports = function(it){
			return typeof it === 'object' ? it !== null : typeof it === 'function';
		};

		/***/ },
	/* 32 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = !__webpack_require__(33) && !__webpack_require__(34)(function(){
				return Object.defineProperty(__webpack_require__(35)('div'), 'a', {get: function(){ return 7; }}).a != 7;
			});

		/***/ },
	/* 33 */
	/***/ function(module, exports, __webpack_require__) {

		// Thank's IE8 for his funny defineProperty
		module.exports = !__webpack_require__(34)(function(){
			return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
		});

		/***/ },
	/* 34 */
	/***/ function(module, exports) {

		module.exports = function(exec){
			try {
				return !!exec();
			} catch(e){
				return true;
			}
		};

		/***/ },
	/* 35 */
	/***/ function(module, exports, __webpack_require__) {

		var isObject = __webpack_require__(31)
			, document = __webpack_require__(21).document
		// in old IE typeof document.createElement is 'object'
			, is = isObject(document) && isObject(document.createElement);
		module.exports = function(it){
			return is ? document.createElement(it) : {};
		};

		/***/ },
	/* 36 */
	/***/ function(module, exports, __webpack_require__) {

		// 7.1.1 ToPrimitive(input [, PreferredType])
		var isObject = __webpack_require__(31);
		// instead of the ES6 spec version, we didn't implement @@toPrimitive case
		// and the second argument - flag - preferred type is a string
		module.exports = function(it, S){
			if(!isObject(it))return it;
			var fn, val;
			if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
			if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
			if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
			throw TypeError("Can't convert object to primitive value");
		};

		/***/ },
	/* 37 */
	/***/ function(module, exports) {

		module.exports = function(bitmap, value){
			return {
				enumerable  : !(bitmap & 1),
				configurable: !(bitmap & 2),
				writable    : !(bitmap & 4),
				value       : value
			};
		};

		/***/ },
	/* 38 */,
	/* 39 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _stringify = __webpack_require__(1);

		var _stringify2 = _interopRequireDefault(_stringify);

		var _typeof2 = __webpack_require__(40);

		var _typeof3 = _interopRequireDefault(_typeof2);

		var _together = __webpack_require__(77);

		var _together2 = _interopRequireDefault(_together);

		var _parsePage = __webpack_require__(98);

		var _parsePage2 = _interopRequireDefault(_parsePage);

		var _eventDefine = __webpack_require__(106);

		var eventDefine = _interopRequireWildcard(_eventDefine);

		var _reportRealtimeAction = __webpack_require__(107);

		var reportRealtimeAction = _interopRequireWildcard(_reportRealtimeAction);

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var getRouteToPage;
		var getWebviewIdToPage;
		var setWxRouteBegin;
		var setWxRoute;
		var setWxConfig;
		var reset;
		var pageHolder;
		var getCurrentPages;
		var getCurrentPage;

		var pageStock = [];
		var tabBars = [];
		var currentPage;
		__wxConfig__.tabBar && __wxConfig__.tabBar.list && "object" === (0, _typeof3.default)(__wxConfig__.tabBar.list) && "function" == typeof __wxConfig__.tabBar.list.forEach && __wxConfig__.tabBar.list.forEach(function (e) {
			tabBars.push(e.pagePath);
		});

		var app = {
			appRouteTime: 0,
			newPageTime: 0,
			pageReadyTime: 0
		};

		var speedReport = function speedReport(e, t, n) {
			Reporter.speedReport({
				key: e,
				timeMark: {
					startTime: t,
					endTime: n
				}
			});
		};

		var pageStockObjs = {};
		var pageObjMap = {};
		var pageIndex = 0;

		getCurrentPage = function getCurrentPage() {
			return currentPage;
		};
		getCurrentPages = function getCurrentPages() {
			var e = [];
			pageStock.forEach(function (t) {
				e.push(t.page);
			});
			return e;
		};
		pageHolder = function pageHolder(pageObj) {
			//Page 接口
			if (!__wxRouteBegin) {
				throw _together2.default.error("Page 注册错误", "Please do not register multiple Pages in " + __wxRoute + ".js");
				new _together2.default.AppServiceEngineKnownError("Please do not register multiple Pages in " + __wxRoute + ".js");
			}

			__wxRouteBegin = !1;
			var pages = __wxConfig__.pages,
				n = pages[pageIndex];
			if (pageIndex++, "Object" !== _together2.default.getDataType(pageObj)) {
				throw _together2.default.error("Page 注册错误", "Options is not object: " + (0, _stringify2.default)(pageObj) + " in " + __wxRoute + ".js");
				new _together2.default.AppServiceEngineKnownError("Options is not object: " + (0, _stringify2.default)(pageObj) + " in " + __wxRoute + ".js");
			}
			_together2.default.info("Register Page: " + n);
			pageObjMap[n] = pageObj;
		};
		var pageInitData = _together2.default.surroundByTryCatch(function (pageObj, t) {
			_together2.default.info("Update view with init data");
			var n = {};
			n.webviewId = t, n.enablePullUpRefresh = pageObj.hasOwnProperty("onReachBottom");
			var o = {
				data: {
					data: pageObj.data,
					ext: n,
					options: {
						firstRender: !0
					}
				}
			};
			_together2.default.publish("appDataChange", o, [t]);
			reportRealtimeAction.triggerAnalytics("pageReady", pageObj);
		});
		var pageParse = function pageParse(routePath, webviewId, params) {
			//解析page e:pagepath t:webviewId params:
			var o = undefined;
			if (pageObjMap.hasOwnProperty(routePath)) {
				o = pageObjMap[routePath];
			} else {
				_together2.default.warn("Page route 错误", "Page[" + routePath + "] not found. May be caused by: 1. Forgot to add page route in app.json. 2. Invoking Page() in async task.");
				o = {};
			}
			app.newPageTime = Date.now();
			var page = new _parsePage2.default(o, webviewId, routePath);
			pageInitData(page, webviewId);
			_together2.default.isDevTools() && (__wxAppData[routePath] = page.data, __wxAppData[routePath].__webviewId__ = webviewId, _together2.default.publish(eventDefine.UPDATE_APP_DATA));
			currentPage = {
				page: page,
				webviewId: webviewId,
				route: routePath
			};
			pageStock.push(currentPage);
			page.onLoad(params);
			page.onShow();
			pageStockObjs[webviewId] = {
				page: page,
				route: routePath
			};
			reportRealtimeAction.triggerAnalytics("enterPage", page);
			speedReport("appRoute2newPage", app.appRouteTime, app.newPageTime);
		};

		var pageHide = function pageHide(e) {
			//执行page hide event
			e.page.onHide();
			reportRealtimeAction.triggerAnalytics("leavePage", e.page);
		};

		var pageUnload = function pageUnload(e) {
			//do page unload
			e.page.onUnload();
			_together2.default.isDevTools() && (delete __wxAppData[e.route], _together2.default.publish(eventDefine.UPDATE_APP_DATA));
			delete pageStockObjs[e.webviewId];
			pageStock = pageStock.slice(0, pageStock.length - 1);
			reportRealtimeAction.triggerAnalytics("leavePage", e.page);
		};

		var isTabBarsPage = function isTabBarsPage(e) {
			//
			return tabBars.indexOf(e.route) !== -1 || tabBars.indexOf(e.route + ".html") !== -1;
		};

		var skipPage = function skipPage(routePath, pWebViewId, pageParams, pApiKey) {
			//打开、跳转页面
			if (_together2.default.info("On app route: " + routePath), app.appRouteTime = Date.now(), "navigateTo" === pApiKey) {
				currentPage && pageHide(currentPage);
				pageStockObjs.hasOwnProperty(pWebViewId) ? _together2.default.error("Page route 错误(system error)", "navigateTo with an already exist webviewId " + pWebViewId) : pageParse(routePath, pWebViewId, pageParams);
			} else if ("redirectTo" === pApiKey) {
				currentPage && pageUnload(currentPage);
				pageStockObjs.hasOwnProperty(pWebViewId) ? _together2.default.error("Page route 错误(system error)", "redirectTo with an already exist webviewId " + pWebViewId) : pageParse(routePath, pWebViewId, pageParams);
			} else if ("navigateBack" === pApiKey) {
				for (var r = !1, i = pageStock.length - 1; i >= 0; i--) {
					var a = pageStock[i];
					if (a.webviewId === pWebViewId) {
						r = !0;
						currentPage = a;
						a.page.onShow();
						reportRealtimeAction.triggerAnalytics("enterPage", a);
						break;
					}
					pageUnload(a);
				}
				r || _together2.default.error("Page route 错误(system error)", "navigateBack with an unexist webviewId " + pWebViewId);
			} else if ("switchTab" === pApiKey) {
				for (var s = !0; pageStock.length > 1;) {
					pageUnload(pageStock[pageStock.length - 1]);
					s = !1;
				}
				if (pageStock[0].webviewId === pWebViewId) {
					currentPage = pageStock[0];
					s || currentPage.page.onShow();
				} else if (isTabBarsPage(pageStock[0]) ? s && pageHide(pageStock[0]) : pageUnload(pageStock[0]), pageStockObjs.hasOwnProperty(pWebViewId)) {
					var u = pageStockObjs[pWebViewId].page;
					currentPage = {
						webviewId: pWebViewId,
						route: routePath,
						page: u
					};
					pageStock = [currentPage];
					u.onShow();
					reportRealtimeAction.triggerAnalytics("enterPage", u);
				} else {
					pageStock = [];
					pageParse(routePath, pWebViewId, pageParams);
				}
			} else {
				"appLaunch" === pApiKey ? pageStockObjs.hasOwnProperty(pWebViewId) ? _together2.default.error("Page route 错误(system error)", "apppLaunch with an already exist webviewId " + pWebViewId) : pageParse(routePath, pWebViewId, pageParams) : _together2.default.error("Page route 错误(system error)", "Illegal open type: " + pApiKey);
			}
		};

		var domReady = function domReady(pWebviewId, pEvent, n) {
			//do dom ready
			if (!pageStockObjs.hasOwnProperty(pWebviewId)) {
				return _together2.default.warn("事件警告", "OnWebviewEvent: " + pEvent + ", WebviewId: " + pWebviewId + " not found");
			}
			var o = pageStockObjs[pWebviewId],
				pageObj = o.page;
			return pEvent === eventDefine.DOM_READY_EVENT ? (app.pageReadyTime = Date.now(), _together2.default.info("Invoke event onReady in page: " + o.route), pageObj.onReady(), void speedReport("newPage2pageReady", app.newPageTime, app.pageReadyTime)) : (_together2.default.info("Invoke event " + pEvent + " in page: " + o.route), pageObj.hasOwnProperty(pEvent) ? _together2.default.safeInvoke.call(pageObj, pEvent, n) : _together2.default.warn("事件警告", "Do not have " + pEvent + " handler in current page: " + o.route + ". Please make sure that " + pEvent + " handler has been defined in " + o.route + ", or " + o.route + " has been added into app.json"));
		};

		var pullDownRefresh = function pullDownRefresh(pWebviewId) {
			//do pulldownrefresh
			pageStockObjs.hasOwnProperty(pWebviewId) || _together2.default.warn("事件警告", "onPullDownRefresh WebviewId: " + pWebviewId + " not found");
			var t = pageStockObjs[pWebviewId],
				pageObj = t.page;
			pageObj.hasOwnProperty("onPullDownRefresh") && (_together2.default.info("Invoke event onPullDownRefresh in page: " + t.route), _together2.default.safeInvoke.call(pageObj, "onPullDownRefresh"), reportRealtimeAction.triggerAnalytics("pullDownRefresh", pageObj));
		};

		var invokeShareAppMessage = function invokeShareAppMessage(params, pWebviewId) {
			//invoke event onShareAppMessage
			var shareParams = params,
				o = pageStockObjs[pWebviewId],
				pageObj = o.page,
				i = "onShareAppMessage";
			if (pageObj.hasOwnProperty(i)) {
				_together2.default.info("Invoke event onShareAppMessage in page: " + o.route);
				var a = _together2.default.safeInvoke.call(pageObj, i) || {};
				shareParams.title = a.title || params.title, shareParams.desc = a.desc || params.desc, shareParams.path = a.path ? _together2.default.addHtmlSuffixToUrl(a.path) : params.path, shareParams.path.length > 0 && "/" === shareParams.path[0] && (shareParams.path = shareParams.path.substr(1)), shareParams.success = a.success, shareParams.cancel = a.cancel, shareParams.fail = a.fail, shareParams.complete = a.complete;
			}
			return shareParams;
		};
		wxs.onAppRoute(_together2.default.surroundByTryCatch(function (e) {
			var path = e.path,
				webviewId = e.webviewId,
				query = e.query || {},
				openType = e.openType;
			skipPage(path, webviewId, query, openType);
		}), "onAppRoute");

		wxs.onWebviewEvent(_together2.default.surroundByTryCatch(function (e) {
			var webviewId = e.webviewId,
				eventName = e.eventName,
				data = e.data;
			return domReady(webviewId, eventName, data);
		}, "onWebviewEvent"));
		ServiceJSBridge.on("onPullDownRefresh", _together2.default.surroundByTryCatch(function (e, pWebViewId) {
			pullDownRefresh(pWebViewId);
		}, "onPullDownRefresh"));

		var shareAppMessage = function shareAppMessage(e, t) {
			var n = invokeShareAppMessage(e, t);
			ServiceJSBridge.invoke("shareAppMessage", n, function (e) {
				/ ^shareAppMessage: ok /.test(e.errMsg) && "function" == typeof n.success ? n.success(e) : /^shareAppMessage:cancel/.test(e.errMsg) && "function" == typeof n.cancel ? n.cancel(e) : /^shareAppMessage:fail/.test(e.errMsg) && "function" == typeof n.fail && n.cancel(e), //bug??
				"function" == typeof n.complete && n.complete(e);
			});
		};
		ServiceJSBridge.on("onShareAppMessage", (0, _together2.default.surroundByTryCatch)(shareAppMessage, "onShareAppMessage"));
		reset = function reset() {
			currentPage = undefined;
			pageStockObjs = {};
			pageObjMap = {};
			pageStock = [];
			pageIndex = 0;
		};
		setWxConfig = function setWxConfig(e) {
			__wxConfig__ = e;
		};
		setWxRoute = function setWxRoute(e) {
			__wxRoute = e;
		};
		setWxRouteBegin = function setWxRouteBegin(e) {
			__wxRouteBegin = e;
		};
		getWebviewIdToPage = function getWebviewIdToPage() {
			return pageStockObjs;
		};
		getRouteToPage = function getRouteToPage() {
			return pageObjMap;
		};

		exports.default = {
			getRouteToPage: getRouteToPage,
			getWebviewIdToPage: getWebviewIdToPage,
			setWxRouteBegin: setWxRouteBegin,
			setWxRoute: setWxRoute,
			setWxConfig: setWxConfig,
			reset: reset,
			pageHolder: pageHolder,
			getCurrentPages: getCurrentPages,
			getCurrentPage: getCurrentPage
		};

		/***/ },
	/* 40 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		exports.__esModule = true;

		var _iterator = __webpack_require__(41);

		var _iterator2 = _interopRequireDefault(_iterator);

		var _symbol = __webpack_require__(61);

		var _symbol2 = _interopRequireDefault(_symbol);

		var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
			return typeof obj === "undefined" ? "undefined" : _typeof(obj);
		} : function (obj) {
			return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
		};

		/***/ },
	/* 41 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(42), __esModule: true };

		/***/ },
	/* 42 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(43);
		__webpack_require__(56);
		module.exports = __webpack_require__(60).f('iterator');

		/***/ },
	/* 43 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		var $at  = __webpack_require__(44)(true);

		// 21.1.3.27 String.prototype[@@iterator]()
		__webpack_require__(45)(String, 'String', function(iterated){
			this._t = String(iterated); // target
			this._i = 0;                // next index
			// 21.1.5.2.1 %StringIteratorPrototype%.next()
		}, function(){
			var O     = this._t
				, index = this._i
				, point;
			if(index >= O.length)return {value: undefined, done: true};
			point = $at(O, index);
			this._i += point.length;
			return {value: point, done: false};
		});

		/***/ },
	/* 44 */
	/***/ function(module, exports, __webpack_require__) {

		var toInteger = __webpack_require__(17)
			, defined   = __webpack_require__(8);
		// true  -> String#at
		// false -> String#codePointAt
		module.exports = function(TO_STRING){
			return function(that, pos){
				var s = String(defined(that))
					, i = toInteger(pos)
					, l = s.length
					, a, b;
				if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
				a = s.charCodeAt(i);
				return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
					? TO_STRING ? s.charAt(i) : a
					: TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
			};
		};

		/***/ },
	/* 45 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		var LIBRARY        = __webpack_require__(46)
			, $export        = __webpack_require__(25)
			, redefine       = __webpack_require__(47)
			, hide           = __webpack_require__(28)
			, has            = __webpack_require__(11)
			, Iterators      = __webpack_require__(48)
			, $iterCreate    = __webpack_require__(49)
			, setToStringTag = __webpack_require__(53)
			, getPrototypeOf = __webpack_require__(55)
			, ITERATOR       = __webpack_require__(54)('iterator')
			, BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
			, FF_ITERATOR    = '@@iterator'
			, KEYS           = 'keys'
			, VALUES         = 'values';

		var returnThis = function(){ return this; };

		module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
			$iterCreate(Constructor, NAME, next);
			var getMethod = function(kind){
				if(!BUGGY && kind in proto)return proto[kind];
				switch(kind){
					case KEYS: return function keys(){ return new Constructor(this, kind); };
					case VALUES: return function values(){ return new Constructor(this, kind); };
				} return function entries(){ return new Constructor(this, kind); };
			};
			var TAG        = NAME + ' Iterator'
				, DEF_VALUES = DEFAULT == VALUES
				, VALUES_BUG = false
				, proto      = Base.prototype
				, $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
				, $default   = $native || getMethod(DEFAULT)
				, $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
				, $anyNative = NAME == 'Array' ? proto.entries || $native : $native
				, methods, key, IteratorPrototype;
			// Fix native
			if($anyNative){
				IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
				if(IteratorPrototype !== Object.prototype){
					// Set @@toStringTag to native iterators
					setToStringTag(IteratorPrototype, TAG, true);
					// fix for some old engines
					if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
				}
			}
			// fix Array#{values, @@iterator}.name in V8 / FF
			if(DEF_VALUES && $native && $native.name !== VALUES){
				VALUES_BUG = true;
				$default = function values(){ return $native.call(this); };
			}
			// Define iterator
			if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
				hide(proto, ITERATOR, $default);
			}
			// Plug for library
			Iterators[NAME] = $default;
			Iterators[TAG]  = returnThis;
			if(DEFAULT){
				methods = {
					values:  DEF_VALUES ? $default : getMethod(VALUES),
					keys:    IS_SET     ? $default : getMethod(KEYS),
					entries: $entries
				};
				if(FORCED)for(key in methods){
					if(!(key in proto))redefine(proto, key, methods[key]);
				} else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
			}
			return methods;
		};

		/***/ },
	/* 46 */
	/***/ function(module, exports) {

		module.exports = true;

		/***/ },
	/* 47 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(28);

		/***/ },
	/* 48 */
	/***/ function(module, exports) {

		module.exports = {};

		/***/ },
	/* 49 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		var create         = __webpack_require__(50)
			, descriptor     = __webpack_require__(37)
			, setToStringTag = __webpack_require__(53)
			, IteratorPrototype = {};

		// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
		__webpack_require__(28)(IteratorPrototype, __webpack_require__(54)('iterator'), function(){ return this; });

		module.exports = function(Constructor, NAME, next){
			Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
			setToStringTag(Constructor, NAME + ' Iterator');
		};

		/***/ },
	/* 50 */
	/***/ function(module, exports, __webpack_require__) {

		// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
		var anObject    = __webpack_require__(30)
			, dPs         = __webpack_require__(51)
			, enumBugKeys = __webpack_require__(23)
			, IE_PROTO    = __webpack_require__(19)('IE_PROTO')
			, Empty       = function(){ /* empty */ }
			, PROTOTYPE   = 'prototype';

		// Create object with fake `null` prototype: use iframe Object with cleared prototype
		var createDict = function(){
			// Thrash, waste and sodomy: IE GC bug
			var iframe = __webpack_require__(35)('iframe')
				, i      = enumBugKeys.length
				, lt     = '<'
				, gt     = '>'
				, iframeDocument;
			iframe.style.display = 'none';
			__webpack_require__(52).appendChild(iframe);
			iframe.src = 'javascript:'; // eslint-disable-line no-script-url
			// createDict = iframe.contentWindow.Object;
			// html.removeChild(iframe);
			iframeDocument = iframe.contentWindow.document;
			iframeDocument.open();
			iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
			iframeDocument.close();
			createDict = iframeDocument.F;
			while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
			return createDict();
		};

		module.exports = Object.create || function create(O, Properties){
				var result;
				if(O !== null){
					Empty[PROTOTYPE] = anObject(O);
					result = new Empty;
					Empty[PROTOTYPE] = null;
					// add "__proto__" for Object.getPrototypeOf polyfill
					result[IE_PROTO] = O;
				} else result = createDict();
				return Properties === undefined ? result : dPs(result, Properties);
			};


		/***/ },
	/* 51 */
	/***/ function(module, exports, __webpack_require__) {

		var dP       = __webpack_require__(29)
			, anObject = __webpack_require__(30)
			, getKeys  = __webpack_require__(9);

		module.exports = __webpack_require__(33) ? Object.defineProperties : function defineProperties(O, Properties){
			anObject(O);
			var keys   = getKeys(Properties)
				, length = keys.length
				, i = 0
				, P;
			while(length > i)dP.f(O, P = keys[i++], Properties[P]);
			return O;
		};

		/***/ },
	/* 52 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(21).document && document.documentElement;

		/***/ },
	/* 53 */
	/***/ function(module, exports, __webpack_require__) {

		var def = __webpack_require__(29).f
			, has = __webpack_require__(11)
			, TAG = __webpack_require__(54)('toStringTag');

		module.exports = function(it, tag, stat){
			if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
		};

		/***/ },
	/* 54 */
	/***/ function(module, exports, __webpack_require__) {

		var store      = __webpack_require__(20)('wks')
			, uid        = __webpack_require__(22)
			, Symbol     = __webpack_require__(21).Symbol
			, USE_SYMBOL = typeof Symbol == 'function';

		var $exports = module.exports = function(name){
			return store[name] || (store[name] =
					USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
		};

		$exports.store = store;

		/***/ },
	/* 55 */
	/***/ function(module, exports, __webpack_require__) {

		// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
		var has         = __webpack_require__(11)
			, toObject    = __webpack_require__(7)
			, IE_PROTO    = __webpack_require__(19)('IE_PROTO')
			, ObjectProto = Object.prototype;

		module.exports = Object.getPrototypeOf || function(O){
				O = toObject(O);
				if(has(O, IE_PROTO))return O[IE_PROTO];
				if(typeof O.constructor == 'function' && O instanceof O.constructor){
					return O.constructor.prototype;
				} return O instanceof Object ? ObjectProto : null;
			};

		/***/ },
	/* 56 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(57);
		var global        = __webpack_require__(21)
			, hide          = __webpack_require__(28)
			, Iterators     = __webpack_require__(48)
			, TO_STRING_TAG = __webpack_require__(54)('toStringTag');

		for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
			var NAME       = collections[i]
				, Collection = global[NAME]
				, proto      = Collection && Collection.prototype;
			if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
			Iterators[NAME] = Iterators.Array;
		}

		/***/ },
	/* 57 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		var addToUnscopables = __webpack_require__(58)
			, step             = __webpack_require__(59)
			, Iterators        = __webpack_require__(48)
			, toIObject        = __webpack_require__(12);

		// 22.1.3.4 Array.prototype.entries()
		// 22.1.3.13 Array.prototype.keys()
		// 22.1.3.29 Array.prototype.values()
		// 22.1.3.30 Array.prototype[@@iterator]()
		module.exports = __webpack_require__(45)(Array, 'Array', function(iterated, kind){
			this._t = toIObject(iterated); // target
			this._i = 0;                   // next index
			this._k = kind;                // kind
			// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
		}, function(){
			var O     = this._t
				, kind  = this._k
				, index = this._i++;
			if(!O || index >= O.length){
				this._t = undefined;
				return step(1);
			}
			if(kind == 'keys'  )return step(0, index);
			if(kind == 'values')return step(0, O[index]);
			return step(0, [index, O[index]]);
		}, 'values');

		// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
		Iterators.Arguments = Iterators.Array;

		addToUnscopables('keys');
		addToUnscopables('values');
		addToUnscopables('entries');

		/***/ },
	/* 58 */
	/***/ function(module, exports) {

		module.exports = function(){ /* empty */ };

		/***/ },
	/* 59 */
	/***/ function(module, exports) {

		module.exports = function(done, value){
			return {value: value, done: !!done};
		};

		/***/ },
	/* 60 */
	/***/ function(module, exports, __webpack_require__) {

		exports.f = __webpack_require__(54);

		/***/ },
	/* 61 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(62), __esModule: true };

		/***/ },
	/* 62 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(63);
		__webpack_require__(74);
		__webpack_require__(75);
		__webpack_require__(76);
		module.exports = __webpack_require__(3).Symbol;

		/***/ },
	/* 63 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		// ECMAScript 6 symbols shim
		var global         = __webpack_require__(21)
			, has            = __webpack_require__(11)
			, DESCRIPTORS    = __webpack_require__(33)
			, $export        = __webpack_require__(25)
			, redefine       = __webpack_require__(47)
			, META           = __webpack_require__(64).KEY
			, $fails         = __webpack_require__(34)
			, shared         = __webpack_require__(20)
			, setToStringTag = __webpack_require__(53)
			, uid            = __webpack_require__(22)
			, wks            = __webpack_require__(54)
			, wksExt         = __webpack_require__(60)
			, wksDefine      = __webpack_require__(65)
			, keyOf          = __webpack_require__(66)
			, enumKeys       = __webpack_require__(67)
			, isArray        = __webpack_require__(70)
			, anObject       = __webpack_require__(30)
			, toIObject      = __webpack_require__(12)
			, toPrimitive    = __webpack_require__(36)
			, createDesc     = __webpack_require__(37)
			, _create        = __webpack_require__(50)
			, gOPNExt        = __webpack_require__(71)
			, $GOPD          = __webpack_require__(73)
			, $DP            = __webpack_require__(29)
			, $keys          = __webpack_require__(9)
			, gOPD           = $GOPD.f
			, dP             = $DP.f
			, gOPN           = gOPNExt.f
			, $Symbol        = global.Symbol
			, $JSON          = global.JSON
			, _stringify     = $JSON && $JSON.stringify
			, PROTOTYPE      = 'prototype'
			, HIDDEN         = wks('_hidden')
			, TO_PRIMITIVE   = wks('toPrimitive')
			, isEnum         = {}.propertyIsEnumerable
			, SymbolRegistry = shared('symbol-registry')
			, AllSymbols     = shared('symbols')
			, OPSymbols      = shared('op-symbols')
			, ObjectProto    = Object[PROTOTYPE]
			, USE_NATIVE     = typeof $Symbol == 'function'
			, QObject        = global.QObject;
		// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
		var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

		// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
		var setSymbolDesc = DESCRIPTORS && $fails(function(){
			return _create(dP({}, 'a', {
					get: function(){ return dP(this, 'a', {value: 7}).a; }
				})).a != 7;
		}) ? function(it, key, D){
			var protoDesc = gOPD(ObjectProto, key);
			if(protoDesc)delete ObjectProto[key];
			dP(it, key, D);
			if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
		} : dP;

		var wrap = function(tag){
			var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
			sym._k = tag;
			return sym;
		};

		var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
			return typeof it == 'symbol';
		} : function(it){
			return it instanceof $Symbol;
		};

		var $defineProperty = function defineProperty(it, key, D){
			if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
			anObject(it);
			key = toPrimitive(key, true);
			anObject(D);
			if(has(AllSymbols, key)){
				if(!D.enumerable){
					if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
					it[HIDDEN][key] = true;
				} else {
					if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
					D = _create(D, {enumerable: createDesc(0, false)});
				} return setSymbolDesc(it, key, D);
			} return dP(it, key, D);
		};
		var $defineProperties = function defineProperties(it, P){
			anObject(it);
			var keys = enumKeys(P = toIObject(P))
				, i    = 0
				, l = keys.length
				, key;
			while(l > i)$defineProperty(it, key = keys[i++], P[key]);
			return it;
		};
		var $create = function create(it, P){
			return P === undefined ? _create(it) : $defineProperties(_create(it), P);
		};
		var $propertyIsEnumerable = function propertyIsEnumerable(key){
			var E = isEnum.call(this, key = toPrimitive(key, true));
			if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
			return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
		};
		var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
			it  = toIObject(it);
			key = toPrimitive(key, true);
			if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
			var D = gOPD(it, key);
			if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
			return D;
		};
		var $getOwnPropertyNames = function getOwnPropertyNames(it){
			var names  = gOPN(toIObject(it))
				, result = []
				, i      = 0
				, key;
			while(names.length > i){
				if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
			} return result;
		};
		var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
			var IS_OP  = it === ObjectProto
				, names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
				, result = []
				, i      = 0
				, key;
			while(names.length > i){
				if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
			} return result;
		};

		// 19.4.1.1 Symbol([description])
		if(!USE_NATIVE){
			$Symbol = function Symbol(){
				if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
				var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
				var $set = function(value){
					if(this === ObjectProto)$set.call(OPSymbols, value);
					if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
					setSymbolDesc(this, tag, createDesc(1, value));
				};
				if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
				return wrap(tag);
			};
			redefine($Symbol[PROTOTYPE], 'toString', function toString(){
				return this._k;
			});

			$GOPD.f = $getOwnPropertyDescriptor;
			$DP.f   = $defineProperty;
			__webpack_require__(72).f = gOPNExt.f = $getOwnPropertyNames;
			__webpack_require__(69).f  = $propertyIsEnumerable;
			__webpack_require__(68).f = $getOwnPropertySymbols;

			if(DESCRIPTORS && !__webpack_require__(46)){
				redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
			}

			wksExt.f = function(name){
				return wrap(wks(name));
			}
		}

		$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

		for(var symbols = (
			// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
			'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
		).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

		for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

		$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
			// 19.4.2.1 Symbol.for(key)
			'for': function(key){
				return has(SymbolRegistry, key += '')
					? SymbolRegistry[key]
					: SymbolRegistry[key] = $Symbol(key);
			},
			// 19.4.2.5 Symbol.keyFor(sym)
			keyFor: function keyFor(key){
				if(isSymbol(key))return keyOf(SymbolRegistry, key);
				throw TypeError(key + ' is not a symbol!');
			},
			useSetter: function(){ setter = true; },
			useSimple: function(){ setter = false; }
		});

		$export($export.S + $export.F * !USE_NATIVE, 'Object', {
			// 19.1.2.2 Object.create(O [, Properties])
			create: $create,
			// 19.1.2.4 Object.defineProperty(O, P, Attributes)
			defineProperty: $defineProperty,
			// 19.1.2.3 Object.defineProperties(O, Properties)
			defineProperties: $defineProperties,
			// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
			getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
			// 19.1.2.7 Object.getOwnPropertyNames(O)
			getOwnPropertyNames: $getOwnPropertyNames,
			// 19.1.2.8 Object.getOwnPropertySymbols(O)
			getOwnPropertySymbols: $getOwnPropertySymbols
		});

		// 24.3.2 JSON.stringify(value [, replacer [, space]])
		$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
				var S = $Symbol();
				// MS Edge converts symbol values to JSON as {}
				// WebKit converts symbol values to JSON as null
				// V8 throws on boxed symbols
				return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
			})), 'JSON', {
			stringify: function stringify(it){
				if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
				var args = [it]
					, i    = 1
					, replacer, $replacer;
				while(arguments.length > i)args.push(arguments[i++]);
				replacer = args[1];
				if(typeof replacer == 'function')$replacer = replacer;
				if($replacer || !isArray(replacer))replacer = function(key, value){
					if($replacer)value = $replacer.call(this, key, value);
					if(!isSymbol(value))return value;
				};
				args[1] = replacer;
				return _stringify.apply($JSON, args);
			}
		});

		// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
		$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(28)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
		// 19.4.3.5 Symbol.prototype[@@toStringTag]
		setToStringTag($Symbol, 'Symbol');
		// 20.2.1.9 Math[@@toStringTag]
		setToStringTag(Math, 'Math', true);
		// 24.3.3 JSON[@@toStringTag]
		setToStringTag(global.JSON, 'JSON', true);

		/***/ },
	/* 64 */
	/***/ function(module, exports, __webpack_require__) {

		var META     = __webpack_require__(22)('meta')
			, isObject = __webpack_require__(31)
			, has      = __webpack_require__(11)
			, setDesc  = __webpack_require__(29).f
			, id       = 0;
		var isExtensible = Object.isExtensible || function(){
				return true;
			};
		var FREEZE = !__webpack_require__(34)(function(){
			return isExtensible(Object.preventExtensions({}));
		});
		var setMeta = function(it){
			setDesc(it, META, {value: {
				i: 'O' + ++id, // object ID
				w: {}          // weak collections IDs
			}});
		};
		var fastKey = function(it, create){
			// return primitive with prefix
			if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
			if(!has(it, META)){
				// can't set metadata to uncaught frozen object
				if(!isExtensible(it))return 'F';
				// not necessary to add metadata
				if(!create)return 'E';
				// add missing metadata
				setMeta(it);
				// return object ID
			} return it[META].i;
		};
		var getWeak = function(it, create){
			if(!has(it, META)){
				// can't set metadata to uncaught frozen object
				if(!isExtensible(it))return true;
				// not necessary to add metadata
				if(!create)return false;
				// add missing metadata
				setMeta(it);
				// return hash weak collections IDs
			} return it[META].w;
		};
		// add metadata on freeze-family methods calling
		var onFreeze = function(it){
			if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
			return it;
		};
		var meta = module.exports = {
			KEY:      META,
			NEED:     false,
			fastKey:  fastKey,
			getWeak:  getWeak,
			onFreeze: onFreeze
		};

		/***/ },
	/* 65 */
	/***/ function(module, exports, __webpack_require__) {

		var global         = __webpack_require__(21)
			, core           = __webpack_require__(3)
			, LIBRARY        = __webpack_require__(46)
			, wksExt         = __webpack_require__(60)
			, defineProperty = __webpack_require__(29).f;
		module.exports = function(name){
			var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
			if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
		};

		/***/ },
	/* 66 */
	/***/ function(module, exports, __webpack_require__) {

		var getKeys   = __webpack_require__(9)
			, toIObject = __webpack_require__(12);
		module.exports = function(object, el){
			var O      = toIObject(object)
				, keys   = getKeys(O)
				, length = keys.length
				, index  = 0
				, key;
			while(length > index)if(O[key = keys[index++]] === el)return key;
		};

		/***/ },
	/* 67 */
	/***/ function(module, exports, __webpack_require__) {

		// all enumerable object keys, includes symbols
		var getKeys = __webpack_require__(9)
			, gOPS    = __webpack_require__(68)
			, pIE     = __webpack_require__(69);
		module.exports = function(it){
			var result     = getKeys(it)
				, getSymbols = gOPS.f;
			if(getSymbols){
				var symbols = getSymbols(it)
					, isEnum  = pIE.f
					, i       = 0
					, key;
				while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
			} return result;
		};

		/***/ },
	/* 68 */
	/***/ function(module, exports) {

		exports.f = Object.getOwnPropertySymbols;

		/***/ },
	/* 69 */
	/***/ function(module, exports) {

		exports.f = {}.propertyIsEnumerable;

		/***/ },
	/* 70 */
	/***/ function(module, exports, __webpack_require__) {

		// 7.2.2 IsArray(argument)
		var cof = __webpack_require__(14);
		module.exports = Array.isArray || function isArray(arg){
				return cof(arg) == 'Array';
			};

		/***/ },
	/* 71 */
	/***/ function(module, exports, __webpack_require__) {

		// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
		var toIObject = __webpack_require__(12)
			, gOPN      = __webpack_require__(72).f
			, toString  = {}.toString;

		var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
			? Object.getOwnPropertyNames(window) : [];

		var getWindowNames = function(it){
			try {
				return gOPN(it);
			} catch(e){
				return windowNames.slice();
			}
		};

		module.exports.f = function getOwnPropertyNames(it){
			return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
		};


		/***/ },
	/* 72 */
	/***/ function(module, exports, __webpack_require__) {

		// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
		var $keys      = __webpack_require__(10)
			, hiddenKeys = __webpack_require__(23).concat('length', 'prototype');

		exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
				return $keys(O, hiddenKeys);
			};

		/***/ },
	/* 73 */
	/***/ function(module, exports, __webpack_require__) {

		var pIE            = __webpack_require__(69)
			, createDesc     = __webpack_require__(37)
			, toIObject      = __webpack_require__(12)
			, toPrimitive    = __webpack_require__(36)
			, has            = __webpack_require__(11)
			, IE8_DOM_DEFINE = __webpack_require__(32)
			, gOPD           = Object.getOwnPropertyDescriptor;

		exports.f = __webpack_require__(33) ? gOPD : function getOwnPropertyDescriptor(O, P){
			O = toIObject(O);
			P = toPrimitive(P, true);
			if(IE8_DOM_DEFINE)try {
				return gOPD(O, P);
			} catch(e){ /* empty */ }
			if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
		};

		/***/ },
	/* 74 */
	/***/ function(module, exports) {



		/***/ },
	/* 75 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(65)('asyncIterator');

		/***/ },
	/* 76 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(65)('observable');

		/***/ },
	/* 77 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _extends2 = __webpack_require__(78);

		var _extends3 = _interopRequireDefault(_extends2);

		var _pageEngine = __webpack_require__(83);

		var pageEngine = _interopRequireWildcard(_pageEngine);

		var _htmlSuffix = __webpack_require__(97);

		var htmlSuffix = _interopRequireWildcard(_htmlSuffix);

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		// export default Object.assi{},{},pageEngine,htmlSuffix);
		exports.default = (0, _extends3.default)({}, pageEngine, htmlSuffix);

		/***/ },
	/* 78 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		exports.__esModule = true;

		var _assign = __webpack_require__(79);

		var _assign2 = _interopRequireDefault(_assign);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		exports.default = _assign2.default || function (target) {
				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];

					for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}

				return target;
			};

		/***/ },
	/* 79 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(80), __esModule: true };

		/***/ },
	/* 80 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(81);
		module.exports = __webpack_require__(3).Object.assign;

		/***/ },
	/* 81 */
	/***/ function(module, exports, __webpack_require__) {

		// 19.1.3.1 Object.assign(target, source)
		var $export = __webpack_require__(25);

		$export($export.S + $export.F, 'Object', {assign: __webpack_require__(82)});

		/***/ },
	/* 82 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		// 19.1.2.1 Object.assign(target, source, ...)
		var getKeys  = __webpack_require__(9)
			, gOPS     = __webpack_require__(68)
			, pIE      = __webpack_require__(69)
			, toObject = __webpack_require__(7)
			, IObject  = __webpack_require__(13)
			, $assign  = Object.assign;

		// should work with symbols and should have deterministic property order (V8 bug)
		module.exports = !$assign || __webpack_require__(34)(function(){
			var A = {}
				, B = {}
				, S = Symbol()
				, K = 'abcdefghijklmnopqrst';
			A[S] = 7;
			K.split('').forEach(function(k){ B[k] = k; });
			return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
		}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
			var T     = toObject(target)
				, aLen  = arguments.length
				, index = 1
				, getSymbols = gOPS.f
				, isEnum     = pIE.f;
			while(aLen > index){
				var S      = IObject(arguments[index++])
					, keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
					, length = keys.length
					, j      = 0
					, key;
				while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
			} return T;
		} : $assign;

		/***/ },
	/* 83 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.publish = exports.AppServiceEngineKnownError = exports.errorReport = exports.surroundByTryCatch = exports.info = exports.warn = exports.error = exports.isPlainObject = exports.def = exports.hasOwn = exports.isObject = exports.getDataType = exports.noop = exports.emptyObject = exports.isEmptyObject = undefined;

		var _getPrototypeOf = __webpack_require__(84);

		var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

		var _defineProperty = __webpack_require__(87);

		var _defineProperty2 = _interopRequireDefault(_defineProperty);

		var _keys = __webpack_require__(4);

		var _keys2 = _interopRequireDefault(_keys);

		var _iterator = __webpack_require__(41);

		var _iterator2 = _interopRequireDefault(_iterator);

		var _symbol = __webpack_require__(61);

		var _symbol2 = _interopRequireDefault(_symbol);

		var _setPrototypeOf = __webpack_require__(90);

		var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

		var _create = __webpack_require__(94);

		var _create2 = _interopRequireDefault(_create);

		var _typeof2 = __webpack_require__(40);

		var _typeof3 = _interopRequireDefault(_typeof2);

		exports.getPlatform = getPlatform;
		exports.safeInvoke = safeInvoke;

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function checkFunction(e, t) {
			if (!(e instanceof t)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function initialisedCheck(e, t) {
			//e is default
			if (!e) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return !t || "object" != (typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t)) && "function" != typeof t ? e : t;
		}
		function extendFn(e, t) {
			//让e extend t
			if ("function" != typeof t && null !== t) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t)));
			}
			e.prototype = (0, _create2.default)(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			t && (_setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(e, t) : e.__proto__ = t);
		}
		function getPlatform() {
			//get platform
			var e = "";
			"undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? e = "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 && (e = "android") : e = "android" === __wxConfig__.platform ? "android" : "devtools" === __wxConfig__.platform ? "devtools" : "ios";
			return e;
		}
		function safeInvoke() {
			//do page method
			var e = void 0,
				t = Array.prototype.slice.call(arguments),
				n = t[0];
			t = t.slice(1);
			try {
				var o = Date.now();
				e = this[n].apply(this, t);
				var r = Date.now() - o;
				r > 1e3 && Reporter.slowReport({
					key: "pageInvoke",
					cost: r,
					extend: "at " + this.__route__ + " page " + n + " function"
				});
			} catch (e) {
				Reporter.thirdErrorReport({
					error: e,
					extend: 'at "' + this.__route__ + '" page ' + n + " function"
				});
			}
			return e;
		}

		var symbolCheck = "function" == typeof _symbol2.default && "symbol" == (0, _typeof3.default)(_iterator2.default) ? function (e) {
			return typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e);
		} : function (e) {
			return e && "function" == typeof _symbol2.default && e.constructor === _symbol2.default ? "symbol" : typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e);
		};

		var isEmptyObject = exports.isEmptyObject = function isEmptyObject(e) {
			for (var t in e) {
				if (e.hasOwnProperty(t)) {
					return false;
				}
			}
			return true;
		};

		var emptyObject = exports.emptyObject = function emptyObject(target, obj) {
			for (var n = (0, _keys2.default)(obj), o = n.length; o--;) {
				target[n[o]] = obj[n[o]];
			}
			return target;
		};

		var noop = exports.noop = function noop() {};

		var getDataType = exports.getDataType = function getDataType(e) {
			return Object.prototype.toString.call(e).split(" ")[1].split("]")[0];
		};

		var isObject = exports.isObject = function isObject(e) {
			return null !== e && "object" === ("undefined" == typeof e ? "undefined" : s(e));
		};

		var defineUtil = Object.prototype.hasOwnProperty;

		var hasOwn = exports.hasOwn = function hasOwn(e, t) {
			return defineUtil.call(e, t);
		};

		var def = exports.def = function def(e, t, n, o) {
			(0, _defineProperty2.default)(e, t, {
				value: n,
				enumerable: !!o,
				writable: true,
				configurable: true
			});
		};

		var checkOwn = Object.prototype.toString;

		var objStr = "[object Object]";
		var isPlainObject = exports.isPlainObject = function isPlainObject(e) {
			return checkOwn.call(e) === objStr;
		};
		var error = exports.error = function error(e, t) {
			console.group(new Date() + " " + e);
			console.error(t);
			console.groupEnd();
		};
		var warn = exports.warn = function warn(e, t) {
			console.group(new Date() + " " + e);
			console.warn(t);
			console.groupEnd();
		};
		var info = exports.info = function info(e) {
			__wxConfig__ && __wxConfig__.debug && console.info(e);
		};
		var surroundByTryCatch = exports.surroundByTryCatch = function surroundByTryCatch(e, t) {
			return function () {
				try {
					return e.apply(e, arguments);
				} catch (e) {
					errorReport(e, t);
					return function () {};
				}
			};
		};
		var errorReport = exports.errorReport = function errorReport(e, t) {
			//d
			if ("[object Error]" === Object.prototype.toString.apply(e)) {
				if ("AppServiceEngineKnownError" === e.type) {
					throw e;
				}
				Reporter.errorReport({
					key: "jsEnginScriptError",
					error: e,
					extend: t
				});
			}
		};
		var AppServiceEngineKnownError = exports.AppServiceEngineKnownError = function (e) {
			function t(e) {
				checkFunction(this, t);
				var r = initialisedCheck(this, (0, _getPrototypeOf2.default)(t).call(this, "APP-SERVICE-Engine:" + e));
				r.type = "AppServiceEngineKnownError";
				return r;
			}
			extendFn(t, e);
			return t;
		}(Error);

		var publish = exports.publish = function publish() {
			var params = Array.prototype.slice.call(arguments),
				defaultOpt = {
					options: {
						timestamp: Date.now()
					}
				};
			params[1] ? params[1].options = emptyObject(params[1].options || {}, defaultOpt.options) : params[1] = defaultOpt;
			ServiceJSBridge.publish.apply(ServiceJSBridge, params);
		};

		/***/ },
	/* 84 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(85), __esModule: true };

		/***/ },
	/* 85 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(86);
		module.exports = __webpack_require__(3).Object.getPrototypeOf;

		/***/ },
	/* 86 */
	/***/ function(module, exports, __webpack_require__) {

		// 19.1.2.9 Object.getPrototypeOf(O)
		var toObject        = __webpack_require__(7)
			, $getPrototypeOf = __webpack_require__(55);

		__webpack_require__(24)('getPrototypeOf', function(){
			return function getPrototypeOf(it){
				return $getPrototypeOf(toObject(it));
			};
		});

		/***/ },
	/* 87 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(88), __esModule: true };

		/***/ },
	/* 88 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(89);
		var $Object = __webpack_require__(3).Object;
		module.exports = function defineProperty(it, key, desc){
			return $Object.defineProperty(it, key, desc);
		};

		/***/ },
	/* 89 */
	/***/ function(module, exports, __webpack_require__) {

		var $export = __webpack_require__(25);
		// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
		$export($export.S + $export.F * !__webpack_require__(33), 'Object', {defineProperty: __webpack_require__(29).f});

		/***/ },
	/* 90 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(91), __esModule: true };

		/***/ },
	/* 91 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(92);
		module.exports = __webpack_require__(3).Object.setPrototypeOf;

		/***/ },
	/* 92 */
	/***/ function(module, exports, __webpack_require__) {

		// 19.1.3.19 Object.setPrototypeOf(O, proto)
		var $export = __webpack_require__(25);
		$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(93).set});

		/***/ },
	/* 93 */
	/***/ function(module, exports, __webpack_require__) {

		// Works with __proto__ only. Old v8 can't work with null proto objects.
		/* eslint-disable no-proto */
		var isObject = __webpack_require__(31)
			, anObject = __webpack_require__(30);
		var check = function(O, proto){
			anObject(O);
			if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
		};
		module.exports = {
			set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
				function(test, buggy, set){
					try {
						set = __webpack_require__(26)(Function.call, __webpack_require__(73).f(Object.prototype, '__proto__').set, 2);
						set(test, []);
						buggy = !(test instanceof Array);
					} catch(e){ buggy = true; }
					return function setPrototypeOf(O, proto){
						check(O, proto);
						if(buggy)O.__proto__ = proto;
						else set(O, proto);
						return O;
					};
				}({}, false) : undefined),
			check: check
		};

		/***/ },
	/* 94 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(95), __esModule: true };

		/***/ },
	/* 95 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(96);
		var $Object = __webpack_require__(3).Object;
		module.exports = function create(P, D){
			return $Object.create(P, D);
		};

		/***/ },
	/* 96 */
	/***/ function(module, exports, __webpack_require__) {

		var $export = __webpack_require__(25)
		// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
		$export($export.S, 'Object', {create: __webpack_require__(50)});

		/***/ },
	/* 97 */
	/***/ function(module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var isDevTools = function isDevTools() {
			return !!("undefined" != typeof window && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf("appservice") > -1);
		};
		var addHtmlSuffixToUrl = function addHtmlSuffixToUrl(e) {
			//给url增加.html后缀
			if ("string" != typeof e) {
				return e;
			}
			var t = e.split("?")[0],
				n = e.split("?")[1];
			t += ".html";
			if ("undefined" != typeof n) {
				return t + "?" + n;
			} else {
				return t;
			}
		};
		var removeHtmlSuffixFromUrl = function removeHtmlSuffixFromUrl(e) {
			//去除url后面的.html
			if ("string" == typeof e && e.indexOf(".html") === e.length - 4) {
				return e.substring(0, e.length - 5);
			} else {
				return e;
			}
		};

		exports.isDevTools = isDevTools;
		exports.addHtmlSuffixToUrl = addHtmlSuffixToUrl;
		exports.removeHtmlSuffixFromUrl = removeHtmlSuffixFromUrl;

		/***/ },
	/* 98 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _stringify = __webpack_require__(1);

		var _stringify2 = _interopRequireDefault(_stringify);

		var _defineProperty = __webpack_require__(87);

		var _defineProperty2 = _interopRequireDefault(_defineProperty);

		var _together = __webpack_require__(77);

		var _together2 = _interopRequireDefault(_together);

		var _parsePath = __webpack_require__(99);

		var parsePath = _interopRequireWildcard(_parsePath);

		var _toAppView = __webpack_require__(100);

		var _toAppView2 = _interopRequireDefault(_toAppView);

		var _iteratorHandle = __webpack_require__(101);

		var _iteratorHandle2 = _interopRequireDefault(_iteratorHandle);

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function checkClass(e, t) {
			//校验类的调用
			if (!(e instanceof t)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var defineProperty = function () {
			function e(e, t) {
				for (var n = 0; n < t.length; n++) {
					var o = t[n];
					o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), (0, _defineProperty2.default)(e, o.key, o);
				}
			}
			return function (t, n, o) {
				n && e(t.prototype, n);
				o && e(t, o);
				return t;
			};
		}();

		var events = ["onLoad", "onReady", "onShow", "onRouteEnd", "onHide", "onUnload"];
		var isPageSysEvent = function isPageSysEvent(e) {
			//校验e是否为系统事件或属性
			for (var t = 0; t < events.length; ++t) {
				if (events[t] === e) {
					return true;
				}
			}
			return "data" === e;
		};
		var routeMap = ["__wxWebviewId__", "__route__"];

		var cheRoute = function cheRoute(e) {
			return routeMap.indexOf(e) !== -1;
		};
		var parsePage = function () {
			function e() {
				var pageObj = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
					curPage = this,
					webviewId = arguments[1],
					routePath = arguments[2];
				checkClass(this, e);
				var s = {
					__wxWebviewId__: webviewId,
					__route__: routePath
				};
				routeMap.forEach(function (e) {
					curPage.__defineSetter__(e, function () {
						_together2.default.warn("关键字保护", "should not change the protected attribute " + e);
					}), curPage.__defineGetter__(e, function () {
						return s[e];
					});
				});
				pageObj.data = pageObj.data || {};
				_together2.default.isPlainObject(pageObj.data) || _together2.default.error("Page data error", "data must be an object, your data is " + (0, _stringify2.default)(pageObj.data));
				this.data = JSON.parse((0, _stringify2.default)(pageObj.data));
				events.forEach(function (eventName) {
					//定义页面事件
					curPage[eventName] = function () {
						var eventFun = (pageObj[eventName] || _together2.default.noop).bind(this),
							o = void 0;_together2.default.info(this.__route__ + ": " + eventName + " have been invoked");
						try {
							var r = Date.now();
							o = eventFun.apply(this, arguments);
							var i = Date.now() - r;
							i > 1e3 && Reporter.slowReport({
								key: "pageInvoke",
								cost: i,
								extend: 'at "' + this.__route__ + '" page lifeCycleMethod ' + eventName + " function"
							});
						} catch (t) {
							Reporter.thirdErrorReport({
								error: t,
								extend: 'at "' + this.__route__ + '" page lifeCycleMethod ' + eventName + " function"
							});
						}
						return o;
					}.bind(curPage);
				});
				var copyPageObjByKey = function copyPageObjByKey(attrName) {
					//定义页面其它方法与属性
					cheRoute(attrName) ? _together2.default.warn("关键字保护", "Page's " + attrName + " is write-protected") : isPageSysEvent(attrName) || ("Function" === _together2.default.getDataType(pageObj[attrName]) ? curPage[attrName] = function () {
						var res;
						try {
							var o = Date.now();
							res = pageObj[attrName].apply(this, arguments);
							var r = Date.now() - o;
							r > 1e3 && Reporter.slowReport({
								key: "pageInvoke",
								cost: r,
								extend: "at " + this.__route__ + " page " + attrName + " function"
							});
						} catch (t) {
							Reporter.thirdErrorReport({
								error: t,
								extend: 'at "' + this.__route__ + '" page ' + attrName + " function"
							});
						}
						return res;
					}.bind(curPage) : curPage[attrName] = (0, _iteratorHandle2.default)(pageObj[attrName]));
				};
				for (var u in pageObj) {
					copyPageObjByKey(u);
				}
				"function" == typeof pageObj.onShareAppMessage && ServiceJSBridge.invoke("showShareMenu", {}, _together2.default.info);
			}
			defineProperty(e, [{
				key: "update",
				value: function value() {
					_together2.default.warn("将被废弃", "Page.update is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]");
				}
			}, {
				key: "forceUpdate",
				value: function value() {
					_together2.default.warn("将被废弃", "Page.forceUpdate is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]");
				}
			}, {
				key: "setData",
				value: function value(dataObj) {
					try {
						var t = _together2.default.getDataType(dataObj);
						"Object" !== t && _together2.default.error("类型错误", "setData accepts an Object rather than some " + t);
						for (var n in dataObj) {
							var curValue = parsePath.getObjectByPath(this.data, n),
								curObj = curValue.obj,
								curKey = curValue.key;
							curObj && (curObj[curKey] = (0, _iteratorHandle2.default)(dataObj[n]));
						}
						_toAppView2.default.emit(dataObj, this.__wxWebviewId__);
					} catch (e) {
						_together2.default.errorReport(e);
					}
				}
			}]);
			return e;
		}();
		exports.default = parsePage;

		/***/ },
	/* 99 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.parsePath = parsePath;
		exports.getObjectByPath = getObjectByPath;

		var _together = __webpack_require__(77);

		var _together2 = _interopRequireDefault(_together);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function parsePath(e) {
			//解析data path
			for (var t = e.length, n = [], r = "", i = 0, a = false, s = false, c = 0; c < t; c++) {
				var u = e[c];
				if ("\\" === u) {
					c + 1 < t && ("." === e[c + 1] || "[" === e[c + 1] || "]" === e[c + 1]) ? (r += e[c + 1], c++) : r += "\\";
				} else if ("." === u) {
					r && (n.push(r), r = "");
				} else if ("[" === u) {
					if (r && (n.push(r), r = ""), 0 === n.length) {
						throw _together2.default.error("数据路径错误", "Path can not start with []: " + e);
						new _together2.default.AppServiceEngineKnownError("Path can not start with []: " + e);
					}
					s = true;
					a = false;
				} else if ("]" === u) {
					if (!a) {
						throw _together2.default.error("数据路径错误", "Must have number in []: " + e);
						new _together2.default.AppServiceEngineKnownError("Must have number in []: " + e);
					}
					s = false;
					n.push(i);
					i = 0;
				} else if (s) {
					if (u < "0" || u > "9") {
						throw _together2.default.error("数据路径错误", "Only number 0-9 could inside []: " + e);
						new _together2.default.AppServiceEngineKnownError("Only number 0-9 could inside []: " + e);
					}
					a = true;
					i = 10 * i + u.charCodeAt(0) - 48;
				} else {
					r += u;
				}
			}
			if (r && n.push(r), 0 === n.length) {
				throw _together2.default.error("数据路径错误", "Path can not be empty");
				new _together2.default.AppServiceEngineKnownError("Path can not be empty");
			}
			return n;
		}
		function getObjectByPath(e, t) {
			for (var n = parsePath(t), i = undefined, a = undefined, s = e, c = 0; c < n.length; c++) {
				Number(n[c]) === n[c] && n[c] % 1 === 0 ? Array.isArray(s) || (i[a] = [], s = i[a]) : _together2.default.isPlainObject(s) || (i[a] = {}, s = i[a]);
				a = n[c]; //key
				i = s; //data
				s = s[n[c]]; //node value
			}
			return {
				obj: i,
				key: a
			};
		};

		/***/ },
	/* 100 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _defineProperty = __webpack_require__(87);

		var _defineProperty2 = _interopRequireDefault(_defineProperty);

		var _together = __webpack_require__(77);

		var _together2 = _interopRequireDefault(_together);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function check(e, t) {
			if (!(e instanceof t)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var definePropertyFn = function () {
			function e(e, t) {
				for (var n = 0; n < t.length; n++) {
					var o = t[n];
					o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), (0, _defineProperty2.default)(e, o.key, o);
				}
			}
			return function (t, n, o) {
				n && e(t.prototype, n);
				o && e(t, o);
				return t;
			};
		}();
		var toAppView = function () {
			function e() {
				check(this, e);
			}
			definePropertyFn(e, null, [{
				key: "emit",
				value: function value(e, t) {
					_together2.default.publish("appDataChange", {
						data: {
							data: e
						}
					}, [t]);
				}
			}]);
			return e;
		}();
		exports.default = toAppView;

		/***/ },
	/* 101 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _typeof2 = __webpack_require__(40);

		var _typeof3 = _interopRequireDefault(_typeof2);

		var _organizeValue = __webpack_require__(102);

		var _organizeValue2 = _interopRequireDefault(_organizeValue);

		var _symbolHandle = __webpack_require__(103);

		var _symbolHandle2 = _interopRequireDefault(_symbolHandle);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function o(e) {}
		function copyHandle(attr) {
			var method = arguments.length <= 1 || undefined === arguments[1] ? o : arguments[1];
			if (null === attr) {
				return null;
			}
			var n = _organizeValue2.default.copyValue(attr);
			if (null !== n) {
				return n;
			}
			var r = _organizeValue2.default.copyCollection(attr, method),
				newAttr = null !== r ? r : attr,
				attrArr = [attr],
				newAttrArr = [newAttr];
			return iteratorHandle(attr, method, newAttr, attrArr, newAttrArr);
		}
		function iteratorHandle(attr, method, newAttr, attrArr, newAttrArr) {
			if (null === attr) {
				return null;
			}
			var u = _organizeValue2.default.copyValue(attr);
			if (null !== u) {
				return u;
			}
			var keys = _symbolHandle2.default.getKeys(attr).concat(_symbolHandle2.default.getSymbols(attr));
			var index, length, key, attrValue, attrValueIndex, newAttrValue, curAttrValue, b;
			for (index = 0, length = keys.length; index < length; ++index) {
				key = keys[index];
				attrValue = attr[key];
				attrValueIndex = _symbolHandle2.default.indexOf(attrArr, attrValue);
				attrValueIndex === -1 ? (newAttrValue = _organizeValue2.default.copy(attrValue, method), curAttrValue = null !== newAttrValue ? newAttrValue : attrValue, null !== attrValue && /^(?:function|object)$/.test(typeof attrValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(attrValue)) && (attrArr.push(attrValue), newAttrArr.push(curAttrValue))) : b = newAttrArr[attrValueIndex];
				newAttr[key] = b || iteratorHandle(attrValue, method, curAttrValue, attrArr, newAttrArr);
			}
			return newAttr;
		}

		exports.default = copyHandle;

		/***/ },
	/* 102 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _typeof2 = __webpack_require__(40);

		var _typeof3 = _interopRequireDefault(_typeof2);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function copy(e, t) {
			var n = copyValue(e);
			return null !== n ? n : copyCollection(e, t);
		}
		function copyCollection(e, t) {
			if ("function" != typeof t) {
				throw new TypeError("customizer is must be a Function");
			}
			if ("function" == typeof e) {
				return e;
			}
			var n = toString.call(e);
			if ("[object Array]" === n) {
				return [];
			}
			if ("[object Object]" === n && e.constructor === Object) {
				return {};
			}
			if ("[object Date]" === n) {
				return new Date(e.getTime());
			}
			if ("[object RegExp]" === n) {
				var o = String(e),
					r = o.lastIndexOf("/");
				return new RegExp(o.slice(1, r), o.slice(r + 1));
			}
			var i = t(e);
			return undefined !== i ? i : null;
		}
		function copyValue(e) {
			var t = typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e);
			return null !== e && "object" !== t && "function" !== t ? e : null;
		}
		var toString = Object.prototype.toString;
		exports.default = {
			copy: copy,
			copyCollection: copyCollection,
			copyValue: copyValue
		};

		/***/ },
	/* 103 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _getOwnPropertySymbols = __webpack_require__(104);

		var _getOwnPropertySymbols2 = _interopRequireDefault(_getOwnPropertySymbols);

		var _symbol = __webpack_require__(61);

		var _symbol2 = _interopRequireDefault(_symbol);

		var _typeof2 = __webpack_require__(40);

		var _typeof3 = _interopRequireDefault(_typeof2);

		var _keys = __webpack_require__(4);

		var _keys2 = _interopRequireDefault(_keys);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function indexOf(e, t) {
			if ("[object Array]" !== toString.call(e)) {
				throw new TypeError("array must be an Array");
			}
			var n = void 0,
				o = void 0,
				i = void 0;
			for (n = 0, o = e.length; n < o; ++n) {
				if (i = e[n], i === t || i !== i && t !== t) {
					return n;
				}
			}
			return -1;
		}

		var toString = Object.prototype.toString;
		var getKeys = "function" == typeof _keys2.default ? function (e) {
			return (0, _keys2.default)(e);
		} : function (e) {
			var t = typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e);
			if (null === e || "function" !== t && "object" !== t) throw new TypeError("obj must be an Object");
			var n = [],
				r;
			for (r in e) {
				Object.prototype.hasOwnProperty.call(e, r) && n.push(r);
			}
			return n;
		};
		var getSymbols = "function" == typeof _symbol2.default ? function (e) {
			return (0, _getOwnPropertySymbols2.default)(e);
		} : function () {
			return [];
		};

		exports.default = {
			getKeys: getKeys,
			getSymbols: getSymbols,
			indexOf: indexOf
		};

		/***/ },
	/* 104 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = { "default": __webpack_require__(105), __esModule: true };

		/***/ },
	/* 105 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(63);
		module.exports = __webpack_require__(3).Object.getOwnPropertySymbols;

		/***/ },
	/* 106 */
	/***/ function(module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var DOM_READY_EVENT = "__DOMReady";
		var UPDATE_APP_DATA = "__updateAppData";

		exports.DOM_READY_EVENT = DOM_READY_EVENT;
		exports.UPDATE_APP_DATA = UPDATE_APP_DATA;

		/***/ },
	/* 107 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.triggerAnalytics = undefined;

		var _stringify = __webpack_require__(1);

		var _stringify2 = _interopRequireDefault(_stringify);

		var _keys = __webpack_require__(4);

		var _keys2 = _interopRequireDefault(_keys);

		var _pageInit = __webpack_require__(39);

		var _pageInit2 = _interopRequireDefault(_pageInit);

		var _parsePath = __webpack_require__(99);

		var parsePath = _interopRequireWildcard(_parsePath);

		var _together = __webpack_require__(77);

		var _together2 = _interopRequireDefault(_together);

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var event = {};
		var eventMap = {};
		var startAndReport = function startAndReport(e, t) {
			if ("start" !== e.action && "start_and_report" !== e.action || (eventMap[e.eventID] = {
					eventID: e.eventID,
					data: {}
				}), eventMap[e.eventID]) {
				var n = e.data || {};
				if (t && e.page === t.__route__) {
					for (var o in n) {
						var i = n[o];
						if (i.indexOf("[]") > -1) {
							if (!(e.index > -1)) {
								continue;
							}
							i = i.replace("[]", "[" + e.index + "]");
						}
						var a = parsePath.getObjectByPath(t.data || {}, i);
						"undefined" != typeof a.obj && "undefined" != typeof a.key && a.obj[a.key] && (eventMap[e.eventID].data[o] = a.obj[a.key]);
					}
				}
				"report" !== e.action && "start_and_report" !== e.action || !function () {
					var t = [];
					(0, _keys2.default)(eventMap[e.eventID].data).forEach(function (n) {
						t.push({
							id: n,
							value: eventMap[e.eventID].data[n]
						});
					}), eventMap[e.eventID].data = t, console.log("reportRealtimeAction"), console.log(eventMap[e.eventID]), ServiceJSBridge.invoke("reportRealtimeAction", {
						actionData: (0, _stringify2.default)(eventMap[e.eventID])
					}), eventMap[e.eventID] = null;
				}();
			}
		};
		var tage = false;
		var analyticsPublic = function analyticsPublic(e) {
			if (e) {
				var t = e.__route__,
					n = event.click,
					o = [];
				n && (n.forEach(function (e) {
					e.page === t && e.element && o.push({
						eventID: e.eventID,
						page: t,
						element: e.element,
						action: e.action
					});
				}), 0 !== o.length && ServiceJSBridge.publish("analyticsConfig", {
					data: o
				}, [e.__wxWebviewId__]));
			}
		};

		ServiceJSBridge.subscribe("analyticsReport", function (e, t) {
			var n = e.data,
				r = event.click,
				u = undefined,
				f = undefined;
			if (r && ("start" === n.action || "start_and_report" === n.action || eventMap[n.eventID])) {
				for (var l = _pageInit2.default.getCurrentPages(), d = 0; d < l.length; d++) {
					var p = l[d];
					if (p.__wxWebviewId__ === t) {
						f = p;
						break;
					}
				}
				if (f) {
					for (var h = 0; h < r.length; h++) {
						var v = r[h];
						if (n.eventID === v.eventID && n.page === v.page && n.element === v.element) {
							u = _together2.default.extend({}, v);
							break;
						}
					}
					u && (u.index = n.index, startAndReport(u, f));
				}
			}
		});

		var triggerAnalytics = exports.triggerAnalytics = function triggerAnalytics(e, t) {
			"pageReady" === e && t && analyticsPublic(t);
			"launch" !== e || tage || (tage = true);
			var n = event[e];
			n && n.forEach(function (n) {
				"enterPage" === e || "leavePage" === e || "pullDownRefresh" === e ? t && n.page === t.__route__ && startAndReport(n, t) : startAndReport(n);
			});
		};

		/***/ },
	/* 108 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _defineProperty = __webpack_require__(87);

		var _defineProperty2 = _interopRequireDefault(_defineProperty);

		var _together = __webpack_require__(77);

		var _together2 = _interopRequireDefault(_together);

		var _pageInit = __webpack_require__(39);

		var _pageInit2 = _interopRequireDefault(_pageInit);

		var _reportRealtimeAction = __webpack_require__(107);

		var reportRealtimeAction = _interopRequireWildcard(_reportRealtimeAction);

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function errorInfo(e, t) {
			if (!(e instanceof t)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var defineProperty = function () {
			function _define(e, t) {
				for (var n = 0; n < t.length; n++) {
					var o = t[n];
					o.enumerable = o.enumerable || false;
					o.configurable = true;
					"value" in o && (o.writable = true);
					(0, _defineProperty2.default)(e, o.key, o);
				}
			}
			return function (t, n, o) {
				n && _define(t.prototype, n);
				o && _define(t, o);
				return t;
			};
		}();
		var events = ["onLaunch", "onShow", "onHide", "onUnlaunch"];

		var temp = true;

		var checkEvent = function checkEvent(e) {
			//判断是否为app 事件
			for (var t = 0; t < events.length; ++t) {
				if (events[t] === e) {
					return true;
				}
			}
			return false;
		};
		var isGetCurrentPage = function isGetCurrentPage(e) {
			return "getCurrentPage" === e;
		};
		var appClass = function () {
			function app(appObj) {
				//t:app
				var self = this;
				errorInfo(this, app);
				events.forEach(function (eventKey) {
					//给app绑定事件
					var tempFun = function tempFun() {
						var eventFun = (appObj[eventKey] || _together2.default.noop).bind(this);
						_together2.default.info("App: " + eventKey + " have been invoked");
						try {
							eventFun.apply(this, arguments);
						} catch (t) {
							Reporter.thirdErrorReport({
								error: t,
								extend: "App catch error in lifeCycleMethod " + eventKey + " function"
							});
						}
					};
					self[eventKey] = tempFun.bind(self);
				});
				var bindApp = function bindApp(attrKey) {
					//给app绑定其它方法与属性
					isGetCurrentPage(attrKey) ? _together2.default.warn("关键字保护", "App's " + attrKey + " is write-protected") : checkEvent(attrKey) || ("[object Function]" === Object.prototype.toString.call(appObj[attrKey]) ? self[attrKey] = function () {
						var method;
						try {
							method = appObj[attrKey].apply(this, arguments);
						} catch (t) {
							Reporter.thirdErrorReport({
								error: t,
								extend: "App catch error in  " + attrKey + " function"
							});
						}
						return method;
					}.bind(self) : self[attrKey] = appObj[attrKey]);
				};
				for (var d in appObj) {
					bindApp(d);
				}
				this.onError && Reporter.registerErrorListener(this.onError);
				this.onLaunch();
				reportRealtimeAction.triggerAnalytics("launch");
				var hide = function hide() {
					//hide
					var e = _pageInit2.default.getCurrentPages();
					e.length && e[e.length - 1].onHide();
					this.onHide();
					reportRealtimeAction.triggerAnalytics("background");
				};
				var show = function show() {
					//show
					this.onShow();
					if (temp) {
						temp = false;
					} else {
						var e = _pageInit2.default.getCurrentPages();
						e.length && (e[e.length - 1].onShow(), reportRealtimeAction.triggerAnalytics("foreground"));
					}
				};
				wxs.onAppEnterBackground(hide.bind(this));
				wxs.onAppEnterForeground(show.bind(this));
			};
			defineProperty(app, [{
				key: "getCurrentPage",
				value: function value() {
					_together2.default.warn("将被废弃", "App.getCurrentPage is deprecated, please use getCurrentPages. [It will be removed in 2016.11]");
					var currentPage = _pageInit2.default.getCurrentPage();
					if (currentPage) {
						return currentPage.page;
					}
				}
			}]);
			return app;
		}();
		var tempObj;

		var appHolder = _together2.default.surroundByTryCatch(function (e) {
			tempObj = new appClass(e);
		}, "create app instance");
		var getApp = function getApp() {
			return tempObj;
		};

		exports.default = { appHolder: appHolder, getApp: getApp };

		/***/ }
	/******/ ]);
!function() {
    var statusDefineFlag = 1,
        statusRequireFlag = 2,
        moduleArr = {};
    define = function(path, fun) {
        moduleArr[path] = {
            status: statusDefineFlag,
            factory: fun
        }
    };
    var getPathPrefix = function(pathname) {//返回path
            var res = pathname.match(/(.*)\/([^\/]+)?$/);
            return res && res[1] ? res[1] : "./"
        },
        getRequireFun = function(pathname) {//e:path 返回相对e的require
            var pathPrefix = getPathPrefix(pathname);
            return function(path) {
                if ("string" != typeof path) throw new Error("require args must be a string");
                for (var floderArr = [], folders = (pathPrefix + "/" + path).split("/"), i = 0, pathLength = folders.length; i < pathLength; ++i) {
                    var folder = folders[i];
                    if ("" != folder && "." != folder)
                        if (".." == folder) {
                            if (0 == floderArr.length) throw new Error("can't find module : " + path);
                            floderArr.pop()
                        } else i + 1 < pathLength && ".." == folders[i + 1] ? i++:floderArr.push(folder)
                }
                try {
                    var pathname = floderArr.join("/");
                    return /\.js$/.test(pathname) || (pathname += ".js"),
                        require(pathname)
                } catch(e) {
                    throw e
                }
            }
        };
    require = function(path) {//exports o
        if ("string" != typeof path) throw new Error("require args must be a string");
        var moduleObj = moduleArr[path];
        if (!moduleObj) throw new Error('module "' + path + '" is not defined');
        if (moduleObj.status === statusDefineFlag) {
            var factoryFun = moduleObj.factory,
                module = {
                    exports: {}
                },
                exports;
            factoryFun && (exports = factoryFun(getRequireFun(path), module, module.exports)),
                moduleObj.exports = module.exports || exports,
                moduleObj.status = statusRequireFlag
        }
        return moduleObj.exports
    }
} ()
wxs.version = {
    updateTime: "2017.1.13 16:51:56",
    info: "",
    version: 32
};
window.Page = __appServiceEngine__.Page,
    window.App = __appServiceEngine__.App,
    window.getApp = __appServiceEngine__.getApp,
    window.getCurrentPages = __appServiceEngine__.getCurrentPages;
window.__WAServiceEndTime__ = Date.now();
// 在 iOS 上，小程序的 javascript 代码是运行在 JavaScriptCore 中，是由 WKWebView 来渲染的，环境有 iOS8、iOS9、iOS10
// 在 Android 上，小程序的 javascript 代码是通过 X5 JSCore来解析，是由 X5 基于 Mobile Chrome 37 内核来渲染的
// 在 开发工具上， 小程序的 javascript 代码是运行在 nwjs 中，是由 Chrome Webview 来渲染的

!function (global) { //WeixinJSBridge 对象兼容层
    if ("function" == typeof logxx && logxx("jsbridge start"), !global.WeixinJSBridge) {
        if (global.navigator && global.navigator.userAgent) {
            var userAgent = global.navigator.userAgent;
            if (userAgent.indexOf("appservice") > -1 || userAgent.indexOf("wechatdevtools") > -1) return
        }
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
        global.WeixinJSBridge = {
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
var wx =
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

	var _pubsub = __webpack_require__(13);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _contactButton = __webpack_require__(14);

	var _contactButton2 = _interopRequireDefault(_contactButton);

	var _onAppStateChange = __webpack_require__(15);

	var _onAppStateChange2 = _interopRequireDefault(_onAppStateChange);

	var _utils = __webpack_require__(16);

	var _utils2 = _interopRequireDefault(_utils);

	__webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function injectAttr(attrName) {
	  return isInDevtools ? void (wx[attrName] = attributes[attrName]) : void wx.__defineGetter__(attrName, function () {
	    return function () {
	      try {
	        return attributes[attrName].apply(this, arguments);
	      } catch (e) {
	        errReport(e);
	      }
	    };
	  });
	}

	function errReport(e, t) {
	  if ("[object Error]" === Object.prototype.toString.apply(e)) {
	    if ("WebviewSdkKnownError" == e.type) throw e;
	    Reporter.errorReport({
	      key: "webviewSDKScriptError",
	      error: e,
	      extend: t
	    });
	  }
	}

	var wtfisthisFlag = !1,
	    d = [],
	    wx = {},
	    isInDevtools = "devtools" === (0, _utils2.default.getPlatform)(),
	    publishInvoke = function publishInvoke(e, t) {
	  //publish
	  (0, _pubsub2.default.publish)("INVOKE_METHOD", {
	    name: e,
	    args: t
	  });
	},
	    attributes = {
	  invoke: _pubsub2.default.invoke,
	  on: _pubsub2.default.on,
	  getPlatform: _utils2.default.getPlatform,
	  onAppEnterForeground: _onAppStateChange2.default.onAppEnterForeground,
	  onAppEnterBackground: _onAppStateChange2.default.onAppEnterBackground,
	  reportIDKey: function reportIDKey(e, t) {
	    console.warn("reportIDKey has been removed wx");
	  },
	  reportKeyValue: function reportKeyValue(e, t) {
	    console.warn("reportKeyValue has been removed from wx");
	  },
	  initReady: function initReady() {
	    (0, _pubsub2.default.invokeMethod)("initReady");
	  },
	  redirectTo: function redirectTo(e) {
	    publishInvoke("redirectTo", e);
	  },
	  navigateTo: function navigateTo(e) {
	    publishInvoke("navigateTo", e);
	  },
	  switchTab: function switchTab(e) {
	    publishInvoke("switchTab", e);
	  },
	  clearStorage: function clearStorage() {
	    publishInvoke("clearStorage", {});
	  },
	  showKeyboard: function showKeyboard(e) {
	    (0, _pubsub2.default.invokeMethod)("showKeyboard", e);
	  },
	  showDatePickerView: function showDatePickerView(e) {
	    (0, _pubsub2.default.invokeMethod)("showDatePickerView", e);
	  },
	  hideKeyboard: function hideKeyboard(e) {
	    (0, _pubsub2.default.invokeMethod)("hideKeyboard", e);
	  },
	  insertMap: function insertMap(e) {
	    (0, _pubsub2.default.invokeMethod)("insertMap", e);
	  },
	  removeMap: function removeMap(e) {
	    (0, _pubsub2.default.invokeMethod)("removeMap", e);
	  },
	  updateMapCovers: function updateMapCovers(e) {
	    (0, _pubsub2.default.invokeMethod)("updateMapCovers", e);
	  },
	  insertContactButton: _contactButton2.default.insertContactButton,
	  updateContactButton: _contactButton2.default.updateContactButton,
	  removeContactButton: _contactButton2.default.removeContactButton,
	  enterContact: _contactButton2.default.enterContact,
	  getRealRoute: _utils2.default.getRealRoute,
	  getCurrentRoute: function getCurrentRoute(e) {
	    (0, _pubsub2.default.invokeMethod)("getCurrentRoute", e, {
	      beforeSuccess: function beforeSuccess(e) {
	        e.route = e.route.split("?")[0];
	      }
	    });
	  },
	  getLocalImgData: function getLocalImgData(e) {
	    function t() {
	      wtfisthisFlag = !1;
	      if (d.length > 0) {
	        var e = d.shift();
	        attributes.getLocalImgData(e);
	      }
	    }

	    if (wtfisthisFlag === !1) {
	      wtfisthisFlag = !0;
	      if ("string" == typeof e.path) {
	        attributes.getCurrentRoute({
	          success: function success(res) {
	            var route = res.route;
	            e.path = (0, _utils2.default.getRealRoute)(route || "index.html", e.path);
	            (0, _pubsub2.default.invokeMethod)("getLocalImgData", e, {
	              beforeAll: t
	            });
	          }
	        });
	      } else {
	        (0, _pubsub2.default.invokeMethod)("getLocalImgData", e, {
	          beforeAll: t
	        });
	      }
	    } else {
	      d.push(e);
	    }
	  },
	  insertVideoPlayer: function insertVideoPlayer(e) {
	    (0, _pubsub2.default.invokeMethod)("insertVideoPlayer", e);
	  },
	  removeVideoPlayer: function removeVideoPlayer(e) {
	    (0, _pubsub2.default.invokeMethod)("removeVideoPlayer", e);
	  },
	  insertShareButton: function insertShareButton(e) {
	    (0, _pubsub2.default.invokeMethod)("insertShareButton", e);
	  },
	  updateShareButton: function updateShareButton(e) {
	    (0, _pubsub2.default.invokeMethod)("updateShareButton", e);
	  },
	  removeShareButton: function removeShareButton(e) {
	    (0, _pubsub2.default.invokeMethod)("removeShareButton", e);
	  },
	  onAppDataChange: function onAppDataChange(e) {
	    (0, _pubsub2.default.subscribe)("appDataChange", function (t) {
	      e(t);
	    });
	  },
	  publishPageEvent: function publishPageEvent(e, t) {
	    (0, _pubsub2.default.publish)("PAGE_EVENT", {
	      eventName: e,
	      data: t
	    });
	  },
	  animationToStyle: _utils2.default.animationToStyle
	};

	for (var f in attributes) {
	  injectAttr(f);
	} // export default wx
	module.exports = wx;

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
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function execOnJSBridgeReady(e) {
	  "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1);
	}

	function invoke() {
	  var e = arguments;
	  execOnJSBridgeReady(function () {
	    WeixinJSBridge.invoke.apply(WeixinJSBridge, e);
	  });
	}

	function on() {
	  var e = arguments;
	  execOnJSBridgeReady(function () {
	    WeixinJSBridge.on.apply(WeixinJSBridge, e);
	  });
	}

	function publish() {
	  var e = Array.prototype.slice.call(arguments);
	  e[1] = {
	    data: e[1],
	    options: {
	      timestamp: Date.now()
	    }
	  }, execOnJSBridgeReady(function () {
	    WeixinJSBridge.publish.apply(WeixinJSBridge, e);
	  });
	}

	function subscribe() {
	  var e = Array.prototype.slice.call(arguments),
	      t = e[1];
	  e[1] = function (e, n) {
	    var i = e.data,
	        o = e.options,
	        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
	        a = o && o.timestamp || 0,
	        s = Date.now();
	    "function" == typeof t && t(i, n), Reporter.speedReport({
	      key: "appService2Webview",
	      data: i || {},
	      timeMark: {
	        startTime: a,
	        endTime: s,
	        nativeTime: r.nativeTime
	      }
	    });
	  }, execOnJSBridgeReady(function () {
	    WeixinJSBridge.subscribe.apply(WeixinJSBridge, e);
	  });
	}

	function invokeMethod(e) {
	  //invoke 事件
	  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
	      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
	      o = {};
	  for (var r in t) {
	    "function" == typeof t[r] && (o[r] = t[r], delete t[r]);
	  }invoke(e, t, function (t) {
	    t.errMsg = t.errMsg || e + ":ok";
	    var i = 0 === t.errMsg.indexOf(e + ":ok"),
	        r = 0 === t.errMsg.indexOf(e + ":cancel"),
	        a = 0 === t.errMsg.indexOf(e + ":fail");
	    "function" == typeof n.beforeAll && n.beforeAll(t), i ? ("function" == typeof n.beforeSuccess && n.beforeSuccess(t), "function" == typeof o.success && o.success(t), "function" == typeof n.afterSuccess && n.afterSuccess(t)) : r ? ("function" == typeof o.cancel && o.cancel(t), "function" == typeof n.cancel && n.cancel(t)) : a && ("function" == typeof o.fail && o.fail(t), "function" == typeof n.fail && n.fail(t)), "function" == typeof o.complete && o.complete(t), "function" == typeof n.complete && n.complete(t);
	  });
	}

	function onMethod(e, t) {
	  on(e, t);
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _pubsub = __webpack_require__(13);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function insertContactButton(e) {
	  (0, _pubsub2.default.invokeMethod)("insertContactButton", e);
	}

	function updateContactButton(e) {
	  (0, _pubsub2.default.invokeMethod)("updateContactButton", e);
	}

	function removeContactButton(e) {
	  (0, _pubsub2.default.invokeMethod)("removeContactButton", e);
	}

	function enterContact(e) {
	  (0, _pubsub2.default.invokeMethod)("enterContact", e);
	}

	exports.default = {
	  insertContactButton: insertContactButton,
	  updateContactButton: updateContactButton,
	  removeContactButton: removeContactButton,
	  enterContact: enterContact
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _pubsub = __webpack_require__(13);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var foregroundViews = [],
	    backgroundViews = [],
	    onAppEnterForeground = function onAppEnterForeground(e) {
	  foregroundViews.push(e);
	},
	    onAppEnterBackground = function onAppEnterBackground(e) {
	  backgroundViews.push(e);
	};

	(0, _pubsub2.default.subscribe)("onAppEnterForeground", function (e) {
	  foregroundViews.forEach(function (t) {
	    t(e);
	  });
	});

	(0, _pubsub2.default.subscribe)("onAppEnterBackground", function (e) {
	  backgroundViews.forEach(function (t) {
	    t(e);
	  });
	});

	exports.default = {
	  onAppEnterForeground: onAppEnterForeground,
	  onAppEnterBackground: onAppEnterBackground
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _toArray(e) {
	  //用e生成一个新数组
	  if (Array.isArray(e)) {
	    for (var t = 0, n = Array(e.length); t < e.length; t++) {
	      n[t] = e[t];
	    }return n;
	  }
	  return Array.from(e);
	}

	function getRealRoute() {
	  //格式化一个路径
	  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
	      t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
	  if (0 === t.indexOf("/")) return t.substr(1);
	  if (0 === t.indexOf("./")) return getRealRoute(e, t.substr(2));
	  var n,
	      i,
	      o = t.split("/");
	  for (n = 0, i = o.length; n < i && ".." === o[n]; n++) {}
	  o.splice(0, n);
	  var t = o.join("/"),
	      r = e.length > 0 ? e.split("/") : [];
	  r.splice(r.length - n - 1, n + 1);
	  var s = r.concat(o),
	      l = s.join("/");
	  return l;
	}

	function animationToStyle(e) {
	  var animates = e.animates,
	      option = e.option,
	      opts = void 0 === option ? {} : option,
	      transformOrigin = opts.transformOrigin,
	      transition = opts.transition;
	  if ("undefined" == typeof transition || "undefined" == typeof animates) return {
	    transformOrigin: "",
	    transform: "",
	    transition: ""
	  };

	  var transform = animates.filter(function (animate) {
	    var t = animate.type;
	    return "style" !== t;
	  }).map(function (animate) {
	    var animateType = animate.type,
	        animateArgs = animate.args;
	    switch (animateType) {
	      case "matrix":
	        return "matrix(" + animateArgs.join(",") + ")";
	      case "matrix3d":
	        return "matrix3d(" + animateArgs.join(",") + ")";
	      case "rotate":
	        return animateArgs = animateArgs.map(addDegSuffix), "rotate(" + animateArgs[0] + ")";
	      case "rotate3d":
	        return animateArgs[3] = addDegSuffix(animateArgs[3]), "rotate3d(" + animateArgs.join(",") + ")";
	      case "rotateX":
	        return animateArgs = animateArgs.map(addDegSuffix), "rotateX(" + animateArgs[0] + ")";
	      case "rotateY":
	        return animateArgs = animateArgs.map(addDegSuffix), "rotateY(" + animateArgs[0] + ")";
	      case "rotateZ":
	        return animateArgs = animateArgs.map(addDegSuffix), "rotateZ(" + animateArgs[0] + ")";
	      case "scale":
	        return "scale(" + animateArgs.join(",") + ")";
	      case "scale3d":
	        return "scale3d(" + animateArgs.join(",") + ")";
	      case "scaleX":
	        return "scaleX(" + animateArgs[0] + ")";
	      case "scaleY":
	        return "scaleY(" + animateArgs[0] + ")";
	      case "scaleZ":
	        return "scaleZ(" + animateArgs[0] + ")";
	      case "translate":
	        return animateArgs = animateArgs.map(addPXSuffix), "translate(" + animateArgs.join(",") + ")";
	      case "translate3d":
	        return animateArgs = animateArgs.map(addPXSuffix), "translate3d(" + animateArgs.join(",") + ")";
	      case "translateX":
	        return animateArgs = animateArgs.map(addPXSuffix), "translateX(" + animateArgs[0] + ")";
	      case "translateY":
	        return animateArgs = animateArgs.map(addPXSuffix), "translateY(" + animateArgs[0] + ")";
	      case "translateZ":
	        return animateArgs = animateArgs.map(addPXSuffix), "translateZ(" + animateArgs[0] + ")";
	      case "skew":
	        return animateArgs = animateArgs.map(addDegSuffix), "skew(" + animateArgs.join(",") + ")";
	      case "skewX":
	        return animateArgs = animateArgs.map(addDegSuffix), "skewX(" + animateArgs[0] + ")";
	      case "skewY":
	        return animateArgs = animateArgs.map(addDegSuffix), "skewY(" + animateArgs[0] + ")";
	      default:
	        return "";
	    }
	  }).join(" ");

	  var style = animates.filter(function (animate) {
	    var type = animate.type;
	    return "style" === type;
	  }).reduce(function (a, b) {
	    return a[b.args[0]] = b.args[1], a;
	  }, {});

	  var transitionProperty = ["transform"].concat(_toArray(Object.keys(style))).join(",");

	  return {
	    style: style,
	    transformOrigin: transformOrigin,
	    transform: transform,
	    transitionProperty: transitionProperty,
	    transition: transition.duration + "ms " + transition.timingFunction + " " + transition.delay + "ms"
	  };
	}

	function getPlatform() {
	  var e = window.navigator.userAgent.toLowerCase();
	  return (/wechatdevtools/.test(e) ? "wechatdevtools" : /(iphone|ipad)/.test(e) ? "ios" : /android/.test(e) ? "android" : void 0
	  );
	}

	function addPXSuffix(e) {
	  return "number" == typeof e ? e + "px" : e;
	}

	function addDegSuffix(e) {
	  return e + "deg";
	}

	var WebviewSdkKnownError = function (_Error) {
	  _inherits(WebviewSdkKnownError, _Error);

	  function WebviewSdkKnownError(str) {
	    _classCallCheck(this, WebviewSdkKnownError);

	    return _possibleConstructorReturn(this, (WebviewSdkKnownError.__proto__ || Object.getPrototypeOf(WebviewSdkKnownError)).call(this, "Webview-SDK:" + str));
	  }

	  return WebviewSdkKnownError;
	}(Error);

	exports.default = {
	  getRealRoute: getRealRoute,
	  animationToStyle: animationToStyle,
	  getPlatform: getPlatform,
	  WebviewSdkKnownError: WebviewSdkKnownError
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _pubsub = __webpack_require__(13);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function execOnReady(e) {
	  "loading" !== document.readyState ? e() : document.addEventListener("DOMContentLoaded", e);
	} // 20 log 相关

	var r = !1,
	    consoleMethods = ["log", "warn", "error", "info", "debug"];

	consoleMethods.forEach(function (method) {
	  (0, _pubsub2.default.subscribe)(method, function (t) {
	    var n = t.log;
	    console[method].apply(console, n);
	  });
	});

	(0, _pubsub2.default.subscribe)("initLogs", function (e) {
	  var t = e.logs;
	  r === !1 && (r = !0, t.forEach(function (e) {
	    var t = e.method,
	        n = e.log;
	    console[t].apply(console, n);
	  }), r = !0);
	});

	execOnReady(function () {
	  setTimeout(function () {
	    (0, _pubsub2.default.publish)("DOMContentLoaded", {});
	  }, 1e2);
	});

/***/ }
/******/ ]);
var exparser =
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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.globalOptions = exports.removeGlobalErrorListener = exports.addGlobalErrorListener = exports.triggerEvent = exports.removeListenerFromElement = exports.addListenerToElement = exports.replaceChild = exports.removeChild = exports.insertBefore = exports.appendChild = exports.createVirtualNode = exports.createTextNode = exports.createElement = exports.registerElement = exports.registerBehavior = exports.Observer = exports.Component = exports.VirtualNode = exports.TextNode = exports.Element = exports.Behavior = undefined;

	var _viewUtil = __webpack_require__(1);

	var _viewUtil2 = _interopRequireDefault(_viewUtil);

	var _viewBindEvent = __webpack_require__(2);

	var viewBindEvent = _interopRequireWildcard(_viewBindEvent);

	var _behavior = __webpack_require__(3);

	var _behavior2 = _interopRequireDefault(_behavior);

	var _element = __webpack_require__(4);

	var _element2 = _interopRequireDefault(_element);

	var _component = __webpack_require__(6);

	var _component2 = _interopRequireDefault(_component);

	var _textNode = __webpack_require__(12);

	var _textNode2 = _interopRequireDefault(_textNode);

	var _virtualNode = __webpack_require__(11);

	var _virtualNode2 = _interopRequireDefault(_virtualNode);

	var _observer = __webpack_require__(5);

	var _observer2 = _interopRequireDefault(_observer);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var u = {
	    renderingMode: "full",
	    keepWhiteSpace: false,
	    parseTextContent: true,
	    throwGlobalError: false
	};

	_component2.default._setGlobalOptionsGetter(function () {
	    return globalOptions;
	});
	_viewUtil2.default._setGlobalOptionsGetter(function () {
	    return globalOptions;
	});

	var Behavior = exports.Behavior = _behavior2.default;
	var Element = exports.Element = _element2.default;
	var TextNode = exports.TextNode = _textNode2.default;
	var VirtualNode = exports.VirtualNode = _virtualNode2.default;
	var Component = exports.Component = _component2.default;
	var Observer = exports.Observer = _observer2.default;
	var registerBehavior = exports.registerBehavior = _behavior2.default.create;
	var registerElement = exports.registerElement = _component2.default.register;
	var createElement = exports.createElement = _component2.default.create;
	var createTextNode = exports.createTextNode = _textNode2.default.create;
	var createVirtualNode = exports.createVirtualNode = _virtualNode2.default.create;
	var appendChild = exports.appendChild = _element2.default.appendChild;
	var insertBefore = exports.insertBefore = _element2.default.insertBefore;
	var removeChild = exports.removeChild = _element2.default.removeChild;
	var replaceChild = exports.replaceChild = _element2.default.replaceChild;
	var addListenerToElement = exports.addListenerToElement = viewBindEvent.addListenerToElement;
	var removeListenerFromElement = exports.removeListenerFromElement = viewBindEvent.removeListenerFromElement;
	var triggerEvent = exports.triggerEvent = viewBindEvent.triggerEvent;
	var addGlobalErrorListener = exports.addGlobalErrorListener = _viewUtil2.default.addGlobalErrorListener;
	var removeGlobalErrorListener = exports.removeGlobalErrorListener = _viewUtil2.default.removeGlobalErrorListener;

	var globalOptions = exports.globalOptions = u;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var viewUtil = function viewUtil() {};
	viewUtil.prototype = Object.create(Object.prototype, {
	    constructor: {
	        value: viewUtil,
	        writable: true,
	        configurable: true
	    }
	});
	var globalOptions = null;
	viewUtil._setGlobalOptionsGetter = function (e) {
	    globalOptions = e;
	};

	viewUtil.create = function (e) {
	    var t = Object.create(viewUtil.prototype);
	    t.empty = true;
	    t._type = e;
	    t._arr = [];
	    t._index = 0;
	    return t;
	};

	viewUtil.prototype.add = function (func) {
	    var id = this._index++;
	    this._arr.push({
	        id: id,
	        func: func
	    });
	    this.empty = false;
	    return id;
	};

	viewUtil.prototype.remove = function (e) {
	    var t = this._arr,
	        n = 0;
	    if ("function" == typeof e) {
	        for (n = 0; n < t.length; n++) {
	            if (t[n].func === e) {
	                t.splice(n, 1);
	                this.empty = !t.length;
	                return true;
	            }
	        }
	    } else {
	        for (n = 0; n < t.length; n++) {
	            if (t[n].id === e) {
	                t.splice(n, 1);
	                this.empty = !t.length;
	                return false;
	            }
	        }
	    }
	};
	viewUtil.prototype.call = function (e, t) {
	    for (var n = this._arr, i = false, o = 0; o < n.length; o++) {
	        var a = safeCallback(this._type, n[o].func, e, t);
	        a === false && (i = true);
	    }
	    if (i) {
	        return false;
	    }
	};
	var view = viewUtil.create();
	var viewHandle = function viewHandle(e, t) {
	    if (!t.type || view.call(null, [e, t]) !== false) {
	        console.error(t.message);
	        if (globalOptions().throwGlobalError) {
	            throw e;
	        }
	        console.error(e.stack);
	    }
	};
	var safeCallback = function safeCallback(type, method, element, args) {
	    try {
	        return method.apply(element, args);
	    } catch (view) {
	        var message = "Exparser " + (type || "Error Listener") + " Error @ ";
	        element && (message += element.is), message += "#" + (method.name || "(anonymous)"), viewHandle(view, {
	            message: message,
	            type: type,
	            element: element,
	            method: method,
	            args: args
	        });
	    }
	};

	viewUtil.safeCallback = safeCallback;

	viewUtil.addGlobalErrorListener = function (e) {
	    return view.add(e);
	};
	viewUtil.removeGlobalErrorListener = function (e) {
	    return view.remove(e);
	};
	exports.default = viewUtil;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.triggerEvent = triggerEvent;
	exports.addListenerToElement = addListenerToElement;
	exports.removeListenerFromElement = removeListenerFromElement;

	var _viewUtil = __webpack_require__(1);

	var _viewUtil2 = _interopRequireDefault(_viewUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var now = Date.now();

	function triggerEvent(e, type, detail, viewUtil) {
	    viewUtil = viewUtil || {};
	    var originalEvent = viewUtil.originalEvent,
	        bubbles = !viewUtil.bubbles,
	        composed = !viewUtil.composed,
	        extraFields = viewUtil.extraFields || {},
	        stopTarge = false,
	        timeStamp = Date.now() - now,
	        target = e.__wxElement || e;
	    e === target.shadowRoot && (target = e);
	    var preventDefault = function preventDefault() {
	        originalEvent && originalEvent.preventDefault();
	    };
	    var stopPropagation = function stopPropagation() {
	        stopTarge = true;
	    };
	    var viewMap = {
	        target: target,
	        currentTarget: target,
	        type: type,
	        timeStamp: timeStamp,
	        detail: detail,
	        preventDefault: preventDefault,
	        stopPropagation: stopPropagation
	    };
	    for (var f in extraFields) {
	        viewMap[f] = extraFields[f];
	    }

	    for (var v = function v(e, t) {
	        viewMap.currentTarget = t;
	        var n = e.call(t, [viewMap]);
	        n === !1 && (stopPropagation(), stopTarge = !0);
	    }, m = target.parentNode, b = target; b && (m === b && (m = b.parentNode), b.__wxEvents && b.__wxEvents[type] && v(b.__wxEvents[type], b), !bubbles && !stopTarge);) {
	        if (b.__host) {
	            if (composed) break;
	            m && m.__domElement || (m = b.__host, viewMap.target = m), b = b.__host;
	        } else {
	            var A = !0;
	            (b.__domElement || b.__virtual) && (A = !1), b = A || composed ? b.parentNode : b.__slotParent;
	        }
	    } // for (var v = function(e, t) {
	    //     viewMap.currentTarget = t;
	    //     var n = e.call(t, [viewMap]);
	    //     n === false && (preventDefault(), stopTarge = true);
	    // },m = target.parentNode, b = target; b && (m === b && (m = b.parentNode), b.__wxEvents && b.__wxEvents[type] && v(b.__wxEvents[type], b), !bubbles && !stopTarge);){
	    // 	if (b.__host) {
	    //         if (composed) break;
	    //         m && m.__domElement || (m = b.__host, viewMap.target = m);
	    //         b = b.__host;
	    //     } else {
	    //         var A = true;
	    //         (b.__domElement || b.__virtual) && (A = false);
	    //         if ( b = A || composed ) {
	    //             b.parentNode;
	    //         } else {
	    //             b.__slotParent;
	    //         }
	    //     }
	    // }
	};

	function addListenerToElement(e, t, n) {
	    var o = e.__wxElement || e;
	    e === o.shadowRoot && (o = e);
	    o.__wxEvents || (o.__wxEvents = Object.create(null));
	    o.__wxEvents[t] || (o.__wxEvents[t] = _viewUtil2.default.create("Event Listener"));
	    return o.__wxEvents[t].add(n);
	};
	function removeListenerFromElement(e, t, n) {
	    var i = e.__wxElement || e;
	    e === i.shadowRoot && (i = e);
	    i.__wxEvents && i.__wxEvents[t] && i.__wxEvents[t].remove(n);
	}

	// export {
	//     triggerEvent,
	//     addListenerToElement,
	//     removeListenerFromElement
	// }
	// export default triggerEvent;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _viewUtil = __webpack_require__(1);

	var _viewUtil2 = _interopRequireDefault(_viewUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var behavior = function behavior() {};
	behavior.prototype = Object.create(Object.prototype, {
	  constructor: {
	    value: behavior,
	    writable: true,
	    configurable: true
	  }
	});
	var cycle = ["created", "attached", "detached"];
	var index = 1;
	behavior.create = function (e) {
	  var t = String(index++);
	  var n = behavior.list[e.is || ""] = Object.create(behavior.prototype, {
	    is: {
	      value: e.is || ""
	    },
	    _id: {
	      value: t
	    }
	  });
	  n.template = e.template;
	  n.properties = Object.create(null);
	  n.methods = Object.create(null);
	  n.listeners = Object.create(null);
	  for (var i = n.ancestors = [], s = "", l = 0; l < (e.behaviors || []).length; l++) {
	    var c = e.behaviors[l];
	    "string" == typeof c && (c = behavior.list[c]);
	    for (s in c.properties) {
	      n.properties[s] = c.properties[s];
	    }
	    for (s in c.methods) {
	      n.methods[s] = c.methods[s];
	    }
	    for (var d = 0; d < c.ancestors.length; d++) {
	      i.indexOf(c.ancestors[d]) < 0 && i.push(c.ancestors[d]);
	    }
	  }
	  for (s in e.properties) {
	    n.properties[s] = e.properties[s];
	  }
	  for (s in e.listeners) {
	    n.listeners[s] = e.listeners[s];
	  }
	  for (s in e) {
	    "function" == typeof e[s] && (cycle.indexOf(s) < 0 ? n.methods[s] = e[s] : n[s] = e[s]);
	  }
	  i.push(n);
	  return n;
	};
	behavior.list = Object.create(null);
	behavior.prototype.hasBehavior = function (e) {
	  for (var t = 0; t < this.ancestors.length; t++) {
	    if (this.ancestors[t].is === e) {
	      return true;
	    }
	  }
	  return false;
	};
	behavior.prototype.getAllListeners = function () {
	  for (var e = Object.create(null), t = this.ancestors, n = 0; n < t.length; n++) {
	    var i = this.ancestors[n];
	    for (var o in i.listeners) {
	      e[o] ? e[o].push(i.listeners[o]) : e[o] = [i.listeners[o]];
	    }
	  }
	  return e;
	};
	behavior.prototype.getAllLifeTimeFuncs = function () {
	  var e = Object.create(null),
	      t = this.ancestors;
	  cycle.forEach(function (n) {
	    for (var o = e[n] = _viewUtil2.default.create("Lifetime Method"), r = 0; r < t.length; r++) {
	      var a = t[r];
	      a[n] && o.add(a[n]);
	    }
	  });
	  return e;
	};
	exports.default = behavior;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _viewBindEvent = __webpack_require__(2);

	var viewBindEvent = _interopRequireWildcard(_viewBindEvent);

	var _observer = __webpack_require__(5);

	var _observer2 = _interopRequireDefault(_observer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var element = function element() {};
	element.prototype = Object.create(Object.prototype, {
	    constructor: {
	        value: element,
	        writable: true,
	        configurable: true
	    }
	});
	var compnentSystem = null;
	element._setCompnentSystem = function (e) {
	    compnentSystem = e;
	}, element.initialize = function (e) {
	    e.__attached = false;
	    e.parentNode = null;
	    e.childNodes = [];
	    e.__slotParent = null;
	    e.__slotChildren = e.childNodes;
	    e.__subtreeObserversCount = 0;
	};
	var parentNodeAttached = function parentNodeAttached(e) {
	    if (!e.parentNode || e.parentNode.__attached) {
	        var t = function t(e) {
	            e.__attached = !0;
	            e.shadowRoot instanceof element && t(e.shadowRoot);
	            var n = e.childNodes;
	            if (n) {
	                for (var i = 0; i < n.length; i++) {
	                    t(n[i]);
	                }
	            }
	        };
	        t(e);
	        var n = function n(e) {
	            e.__lifeTimeFuncs && compnentSystem._callLifeTimeFuncs(e, "attached");
	            e.shadowRoot instanceof element && n(e.shadowRoot);
	            var t = e.childNodes;
	            if (t) {
	                for (var i = 0; i < t.length; i++) {
	                    n(t[i]);
	                }
	            }
	        };
	        n(e);
	    }
	};
	var detachedChild = function detachedChild(e) {
	    if (e.__attached) {
	        var t = function t(e) {
	            e.__attached = !1;
	            e.shadowRoot instanceof element && t(e.shadowRoot);
	            var n = e.childNodes;
	            if (n) {
	                for (var i = 0; i < n.length; i++) {
	                    t(n[i]);
	                }
	            }
	        };
	        t(e);
	        var n = function n(e) {
	            e.__lifeTimeFuncs && compnentSystem._callLifeTimeFuncs(e, "detached");
	            e.shadowRoot instanceof element && n(e.shadowRoot);
	            var t = e.childNodes;
	            if (t) {
	                for (var i = 0; i < t.length; i++) {
	                    n(t[i]);
	                }
	            }
	        };
	        n(e);
	    }
	};
	var childObserver = function childObserver(e, t, n) {
	    if (e.__childObservers && !e.__childObservers.empty || e.__subtreeObserversCount) {
	        var i = null;
	        i = "add" === t ? {
	            type: "childList",
	            target: e,
	            addedNodes: [n]
	        } : {
	            type: "childList",
	            target: e,
	            removedNodes: [n]
	        };
	        _observer2.default.observer._callObservers(e, "__childObservers", i);
	    }
	};
	var attachShadowRoot = function attachShadowRoot(e, t, n, i) {
	    var o = e;
	    if (o instanceof element) {
	        for (; o.__virtual;) {
	            var a = o.__slotParent;
	            if (!a) {
	                return;
	            }
	            if (t && !n) {
	                var s = a.__slotChildren.indexOf(o);
	                n = a.__slotChildren[s + 1];
	            }
	            o = a;
	        }
	        o instanceof element && (o = o.__domElement);
	    }
	    var l = null;
	    if (t) {
	        if (t.__virtual) {
	            var c = document.createDocumentFragment();
	            var d = function d(e) {
	                for (var t = 0; t < e.__slotChildren.length; t++) {
	                    var n = e.__slotChildren[t];
	                    n.__virtual ? d(n) : c.appendChild(n.__domElement);
	                }
	            };
	            d(t);
	            l = c;
	        } else {
	            l = t.__domElement;
	        }
	    }
	    var u = null;
	    if (n) {
	        if (n.__virtual) {
	            var h = e,
	                p = 0;
	            if (i) {
	                var g = function g(e) {
	                    for (var t = 0; t < e.__slotChildren.length; t++) {
	                        var n = e.__slotChildren[t];
	                        n.__virtual ? g(n) : o.removeChild(n.__domElement);
	                    }
	                };
	                g(n);
	                i = !1;
	                p = e.__slotChildren.indexOf(n) + 1;
	            } else {
	                h = n.__slotParent;
	                p = h.__slotChildren.indexOf(n);
	            }
	            if (t) {
	                var f = function f(e, t) {
	                    for (; t < e.__slotChildren.length; t++) {
	                        var n = e.__slotChildren[t];
	                        if (!n.__virtual) {
	                            return n;
	                        }
	                        var i = f(n, 0);
	                        if (i) {
	                            return i;
	                        }
	                    }
	                };
	                n = null;
	                for (var v = h; n = f(v, p), !n && v.__virtual; v = v.__slotParent) {
	                    p = v.__slotParent.__slotChildren.indexOf(v) + 1;
	                }
	                n && (u = n.__domElement);
	            }
	        } else {
	            u = n.__domElement;
	        }
	    }
	    i ? l ? o.replaceChild(l, u) : o.removeChild(u) : l && (u ? o.insertBefore(l, u) : o.appendChild(l));
	};
	var updateSubtree = function updateSubtree(e, t, n, i) {
	    var r = -1;
	    if (n && (r = e.childNodes.indexOf(n), r < 0)) {
	        return false;
	    }
	    i && (t === n ? i = !1 : (e.__subtreeObserversCount && _observer2.default.observer._updateSubtreeCaches(n, -e.__subtreeObserversCount), n.parentNode = null, n.__slotParent = null));
	    var a = null,
	        u = e;
	    if (e.__slots && (u = e.__slots[""]), t) {
	        a = t.parentNode;
	        t.parentNode = e;
	        t.__slotParent = u;
	        var h = e.__subtreeObserversCount;
	        if (a) {
	            var p = a.childNodes.indexOf(t);
	            a.childNodes.splice(p, 1);
	            a === e && p < r && r--;
	            h -= a.__subtreeObserversCount;
	        }
	        h && _observer2.default.observer._updateSubtreeCaches(t, h);
	    }
	    attachShadowRoot(u, t, n, i);
	    r === -1 && (r = e.childNodes.length);
	    if (t) {
	        e.childNodes.splice(r, i ? 1 : 0, t);
	    } else {
	        e.childNodes.splice(r, i ? 1 : 0);
	    }
	    i && (detachedChild(n), childObserver(e, "remove", n));
	    t && (a && (detachedChild(t), childObserver(a, "remove", t)), parentNodeAttached(t), childObserver(e, "add", t));
	    return true;

	    // return attachShadowRoot(u, t, n, i), r === -1 && (r = e.childNodes.length), t ? e.childNodes.splice(r, i ? 1 : 0, t) : e.childNodes.splice(r, i ? 1 : 0), i && (detachedChild(n), c(e, "remove", n)), t && (a && (detachedChild(t), childObserver(a, "remove", t)), parentNodeAttached(t), childObserver(e, "add", t)), !0
	};
	var childHandle = function childHandle(e, t, n, i) {
	    var o = i ? n : t;
	    var r = updateSubtree(e, t, n, i);
	    return r ? o : null;
	};

	element._attachShadowRoot = function (e, t) {
	    attachShadowRoot(e, t, null, !1);
	};
	element.appendChild = function (e, t) {
	    return childHandle(e, t, null, false);
	};
	element.insertBefore = function (e, t, n) {
	    return childHandle(e, t, n, false);
	};
	element.removeChild = function (e, t) {
	    return childHandle(e, null, t, true);
	};
	element.replaceChild = function (e, t, n) {
	    return childHandle(e, t, n, true);
	};
	element.prototype.appendChild = function (e) {
	    return childHandle(this, e, null, false);
	};
	element.prototype.insertBefore = function (e, t) {
	    return childHandle(this, e, t, false);
	};
	element.prototype.removeChild = function (e) {
	    return childHandle(this, null, e, true);
	};
	element.prototype.replaceChild = function (e, t) {
	    return childHandle(this, e, t, true);
	};
	element.prototype.triggerEvent = function (e, t, n) {
	    viewBindEvent.triggerEvent(this, e, t, n);
	};
	element.prototype.addListener = function (e, t) {
	    viewBindEvent.addListenerToElement(this, e, t);
	};
	element.prototype.removeListener = function (e, t) {
	    viewBindEvent.removeListenerFromElement(this, e, t);
	};
	element.replaceDocumentElement = function (e, t) {
	    e.__attached || (t.parentNode.replaceChild(e.__domElement, t), parentNodeAttached(e));
	};
	element.prototype.hasBehavior = function (e) {
	    return !!this.__behavior && this.__behavior.hasBehavior(e);
	};
	exports.default = element;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _viewUtil = __webpack_require__(1);

	var _viewUtil2 = _interopRequireDefault(_viewUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var observer = function observer() {};
	observer.prototype = Object.create(Object.prototype, {
	    constructor: {
	        value: observer,
	        writable: true,
	        configurable: true
	    }
	});
	observer.create = function (e) {
	    var t = Object.create(observer.prototype);
	    t._cb = e;
	    t._noSubtreeCb = function (t) {
	        t.target === this && e.call(this, t);
	    };
	    t._binded = [];
	    return t;
	};

	var updateSubtreeCaches = observer._updateSubtreeCaches = function (e, t) {
	    e.__subtreeObserversCount += t;
	    var childNodes = e.childNodes;
	    if (childNodes) {
	        for (var i = 0; i < childNodes.length; i++) {
	            updateSubtreeCaches(childNodes[i], t);
	        }
	    }
	};

	observer.prototype.observe = function (e, t) {
	    t = t || {};
	    var n = 0,
	        subtree = t.subtree ? this._cb : this._noSubtreeCb;
	    t.properties && (e.__propObservers || (e.__propObservers = _viewUtil2.default.create("Observer Callback")), this._binded.push({
	        funcArr: e.__propObservers,
	        id: e.__propObservers.add(subtree),
	        subtree: t.subtree ? e : null
	    }), n++);
	    t.childList && (e.__childObservers || (e.__childObservers = _viewUtil2.default.create("Observer Callback")), this._binded.push({
	        funcArr: e.__childObservers,
	        id: e.__childObservers.add(subtree),
	        subtree: t.subtree ? e : null
	    }), n++);
	    t.characterData && (e.__textObservers || (e.__textObservers = _viewUtil2.default.create("Observer Callback")), this._binded.push({
	        funcArr: e.__textObservers,
	        id: e.__textObservers.add(subtree),
	        subtree: t.subtree ? e : null
	    }), n++);
	    t.subtree && updateSubtreeCaches(e, n);
	};
	observer.prototype.disconnect = function () {
	    for (var e = this._binded, t = 0; t < e.length; t++) {
	        var n = e[t];
	        n.funcArr.remove(n.id);
	        n.subtree && updateSubtreeCaches(n.subtree, -1);
	    }
	    this._binded = [];
	};

	observer._callObservers = function (e, t, n) {
	    do {
	        e[t] && e[t].call(e, [n]);
	        e = e.parentNode;
	    } while (e && e.__subtreeObserversCount);
	};
	exports.default = { observer: observer };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _viewUtil = __webpack_require__(1);

	var _viewUtil2 = _interopRequireDefault(_viewUtil);

	var _viewBindEvent = __webpack_require__(2);

	var viewBindEvent = _interopRequireWildcard(_viewBindEvent);

	var _nodeAddHandle = __webpack_require__(7);

	var _nodeAddHandle2 = _interopRequireDefault(_nodeAddHandle);

	var _behavior = __webpack_require__(3);

	var _behavior2 = _interopRequireDefault(_behavior);

	var _element = __webpack_require__(4);

	var _element2 = _interopRequireDefault(_element);

	var _observer = __webpack_require__(5);

	var _observer2 = _interopRequireDefault(_observer);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function i(e) {
	    return e.replace(/[A-Z]/g, function (e) {
	        return "-" + e.toLowerCase();
	    });
	}

	var addListenerToElement = viewBindEvent.addListenerToElement;
	var component = function component() {};
	component.prototype = Object.create(Object.prototype, {
	    constructor: {
	        value: component,
	        writable: true,
	        configurable: true
	    }
	});
	component.list = Object.create(null);
	_nodeAddHandle2.default._setCompnentSystem(component);
	_element2.default._setCompnentSystem(component);
	component._setGlobalOptionsGetter = function (e) {
	    _nodeAddHandle2.default._setGlobalOptionsGetter(e);
	};
	var attribute = function attribute(e, t, n, o) {
	    var r = i(n);
	    t.type === Boolean ? o ? e.__domElement.setAttribute(r, "") : e.__domElement.removeAttribute(r) : t.type === Object || t.type === Array ? e.__domElement.setAttribute(r, JSON.stringify(o)) : e.__domElement.setAttribute(r, o);
	};
	var p = function p(e, t) {
	    return t === String ? null === e || undefined === e ? "" : String(e) : t === Number ? isFinite(e) ? Number(e) : false : t === Boolean ? !!e : t === Array ? e instanceof Array ? e : [] : "object" == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) ? e : null;
	};
	component.register = function (e) {
	    var t = e.options || {},
	        n = {
	        is: {
	            value: e.is || ""
	        }
	    },
	        i = _behavior2.default.create(e),
	        r = Object.create(null);
	    Object.keys(i.properties).forEach(function (e) {
	        var t = i.properties[e];
	        t !== String && t !== Number && t !== Boolean && t !== Object && t !== Array || (t = {
	            type: t
	        });
	        undefined === t.value && (t.type === String ? t.value = "" : t.type === Number ? t.value = 0 : t.type === Boolean ? t.value = !1 : t.type === Array ? t.value = [] : t.value = null);
	        r[e] = {
	            type: t.type,
	            value: t.value,
	            coerce: i.methods[t.coerce],
	            observer: i.methods[t.observer],
	            public: !!t.public
	        };
	        n[e] = {
	            enumerable: true,
	            get: function get() {
	                var t = this.__propData[e];
	                return void 0 === t ? r[e].value : t;
	            },
	            set: function set(t) {
	                var n = r[e];
	                t = p(t, n.type);
	                var i = this.__propData[e];
	                if (n.coerce) {
	                    var a = _viewUtil2.default.safeCallback("Property Filter", n.coerce, this, [t, i]);
	                    void 0 !== a && (t = a);
	                }
	                t !== i && (this.__propData[e] = t, n.public && attribute(this, n, e, t), this.__templateInstance.updateValues(this, this.__propData, e), n.observer && _viewUtil2.default.safeCallback("Property Observer", n.observer, this, [t, i]), n.public && (this.__propObservers && !this.__propObservers.empty || this.__subtreeObserversCount) && _observer2.default.observer._callObservers(this, "__propObservers", {
	                    type: "properties",
	                    target: this,
	                    propertyName: e
	                }));
	                // if (t !== i) {
	                //     this.__propData[e] = t, 
	                //     n.public && attribute(this, n, e, t);
	                //     this.__templateInstance.updateValues(this, this.__propData, e);
	                //     n.observer && viewUtil.safeCallback("Property Observer", n.observer, this, [t, i]);
	                //     n.public && (this.__propObservers && !this.__propObservers.empty || this.__subtreeObserversCount) && c._callObservers(this, "__propObservers", {
	                //         type: "properties",
	                //         target: this,
	                //         propertyName: e
	                //     });
	                // };
	            }
	        };
	    });
	    var d = Object.create(_element2.default.prototype, n);
	    d.__behavior = i;
	    for (var g in i.methods) {
	        d[g] = i.methods[g];
	    }d.__lifeTimeFuncs = i.getAllLifeTimeFuncs();
	    var f = Object.create(null),
	        v = {};
	    for (var m in r) {
	        v[m] = r[m].value;
	        f[m] = !!r[m].public;
	    }
	    var b = document.getElementById(i.is);
	    !i.template && b && "TEMPLATE" === b.tagName || (b = document.createElement("template"), b.innerHTML = i.template || "");
	    var A = _nodeAddHandle2.default.create(b, v, i.methods, t);
	    d.__propPublic = f;
	    var _ = i.getAllListeners(),
	        w = Object.create(null);
	    for (var y in _) {
	        for (var x = _[y], C = [], k = 0; k < x.length; k++) {
	            C.push(i.methods[x[k]]);
	        }
	        w[y] = C;
	    }
	    component.list[i.is] = {
	        proto: d,
	        template: A,
	        defaultValuesJSON: JSON.stringify(v),
	        innerEvents: w
	    };
	};
	component.create = function (e) {
	    e = e ? e.toLowerCase() : "virtual";
	    var t = document.createElement(e),
	        n = component.list[e] || component.list[""],
	        i = Object.create(n.proto);
	    _element2.default.initialize(i);
	    i.__domElement = t;
	    t.__wxElement = i;
	    i.__propData = JSON.parse(n.defaultValuesJSON);
	    var o = i.__templateInstance = n.template.createInstance(i);

	    if (o.shadowRoot instanceof _element2.default) {
	        _element2.default._attachShadowRoot(i, o.shadowRoot);
	        i.shadowRoot = o.shadowRoot;
	        i.__slotChildren = [o.shadowRoot];
	        o.shadowRoot.__slotParent = i;
	    } else {
	        i.__domElement.appendChild(o.shadowRoot);
	        i.shadowRoot = t;
	        i.__slotChildren = t.childNodes;
	    }

	    i.shadowRoot.__host = i;
	    i.$ = o.idMap;
	    i.$$ = t;
	    o.slots[""] || (o.slots[""] = t);
	    i.__slots = o.slots;
	    i.__slots[""].__slotChildren = i.childNodes;

	    var r = n.innerEvents;
	    for (var a in r) {
	        var s = a.split(".", 2),
	            c = s[s.length - 1],
	            h = i,
	            p = true;
	        if (2 === s.length && "" !== s[0] && (p = !1, "this" !== s[0] && (h = i.$[s[0]])), h) {
	            for (var g = r[a], f = 0; f < g.length; f++) {
	                p ? addListenerToElement(h.shadowRoot, c, g[f].bind(i)) : addListenerToElement(h, c, g[f].bind(i));
	            }
	        }
	    }
	    component._callLifeTimeFuncs(i, "created");
	    return i;
	};
	component.hasProperty = function (e, t) {
	    return undefined !== e.__propPublic[t];
	};
	component.hasPublicProperty = function (e, t) {
	    return e.__propPublic[t] === !0;
	};
	component._callLifeTimeFuncs = function (e, t) {
	    var n = e.__lifeTimeFuncs[t];
	    n.call(e, []);
	};
	component.register({
	    is: "",
	    template: "<wx-content></wx-content>",
	    properties: {}
	});
	exports.default = component;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _bindedProp = __webpack_require__(8);

	var _bindedProp2 = _interopRequireDefault(_bindedProp);

	var _calculate = __webpack_require__(9);

	var _calculate2 = _interopRequireDefault(_calculate);

	var _element = __webpack_require__(4);

	var _element2 = _interopRequireDefault(_element);

	var _initialize = __webpack_require__(10);

	var _initialize2 = _interopRequireDefault(_initialize);

	var _virtualNode = __webpack_require__(11);

	var _virtualNode2 = _interopRequireDefault(_virtualNode);

	var _textNode = __webpack_require__(12);

	var _textNode2 = _interopRequireDefault(_textNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function nameFn(e) {
	    return e.replace(/-([a-z])/g, function (e, t) {
	        return t.toUpperCase();
	    });
	}
	var valueFn = function valueFn() {};
	valueFn.prototype = Object.create(Object.prototype, {
	    constructor: {
	        value: valueFn,
	        writable: true,
	        configurable: true
	    }
	});

	function attributeAdd(e) {
	    for (var t = Object.create(null), n = 0; n < e.length; n++) {
	        t[e[n].name] = e[n].value;
	    }
	    return t;
	}

	var w = function w(e, t, n) {
	    e[t] = n;
	};

	function childrenAppend(e, t, n, i, o) {
	    for (var a = null, s = 0, l = null, p = 0; p < e.length; p++) {
	        var g = e[p];
	        if (g.name === undefined) {
	            a = _textNode2.default.create(g.text);
	            g.exp && o.add(g.exp, a.__domElement, "textContent", w);
	            _element2.default.appendChild(t, a);
	        } else {
	            var attrs = g.attrs;
	            if ("virtual" === g.name) {
	                a = _virtualNode2.default.create(g.virtual);
	            } else if (g.custom) {
	                for (a = v.create(g.name), s = 0; s < attrs.length; s++) {
	                    l = f[s], l.updater ? l.updater(a, l.name, l.value) : a.__behavior.properties[l.name].type === Boolean ? a[l.name] = !0 : a[l.name] = l.value, l.exp && o.add(l.exp, a, l.name, l.updater);
	                }
	            } else {
	                for (a = _initialize2.default.wrap(document.importNode(g.prerendered, !1)), s = 0; s < attrs.length; s++) {
	                    l = attrs[s], o.add(l.exp, a.__domElement, l.name, l.updater);
	                }
	            }
	            _element2.default.appendChild(t, a);
	            g.id && (n[g.id] = a);
	            g.slot !== undefined && (i[g.slot] = a);
	            childrenAppend(g.children, a, n, i, o);
	        }
	    }
	}

	function child(e, t, n, i, o) {
	    for (var r = null, s = 0, l = null, c = 0; c < e.length; c++) {
	        var d = e[c];
	        if (void 0 === d.name) {
	            r = document.createTextNode(d.text);
	            d.exp && o.add(d.exp, r, "textContent", w);
	            t.appendChild(r);
	        } else {
	            var u = d.attrs;
	            for (r = document.importNode(d.prerendered, false), s = 0; s < u.length; s++) {
	                l = u[s];
	                o.add(l.exp, r, l.name, l.updater);
	            }
	            t.appendChild(r);
	            d.id && (n[d.id] = r);
	            undefined !== d.slot && (i[d.slot] = r);
	            child(d.children, r, n, i, o);
	        }
	    }
	}
	var p = String.fromCharCode(36);
	var nodeAddHandle = function nodeAddHandle() {};
	nodeAddHandle.prototype = Object.create(Object.prototype, {
	    constructor: {
	        value: nodeAddHandle,
	        writable: true,
	        configurable: true
	    }
	});

	var compnentSystem = null;
	nodeAddHandle._setCompnentSystem = function (e) {
	    compnentSystem = e;
	};
	var native = function native() {
	    return {
	        renderingMode: "native",
	        keepWhiteSpace: false,
	        parseTextContent: false
	    };
	};
	nodeAddHandle._setGlobalOptionsGetter = function (e) {
	    native = e;
	};
	var b = function b(e, t, n) {
	    e[t] = n;
	};
	var A = function A(e, t, n) {
	    e.__domElement.classList.toggle(t, !!n);
	};
	var _ = function _(e, t, n) {
	    e.__domElement.style[t] = n;
	};

	var y = function y(e, t, n) {
	    if (n === !0) {
	        e.setAttribute(t, "");
	    } else {
	        if (n === false || undefined === n || null === n) {
	            e.removeAttribute(t);
	        } else {
	            e.setAttribute(t, n);
	        }
	    }
	};
	var x = function x(e, t, n) {
	    e.classList.toggle(t, !!n);
	};
	var cssFn = function cssFn(e, t, n) {
	    e.style[t] = n;
	};
	var slot = {
	    name: "virtual",
	    virtual: "slot",
	    slot: "",
	    attrs: [],
	    children: []
	};
	var virtual = {
	    name: "virtual",
	    slot: "",
	    attrs: [],
	    prerendered: document.createElement("virtual"),
	    children: []
	};
	nodeAddHandle.create = function (e, t, n, r) {
	    var a = native(),
	        renderingMode = r.renderingMode || a.renderingMode,
	        c = slot;
	    "native" === renderingMode && (c = virtual);
	    var d = attributeAdd(e.attributes),
	        u = {
	        parseTextContent: undefined !== d["parse-text-content"] || r.parseTextContent || a.parseTextContent,
	        keepWhiteSpace: undefined !== d["keep-white-space"] || r.keepWhiteSpace || a.keepWhiteSpace
	    },
	        content = e.content;
	    if ("TEMPLATE" !== e.tagName) {
	        for (content = document.createDocumentFragment(); e.childNodes.length;) {
	            content.appendChild(e.childNodes[0]);
	        }
	    }
	    var f = false;
	    var childNodeFn = function childNodeFn(e, o, r, a) {
	        for (var d = undefined, u = 0; u < o.length; u++) {
	            var h = o[u],
	                g = r.concat(e.length);
	            if (8 !== h.nodeType) {
	                if (3 !== h.nodeType) {
	                    if ("WX-CONTENT" !== h.tagName && "SLOT" !== h.tagName) {
	                        var custom = h.tagName.indexOf("-") >= 0 && "native" !== renderingMode,
	                            prerendered = null;
	                        custom || (prerendered = document.createElement(h.tagName));
	                        var id = "",
	                            attributes = h.attributes,
	                            attrs = [];
	                        if (attributes) {
	                            for (var I = {}, B = 0; B < attributes.length; B++) {
	                                var D = attributes[B];
	                                if ("id" === D.name) {
	                                    id = D.value;
	                                } else if ("parse-text-content" === D.name) {
	                                    I.parseTextContent = true;
	                                } else if ("keep-white-space" === D.name) {
	                                    I.keepWhiteSpace = true;
	                                } else {
	                                    d = undefined;
	                                    var P = undefined,
	                                        N = D.name;
	                                    D.name.slice(-1) === p ? custom ? (P = b, N = nameFn(D.name.slice(0, -1))) : (P = y, N = D.name.slice(0, -1)) : ":" === D.name.slice(-1) ? (P = custom ? b : w, N = nameFn(D.name.slice(0, -1))) : "class." === D.name.slice(0, 6) ? (P = custom ? A : x, N = D.name.slice(6)) : "style." === D.name.slice(0, 6) && (P = custom ? _ : cssFn, N = D.name.slice(6)), P && (d = _calculate2.default.parse(D.value, n));
	                                    var F = d ? d.calculate(null, t) : D.value;
	                                    custom || (P || y)(prerendered, N, F);
	                                    (custom || d) && attrs.push({
	                                        name: N,
	                                        value: F,
	                                        updater: P,
	                                        exp: d
	                                    });
	                                }
	                            }
	                            var elementNode = {
	                                name: h.tagName.toLowerCase(),
	                                id: id,
	                                custom: custom,
	                                attrs: attrs,
	                                prerendered: prerendered,
	                                children: []
	                            };
	                            e.push(elementNode);
	                            "VIRTUAL" === h.tagName && (elementNode.virtual = "virtual");
	                            h.childNodes && childNodeFn(elementNode.children, h.childNodes, g, I);
	                            1 === elementNode.children.length && elementNode.children[0] === c && (elementNode.children.pop(), elementNode.slot = "");
	                        }
	                    } else {
	                        f = true;
	                        e.push(c);
	                    }
	                } else {
	                    var M = h.textContent;
	                    if (!a.keepWhiteSpace) {
	                        if (M = M.trim(), "" === M) continue;
	                        h.textContent = M;
	                    }
	                    d = undefined;
	                    a.parseTextContent && (d = _calculate2.default.parse(M, n));
	                    e.push({
	                        exp: d,
	                        text: d ? d.calculate(null, t) : M
	                    });
	                }
	            }
	        }
	    };
	    var tagTree = [];
	    childNodeFn(tagTree, content.childNodes, [], u);
	    valueFn || tagTree.push(c);
	    1 === tagTree.length && tagTree[0] === c && tagTree.pop();
	    var T = Object.create(nodeAddHandle.prototype);
	    T._tagTreeRoot = tagTree;
	    T._renderingMode = renderingMode;
	    return T;
	};
	nodeAddHandle.prototype.createInstance = function () {
	    var e = Object.create(valueFn.prototype),
	        idMap = Object.create(null),
	        slots = Object.create(null),
	        _binding = _bindedProp2.default.create(),
	        shadowRoot = document.createDocumentFragment();
	    if ("native" === this._renderingMode) {
	        child(this._tagTreeRoot, shadowRoot, idMap, slots, _binding);
	    } else {
	        shadowRoot = _virtualNode2.default.create("shadow-root");
	        childrenAppend(this._tagTreeRoot, shadowRoot, idMap, slots, _binding);
	    }

	    e.shadowRoot = shadowRoot;
	    e.idMap = idMap;
	    e.slots = slots;
	    e._binding = _binding;
	    return e;
	};
	valueFn.prototype.updateValues = function (e, t, n) {
	    n && this._binding.update(e, t, n);
	};
	exports.default = nodeAddHandle;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var bindedProps = function bindedProps() {};
	bindedProps.prototype = Object.create(Object.prototype, {
	    constructor: {
	        value: bindedProps,
	        writable: true,
	        configurable: true
	    }
	});
	bindedProps.create = function () {
	    var e = Object.create(bindedProps.prototype);
	    e._bindings = Object.create(null);
	    return e;
	};
	bindedProps.prototype.add = function (exp, targetElem, targetProp, updateFunc) {
	    var o = {
	        exp: exp,
	        targetElem: targetElem,
	        targetProp: targetProp,
	        updateFunc: updateFunc
	    };
	    var bindings = this._bindings;
	    var bindedProps = exp.bindedProps;
	    for (var s = 0; s < bindedProps.length; s++) {
	        var l = bindedProps[s];
	        bindings[l] || (bindings[l] = []);
	        bindings[l].push(o);
	    }
	};
	bindedProps.prototype.update = function (e, t, n) {
	    var _binding = this._bindings[n];
	    if (_binding) {
	        for (var o = 0; o < _binding.length; o++) {
	            var r = _binding[o];
	            r.updateFunc(r.targetElem, r.targetProp, r.exp.calculate(e, t));
	        }
	    }
	};
	exports.default = bindedProps;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _viewUtil = __webpack_require__(1);

	var _viewUtil2 = _interopRequireDefault(_viewUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var calculate = function calculate() {};
	calculate.prototype = Object.create(Object.prototype, {
	    constructor: {
	        value: calculate,
	        writable: true,
	        configurable: true
	    }
	});
	calculate.parse = function (e, t) {
	    var n = Object.create(calculate.prototype);
	    var i = e.split(/\{\{(.*?)\}\}/g);
	    var r = [];
	    for (var a = 0; a < i.length; a++) {
	        if (a % 2) {
	            var s = i[a].match(/^(!?)([-_a-zA-Z0-9]+)(?:\((([-_a-zA-Z0-9]+)(,[-_a-zA-Z0-9]+)*)\))?$/) || [!1, ""],
	                l = null;
	            if (s[3]) {
	                l = s[3].split(",");
	                for (var c = 0; c < l.length; c++) {
	                    r.indexOf(l[c]) < 0 && r.push(l[c]);
	                }
	            } else {
	                r.indexOf(s[2]) < 0 && r.push(s[2]);
	            }
	            i[a] = {
	                not: !!s[1],
	                prop: s[2],
	                callee: l
	            };
	        }
	    }
	    n.bindedProps = r;
	    n.isSingleVariable = 3 === i.length && "" === i[0] && "" === i[2];
	    n._slices = i;
	    n._methods = t;
	    return n;
	};
	var safeCallback = function safeCallback(e, t, n, o) {
	    var r = "";
	    if (o.callee) {
	        for (var a = [], s = 0; s < o.callee.length; s++) {
	            a[s] = t[o.callee[s]];
	        }
	        r = _viewUtil2.default.safeCallback("Template Method", n[o.prop], e, a);
	        undefined !== r && null !== r || (r = "");
	    } else {
	        r = t[o.prop];
	    }
	    if (o.not) {
	        return !r;
	    } else {
	        return r;
	    }
	};
	calculate.prototype.calculate = function (e, t) {
	    var n = this._slices,
	        i = null,
	        o = "";
	    if (this.isSingleVariable) {
	        i = n[1];
	        o = safeCallback(e, t, this._methods, i);
	    } else {
	        for (var a = 0; a < n.length; a++) {
	            i = n[a];
	            o += a % 2 ? safeCallback(e, t, this._methods, i) : i;
	        }
	    }
	    return o;
	};
	exports.default = calculate;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _element = __webpack_require__(4);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialize = function initialize() {};
	initialize.prototype = Object.create(_element2.default.prototype, {
	    constructor: {
	        value: initialize,
	        writable: true,
	        configurable: true
	    }
	});
	initialize.wrap = function (e) {
	    var t = Object.create(initialize.prototype);
	    _element2.default.initialize(t);
	    t.__domElement = e;
	    e.__wxElement = t;
	    t.$$ = e;
	    return t;
	};
	exports.default = initialize;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _element = __webpack_require__(4);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var virtualNode = function virtualNode() {};
	virtualNode.prototype = Object.create(_element2.default.prototype, {
	    constructor: {
	        value: virtualNode,
	        writable: true,
	        configurable: true
	    }
	});
	virtualNode.create = function (e) {
	    var t = Object.create(virtualNode.prototype);
	    t.__virtual = true;
	    t.is = e;
	    _element2.default.initialize(t, null);
	    return t;
	};
	exports.default = virtualNode;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _observer = __webpack_require__(5);

	var _observer2 = _interopRequireDefault(_observer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var textNode = function textNode() {};
	textNode.prototype = Object.create(Object.prototype, {
	    constructor: {
	        value: textNode,
	        writable: true,
	        configurable: true
	    }
	});
	textNode.create = function (e) {
	    var t = Object.create(textNode.prototype);
	    t.$$ = t.__domElement = document.createTextNode(e || "");
	    t.__domElement.__wxElement = t;
	    t.__subtreeObserversCount = 0;
	    t.parentNode = null;
	    return t;
	};
	Object.defineProperty(textNode.prototype, "textContent", {
	    get: function get() {
	        return this.__domElement.textContent;
	    },
	    set: function set(e) {
	        this.__domElement.textContent = e;
	        (this.__textObservers && !this.__textObservers.empty || this.__subtreeObserversCount) && _observer2.default._callObservers(this, "__textObservers", {
	            type: "characterData",
	            target: this
	        });
	    }
	});
	exports.default = textNode;

/***/ }
/******/ ]);
function _toArray(e) {
  return Array.isArray(e) ? e : Array.from(e)
}

function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
    return n
  }
  return Array.from(e)
}

function _defineProperty(e, t, n) {//重写e[t]值为n
  return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
  };

var _slicedToArray = function () {
  function e(e, t) {
    var n = [],
      i = !0,
      o = !1,
      r = void 0;
    try {
      for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); i = !0);
    } catch (e) {
      o = !0, r = e
    } finally {
      try {
        !i && s.return && s.return()
      } finally {
        if (o) throw r
      }
    }
    return n
  }

  return function (t, n) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return e(t, n);
    throw new TypeError("Invalid attempt to destructure non-iterable instance")
  }
}()

//转发 window 上的 animation 和 transition 相关的动画事件到 exparser
!function (glob) {
  var t = function (e) {
      return {
        animationName: e.animationName,
        elapsedTime: e.elapsedTime
      }
    },
    n = null;
  const animationAPIList = ["webkitAnimationStart", "webkitAnimationIteration", "webkitAnimationEnd", "animationstart", "animationiteration", "animationend", "webkitTransitionEnd", "transitionend"]
  animationAPIList.forEach(function (i) {
    if (null === n && (n = "webkit" === i.slice(0, 6)), n) {
      if ("webkit" !== i.slice(0, 6)) return;
      i = i.slice(6).toLowerCase()
    } else if ("webkit" === i.slice(0, 6)) return;

    glob.addEventListener(i, function (e) {
      e.target.__wxElement && exparser.triggerEvent(e.target.__wxElement, i, t(e)), document.dispatchEvent(new CustomEvent("pageReRender", {}))
    }, !0)
  })
}(window)

//订阅并转发 WeixinJSBridge 提供的全局事件到 exparser
!function (glob) {
  function exeWhenWXJSbridgeReady(e) {
    "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
  }

  exeWhenWXJSbridgeReady(function () {
    WeixinJSBridge.subscribe("onAppRouteDone", function () {
      window.__onAppRouteDone = !0, exparser.triggerEvent(document, "routeDone", {}, {
        bubbles: !0
      }), document.dispatchEvent(new CustomEvent("pageReRender", {}))
    })
    WeixinJSBridge.subscribe("setKeyboardValue", function (e) {
      e && e.data && exparser.triggerEvent(document, "setKeyboardValue", {
        value: e.data.value,
        cursor: e.data.cursor,
        inputId: e.data.inputId
      }, {
        bubbles: !0
      })
    })
    WeixinJSBridge.subscribe("hideKeyboard", function (e) {
      exparser.triggerEvent(document, "hideKeyboard", {}, {
        bubbles: !0
      })
    })
    WeixinJSBridge.on("onKeyboardComplete", function (e) {
      exparser.triggerEvent(document, "onKeyboardComplete", {
        value: e.value,
        inputId: e.inputId
      }, {
        bubbles: !0
      })
    })
    WeixinJSBridge.on("onKeyboardConfirm", function (e) {
      exparser.triggerEvent(document, "onKeyboardConfirm", {
        value: e.value,
        inputId: e.inputId
      }, {
        bubbles: !0
      })
    })
    WeixinJSBridge.on("onTextAreaHeightChange", function (e) {
      exparser.triggerEvent(document, "onTextAreaHeightChange", {
        height: e.height,
        lineCount: e.lineCount,
        inputId: e.inputId
      }, {
        bubbles: !0
      })
    })
    WeixinJSBridge.on("onKeyboardShow", function (e) {
      exparser.triggerEvent(document, "onKeyboardShow", {
        inputId: e.inputId
      }, {
        bubbles: !0
      })
    })
  })
}(window)

// 转发 window 上的 error 以及各种表单事件到 exparser
!function (global) {
  exparser.globalOptions.renderingMode = "native"

  global.addEventListener("change", function (e) {
    exparser.triggerEvent(e.target, "change", {
      value: e.target.value
    })
  }, !0)

  global.addEventListener("input", function (e) {
    exparser.triggerEvent(e.target, "input")
  }, !0)

  global.addEventListener("load", function (e) {
    exparser.triggerEvent(e.target, "load")
  }, !0)

  global.addEventListener("error", function (e) {
    exparser.triggerEvent(e.target, "error")
  }, !0)

  global.addEventListener("focus", function (e) {
    exparser.triggerEvent(e.target, "focus"), e.preventDefault()
  }, !0)

  global.addEventListener("blur", function (e) {
    exparser.triggerEvent(e.target, "blur")
  }, !0)

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, window.requestAnimationFrame || (window.requestAnimationFrame = function (func) {
    "function" == typeof func && setTimeout(function () {
      func()
    }, 17)
  })
}(window)


// touch events
!function (global) {
  function excuteOnBridgeReady(e) {
    "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
  }

  var triggerTouchEvent = function (originalEvent, eventName, data) {
      exparser.triggerEvent(originalEvent.target, eventName, data, {
        originalEvent: originalEvent,
        bubbles: !0,
        composed: !0,
        extraFields: {
          touches: originalEvent.touches,
          changedTouches: originalEvent.changedTouches
        }
      })
    },
    touchEps = 10,
    longTapEps = 350,
    scrollEps = 50,
    packageTouchInfo = function (event, touching) {
      event[touching ? "changedTouches" : "touches"] = [{
        identifier: 0,
        pageX: event.pageX,
        pageY: event.pageY,
        clientX: event.clientX,
        clientY: event.clientY,
        screenX: event.screenX,
        screenY: event.screenY,
        target: event.target
      }]
      return event
    },
    mouseMoving = !1,
    touchTimeStamp = 0,
    touchStartX = 0,
    touchStartY = 0,
    originalEvent = 0,
    tapTimer = null,
    p = !1,
    isInScrollableContainer = function (target) {
      for (; target; target = target.parentNode) {
        var t = target.__wxElem || target;
        if (t.__wxScrolling && Date.now() - t.__wxScrolling < scrollEps) return !0
      }
      return !1
    },
    triggerLongTap = function () {
      triggerTouchEvent(originalEvent, "longtap", {
        x: touchStartX,
        y: touchStartY
      })
    },
    handleTap = function (event, pageX, pageY) {
      if (!touchTimeStamp) {
        touchTimeStamp = event.timeStamp
        touchStartX = pageX
        touchStartY = pageY
        if (isInScrollableContainer(event.target)) {
          tapTimer = null
          p = !0
          triggerTouchEvent(event, "canceltap", {
            x: pageX,
            y: pageY
          })
        } else {
          tapTimer = setTimeout(triggerLongTap, longTapEps)
          p = !1
          originalEvent = event
          event.defaultPrevented && (touchTimeStamp = 0)
        }
      }
    },
    handleLongTap = function (event, pagex, pagey) {
      if (touchTimeStamp) {
        if (Math.abs(pagex - touchStartX) < touchEps) {
          if (!(Math.abs(pagey - touchStartY) < touchEps)) {
            tapTimer && (clearTimeout(tapTimer), tapTimer = null)
            p = !0
            triggerTouchEvent(originalEvent, "canceltap", {
              x: pagex,
              y: pagey
            })
          }
        }
      }
    },
    resetValues = function (event, pageX, pageY, o) {
      if (touchTimeStamp) {
        touchTimeStamp = 0
        tapTimer && (clearTimeout(tapTimer), tapTimer = null)
        o && (event = originalEvent, pageX = touchStartX, pageY = touchStartY)
        o || p || (triggerTouchEvent(originalEvent, "tap", {
          x: pageX,
          y: pageY
        }), analyticsReportRecBuMingBaiGanMade(originalEvent))
      }
    };
  global.addEventListener("scroll", function (e) {
    e.target.__wxScrolling = Date.now()
  }, {
    capture: !0,
    passive: !1
  })

  global.addEventListener("touchstart", function (e) {
    mouseMoving = !0
    triggerTouchEvent(e, "touchstart")
    1 === e.touches.length && handleTap(e, e.touches[0].pageX, e.touches[0].pageY)
  }, {
    capture: !0,
    passive: !1
  })

  global.addEventListener("touchmove", function (event) {
    triggerTouchEvent(event, "touchmove")
    1 === event.touches.length && handleLongTap(event, event.touches[0].pageX, event.touches[0].pageY)
  }, {
    capture: !0,
    passive: !1
  })

  global.addEventListener("touchend", function (e) {
    triggerTouchEvent(e, "touchend")
    0 === e.touches.length && resetValues(e, e.changedTouches[0].pageX, e.changedTouches[0].pageY)
  }, {
    capture: !0,
    passive: !1
  })

  global.addEventListener("touchcancel", function (e) {
    triggerTouchEvent(e, "touchcancel")
    resetValues(null, 0, 0, !0)
  }, {
    capture: !0,
    passive: !1
  })

  global.addEventListener("blur", function () {
    resetValues(null, 0, 0, !0)
  })

  global.addEventListener("mousedown", function (e) {
    mouseMoving || touchTimeStamp || (packageTouchInfo(e, !1), triggerTouchEvent(e, "touchstart"), handleTap(e, e.pageX, e.pageY))
  }, {
    capture: !0,
    passive: !1
  })

  global.addEventListener("mousemove", function (e) {
    !mouseMoving && touchTimeStamp && (packageTouchInfo(e, !1), triggerTouchEvent(e, "touchmove"), handleLongTap(e, e.pageX, e.pageY))
  }, {
    capture: !0,
    passive: !1
  })

  global.addEventListener("mouseup", function (e) {
    !mouseMoving && touchTimeStamp && (packageTouchInfo(e, !0), triggerTouchEvent(e, "touchend"), resetValues(e, e.pageX, e.pageY))
  }, {
    capture: !0,
    passive: !1
  });

  var analyticEvent = {},
    analyticsReportRecBuMingBaiGanMade = function (originalEvent) {
      if (analyticEvent.selector) {
        for (var selector = analyticEvent.selector, oriTarget = originalEvent.target; oriTarget;) {
          if (oriTarget.tagName && 0 === oriTarget.tagName.indexOf("WX-")) {
            var classList = oriTarget.className.split(" ").map(function (e) {
              return "." + e
            });
            ["#" + oriTarget.id].concat(classList).forEach(function (sel) {
              selector.indexOf(sel) > -1 && analyticsReportBuMingBaiGanMade(oriTarget, sel)
            })
          }
          oriTarget = oriTarget.parentNode
        }
      }
    },
    analyticsReportBuMingBaiGanMade = function (oriTarget, sel) {
      for (var i = 0; i < analyticEvent.data.length; i++) {
        var data = analyticEvent.data[i];
        if (data.element === sel) {
          var tempData = {
            eventID: data.eventID,
            page: data.page,
            element: data.element,
            action: data.action,
            time: Date.now()
          };
          0 === sel.indexOf(".") && (tempData.index = Array.prototype.indexOf.call(document.body.querySelectorAll(data.element), oriTarget))
          excuteOnBridgeReady(function () {
            WeixinJSBridge.publish("analyticsReport", {
              data: tempData
            })
          });
          break
        }
      }
    };

  excuteOnBridgeReady(function () {
    WeixinJSBridge.subscribe("analyticsConfig", function (event) {
      if (Array.isArray(event.data)) {
        analyticEvent.data = event.data
        analyticEvent.selector = []
        analyticEvent.data.forEach(function (data) {
          data.element && analyticEvent.selector.push(data.element)
        })
      }
    })
  })
}(window)

// wx-base
window.exparser.registerBehavior({//使用 exparser.registerBehavior 和exparser.registerElement 方法注册各种以 wx- 做为标签开头的元素到 exparser
  is: "wx-base",
  properties: {
    id: {
      type: String,
      public: !0
    },
    hidden: {
      type: Boolean,
      public: !0
    }
  },
  _isDevTools: function () {
    return /wechatdevtools/.test(window.navigator.userAgent.toLowerCase())
  },
  debounce: function (id, func, wait) {
    var _this = this;
    this.__debouncers = this.__debouncers || {}
    this.__debouncers[id] && clearTimeout(this.__debouncers[id])
    this.__debouncers[id] = setTimeout(function () {
      "function" == typeof func && func()
      _this.__debouncers[id] = void 0
    }, wait)
  }
})

// wx-data-component
window.exparser.registerBehavior({
  is: "wx-data-component",
  properties: {
    name: {
      type: String,
      public: !0
    }
  },
  getFormData: function () {
    return this.value || ""
  },
  resetFormData: function () {
  }
})

// wx-disabled
window.exparser.registerBehavior({
  is: "wx-disabled",
  properties: {
    disabled: {
      type: Boolean,
      value: !1,
      public: !0
    }
  }
})

// wx-group
window.exparser.registerBehavior({
  is: "wx-group",
  listeners: {
    "this.wxItemValueChanged": "_handleItemValueChanged",
    "this.wxItemCheckedChanged": "_handleItemCheckedChanged",
    "this.wxItemAdded": "_handleItemAdded",
    "this.wxItemRemoved": "_handleItemRemoved",
    "this.wxItemChangedByTap": "_handleChangedByTap"
  },
  _handleItemValueChanged: function (e) {
    this.renameItem(e.detail.item, e.detail.newVal, e.detail.oldVal)
  },
  _handleItemCheckedChanged: function (e) {
    this.changed(e.detail.item)
  },
  _handleItemAdded: function (e) {
    return e.detail.item._relatedGroup = this, this.addItem(e.detail.item), !1
  },
  _handleItemRemoved: function (e) {
    return this.removeItem(e.detail.item), !1
  },
  _handleChangedByTap: function () {
    this.triggerEvent("change", {
      value: this.value
    })
  },
  addItem: function () {
  },
  removeItem: function () {
  },
  renameItem: function () {
  },
  changed: function () {
  },
  resetFormData: function () {
    if (this.hasBehavior("wx-data-component")) {
      var e = function e(t) {
        t.childNodes.forEach(function (t) {
          if (t instanceof exparser.Element && !t.hasBehavior("wx-group")) return t.hasBehavior("wx-item") ? void t.resetFormData() : void e(t)
        })
      };
      e(this)
    }
  }
})

// wx-hover
window.exparser.registerBehavior({
  is: "wx-hover",
  properties: {
    hoverStartTime: {
      type: Number,
      value: 50,
      public: !0
    },
    hoverStayTime: {
      type: Number,
      value: 400,
      public: !0
    },
    hoverClass: {
      type: String,
      value: "",
      public: !0,
      observer: "_hoverClassChange"
    },
    hoverStyle: {
      type: String,
      value: "",
      public: !0
    },
    hover: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "_hoverChanged"
    }
  },
  attached: function () {
    this.hover && "none" != this.hoverStyle && "none" != this.hoverClass && (this.bindHover(), this._hoverClassChange(this.hoverClass))
  },
  isScrolling: function () {
    for (var e = this.$$; e; e = e.parentNode) {
      var t = e.__wxElem || e;
      if (t.__wxScrolling && Date.now() - t.__wxScrolling < 50) return !0
    }
    return !1
  },
  detached: function () {
    this.unbindHover()
  },
  _hoverChanged: function (e, t) {
    e ? this.bindHover() : this.unbindHover()
  },
  _hoverClassChange: function (e) {
    var t = e.split(/\s/);
    this._hoverClass = [];
    for (var n = 0; n < t.length; n++) t[n] && this._hoverClass.push(t[n])
  },
  bindHover: function () {
    this._hoverTouchStart = this.hoverTouchStart.bind(this), this._hoverTouchEnd = this.hoverTouchEnd.bind(this), this._hoverCancel = this.hoverCancel.bind(this), this._hoverTouchMove = this.hoverTouchMove.bind(this), this.$$.addEventListener("touchstart", this._hoverTouchStart), window.__DOMTree__.addListener("canceltap", this._hoverCancel), window.addEventListener("touchcancel", this._hoverCancel, !0), window.addEventListener("touchmove", this._hoverTouchMove, !0), window.addEventListener("touchend", this._hoverTouchEnd, !0)
  },
  unbindHover: function () {
    this.$$.removeEventListener("touchstart", this._hoverTouchStart), window.__DOMTree__.removeListener("canceltap", this._hoverCancel), window.removeEventListener("touchcancel", this._hoverCancel, !0), window.removeEventListener("touchmove", this._hoverTouchMove, !0), window.removeEventListener("touchend", this._hoverTouchEnd, !0)
  },
  hoverTouchMove: function (e) {
    this.hoverCancel()
  },
  hoverTouchStart: function (e) {
    var t = this;
    if (!this.isScrolling())
      if (this.__touch = !0, "none" == this.hoverStyle || "none" == this.hoverClass || this.disabled);
      else {
        if (e.touches.length > 1) return;
        window.__hoverElement__ && (window.__hoverElement__._hoverReset(), window.__hoverElement__ = void 0), this.__hoverStyleTimeId = setTimeout(function () {
          if (t.__hovering = !0, window.__hoverElement__ = t, t._hoverClass && t._hoverClass.length > 0)
            for (var e = 0; e < t._hoverClass.length; e++) t.$$.classList.add(t._hoverClass[e]);
          else t.$$.classList.add(t.is.replace("wx-", "") + "-hover");
          t.__touch || window.requestAnimationFrame(function () {
            clearTimeout(t.__hoverStayTimeId), t.__hoverStayTimeId = setTimeout(function () {
              t._hoverReset()
            }, t.hoverStayTime)
          })
        }, this.hoverStartTime)
      }
  },
  hoverTouchEnd: function () {
    var e = this;
    this.__touch = !1, this.__hovering && (clearTimeout(this.__hoverStayTimeId), window.requestAnimationFrame(function () {
      e.__hoverStayTimeId = setTimeout(function () {
        e._hoverReset()
      }, e.hoverStayTime)
    }))
  },
  hoverCancel: function () {
    this.__touch = !1, clearTimeout(this.__hoverStyleTimeId), this.__hoverStyleTimeId = void 0, this._hoverReset()
  },
  _hoverReset: function () {
    if (this.__hovering)
      if (this.__hovering = !1, window.__hoverElement__ = void 0, "none" == this.hoverStyle || "none" == this.hoverClass);
      else if (this._hoverClass && this._hoverClass.length > 0)
        for (var e = 0; e < this._hoverClass.length; e++) this.$$.classList.contains(this._hoverClass[e]) && this.$$.classList.remove(this._hoverClass[e]);
      else this.$$.classList.remove(this.is.replace("wx-", "") + "-hover")
  }
})

// wx-input-base
window.exparser.registerBehavior({
  is: "wx-input-base",
  properties: {
    focus: {
      type: Boolean,
      value: 0,
      coerce: "_focusChange",
      public: !0
    },
    autoFocus: {
      type: Boolean,
      value: !1,
      public: !0
    },
    placeholder: {
      type: String,
      value: "",
      observer: "_placeholderChange",
      public: !0
    },
    placeholderStyle: {
      type: String,
      value: "",
      public: !0
    },
    placeholderClass: {
      type: String,
      value: "",
      public: !0
    },
    value: {
      type: String,
      value: "",
      coerce: "defaultValueChange",
      public: !0
    },
    showValue: {
      type: String,
      value: ""
    },
    maxlength: {
      type: Number,
      value: 140,
      observer: "_maxlengthChanged",
      public: !0
    },
    type: {
      type: String,
      value: "text",
      public: !0
    },
    password: {
      type: Boolean,
      value: !1,
      public: !0
    },
    disabled: {
      type: Boolean,
      value: !1,
      public: !0
    },
    bindinput: {
      type: String,
      value: "",
      public: !0
    }
  },
  resetFormData: function () {
    this._keyboardShow && (this.__formResetCallback = !0, wx.hideKeyboard()), this.value = "", this.showValue = ""
  },
  getFormData: function (e) {
    this._keyboardShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
  },
  _formGetDataCallback: function () {
    "function" == typeof this.__formCallback && this.__formCallback(this.value), this.__formCallback = void 0
  },
  _focusChange: function (e) {
    return this._couldFocus(e), e
  },
  _couldFocus: function (e) {
    var t = this;
    !this._keyboardShow && this._attached && e && (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, window.requestAnimationFrame ? window.requestAnimationFrame(function () {
        t._inputFocus()
      }) : this._inputFocus())
  },
  _getPlaceholderClass: function (e) {
    return "input-placeholder " + e
  },
  _showValueFormate: function (e) {
    this.password || "password" == this.type ? this.showValue = e ? new Array(e.length + 1).join("●") : "" : this.showValue = e || ""
  },
  _maxlengthChanged: function (e, t) {
    var n = this.value.slice(0, e);
    n != this.value && (this.value = n)
  },
  _showValueChange: function (e) {
    return e
  },
  _placeholderChange: function () {
    this._checkPlaceholderStyle(this.value)
  }
})

// wx-item
window.exparser.registerBehavior({
  is: "wx-item",
  properties: {
    value: {
      type: String,
      public: !0,
      observer: "valueChange"
    },
    checked: {
      type: Boolean,
      value: !1,
      observer: "checkedChange",
      public: !0
    }
  },
  valueChange: function (e, t) {
    this._relatedGroup && this._relatedGroup.triggerEvent("wxItemValueChanged", {
      item: this,
      newVal: e,
      oldVal: t
    })
  },
  checkedChange: function (e, t) {
    e !== t && this._relatedGroup && this._relatedGroup.triggerEvent("wxItemCheckedChanged", {
      item: this
    })
  },
  changedByTap: function () {
    this._relatedGroup && this._relatedGroup.triggerEvent("wxItemChangedByTap")
  },
  attached: function () {
    this.triggerEvent("wxItemAdded", {
      item: this
    }, {
      bubbles: !0
    })
  },
  moved: function () {
    this._relatedGroup && (this._relatedGroup.triggerEvent("wxItemRemoved"), this._relatedGroup = null), this.triggerEvent("wxItemAdded", {
      item: this
    }, {
      bubbles: !0
    })
  },
  detached: function () {
    this._relatedGroup && (this._relatedGroup.triggerEvent("wxItemRemoved", {
      item: this
    }), this._relatedGroup = null)
  },
  resetFormData: function () {
    this.checked = !1
  }
})

// wx-label-target
window.exparser.registerBehavior({
  is: "wx-label-target",
  properties: {},
  handleLabelTap: function (e) {
  }
})

// wx-mask-behavior
window.exparser.registerBehavior({
  is: "wx-mask-behavior",
  properties: {
    mask: {
      type: Boolean,
      value: !1,
      public: !0
    }
  },
  _getMaskStyle: function (e) {
    return e ? "" : "background-color: transparent"
  }
})

// wx-native
window.exparser.registerBehavior({
  is: "wx-native",
  properties: {
    hidden: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "hiddenChanged"
    },
    _isReady: {
      type: Boolean,
      value: !1
    },
    _deferred: {
      type: Array,
      value: []
    },
    _isError: {
      type: Boolean,
      value: !1
    },
    _box: {
      type: Object,
      value: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    }
  },
  _isiOS: function () {
    var e = window.navigator.userAgent.toLowerCase();
    return !/wechatdevtools/.test(e) && /iphone/.test(e)
  },
  _isAndroid: function () {
    var e = window.navigator.userAgent.toLowerCase();
    return !/wechatdevtools/.test(e) && /android/.test(e)
  },
  _isMobile: function () {
    return this._isiOS() || this._isAndroid()
  },
  _getBox: function () {
    var e = this.$$.getBoundingClientRect(),
      t = {
        left: e.left + window.scrollX,
        top: e.top + window.scrollY,
        width: this.$$.offsetWidth,
        height: this.$$.offsetHeight
      };
    return t
  },
  _diff: function () {
    var e = this._getBox();
    for (var t in e)
      if (e[t] !== this._box[t]) return !0;
    return !1
  },
  _ready: function () {
    this._isReady = !0, this._deferred.forEach(function (e) {
      this[e.callback].apply(this, e.args)
    }, this), this._deferred = []
  },
  hiddenChanged: function (e, t) {
    if (!this._isError) return this._isReady ? void this._hiddenChanged(e, t) : void this._deferred.push({
        callback: "hiddenChanged",
        args: [e, t]
      })
  },
  _pageReRenderCallback: function () {
    this._isError || this._diff() && (this._box = this._getBox(), this._updatePosition())
  }
})

// wx-player
window.exparser.registerBehavior({
  is: "wx-player",
  isBackground: !1,
  properties: {
    src: {
      type: String,
      observer: "srcChanged",
      public: !0
    },
    poster: {
      type: String,
      observer: "posterChanged",
      public: !0
    },
    playing: {
      type: Boolean,
      value: !1
    },
    _buttonType: {
      type: String,
      value: "play"
    },
    _currentTime: {
      type: String,
      value: "00:00"
    },
    _duration: {
      type: String,
      value: "00:00"
    },
    isLive: {
      type: Boolean,
      value: !1
    }
  },
  _formatTime: function (e) {
    if (e === 1 / 0) return "00:00";
    var t = Math.floor(e / 3600),
      n = Math.floor((e - 3600 * t) / 60),
      i = e - 3600 * t - 60 * n;
    return 0 == t ? (n >= 10 ? n : "0" + n) + ":" + (i >= 10 ? i : "0" + i) : (t >= 10 ? t : "0" + t) + ":" + (n >= 10 ? n : "0" + n) + ":" + (i >= 10 ? i : "0" + i)
  },
  _publish: function (e, t) {
    this.triggerEvent(e, t)
  },
  attached: function () {
    var e = this,
      t = this.$.player,
      n = this,
      i = {};
    for (var o in MediaError) i[MediaError[o]] = o;
    t.onerror = function (e) {
      if (e.stopPropagation(), e.srcElement.error) {
        var t = e.srcElement.error.code;
        n._publish("error", {
          errMsg: i[t]
        })
      }
    }, t.onplay = function (e) {
      n.playing = !0, e.stopPropagation(), n._publish("play", {}), n._buttonType = "pause", "function" == typeof n.onPlay && n.onPlay(e)
    }, t.onpause = function (e) {
      n.playing = !1, e.stopPropagation(), n._publish("pause", {}), n._buttonType = "play", "function" == typeof n.onPause && n.onPause(e)
    }, t.onended = function (e) {
      n.playing = !1, e.stopPropagation(), n._publish("ended", {}), "function" == typeof n.onEnded && n.onEnded(e)
    }, "AUDIO" == t.tagName && (t.onratechange = function (e) {
      e.stopPropagation(), n._publish("ratechange", {
        playbackRate: t.playbackRate
      })
    });
    var r = 0;
    t.addEventListener("timeupdate", function (e) {
      e.stopPropagation(), Math.abs(t.currentTime - r) % t.duration >= 1 && (n._publish("timeupdate", {
        currentTime: t.currentTime,
        duration: t.duration
      }), r = 1e3 * t.currentTime), n._currentTime = n._formatTime(Math.floor(t.currentTime)), "function" == typeof n.onTimeUpdate && n.onTimeUpdate(e)
    }), t.addEventListener("durationchange", function () {
      t.duration === 1 / 0 ? e.isLive = !0 : e.isLive = !1, NaN !== t.duration && 0 === e.duration && (n._duration = n._formatTime(Math.floor(t.duration)))
    })
  }
})

// wx-touchtrack
exparser.registerBehavior({
  is: "wx-touchtrack",
  touchtrack: function (element, handlerName) {
    var that = this,
      startX = 0,
      startY = 0,
      r = 0,
      a = 0,
      handleEvent = function (event, state, x, y) {
        var res = that[handlerName].call(that, {
          target: event.target,
          currentTarget: event.currentTarget,
          preventDefault: event.preventDefault,
          stopPropagation: event.stopPropagation,
          detail: {
            state: state,
            x: x,
            y: y,
            dx: x - startX,
            dy: y - startY,
            ddx: x - r,
            ddy: y - a
          }
        });
        if (res === !1) return !1
      },
      originalEvent = null;
    exparser.addListenerToElement(element, "touchstart", function (event) {
      if (1 === event.touches.length && !originalEvent) {
        originalEvent = event
        startX = r = event.touches[0].pageX
        startY = a = event.touches[0].pageY
        return handleEvent(event, "start", startX, startY)
      }
    })
    exparser.addListenerToElement(element, "touchmove", function (e) {
      if (1 === e.touches.length && originalEvent) {
        var t = handleEvent(e, "move", e.touches[0].pageX, e.touches[0].pageY);
        r = e.touches[0].pageX
        a = e.touches[0].pageY
        return t
      }
    })
    exparser.addListenerToElement(element, "touchend", function (e) {
      if (0 === e.touches.length && originalEvent) return originalEvent = null, handleEvent(e, "end", e.changedTouches[0].pageX, e.changedTouches[0].pageY)
    })
    exparser.addListenerToElement(element, "touchcancel", function (e) {
      if (0 === e.touches.length && originalEvent) {
        var t = originalEvent;
        return originalEvent = null, handleEvent(e, "end", t.touches[0].pageX, t.touches[0].pageY)
      }
    })
  }
})

// wx-action-sheet
window.exparser.registerElement({
  is: "wx-action-sheet",
  template: '\n    <div class="wx-action-sheet-mask" id="mask" style.z-index="1000" style="display: none;"></div>\n    <div class="wx-action-sheet" class.wx-action-sheet-show="{{!hidden}}">\n      <div class="wx-action-sheet-menu">\n        <slot></slot>\n      </div>\n    </div>\n  ',
  behaviors: ["wx-base"],
  properties: {
    hidden: {
      type: Boolean,
      value: !0,
      observer: "hiddenChange",
      public: !0
    }
  },
  listeners: {
    "mask.tap": "hide",
    "this.actionSheetCancel": "cancel"
  },
  cancel: function (e) {
    return this.hide(), !1
  },
  hide: function () {
    this.triggerEvent("change")
  },
  hiddenChange: function (e) {
    var t = this.$.mask;
    if (e) {
      setTimeout(function () {
        t.style.display = "none"
      }, 300)
      t.style.backgroundColor = "rgba(0,0,0,0)"
    } else {
      t.style.display = "block"
      t.focus()
      t.style.backgroundColor = "rgba(0,0,0,0.6)"
    }
  }
})

// wx-action-sheet-cancel
window.exparser.registerElement({
  is: "wx-action-sheet-cancel",
  template: '\n    <div class="wx-action-sheet-middle" id="middle"></div>\n    <div class="wx-action-sheet-cancel" id="cancel">\n      <slot></slot>\n    </div>\n  ',
  properties: {},
  listeners: {
    "middle.tap": "handleMiddleTap",
    "cancel.tap": "handleCancelTap"
  },
  behaviors: ["wx-base"],
  handleMiddleTap: function (e) {
    return !1
  },
  handleCancelTap: function (e) {
    this.triggerEvent("actionSheetCancel", void 0, {
      bubbles: !0
    })
  }
})

// wx-action-sheet-item
window.exparser.registerElement({
  is: "wx-action-sheet-item",
  template: "\n    <slot></slot>\n  ",
  properties: {},
  behaviors: ["wx-base"]
})

// wx-audio
window.exparser.registerElement({
  is: "wx-audio",
  behaviors: ["wx-base", "wx-player"],
  template: '<audio id="player" loop$="{{loop}}" style="display: none;"></audio>\n  <div id="default" class="wx-audio-default" style="display: none;">\n    <div id="poster" class="wx-audio-left">\n      <div id="button" class$="wx-audio-button {{_buttonType}}"></div>\n    </div>\n    <div class="wx-audio-right">\n      <div class="wx-audio-time" parse-text-content>{{_currentTime}}</div>\n      <div class="wx-audio-info">\n        <div class="wx-audio-name" parse-text-content>{{name}}</div>\n        <div class="wx-audio-author" parse-text-content>{{author}}</div>\n      </div>\n    </div>\n  </div>\n  <div id="fakebutton"></div>',
  properties: {
    action: {
      type: Object,
      observer: "actionChanged",
      public: !0
    },
    name: {
      type: String,
      value: "未知歌曲",
      public: !0
    },
    author: {
      type: String,
      value: "未知作者",
      public: !0
    },
    loop: {
      type: Boolean,
      value: !1,
      public: !0
    },
    controls: {
      type: Boolean,
      value: !1,
      observer: "controlsChanged",
      public: !0
    },
    _srcTimer: {
      type: Number
    },
    _actionTimer: {
      type: Number
    },
    _canSrc: {
      type: Boolean,
      value: !0
    },
    _deferredSrc: {
      type: String,
      value: ""
    },
    _canAction: {
      type: Boolean,
      value: !1
    },
    _deferredAction: {
      type: Array,
      value: []
    }
  },
  _reset: function () {
    this._buttonType = "play", this._currentTime = "00:00", this._duration = "00:00"
  },
  _readySrc: function () {
    this._canSrc = !0
    this.srcChanged(this._deferredSrc)
    this._deferredSrc = ""
  },
  _readyAction: function () {
    var e = this;
    this._canAction = !0
    this._deferredAction.forEach(function (t) {
      e.actionChanged(t)
    }, this)
    this._deferredAction = []
  },
  srcChanged: function (e, t) {
    if (e) {
      clearTimeout(this._srcTimer), this._canAction = !1, this.$.player.src = e;
      var n = this;
      this._srcTimer = setTimeout(function () {
        n._reset(), n._readyAction()
      }, 0)
    }
  },
  posterChanged: function (e, t) {
    this.$.poster.style.backgroundImage = "url('" + e + "')"
  },
  controlsChanged: function (e, t) {
    this.$.default.style.display = e ? "" : "none"
  },
  actionChanged: function (e, t) {
    var n = this;
    if (e) {
      var i = e.method;
      if (this.action = e, !this._canAction && "setSrc" !== i) return void this._deferredAction.push(e);
      var o = null;
      if (null != (o = /^set([a-z|A-Z]*)/.exec(i))) {
        var r = o[1],
          a = e.data;
        r = r[0].toLowerCase() + r.slice(1), "currentTime" == r ? 0 === this.$.player.readyState || 1 === this.$.player.readyState ? !function () {
              var e = function e() {
                n.$.player[r] = a, n.$.player.removeEventListener("canplay", e, !1)
              };
              n.$.player.addEventListener("canplay", e, !1)
            }() : this.$.player[r] = a : "src" === r ? this.srcChanged(a) : this.triggerEvent("error", {
              errMsg: i + " is not an action"
            })
      } else if ("play" == i || "pause" == i) {
        if (this.isBackground === !0 && "play" === i) return;
        this.$.fakebutton.click()
      } else this.triggerEvent("error", {
        errMsg: i + " is not an action"
      });
      this.action = null
    }
  },
  attached: function () {
    var e = this,
      t = this.$.player,
      n = this;
    this.$.button.onclick = function (e) {
      e.stopPropagation(), n.action = {
        method: n._buttonType
      }
    }, this.$.fakebutton.onclick = function (e) {
      e.stopPropagation(), n.action && "function" == typeof t[n.action.method] && t[n.action.method]()
    }, WeixinJSBridge.subscribe("audio_" + this.id + "_actionChanged", function (t) {
      e.action = t
    }), WeixinJSBridge.publish("audioInsert", {
      audioId: this.id
    }), wx.onAppEnterBackground(function (t) {
      e.$.player.pause(), e.isBackground = !0
    }), wx.onAppEnterForeground(function (t) {
      e.isBackground = !1
    })
  }
})

// wx-button
window.exparser.registerElement({
  is: "wx-button",
  template: "\n    <slot></slot>\n  ",
  behaviors: ["wx-base", "wx-hover", "wx-label-target"],
  properties: {
    type: {
      type: String,
      value: "default",
      public: !0
    },
    size: {
      type: String,
      value: "default",
      public: !0
    },
    disabled: {
      type: Boolean,
      public: !0
    },
    plain: {
      type: Boolean,
      public: !0
    },
    loading: {
      type: Boolean,
      public: !0
    },
    formType: {
      type: String,
      public: !0
    },
    hover: {
      type: Boolean,
      value: !0
    }
  },
  listeners: {
    tap: "_preventTapOnDisabled",
    longtap: "_preventTapOnDisabled",
    canceltap: "_preventTapOnDisabled",
    "this.tap": "_onThisTap"
  },
  _preventTapOnDisabled: function () {
    if (this.disabled) return !1
  },
  _onThisTap: function () {
    "submit" === this.formType ? this.triggerEvent("formSubmit", void 0, {
        bubbles: !0
      }) : "reset" === this.formType && this.triggerEvent("formReset", void 0, {
        bubbles: !0
      })
  },
  handleLabelTap: function (e) {
    exparser.triggerEvent(this.shadowRoot, "tap", e.detail, {
      bubbles: !0,
      composed: !0,
      extraFields: {
        touches: e.touches,
        changedTouches: e.changedTouches
      }
    })
  }
});

var touchEventNames = ["touchstart", "touchmove", "touchend", "touchcancel", "longtap"],
  touchEventMap = {
    touchstart: "onTouchStart",
    touchmove: "onTouchMove",
    touchend: "onTouchEnd",
    touchcancel: "onTouchCancel",
    longtap: "onLongPress"
  },
  LONG_PRESS_TIME_THRESHOLD = 300,
  LONG_PRESS_DISTANCE_THRESHOLD = 5,
  format = function (e, t, n, i) {
    n = Array.prototype.slice.call(n);
    var o = e + "." + t + "(" + n.map(function (e) {
        return "string" == typeof e ? "'" + e + "'" : e
      }).join(", ") + ")";
    return i && (o = i + " = " + o), o
  },
  resolveColor = function (e) {
    var t = e.slice(0);
    return t[3] = t[3] / 255, "rgba(" + t.join(",") + ")"
  },
  getCanvasTouches = function (e) {
    var t = this;
    return [].concat(_toConsumableArray(e)).map(function (e) {
      return {
        identifier: e.identifier,
        x: e.pageX - t._box.left,
        y: e.pageY - t._box.top
      }
    })
  },
  calcDistance = function (e, t) {
    var n = e.x - t.x,
      i = e.y - t.y;
    return n * n + i * i
  };

// wx-canvas
window.exparser.registerElement({
  is: "wx-canvas",
  behaviors: ["wx-base", "wx-native"],
  template: '<canvas id="canvas" width="300" height="150"></canvas>',
  properties: {
    canvasId: {
      type: String,
      public: !0
    },
    bindtouchstart: {
      type: String,
      value: "",
      public: !0
    },
    bindtouchmove: {
      type: String,
      value: "",
      public: !0
    },
    bindtouchend: {
      type: String,
      value: "",
      public: !0
    },
    bindtouchcancel: {
      type: String,
      value: "",
      public: !0
    },
    bindlongtap: {
      type: String,
      value: "",
      public: !0
    },
    disableScroll: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "disableScrollChanged"
    }
  },
  _updatePosition: function () {
    this.$.canvas.width = this._box.width
    this.$.canvas.height = this._box.height
    this._isMobile() ? WeixinJSBridge.invoke("updateCanvas", {
        canvasId: this._canvasNumber,
        position: this._box
      }, function (e) {
      }) : this.actionsChanged(this.actions)
  },
  attached: function () {
    var that = this,
      t = (this.$.canvas, this);
    if (this._images = {}, this._box = this._getBox(), this.$.canvas.width = this.$$.offsetWidth, this.$.canvas.height = this.$$.offsetHeight, !this.canvasId) return this.triggerEvent("error", {
      errMsg: "canvas-id attribute is undefined"
    }), this._isError = !0, void(this.$$.style.display = "none");
    window.__canvasNumbers__ = window.__canvasNumbers__ || {};
    var n = window.__webviewId__ + "canvas" + this.canvasId;
    return window.__canvasNumbers__.hasOwnProperty(n) ? (this.triggerEvent("error", {
        errMsg: "canvas-id " + t.canvasId + " in this page has already existed"
      }), this._isError = !0, void(this.$$.style.display = "none")) : (window.__canvasNumber__ = window.__canvasNumber__ || 1e5, window.__canvasNumbers__[n] = window.__canvasNumber__ + __webviewId__, window.__canvasNumber__ += 1e5, this._canvasNumber = window.__canvasNumbers__[n], void(this._isMobile() ? !function () {
          t._isReady = !1;
          var n = {
              target: {
                target: that.$$.id,
                dataset: that.dataset,
                offsetTop: that.$$.offsetTop,
                offsetLeft: that.$$.offsetLeft
              },
              startTime: +new Date
            },
            i = !1;
          touchEventNames.forEach(function (t) {
            that["bind" + t] && (n[touchEventMap[t]] = that["bind" + t], i = !0)
          }), WeixinJSBridge.invoke("insertCanvas", {
            data: JSON.stringify({
              type: "canvas",
              webviewId: window.__webviewId__,
              canvasNumber: t._canvasNumber
            }),
            gesture: i,
            canvasId: t._canvasNumber,
            position: t._box,
            hide: that.hidden,
            disableScroll: that.disableScroll
          }, function (e) {
            WeixinJSBridge.publish("canvasInsert", {
              canvasId: t.canvasId,
              canvasNumber: t._canvasNumber,
              data: n
            }), t._ready(), document.addEventListener("pageReRender", t._pageReRenderCallback.bind(t))
          })
        }() : (WeixinJSBridge.publish("canvasInsert", {
          canvasId: t.canvasId,
          canvasNumber: t._canvasNumber
        }), WeixinJSBridge.subscribe("canvas" + t._canvasNumber + "actionsChanged", function (e) {
          var n = e.actions,
            i = e.reserve;
          t.actions = n, t.actionsChanged(n, i)
        }), WeixinJSBridge.subscribe("invokeCanvasToDataUrl_" + that._canvasNumber, function () {
          var t = that.$.canvas.toDataURL();
          WeixinJSBridge.publish("onCanvasToDataUrl_" + that._canvasNumber, {
            dataUrl: t
          })
        }), t._ready(), document.addEventListener("pageReRender", t._pageReRenderCallback.bind(t)), this.addTouchEventForWebview())))
  },
  detached: function () {
    var e = __webviewId__ + "canvas" + this.canvasId;
    delete window.__canvasNumbers__[e], this._isMobile() && WeixinJSBridge.invoke("removeCanvas", {
      canvasId: this._canvasNumber
    }, function (e) {
    }), WeixinJSBridge.publish("canvasRemove", {
      canvasId: this.canvasId,
      canvasNumber: this._canvasNumber
    })
  },
  addTouchEventForWebview: function () {
    var e = this;
    touchEventNames.forEach(function (t) {
      e.$$.addEventListener(t, function (n) {
        var i = getCanvasTouches.call(e, n.touches),
          o = getCanvasTouches.call(e, n.changedTouches);
        e.bindlongtap && (e._touchInfo = e._touchInfo || {}, e._disableScroll = e._disableScroll || 0, "touchstart" === t ? o.forEach(function (t) {
            e._touchInfo[t.identifier] = {}, e._touchInfo[t.identifier].x = t.x, e._touchInfo[t.identifier].y = t.y, e._touchInfo[t.identifier].timeStamp = n.timeStamp, e._touchInfo[t.identifier].handler = setTimeout(function () {
              if (e._touchInfo.hasOwnProperty(t.identifier)) {
                e._touchInfo[t.identifier].longPress = !0, ++e._disableScroll;
                var i = [],
                  o = [];
                for (var r in e._touchInfo) {
                  var a = {
                    identifier: r,
                    x: e._touchInfo[r].x,
                    y: e._touchInfo[r].y
                  };
                  i.push(a), r === String(t.identifier) && o.push(a)
                }
                wx.publishPageEvent(e.bindlongtap, {
                  type: "bindlongtap",
                  timeStamp: e._touchInfo[t.identifier].timeStamp + LONG_PRESS_TIME_THRESHOLD,
                  target: {
                    id: n.target.parentElement.id,
                    offsetLeft: n.target.offsetLeft,
                    offsetTop: n.target.offsetTop,
                    dataset: e.dataset
                  },
                  touches: i,
                  changedTouches: o
                })
              }
            }, LONG_PRESS_TIME_THRESHOLD)
          }) : "touchend" === t || "touchcancel" === t ? o.forEach(function (n) {
              e._touchInfo.hasOwnProperty(n.identifier) || console.error("in " + t + ", can not found " + n.identifier + " in " + JSON.stringify(e._touchInfo)), e._touchInfo[n.identifier].longPress && --e._disableScroll, clearTimeout(e._touchInfo[n.identifier].handler), delete e._touchInfo[n.identifier]
            }) : o.forEach(function (n) {
              e._touchInfo.hasOwnProperty(n.identifier) || console.error("in " + t + ", can not found " + n.identifier + " in " + JSON.stringify(e._touchInfo)), calcDistance(e._touchInfo[n.identifier], n) > LONG_PRESS_DISTANCE_THRESHOLD && !e._touchInfo[n.identifier].longPress && clearTimeout(e._touchInfo[n.identifier].handler), e._touchInfo[n.identifier].x = n.x, e._touchInfo[n.identifier].y = n.y
            })), e["bind" + t] && i.length + o.length > 0 && wx.publishPageEvent(e["bind" + t], {
          type: t,
          timeStamp: n.timeStamp,
          target: {
            id: n.target.parentElement.id,
            offsetLeft: n.target.offsetLeft,
            offsetTop: n.target.offsetTop,
            dataset: e.dataset
          },
          touches: i,
          changedTouches: o
        })
        (e.disableScroll || e._disableScroll) && (n.preventDefault(), n.stopPropagation())
      })
    })
  },
  actionsChanged: function (e) {
    var t = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1];
    if (!this._isMobile() && e) {
      var n = this.$.canvas,
        ctx = n.getContext("2d");
      if (t === !1) {
        ctx.fillStyle = "#000000"
        ctx.strokeStyle = "#000000"
        ctx.shadowColor = "#000000"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, n.width, n.height)
        e.forEach(function (e) {
          var t = this,
            n = e.method,
            o = e.data;
          if (/^set/.test(n)) {
            var r = n[3].toLowerCase() + n.slice(4),
              a = void 0;
            if ("fillStyle" === r || "strokeStyle" === r) {
              if ("normal" === o[0]) a = resolveColor(o[1]);
              else if ("linear" === o[0]) {
                var a = ctx.createLinearGradient.apply(ctx, o[1]);
                o[2].forEach(function (e) {
                  var t = e[0],
                    n = resolveColor(e[1]);
                  a.addColorStop(t, n)
                })
              } else if ("radial" === o[0]) {
                var s = o[1][0],
                  l = o[1][1],
                  c = o[1][2],
                  d = [s, l, 0, s, l, c],
                  a = ctx.createRadialGradient.apply(ctx, d);
                o[2].forEach(function (e) {
                  var t = e[0],
                    n = resolveColor(e[1]);
                  a.addColorStop(t, n)
                })
              }
              ctx[r] = a
            } else if ("globalAlpha" === r) ctx[r] = o[0] / 255;
            else if ("shadow" === r) {
              var u = ["shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor"];
              o.forEach(function (e, t) {
                "shadowColor" === u[t] ? ctx[u[t]] = resolveColor(e) : ctx[u[t]] = e
              })
            } else "fontSize" === r ? ctx.font = ctx.font.replace(/\d+\.?\d*px/, o[0] + "px") : ctx[r] = o[0]
          } else {
            if ("fillPath" === n || "strokePath" === n) {
              n = n.replace(/Path/, "")
              ctx.beginPath()
              o.forEach(function (e) {
                ctx[e.method].apply(ctx, e.data)
              })
              ctx[n]()
            } else {
              if ("fillText" === n) {
                ctx.fillText.apply(ctx, o)
              } else {
                if ("drawImage" === n) {
                  !function () {
                    var e = _toArray(o),
                      n = e[0],
                      r = e.slice(1);
                    t._images = t._images || {}
                    n = n.replace("wxfile://", "http://wxfile.open.weixin.qq.com/")

                    if (t._images[n]) {
                      ctx.drawImage.apply(ctx, [t._images[n]].concat(_toConsumableArray(r)))
                    } else {
                      t._images[n] = new Image
                      t._images[n].src = n
                      t._images[n].onload = function () {
                        ctx.drawImage.apply(ctx, [t._images[n]].concat(_toConsumableArray(r)))
                      }
                    }
                  }()
                } else {
                  ctx[n].apply(ctx, o)
                }
              }
            }
          }
        }, this)
      }
    }
  },
  _hiddenChanged: function (e, t) {
    this._isMobile() ? (this.$$.style.display = e ? "none" : "", WeixinJSBridge.invoke("updateCanvas", {
        canvasId: this._canvasNumber,
        hide: e
      }, function (e) {
      })) : this.$$.style.display = e ? "none" : ""
  },
  disableScrollChanged: function (e, t) {
    this._isMobile() && WeixinJSBridge.invoke("updateCanvas", {
      canvasId: this._canvasNumber,
      disableScroll: e
    }, function (e) {
    })
  }
})

// wx-checkbox
window.exparser.registerElement({
  is: "wx-checkbox",
  template: '\n    <div class="wx-checkbox-wrapper">\n      <div id="input" class="wx-checkbox-input" class.wx-checkbox-input-checked="{{checked}}" class.wx-checkbox-input-disabled="{{disabled}}" style.color="{{_getColor(checked,color)}}"></div>\n      <slot></slot>\n    </div>\n  ',
  behaviors: ["wx-base", "wx-label-target", "wx-item", "wx-disabled"],
  properties: {
    color: {
      type: String,
      value: "#09BB07",
      public: !0
    }
  },
  listeners: {
    tap: "_inputTap"
  },
  _getColor: function (e, t) {
    return e ? t : ""
  },
  _inputTap: function () {
    return !this.disabled && (this.checked = !this.checked, void this.changedByTap())
  },
  handleLabelTap: function () {
    this._inputTap()
  }
})

// wx-checkbox-group
window.exparser.registerElement({
  is: "wx-checkbox-group",
  template: "\n    <slot></slot>\n  ",
  behaviors: ["wx-base", "wx-data-component", "wx-group"],
  properties: {
    value: {
      type: Array,
      value: []
    }
  },
  addItem: function (e) {
    e.checked && this.value.push(e.value)
  },
  removeItem: function (e) {
    if (e.checked) {
      var t = this.value.indexOf(e.value);
      t >= 0 && this.value.splice(t, 1)
    }
  },
  renameItem: function (e, t, n) {
    if (e.checked) {
      var i = this.value.indexOf(n);
      i >= 0 && (this.value[i] = t)
    }
  },
  changed: function (e) {
    if (e.checked) this.value.push(e.value);
    else {
      var t = this.value.indexOf(e.value);
      t >= 0 && this.value.splice(t, 1)
    }
  }
});

var MAX_SIZE = 27,
  MIN_SIZE = 18,
  buttonTypes = {
    "default-dark": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABRCAYAAABBuPE1AAAAAXNSR0IArs4c6QAAA1tJREFUeAHtm89rE0EcxZttbA00ePBc8CLkEEMlNId69uKtWKt/gqRevcejeBNRj/aiKNibHpVST4GQ5gc9F/RYEaE1BNLG9y1ZSNXa3eyb7Ya8hWUmuztv5vuZN9nJTnZqSpsIiIAIiIAIiMB4EEiVSqXLnU7neb/fv4Umz41Hs09t5X4qlfqYyWTK1Wr1+6lXOTiRHkBcdaB9HpJzMMQqYrK678bZAG/gxDjrdF7XecTkIapxH87/6pjYYzKQ2ggEBJIA0SQEUiBJBEgycqRAkgiQZORIgSQRIMnIkQJJIkCSkSMFkkSAJCNHCiSJAElGjhRIEgGSjBxJApkm6SRaJp/P9x008CsW2p41m80nSPty5OiE57E29LhQKDw0CYEcHeRxScB8IJARIQ6KzwskB+SxioY2CaZACiSJAElGjhRIEgGSjBwpkCQCJBk5UiBJBEgycqRAkgiQZORIIsh9klaSZGKPybPXKZJEgNSWD77OwsLCop93mXr2TgpgvkMlsfeig8AshrfZbLbsax8eHq75eZdpKox40LUPdMwv6K61Wq1XYfTZ18KNNwDyM55iX2BrD+u12+2Ui8WvnXQ6fader+8MVxZ3HhCvAuJ71xD9uKgg4cT1mZmZcq1WM0fGvhWLxUtHR0dXer3ebey2KHUxrkZQQEYdykG/Ms6C0u12z7rE2XkGyEQMZWeEAgpHmpDbUJ6dnV087+/DgLE6vWwkR9pQxl7GvwzWnbZujMRDgQS8b4jtB+7K9+TCk70camhPT09fy+Vy1wXxJET7FGpC/ndxzhHWXZvTmvAqNiEP5cjwVUxOCYEk9bVACiSJAElGjhRIEgGSTFIc+YUUT+wy+JGyZZUmAiR+ry+jQW+w/4ydxIgVWluxv8YKw7JJJGJCPmIsIxXD5P8+ADwN+sDXJttBKkqEI4M0lHUNwLyE1k3seyxN05k4kBY01pI28eBlEc5s2mfGNpEgDdz29vYuQC4huyGQEQngeeoB3Lnied4jSEV6O2xiHen3AVzZB9AKHhGuIH/gHw+bTjxIH1ij0djAnXwJMHf9Y2FSgRyihTt6E8vJdhPatMNIPw2d/m9WIP/AgzX5PcC06dELgLS1cW1RCFQqFZksCkCVFQEREAEREIHEEvgNdubEHW4rptkAAAAASUVORK5CYII=",
    "default-light": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABRCAYAAABBuPE1AAAAAXNSR0IArs4c6QAAAsJJREFUeAHtm71KA0EUhbOijT8o6APY2FgoCFYW9nYK/pSWkvTaig9hrY2iYKmdIOgLWGgrqIUgIpKoIOh6RjMQgpid3bOb3cwZOEyMd86d++UmG3fdUklDBERABERABESgGAQCs80wDIcxbUNzUD9U5FHD5k+gchAET1kVYkEeIOFSVkkzynMIkMsZ5SpZkFUkLHonNjOrAeRA85Np/WxBhmklaKcvQP7Ul8UeurJI4kMOgSS9ygIpkCQCJBt1pECSCJBs1JECSSJAslFHCiSJAMlGHSmQJAIkG3WkQJIIkGzUkQJJIkCyUUcKpBsBXOBLY9zCdB36PRVvMrhtqxjRjZcaUq5xw5trNimDvBNI0ptLBxuBJBEg2agjBZJEgGSjjhRIEgGSjTpSIEkESDbqSIEkESDZqCMFkkSAZKOOJIM0dwJ02si0JtuR5naKThvHtiCci5y2j9Oau+vG5frcKffZGIi2JlNapV5ffiZzpjnieEXcart3jj3MQB8R9xw7zLnOiJmuEDfubE5egD2MQQ8R95wozHnrEbLtIKbX2Zi0ALkHoUloC3qHMhn2M5JRxhtMKrhytxPHzFQbZ11e1rBAXqOgRUA0s5fDfv1JUvwuFk/7DNHAS9KR5q1sbuU1IL0fcUDeg9oztOJ7FzZ2z88/CDQ+0eoxjglDiKkC4merWJffF/1g4wzSBY5LbNFBMg42Lrw6NlYgSS+tQAokiQDJRh0pkCQCJJs8deQFqaZ22JznCeQ8COxDL+0gETOn2eseZPbu38CX/zUo8llz/wg5VAyQs9Aj1HI42PoZCoKj0GUrkn7ScawaEPugo/9gOlr6Gw6IAbQJff0F1F8yMSsHxAWo1gwzpp3fywBxArpphOk3kQTVA+IIdFaHeZrASksBsQfahqZEIyEBQMzTX34Jq9FyERABERABERCBXwLfe8eGVVx752oAAAAASUVORK5CYII="
  };

// wx-contact-button
window.exparser.registerElement({
  is: "wx-contact-button",
  behaviors: ["wx-base", "wx-native"],
  template: '\n    <div id="wrapper" class="wx-contact-button-wrapper">\n    </div>\n  ',
  properties: _defineProperty({
    sessionFrom: {
      type: String,
      value: "",
      public: !0
    },
    type: {
      type: String,
      value: "default-dark",
      public: !0,
      observer: "typeChanged"
    },
    size: {
      type: Number,
      value: 36,
      public: !0,
      observer: "sizeChanged"
    }
  }, "sessionFrom", {
    type: String,
    value: "wxapp",
    public: !0
  }),
  attached: function () {
    var e = this;
    if (this._isMobile(), 1) {
      var t = void 0;
      t = buttonTypes[this.type] ? buttonTypes[this.type] : buttonTypes["default-dark"], this.$.wrapper.style.backgroundImage = "url('" + t + "')", this.$.wrapper.addEventListener("click", function () {
        e._isMobile() ? wx.enterContact({
            sessionFrom: e.sessionFrom,
            complete: function (e) {
              console.log(e)
            }
          }) : alert("进入客服会话，sessionFrom: " + e.sessionFrom)
      })
    } else this._box = this._getBox(), console.log("insertContactButton", this._box), wx.insertContactButton({
      position: this._box,
      buttonType: this.type,
      sessionFrom: this.sessionFrom,
      complete: function (t) {
        console.log("insertContactButton complete", t), e.contactButtonId = t.contactButtonId, document.addEventListener("pageReRender", e._pageReRender.bind(e), !1)
      }
    })
  },
  detached: function () {
    this._isMobile(), 1
  },
  sizeChanged: function (e, t) {
    this._box = this._getBox(), this.$.wrapper.style.width = this._box.width + "px", this.$.wrapper.style.height = this._box.height + "px", this._updateContactButton()
  },
  typeChanged: function (e, t) {
    if (this._isMobile(), 1) {
      var n = void 0;
      n = buttonTypes[this.type] ? buttonTypes[this.type] : buttonTypes["default-dark"], this.$.wrapper.style.backgroundImage = "url('" + n + "')"
    } else this._updateContactButton()
  },
  _updateContactButton: function () {
    this._isMobile(), 1
  },
  _getBox: function () {
    var e = this.$.wrapper.getBoundingClientRect(),
      t = this.size;
    "number" != typeof t && (t = MIN_SIZE), t = t > MAX_SIZE ? MAX_SIZE : t, t = t < MIN_SIZE ? MIN_SIZE : t;
    var n = {
      left: e.left + window.scrollX,
      top: e.top + window.scrollY,
      width: t,
      height: t
    };
    return n
  },
  _pageReRender: function () {
    this._updateContactButton()
  }
})

// wx-form
window.exparser.registerElement({
  is: "wx-form",
  template: '\n    <span id="wrapper"><slot></slot></span>\n  ',
  behaviors: ["wx-base"],
  properties: {
    reportSubmit: {
      type: Boolean,
      value: !1,
      public: !0
    }
  },
  listeners: {
    "this.formSubmit": "submitHandler",
    "this.formReset": "resetHandler"
  },
  resetDfs: function (e) {
    if (e.childNodes)
      for (var t = 0; t < e.childNodes.length; ++t) {
        var n = e.childNodes[t];
        n instanceof exparser.Element && (n.hasBehavior("wx-data-component") && n.resetFormData(), this.resetDfs(n))
      }
  },
  getFormData: function (e, t) {
    return e.name && e.hasBehavior("wx-data-component") ? "WX-INPUT" === e.__domElement.tagName || "WX-PICKER" === e.__domElement.tagName || "WX-TEXTAREA" === e.__domElement.tagName ? e.getFormData(function (e) {
          t(e)
        }) : t(e.getFormData()) : t()
  },
  asyncDfs: function (e, t) {
    var n = this,
      i = function () {
        "function" == typeof t && t(), t = void 0
      };
    if (!e.childNodes) return i();
    for (var o = e.childNodes.length, r = 0; r < e.childNodes.length; ++r) {
      var a = e.childNodes[r];
      a instanceof exparser.Element ? !function (e) {
          n.getFormData(e, function (t) {
            "undefined" != typeof t && (n._data[e.name] = t), n.asyncDfs(e, function () {
              0 == --o && i()
            })
          })
        }(a) : --o
    }
    0 == o && i()
  },
  submitHandler: function (e) {
    var t = this,
      n = {
        id: e.target.__domElement.id,
        dataset: e.target.dataset,
        offsetTop: e.target.__domElement.offsetTop,
        offsetLeft: e.target.__domElement.offsetLeft
      };
    return this._data = Object.create(null), this.asyncDfs(this, function () {
      t.reportSubmit ? t._isDevTools() ? t.triggerEvent("submit", {
            value: t._data,
            formId: "the formId is subscribe mock one",
            target: n
          }) : WeixinJSBridge.invoke("reportSubmitForm", {}, function (e) {
            t.triggerEvent("submit", {
              value: t._data,
              formId: e.formId,
              target: n
            })
          }) : t.triggerEvent("submit", {
          value: t._data,
          target: n
        })
    }), !1
  },
  resetHandler: function (e) {
    var t = {
      id: e.target.__domElement.id,
      dataset: e.target.dataset,
      offsetTop: e.target.__domElement.offsetTop,
      offsetLeft: e.target.__domElement.offsetLeft
    };
    return this._data = Object.create(null), this.resetDfs(this), this.triggerEvent("reset", {
      target: t
    }), !1
  }
})

// wx-icon
window.exparser.registerElement({
  is: "wx-icon",
  template: '<invoke class$="wx-icon-{{type}}" style.color="{{color}}" style.font-size="{{size}}px"></invoke>',
  behaviors: ["wx-base"],
  properties: {
    type: {
      type: String,
      public: !0
    },
    size: {
      type: Number,
      value: 23,
      public: !0
    },
    color: {
      type: String,
      public: !0
    }
  }
})

// wx-image
window.exparser.registerElement({
  is: "wx-image",
  template: '<div id="div"></div>',
  behaviors: ["wx-base"],
  properties: {
    src: {
      type: String,
      observer: "srcChanged",
      public: !0
    },
    mode: {
      type: String,
      observer: "modeChanged",
      public: !0
    },
    _disableSizePositionRepeat: {
      type: Boolean,
      value: !1
    },
    backgroundSize: {
      type: String,
      observer: "backgroundSizeChanged",
      value: "100% 100%",
      public: !0
    },
    backgroundPosition: {
      type: String,
      observer: "backgroundPositionChanged",
      public: !0
    },
    backgroundRepeat: {
      type: String,
      observer: "backgroundRepeatChanged",
      value: "no-repeat",
      public: !0
    },
    _img: {
      type: Object
    }
  },
  _publishError: function (e) {
    this.triggerEvent("error", e)
  },
  _ready: function () {
    if (!(this._img && this._img instanceof Image)) {
      this._img = new Image;
      var e = this;
      this._img.onerror = function (t) {
        t.stopPropagation();
        var n = {
          errMsg: "GET " + e._img.src + " 404 (Not Found)"
        };
        e._publishError(n)
      }, this._img.onload = function (t) {
        t.stopPropagation(), e.triggerEvent("load", {
          width: this.width,
          height: this.height
        }), "widthFix" === e.mode && (e.rate = this.width / this.height, e.$$.style.height = e.$$.offsetWidth / e.rate + "px")
      }, document.addEventListener("pageReRender", this._pageReRenderCallback.bind(this))
    }
  },
  attached: function () {
    this._ready(), this.backgroundSizeChanged(this.backgroundSize), this.backgroundRepeatChanged(this.backgroundRepeat)
  },
  detached: function () {
    document.removeEventListener("pageReRender", this._pageReRenderCallback.bind(this))
  },
  _pageReRenderCallback: function () {
    "widthFix" === this.mode && "undefined" != typeof this.rate && (this.$$.style.height = this.$$.offsetWidth / this.rate + "px")
  },
  _srcChanged: function (e) {
    this._img.src = e, this.$.div.style.backgroundImage = "url('" + e + "')"
  },
  srcChanged: function (e, t) {
    if (e) {
      var n = (this.$.div, window.navigator.userAgent.toLowerCase()),
        i = this;
      this._ready();
      var o = {
        success: function (e) {
          i._srcChanged(e.localData)
        },
        fail: function (e) {
          i._publishError(e)
        }
      };
      !/wechatdevtools/.test(n) && /iphone/.test(n) ? /^(http|https):\/\//.test(e) || /^\s*data:image\//.test(e) ? this._srcChanged(e) : /^wxfile:\/\//.test(e) ? (o.filePath = e, wx.getLocalImgData(o)) : (o.path = e, wx.getLocalImgData(o)) : !/wechatdevtools/.test(n) && /android/.test(n) ? /^wxfile:\/\//.test(e) || /^(http|https):\/\//.test(e) || /^\s*data:image\//.test(e) ? this._srcChanged(e) : wx.getCurrentRoute({
              success: function (t) {
                var n = wx.getRealRoute(t.route, e);
                i._srcChanged(n)
              }
            }) : this._srcChanged(e.replace("wxfile://", "http://wxfile.open.weixin.qq.com/"))
    }
  },
  _checkMode: function (e) {
    for (var t = ["scaleToFill", "aspectFit", "aspectFill", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right"], n = !1, i = 0; i < t.length; i++)
      if (e == t[i]) {
        n = !0;
        break
      }
    return n
  },
  modeChanged: function (e, t) {
    if (!this._checkMode(e)) return void(this._disableSizePositionRepeat = !1);
    switch (this._disableSizePositionRepeat = !0, this.$.div.style.backgroundSize = "auto auto", this.$.div.style.backgroundPosition = "0% 0%", this.$.div.style.backgroundRepeat = "no-repeat", e) {
      case "scaleToFill":
        this.$.div.style.backgroundSize = "100% 100%";
        break;
      case "aspectFit":
        this.$.div.style.backgroundSize = "contain", this.$.div.style.backgroundPosition = "center center";
        break;
      case "aspectFill":
        this.$.div.style.backgroundSize = "cover", this.$.div.style.backgroundPosition = "center center";
        break;
      case "widthFix":
        this.$.div.style.backgroundSize = "100% 100%";
        break;
      case "top":
        this.$.div.style.backgroundPosition = "top center";
        break;
      case "bottom":
        this.$.div.style.backgroundPosition = "bottom center";
        break;
      case "center":
        this.$.div.style.backgroundPosition = "center center";
        break;
      case "left":
        this.$.div.style.backgroundPosition = "center left";
        break;
      case "right":
        this.$.div.style.backgroundPosition = "center right";
        break;
      case "top left":
        this.$.div.style.backgroundPosition = "top left";
        break;
      case "top right":
        this.$.div.style.backgroundPosition = "top right";
        break;
      case "bottom left":
        this.$.div.style.backgroundPosition = "bottom left";
        break;
      case "bottom right":
        this.$.div.style.backgroundPosition = "bottom right"
    }
  },
  backgroundSizeChanged: function (e, t) {
    this._disableSizePositionRepeat || (this.$.div.style.backgroundSize = e)
  },
  backgroundPositionChanged: function (e, t) {
    this._disableSizePositionRepeat || (this.$.div.style.backgroundPosition = e)
  },
  backgroundRepeatChanged: function (e, t) {
    this._disableSizePositionRepeat || (this.$.div.style.backgroundRepeat = e)
  }
})

// wx-input if in wechatdevtools
!function () {
  /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) && window.exparser.registerElement({
    is: "wx-input",
    template: '\n      <div id="wrapper" disabled$="{{disabled}}">\n        <input id="input" type$="{{_getType(type,password)}}" maxlength$="{{maxlength}}" value$="{{showValue}}" disabled$="{{disabled}}" >\n        <div id="placeholder" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{_getPlaceholderStyle(placeholderStyle)}}" parse-text-content>{{placeholder}}</diffProps>\n      </div>\n      ',
    behaviors: ["wx-base", "wx-data-component"],
    properties: {
      focus: {
        type: Boolean,
        value: 0,
        coerce: "_focusChange",
        public: !0
      },
      autoFocus: {
        type: Boolean,
        value: !1,
        public: !0
      },
      placeholder: {
        type: String,
        value: "",
        observer: "_placeholderChange",
        public: !0
      },
      placeholderStyle: {
        type: String,
        value: "",
        public: !0
      },
      placeholderClass: {
        type: String,
        value: "",
        public: !0,
        observer: "_placeholderClassChange"
      },
      value: {
        type: String,
        value: "",
        coerce: "defaultValueChange",
        public: !0
      },
      showValue: {
        type: String,
        value: ""
      },
      maxlength: {
        type: Number,
        value: 140,
        observer: "_maxlengthChanged",
        public: !0
      },
      type: {
        type: String,
        value: "text",
        public: !0
      },
      password: {
        type: Boolean,
        value: !1,
        public: !0
      },
      disabled: {
        type: Boolean,
        value: !1,
        public: !0
      },
      bindinput: {
        type: String,
        value: "",
        public: !0
      },
      confirmHold: {
        type: Boolean,
        value: !1,
        public: !0
      }
    },
    listeners: {
      tap: "_inputFocus",
      "input.focus": "_inputFocus",
      "input.blur": "_inputBlur",
      "input.input": "_inputKey"
    },
    resetFormData: function () {
      this._keyboardShow && (this.__formResetCallback = !0, wx.hideKeyboard()), this.value = "", this.showValue = ""
    },
    getFormData: function (e) {
      this._keyboardShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
    },
    _formGetDataCallback: function () {
      "function" == typeof this.__formCallback && this.__formCallback(this.value), this.__formCallback = void 0
    },
    _focusChange: function (e) {
      return this._couldFocus(e), e
    },
    _couldFocus: function (e) {
      var t = this;
      this._attached && (!this._keyboardShow && e ? window.requestAnimationFrame(function () {
          t._inputFocus()
        }) : this._keyboardShow && !e && this.$.input.blur())
    },
    _getPlaceholderClass: function (e) {
      return "input-placeholder " + e
    },
    _maxlengthChanged: function (e, t) {
      var n = this.value.slice(0, e);
      n != this.value && (this.value = n)
    },
    _placeholderChange: function () {
      this._checkPlaceholderStyle(this.value)
    },
    attached: function () {
      var e = this;
      this._placeholderClassChange(this.placeholderClass), this._checkPlaceholderStyle(this.value), this._attached = !0, this._value = this.value, this.updateInput(), window.__onAppRouteDone && this._couldFocus(this.autoFocus || this.focus), this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function () {
        e._couldFocus(e.autoFocus || e.focus)
      }), this.__setKeyboardValueId = exparser.addListenerToElement(document, "setKeyboardValue", function (t) {
        if (e._keyboardShow) {
          var n = t.detail.value,
            i = t.detail.cursor;
          "undefined" != typeof n && (e._value = n, e.value = n), "undefined" != typeof i && i != -1 && e.$.input.setSelectionRange(i, i)
        }
      }), this.__hideKeyboardId = exparser.addListenerToElement(document, "hideKeyboard", function (t) {
        e._keyboardShow && e.$.input.blur()
      }), this.__onDocumentTouchStart = this.onDocumentTouchStart.bind(this), this.__updateInput = this.updateInput.bind(this), this.__inputKeyUp = this._inputKeyUp.bind(this), this.$.input.addEventListener("keyup", this.__inputKeyUp), document.addEventListener("touchstart", this.__onDocumentTouchStart), document.addEventListener("pageReRender", this.__updateInput), (this.autoFocus || this.focus) && setTimeout(function () {
        e._couldFocus(e.autoFocus || e.focus)
      }, 500)
    },
    detached: function () {
      document.removeEventListener("pageReRender", this.__updateInput), document.removeEventListener("touchstart", this.__onDocumentTouchStart), this.$.input.removeEventListener("keyup", this.__inputKeyUp), exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId), exparser.removeListenerFromElement(document, "hideKeyboard", this.__hideKeyboardId), exparser.removeListenerFromElement(document, "onKeyboardComplete", this.__onKeyboardCompleteId), exparser.removeListenerFromElement(document, "setKeyboardValue", this.__setKeyboardValueId)
    },
    onDocumentTouchStart: function () {
      this._keyboardShow && this.$.input.blur()
    },
    _getType: function (e, t) {
      return t || "password" == e ? "password" : "text"
    },
    _showValueChange: function (e) {
      this.$.input.value = e
    },
    _inputFocus: function (e) {
      this.disabled || this._keyboardShow || (this._keyboardShow = !0, this.triggerEvent("focus", {
        value: this.value
      }), this.$.input.focus())
    },
    _inputBlur: function (e) {
      this._keyboardShow = !1, this.value = this._value, this._formGetDataCallback(), this.triggerEvent("change", {
        value: this.value
      }), this.triggerEvent("blur", {
        value: this.value
      }), this._checkPlaceholderStyle(this.value)
    },
    _inputKeyUp: function (e) {
      if (13 == e.keyCode) return this.triggerEvent("confirm", {
        value: this._value
      }), void(this.confirmHold || (this.value = this._value, this.$.input.blur()))
    },
    _inputKey: function (e) {
      var t = e.target.value;
      if (this._value = t, this._checkPlaceholderStyle(t), this.bindinput) {
        var n = {
          id: this.$$.id,
          dataset: this.dataset,
          offsetTop: this.$$.offsetTop,
          offsetLeft: this.$$.offsetLeft
        };
        WeixinJSBridge.publish("SPECIAL_PAGE_EVENT", {
          eventName: this.bindinput,
          data: {
            ext: {
              setKeyboardValue: !0
            },
            data: {
              type: "input",
              timestamp: Date.now(),
              detail: {
                value: e.target.value,
                cursor: this.$.input.selectionStart
              },
              target: n,
              currentTarget: n,
              touches: []
            },
            eventName: this.bindinput
          }
        })
      }
      return !1
    },
    updateInput: function () {
      var e = window.getComputedStyle(this.$$),
        t = this.$$.getBoundingClientRect(),
        n = (["Left", "Right"].map(function (t) {
          return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
        }), ["Top", "Bottom"].map(function (t) {
          return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
        })),
        i = this.$.input,
        o = t.height - n[0] - n[1];
      o != this.__lastHeight && (i.style.height = o + "px", i.style.lineHeight = o + "px", this.__lastHeight = o), i.style.color = e.color;
      var r = this.$.placeholder;
      r.style.height = t.height - n[0] - n[1] + "px", r.style.lineHeight = r.style.height
    },
    defaultValueChange: function (e, t) {
      return this.maxlength > 0 && (e = e.slice(0, this.maxlength)), this._checkPlaceholderStyle(e), this._showValueChange(e), this._value = e, e
    },
    _getPlaceholderStyle: function (e) {
      return e
    },
    _placeholderClassChange: function (e) {
      var t = e.split(/\s/);
      this._placeholderClass = [];
      for (var n = 0; n < t.length; n++) t[n] && this._placeholderClass.push(t[n])
    },
    _checkPlaceholderStyle: function (e) {
      var t = this._placeholderClass || [],
        n = this.$.placeholder;
      if (e) {
        if (this._placeholderShow && (n.classList.remove("input-placeholder"), n.setAttribute("style", ""), t.length > 0))
          for (var i = 0; i < t.length; i++) n.classList.contains(t[i]) && n.classList.remove(t[i]);
        n.style.display = "none", this._placeholderShow = !1
      } else {
        if (!this._placeholderShow && (n.classList.add("input-placeholder"), this.placeholderStyle && n.setAttribute("style", this.placeholderStyle), t.length > 0))
          for (var i = 0; i < t.length; i++) n.classList.add(t[i]);
        n.style.display = "", this.updateInput(), this._placeholderShow = !0
      }
    }
  })
}();

// wx-input if not in wechatdevtools
!function () {
  /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) || window.exparser.registerElement({
    is: "wx-input",
    template: '\n      <div id="wrapper" disabled$="{{disabled}}">\n        <input style="visibility:hidden" disabled/>\n        <div id="input" parse-text-content >{{showValue}}</div>\n        <div id="placeholder" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{_getPlaceholderStyle(placeholderStyle)}}"></div>\n      </div>\n    ',
    behaviors: ["wx-base", "wx-data-component"],
    properties: {
      focus: {
        type: Boolean,
        value: 0,
        coerce: "_focusChange",
        public: !0
      },
      autoFocus: {
        type: Boolean,
        value: !1,
        public: !0
      },
      placeholder: {
        type: String,
        value: "",
        observer: "_placeholderChange",
        public: !0
      },
      placeholderStyle: {
        type: String,
        value: "",
        public: !0
      },
      placeholderClass: {
        type: String,
        value: "",
        public: !0,
        observer: "_placeholderClassChange"
      },
      value: {
        type: String,
        value: "",
        coerce: "defaultValueChange",
        public: !0
      },
      showValue: {
        type: String,
        value: ""
      },
      maxlength: {
        type: Number,
        value: 140,
        observer: "_maxlengthChanged",
        public: !0
      },
      type: {
        type: String,
        value: "text",
        public: !0
      },
      password: {
        type: Boolean,
        value: !1,
        public: !0
      },
      disabled: {
        type: Boolean,
        value: !1,
        public: !0
      },
      bindinput: {
        type: String,
        value: "",
        public: !0
      },
      cursorSpacing: {
        type: Number,
        value: 0,
        public: !0
      },
      confirmHold: {
        type: Boolean,
        value: !1,
        public: !0
      },
      confirmType: {
        type: String,
        value: "done",
        public: !0
      }
    },
    listeners: {
      tap: "_inputFocus"
    },
    resetFormData: function () {
      this._keyboardShow ? (this.__formResetCallback = !0, wx.hideKeyboard()) : (this.value = "", this._checkPlaceholderStyle(this.value))
    },
    getFormData: function (e) {
      this._keyboardShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
    },
    _focusChange: function (e) {
      return this._couldFocus(e), e
    },
    _couldFocus: function (e) {
      var t = this;
      this._attached && (!this._keyboardShow && e ? window.requestAnimationFrame(function () {
          t._inputFocus()
        }) : this._keyboardShow && !e && window.requestAnimationFrame(function () {
          wx.hideKeyboard()
        }))
    },
    _getPlaceholderClass: function (e) {
      return "input-placeholder " + e
    },
    _maxlengthChanged: function (e, t) {
      var n = this.value.slice(0, e);
      n != this.value && (this.value = n)
    },
    _placeholderChange: function (e) {
      this._checkPlaceholderStyle(this.value)
    },
    attached: function () {
      var e = this;
      this._placeholderClassChange(this.placeholderClass), this._checkPlaceholderStyle(this.value), this._attached = !0, this._value = this.value, this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function () {
        e.checkAutoFocus()
      }), this.__onKeyboardCompleteId = exparser.addListenerToElement(document, "onKeyboardComplete", function (t) {
        e._keyboardShow && t.detail.inputId == e._inputId && (e._value = t.detail.value, e.onKeyboardComplete())
      }), this.__setKeyboardValueId = exparser.addListenerToElement(document, "setKeyboardValue", function (t) {
        e._keyboardShow && t.detail.inputId == e._inputId && (e._value = t.detail.value)
      }), this.__onKeyboardConfirmId = exparser.addListenerToElement(document, "onKeyboardConfirm", this.onKeyboardConfirm.bind(this)), this.__pageReRenderCallback = this.pageReRenderCallback.bind(this), this.__onDocumentTouchStart = this.onDocumentTouchStart.bind(this), document.addEventListener("touchstart", this.__onDocumentTouchStart), document.addEventListener("pageReRender", this.__pageReRenderCallback)
    },
    detached: function () {
      document.removeEventListener("pageReRender", this.__pageReRenderCallback), document.removeEventListener("touchstart", this.__onDocumentTouchStart), exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId), exparser.removeListenerFromElement(document, "onKeyboardComplete", this.__onKeyboardCompleteId), exparser.removeListenerFromElement(document, "setKeyboardValue", this.__setKeyboardValueId), exparser.removeListenerFromElement(document, "onKeyboardConfirm", this.__onKeyboardConfirmId), this._keyboardShow && wx.hideKeyboard()
    },
    checkAutoFocus: function () {
      this.__autoFocused || window.__onAppRouteDone && (this.__autoFocused = !0, this._couldFocus(this.autoFocus || this.focus))
    },
    onDocumentTouchStart: function () {
      this._keyboardShow && wx.hideKeyboard()
    },
    onKeyboardConfirm: function (e) {
      this._keyboardShow && e.detail.inputId == this._inputId && (this._value = e.detail.value, this.triggerEvent("confirm", {
        value: this._value
      }))
    },
    onKeyboardComplete: function () {
      this.__formResetCallback && (this.value = "", this.__formResetCallback = void 0), "function" == typeof this.__formCallback && (this.__formCallback(this._value), this.__formCallback = void 0), this.triggerEvent("change", {
        value: this._value
      }), this.triggerEvent("blur", {
        value: this._value
      }), this._resetInputState()
    },
    getComputedStyle: function () {
      var e = this.$$,
        t = window.getComputedStyle(e),
        n = e.getBoundingClientRect(),
        i = ["Left", "Right"].map(function (e) {
          return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
        }),
        o = ["Top", "Bottom"].map(function (e) {
          return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
        }),
        r = parseFloat(t.fontWeight);
      isNaN(r) ? r = t.fontWeight : r < 500 ? r = "normal" : r >= 500 && (r = "bold");
      var a = t.textAlign;
      return ["left", "center", "right"].indexOf(a) < 0 && (a = "left"), {
        width: n.width - i[0] - i[1],
        height: n.height - o[0] - o[1],
        left: n.left + i[0] + window.scrollX,
        top: n.top + o[0] + window.scrollY,
        fontFamily: t.fontFamily,
        fontSize: parseFloat(t.fontSize) || 16,
        fontWeight: r,
        color: this._getHexColor(t.color),
        backgroundColor: "#00000000",
        marginBottom: this.cursorSpacing || parseFloat(t.marginBottom),
        textAlign: a
      }
    },
    getPlaceholderStyle: function () {
      var e = this.$.placeholder,
        t = window.getComputedStyle(e),
        n = parseFloat(t.fontWeight);
      return isNaN(n) ? n = t.fontWeight : n < 500 ? n = "normal" : n >= 500 && (n = "bold"), {
        fontSize: parseFloat(t.fontSize) || 16,
        fontWeight: n,
        color: this._getHexColor(t.color)
      }
    },
    pageReRenderCallback: function () {
      this.checkAutoFocus(), this._updateInput(), this.checkLineHeight()
    },
    _inputFocus: function (e) {
      return !this.disabled && (this.triggerEvent("focus", {
          value: this.value
        }), !this._keyboardShow && (this._showNativeInput(), !1))
    },
    defaultValueChange: function (e, t) {
      return this.maxlength > 0 && (e = e.slice(0, this.maxlength)), this._inputId && this._keyboardShow ? WeixinJSBridge.invoke("updateInput", {
          value: e || "",
          inputId: this._inputId,
          confirmHold: this.confirmHold
        }, function (e) {
        }) : this._checkPlaceholderStyle(e), this._value = e, e
    },
    _showNativeInput: function (e) {
      var t = this;
      this.inputArgs = this.getCurrentInputArgs(), this.inputArgs.defaultValue = this.value, WeixinJSBridge.invoke("showKeyboard", this.inputArgs, function (e) {
        /:ok/.test(e.errMsg) ? (t._inputId = e.inputId, t._keyboardShow = !0, t.showValue = " ") : console.info(e.errMsg)
      })
    },
    _diff: function (e, t) {
      var n = {},
        i = !1;
      for (var o in t) "[object Object]" === Object.prototype.toString.call(t[o]) ? JSON.stringify(t[o]) != JSON.stringify(e[o]) && (n[o] = t[o], i = !0) : e[o] != t[o] && (n[o] = t[o], i = !0);
      return i ? n : void 0
    },
    formateEventTarget: function () {
      var e = {
        bindinput: this.bindinput,
        target: {
          id: this.$$.id,
          dataset: this.dataset,
          offsetTop: this.$$.offsetTop,
          offsetLeft: this.$$.offsetLeft
        },
        setKeyboardValue: !0
      };
      return e.currentTarget = e.target, this.bindinput ? JSON.stringify(e) : ""
    },
    _updateInput: function () {
      if (this._keyboardShow) {
        var e = this.getCurrentInputArgs(),
          t = this._diff(this.inputArgs, e);
        t && (this.inputArgs = e, t.inputId = this._inputId, WeixinJSBridge.invoke("updateInput", t, function (e) {
        }));
      }
    },
    getCurrentInputArgs: function () {
      return {
        type: "password" == this.type ? "text" : this.type,
        maxLength: this.maxlength,
        password: this.password || "password" == this.type,
        style: this.getComputedStyle(),
        data: this.formateEventTarget(),
        placeholder: this.placeholder,
        placeholderStyle: this.getPlaceholderStyle(),
        confirmHold: this.confirmHold,
        confirmType: this.confirmType
      }
    },
    _resetInputState: function () {
      this._keyboardShow = !1, this._inputId = void 0, this.value = this._value || "", this._value = void 0, this._checkPlaceholderStyle(this.value)
    },
    _getHexColor: function (e) {
      if (!e) return "#000000";
      if (e.indexOf("#") >= 0) return e;
      try {
        var t, n, i = function () {
          t = e.match(/\d+/g);
          var i = [];
          return t.map(function (e, t) {
            if (t < 3) {
              var n = parseInt(e).toString(16);
              n = n.length > 1 ? n : "0" + n, i.push(n)
            }
          }), t.length > 3 && (n = parseFloat(t.slice(3).join(".")), 0 == n ? i.push("00") : n >= 1 ? i.push("ff") : (n = parseInt(255 * n).toString(16), n = n.length > 1 ? n : "0" + n, i.push(n))), {
            v: "#" + i.join("")
          }
        }();
        if ("object" === ("undefined" == typeof i ? "undefined" : _typeof(i))) return i.v
      } catch (e) {
        return "#000000"
      }
    },
    _getPlaceholderStyle: function (e) {
      return e + ";display:none;"
    },
    checkLineHeight: function () {
      var e = this;
      window.requestAnimationFrame(function () {
        var t = window.getComputedStyle(e.$$),
          n = e.$$.getBoundingClientRect(),
          i = ["Left", "Right"].map(function (e) {
            return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
          }),
          o = ["Top", "Bottom"].map(function (e) {
            return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
          }),
          r = n.height - o[0] - o[1];
        if (r != e.__lastHeight) {
          var a = e.$.input;
          a.style.height = r + "px"
          a.style.lineHeight = r + "px"
          a.style.width = n.width - i[0] - i[1] + "px"
          e.__lastHeight = r
        }
      })
    },
    _placeholderClassChange: function (e) {
      var t = e.split(/\s/);
      this._placeholderClass = [];
      for (var n = 0; n < t.length; n++) t[n] && this._placeholderClass.push(t[n])
    },
    _checkPlaceholderStyle: function (e) {
      var t = e || " ",
        n = this.$.input,
        i = this._placeholderClass || [];
      if (e) {
        if (n.classList.remove("input-placeholder"), i.length > 0)
          for (var o = 0; o < i.length; o++) n.classList.contains(i[o]) && n.classList.remove(i[o]);
        n.setAttribute("style", ""), this.__lastHeight ? (n.style.height = this.__lastHeight + "px", n.style.lineHeight = this.__lastHeight + "px") : this.checkLineHeight(), (this.password || "password" == this.type) && (t = e ? new Array(e.length + 1).join("●") : ""), this.showValue = t
      } else {
        if (n.classList.add("input-placeholder"), i.length > 0)
          for (var o = 0; o < i.length; o++) n.classList.add(i[o]);
        this.placeholderStyle && (n.setAttribute("style", this.placeholderStyle), this.__lastHeight ? (n.style.height = this.__lastHeight + "px", n.style.lineHeight = this.__lastHeight + "px") : this.checkLineHeight()), this.showValue = this.placeholder || " "
      }
    }
  })
}()

// wx-label
window.exparser.registerElement({
  is: "wx-label",
  template: "\n    <slot></slot>\n  ",
  properties: {
    for: {
      type: String,
      public: !0
    }
  },
  listeners: {
    tap: "onTap"
  },
  behaviors: ["wx-base"],
  _handleNode: function (e, t) {
    return !!(e instanceof exparser.Element && e.hasBehavior("wx-label-target")) && (e.handleLabelTap(t), !0)
  },
  dfs: function (e, t) {
    if (this._handleNode(e, t)) return !0;
    if (!e.childNodes) return !1;
    for (var n = 0; n < e.childNodes.length; ++n)
      if (this.dfs(e.childNodes[n], t)) return !0;
    return !1
  },
  onTap: function (e) {
    for (var t = e.target; t instanceof exparser.Element && t !== this; t = t.parentNode)
      if (t.hasBehavior("wx-label-target")) return;
    if (this.for) {
      var n = document.getElementById(this.for);
      n && this._handleNode(n.__wxElement, e)
    } else this.dfs(this, e)
  }
})

// wx-loading
window.exparser.registerElement({
  is: "wx-loading",
  template: '\n    <div class="wx-loading-mask" style$="background-color: transparent;"></div>\n    <div class="wx-loading">\n      <invoke class="wx-loading-icon"></invoke><diffProps class="wx-loading-content"><slot></slot></diffProps>\n    </div>\n  ',
  behaviors: ["wx-base"]
});

!function () {
  "wechatdevtools" === wx.getPlatform() && (window.addEventListener("DOMContentLoaded", function () {
    if (window.parent.__wxConfig__.nomap) return
    var e = document.createElement("script");
    e.async = true;
    e.type = "text/javascript", e.src = "https://map.qq.com/api/js?v=2.exp&callback=__map_jssdk_init", document.body.appendChild(e)
  }), window.__map_jssdk_id = 0, window.__map_jssdk_ready = !1, window.__map_jssdk_callback = [], window.__map_jssdk_init = function () {
    for (__map_jssdk_ready = !0; __map_jssdk_callback.length;) {
      var e = __map_jssdk_callback.pop();
      e()
    }
  })
}()

// wx-map
window.exparser.registerElement({
  is: "wx-map",
  behaviors: ["wx-base", "wx-native"],
  template: '<div id="map" style="width: 100%; height: 100%;"></div>',
  properties: {
    latitude: {
      type: Number,
      public: !0,
      observer: "latitudeChanged",
      value: 39.92
    },
    longitude: {
      type: Number,
      public: !0,
      observer: "longitudeChanged",
      value: 116.46
    },
    scale: {
      type: Number,
      public: !0,
      observer: "scaleChanged",
      scale: 16
    },
    markers: {
      type: Array,
      value: [],
      public: !0,
      observer: "markersChanged"
    },
    covers: {
      type: Array,
      value: [],
      public: !0,
      observer: "coversChanged"
    },
    includePoints: {
      type: Array,
      value: [],
      public: !0,
      observer: "pointsChanged"
    },
    polyline: {
      type: Array,
      value: [],
      public: !0,
      observer: "linesChanged"
    },
    circles: {
      type: Array,
      value: [],
      public: !0,
      observer: "circlesChanged"
    },
    controls: {
      type: Array,
      value: [],
      public: !0,
      observer: "controlsChanged"
    },
    showLocation: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "showLocationChanged"
    },
    bindmarkertap: {
      type: String,
      value: "",
      public: !0
    },
    bindcontroltap: {
      type: String,
      value: "",
      public: !0
    },
    bindregionchange: {
      type: String,
      value: "",
      public: !0
    },
    bindtap: {
      type: String,
      value: "",
      public: !0
    },
    _mapId: {
      type: Number
    }
  },
  _delay: function (e, t, n) {
    this._deferred.push({
      callback: e,
      args: [t, n]
    })
  },
  _update: function (e, t) {
    e.mapId = this._mapId, e.hide = this.hidden, WeixinJSBridge.invoke("updateMap", e, function (e) {
    })
  },
  _updatePosition: function () {
    this._isMobile() && (this._isiOS() && (this._box.width = this._box.width || 1, this._box.height = this._box.height || 1), WeixinJSBridge.invoke("updateMap", {
      mapId: this._mapId,
      position: this._box,
      covers: this.covers || []
    }, function (e) {
    }))
  },
  _transformPath: function (e, t) {
    return e.map(function (e) {
      var n = {};
      return e.iconPath ? (Object.keys(e).forEach(function (t) {
          n[t] = e[t]
        }), n.iconPath = wx.getRealRoute(t, n.iconPath), n) : e
    })
  },
  _hiddenChanged: function (e, t) {
    this._isMobile() ? (this.$$.style.display = e ? "none" : "", WeixinJSBridge.invoke("updateMap", {
        mapId: this._mapId,
        hide: e
      }, function (e) {
      })) : this.$$.style.display = e ? "none" : ""
  },
  _transformMarkers: function (e) {
    var t = this;
    return (e || []).map(function (e) {
      var n = {};
      return e ? (Object.keys(e).forEach(function (t) {
          n[t] = e[t]
        }), e.name && (n.title = n.title || n.name), "undefined" != typeof e.id && t.bindmarkertap && (n.data = JSON.stringify({
          markerId: e.id,
          bindmarkertap: t.bindmarkertap
        })), n) : n
    })
  },
  _transformControls: function (e) {
    var t = this;
    return e.map(function (e) {
      var n = {};
      return Object.keys(e).forEach(function (t) {
        n[t] = e[t]
      }), "undefined" != typeof e.id && t.bindcontroltap && e.clickable && (n.data = JSON.stringify({
        controlId: e.id,
        bindcontroltap: t.bindcontroltap
      })), n
    })
  },
  _transformColor: function (e) {
    0 === e.indexOf("#") && (e = e.substr(1));
    var t = Number("0x" + e.substr(0, 2)),
      n = Number("0x" + e.substr(2, 2)),
      i = Number("0x" + e.substr(4, 2)),
      o = e.substr(6, 2) ? Number("0x" + e.substr(6, 2)) / 255 : 1;
    return new qq.maps.Color(t, n, i, o)
  },
  _initFeatures: function () {
    this._mapId && ((this.markers && this.markers.length > 0 || this.covers && this.covers.length > 0) && WeixinJSBridge.invoke("addMapMarkers", {
      mapId: this._mapId,
      markers: this._transformMarkers(this.markers).concat(this.covers)
    }, function (e) {
    }), this.includePoints && this.includePoints.length > 0 && WeixinJSBridge.invoke("includeMapPoints", {
      mapId: this._mapId,
      points: this.includePoints
    }, function (e) {
    }), this.polyline && this.polyline.length > 0 && WeixinJSBridge.invoke("addMapLines", {
      mapId: this._mapId,
      lines: this.polyline
    }, function (e) {
    }), this.circles && this.circles.length > 0 && WeixinJSBridge.invoke("addMapCircles", {
      mapId: this._mapId,
      circles: this.circles
    }, function (e) {
    }), this.controls && this.controls.length > 0 && WeixinJSBridge.invoke("addMapControls", {
      mapId: this._mapId,
      controls: this._transformControls(this.controls)
    }, function (e) {
    }))
  },
  _insertNativeMap: function () {
    var e = this;
    this._box.width = this._box.width || 1, this._box.height = this._box.height || 1;
    var t = {
      position: this._box,
      centerLongitude: this.longitude,
      centerLatitude: this.latitude,
      scale: this.scale,
      covers: this.covers || [],
      hide: this.hidden,
      showLocation: this.showLocation
    };
    this._canInvokeNewFeature || (t.markers = this.markers || []), WeixinJSBridge.invoke("insertMap", t, function (t) {
      /ok/.test(t.errMsg) ? (e._mapId = t.mapId, e._ready(), e._canInvokeNewFeature && WeixinJSBridge.publish("mapInsert", {
          domId: e.id,
          mapId: e._mapId,
          showLocation: e.showLocation,
          bindregionchange: e.bindregionchange,
          bindtap: e.bindtap
        }), e.__pageReRenderCallback = e._pageReRenderCallback.bind(e), document.addEventListener("pageReRender", e.__pageReRenderCallback)) : e.triggerEvent("error", {
          errMsg: t.errMsg
        })
    })
  },
  _insertIframeMap: function () {
    var e = this,
      t = this._map = new qq.maps.Map(this.$.map, {
        zoom: this.scale,
        center: new qq.maps.LatLng(this.latitude, this.longitude),
        mapTypeId: qq.maps.MapTypeId.ROADMAP,
        zoomControl: !1,
        mapTypeControl: !1
      }),
      n = !1,
      i = !1;
    qq.maps.event.addListener(t, "click", function () {
      e.bindtap && wx.publishPageEvent(e.bindtap, {})
    }), qq.maps.event.addListener(t, "drag", function () {
      e.bindregionchange && !n && (wx.publishPageEvent(e.bindregionchange, {
        type: "begin"
      }), n = !0, i = !1)
    }), qq.maps.event.addListener(t, "dragend", function () {
      n && (n = !1, i = !0)
    }), qq.maps.event.addListener(t, "bounds_changed", function () {
      e.bindregionchange && i && (wx.publishPageEvent(e.bindregionchange, {
        type: "end"
      }), i = !1)
    });
    var o = qq.maps.event.addListener(t, "tilesloaded", function () {
        e._mapId = __map_jssdk_id++, e._ready(), WeixinJSBridge.subscribe("doMapAction" + e._mapId, function (t) {
          if (e._map && e._mapId === t.data.mapId)
            if ("getMapCenterLocation" === t.data.method) {
              var n = e._map.getCenter();
              WeixinJSBridge.publish("doMapActionCallback", {
                mapId: e._mapId,
                callbackId: t.data.callbackId,
                method: t.data.method,
                latitude: n.getLat(),
                longitude: n.getLng()
              })
            } else "moveToMapLocation" === t.data.method && e.showLocation && WeixinJSBridge.invoke("private_geolocation", {}, function (t) {
              try {
                t = JSON.parse(t)
              } catch (e) {
                t = {}
              }
              if (t.result && t.result.location) {
                var n = t.result.location;
                e._posOverlay && e._posOverlay.setMap(null), e._posOverlay = new e.CustomOverlay(new qq.maps.LatLng(n.lat, n.lng)), e._posOverlay.setMap(e._map), e._map.panTo(new qq.maps.LatLng(n.lat, n.lng))
              }
            })
        }), WeixinJSBridge.publish("mapInsert", {
          domId: e.id,
          mapId: e._mapId,
          showLocation: e.showLocation,
          bindregionchange: e.bindregionchange,
          bindtap: e.bindtap
        }), qq.maps.event.removeListener(o), o = null
      }),
      CustomOverlay = this.CustomOverlay = function (e, t) {
        this.index = t, this.position = e
      };
    CustomOverlay.prototype = new qq.maps.Overlay, CustomOverlay.prototype.construct = function () {
      var e = this.div = document.createElement("div");
      e.setAttribute("style", "width: 32px;height: 32px;background: rgba(31, 154, 228,.3);border-radius: 20px;position: absolute;");
      var t = document.createElement("div");
      t.setAttribute("style", "position: absolute;width: 16px;height: 16px;background: white;border-radius: 8px;top: 8px;left: 8px;"), e.appendChild(t);
      var n = document.createElement("div");
      n.setAttribute("style", "position: absolute;width: 12px;height: 12px;background: rgb(31, 154, 228);border-radius: 6px;top: 2px;left: 2px;"), t.appendChild(n);
      var i = this.getPanes();
      i.overlayMouseTarget.appendChild(e)
    }
    CustomOverlay.prototype.draw = function () {
      var e = this.getProjection(),
        t = e.fromLatLngToDivPixel(this.position),
        n = this.div.style;
      n.left = t.x - 16 + "px", n.top = t.y - 16 + "px"
    }
    CustomOverlay.prototype.destroy = function () {
      this.div.onclick = null, this.div.parentNode.removeChild(this.div), this.div = null
    }
  },
  latitudeChanged: function (e, t) {
    if (e) return this._isReady ? void(this._isMobile() ? this._update({
          centerLatitude: e,
          centerLongitude: this.longitude
        }, "纬度") : this._map.setCenter(new qq.maps.LatLng(e, this.longitude))) : void this._delay("latitudeChanged", e, t)
  },
  longitudeChanged: function (e, t) {
    if (e) return this._isReady ? void(this._isMobile() ? this._update({
          centerLatitude: this.latitude,
          centerLongitude: e
        }, "经度") : this._map.setCenter(new qq.maps.LatLng(this.latitude, e))) : void this._delay("longitudeChanged", e, t)
  },
  scaleChanged: function () {
    var e = arguments.length <= 0 || void 0 === arguments[0] ? 16 : arguments[0],
      t = arguments[1];
    if (e) return this._isReady ? void(this._isMobile() ? this._update({
          centerLatitude: this.latitude,
          centerLongitude: this.longitude,
          scale: e
        }, "缩放") : this._map.zoomTo(e)) : void this._delay("scaleChanged", e, t)
  },
  coversChanged: function () {
    var e = this,
      t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
      n = arguments[1];
    return this._isReady ? void(this._isMobile() ? wx.getCurrentRoute({
          success: function (n) {
            e._update({
              centerLatitude: e.latitude,
              centerLongitude: e.longitude,
              covers: e._transformPath(t, n.route)
            }, "覆盖物")
          }
        }) : ((this._covers || []).forEach(function (e) {
          e.setMap(null)
        }), this._covers = t.map(function (t) {
          var n = new qq.maps.Marker({
            position: new qq.maps.LatLng(t.latitude, t.longitude),
            map: e._map
          });
          return t.iconPath && n.setIcon(new qq.maps.MarkerImage(t.iconPath)), n
        }))) : void this._delay("coversChanged", t, n)
  },
  markersChanged: function () {
    var e = this,
      t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
      n = arguments[1];
    return this._isReady ? void(this._isMobile() ? wx.getCurrentRoute({
          success: function (n) {
            var i = e._transformPath(e._transformMarkers(t), n.route);
            e._canInvokeNewFeature ? WeixinJSBridge.invoke("addMapMarkers", {
                mapId: e._mapId,
                markers: i
              }, function (e) {
              }) : e._update({
                centerLatitude: e.latitude,
                centerLongitude: e.longitude,
                markers: i
              })
          }
        }) : ((this._markers || []).forEach(function (e) {
          e.setMap(null)
        }), this._markers = t.map(function (t) {
          var n = new qq.maps.Marker({
            position: new qq.maps.LatLng(t.latitude, t.longitude),
            map: e._map
          });
          return t.iconPath && (Number(t.width) && Number(t.height) ? n.setIcon(new qq.maps.MarkerImage(t.iconPath, new qq.maps.Size(t.width, t.height), new qq.maps.Point(0, 0), new qq.maps.Point(t.width / 2, t.height), new qq.maps.Size(t.width, t.height))) : n.setIcon(new qq.maps.MarkerImage(t.iconPath))), (t.title || t.name) && n.setTitle(t.title || t.name), e.bindmarkertap && "undefined" != typeof t.id && qq.maps.event.addListener(n, "click", function (n) {
            var i = n.event;
            i instanceof TouchEvent ? "touchend" === i.type && wx.publishPageEvent(e.bindmarkertap, {
                markerId: t.id
              }) : wx.publishPageEvent(e.bindmarkertap, {
                markerId: t.id
              })
          }), n
        }))) : void this._delay("markersChanged", t, n)
  },
  linesChanged: function () {
    var e = this,
      t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
      n = arguments[1];
    return this._isReady ? void(this._isMobile() ? this._canInvokeNewFeature && WeixinJSBridge.invoke("addMapLines", {
          mapId: this._mapId,
          lines: t
        }, function (e) {
        }) : ((this._lines || []).forEach(function (e) {
          e.setMap(null)
        }), this._lines = t.map(function (t) {
          var n = t.points.map(function (e) {
            return new qq.maps.LatLng(e.latitude, e.longitude)
          });
          return new qq.maps.Polyline({
            map: e._map,
            path: n,
            strokeColor: e._transformColor(t.color) || "",
            strokeWidth: t.width,
            strokeDashStyle: t.dottedLine ? "dash" : "solid"
          })
        }))) : void this._delay("linesChanged", t, n)
  },
  circlesChanged: function () {
    var e = this,
      t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
      n = arguments[1];
    return this._isReady ? void(this._isMobile() ? this._canInvokeNewFeature && WeixinJSBridge.invoke("addMapCircles", {
          mapId: this._mapId,
          circles: t
        }, function (e) {
        }) : ((this._circles || []).forEach(function (e) {
          e.setMap(null)
        }), this._circles = t.map(function (t) {
          return new qq.maps.Circle({
            map: e._map,
            center: new qq.maps.LatLng(t.latitude, t.longitude),
            radius: t.radius,
            fillColor: e._transformColor(t.fillColor) || "",
            strokeColor: e._transformColor(t.color) || "",
            strokeWidth: t.strokeWidth
          })
        }))) : void this._delay("circlesChanged", t, n)
  },
  pointsChanged: function () {
    var e = this,
      t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
      n = arguments[1];
    if (!this._isReady) return void this._delay("pointsChanged", t, n);
    if (this._isMobile()) this._canInvokeNewFeature && WeixinJSBridge.invoke("includeMapPoints", {
      mapId: this._mapId,
      points: t
    }, function (e) {
    });
    else {
      var i = function () {
        if (t.length <= 0) return {
          v: void 0
        };
        var n = new qq.maps.LatLngBounds;
        t.forEach(function (e) {
          n.extend(new qq.maps.LatLng(e.latitude, e.longitude))
        }), e._map.fitBounds(n)
      }();
      if ("object" === ("undefined" == typeof i ? "undefined" : _typeof(i))) return i.v
    }
  },
  controlsChanged: function () {
    var e = this,
      t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
      n = arguments[1];
    return this._isReady ? void(this._isMobile() ? this._canInvokeNewFeature && wx.getCurrentRoute({
          success: function (n) {
            var i = e._transformPath(e._transformControls(t), n.route);
            WeixinJSBridge.invoke("addMapControls", {
              mapId: e._mapId,
              controls: i
            }, function (e) {
            })
          }
        }) : !function () {
          for (var n = e._controls = e._controls || []; n.length;) {
            var i = n.pop();
            i.onclick = null, i.parentNode.removeChild(i)
          }
          t.forEach(function (t) {
            var i = document.createElement("img");
            i.style.position = "absolute", i.style.left = (t.position && t.position.left || 0) + "px", i.style.top = (t.position && t.position.top || 0) + "px", i.style.width = (t.position && t.position.width || "") + "px", i.style.height = (t.position && t.position.height || "") + "px", i.style.zIndex = 9999, i.src = t.iconPath, t.clickable && "undefined" != typeof t.id && (i.onclick = function () {
              wx.publishPageEvent(e.bindcontroltap, {
                controlId: t.id
              })
            }), n.push(i), e.$.map.appendChild(i)
          })
        }()) : void this._delay("controlsChanged", t, n)
  },
  showLocationChanged: function () {
    var e = this,
      t = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0],
      n = arguments[1];
    return this._isReady ? void(this._isMobile() ? this._update({
          showLocation: t
        }) : (this._posOverlay && (this._posOverlay.setMap(null), this._posOverlay = null), t && WeixinJSBridge.invoke("private_geolocation", {}, function (t) {
          try {
            t = JSON.parse(t)
          } catch (e) {
            t = {}
          }
          if (t.result && t.result.location) {
            var n = t.result.location;
            e._posOverlay = new e.CustomOverlay(new qq.maps.LatLng(n.lat, n.lng)), e._posOverlay.setMap(e._map)
          }
        }))) : void this._delay("showLocationChanged", t, n)
  },
  attached: function () {
    return this.latitude > 90 || this.latitude < -90 ? (console.group(new Date + " latitude 字段取值有误"), console.warn("纬度范围 -90 ~ 90"), void console.groupEnd()) : this.longitude > 180 || this.longitude < -180 ? (console.group(new Date + " longitude 字段取值有误"), console.warn("经度范围 -180 ~ 180"), void console.groupEnd()) : (this._canInvokeNewFeature = !0, this._box = this._getBox(), void(this._isMobile() ? this._insertNativeMap() : __map_jssdk_ready ? this._insertIframeMap() : __map_jssdk_callback.push(this._insertIframeMap.bind(this))))
  },
  detached: function () {
    this._isMobile() && (WeixinJSBridge.invoke("removeMap", {
      mapId: this._mapId
    }, function (e) {
    }), this.__pageReRenderCallback && document.removeEventListener("pageReRender", this.__pageReRenderCallback))
  }
})

// wx-mask
window.exparser.registerElement({
  is: "wx-mask",
  template: '\n    <div class="wx-mask" id="mask" style="display: none;">\n  ',
  behaviors: ["wx-base"],
  properties: {
    hidden: {
      type: Boolean,
      value: !0,
      observer: "hiddenChange",
      public: !0
    }
  },
  hiddenChange: function (e) {
    var t = this.$.mask;
    e === !0 ? (setTimeout(function () {
        t.style.display = "none"
      }, 300), this.$.mask.classList.add("wx-mask-transparent")) : (t.style.display = "block", t.focus(), t.classList.remove("wx-mask-transparent"))
  }
})

// wx-modal
window.exparser.registerElement({
  is: "wx-modal",
  template: '\n    <div id="mask" class="wx-modal-mask"></div>\n    <div class="wx-modal-dialog">\n      <div class="wx-modal-dialog-hd">\n        <strong parse-text-content>{{title}}</strong>\n      </div>\n      <div class="wx-modal-dialog-bd">\n        <slot></slot>\n      </div>\n      <div class="wx-modal-dialog-ft">\n        <a hidden$="{{noCancel}}" id="cancel" class="wx-modal-btn-default" parse-text-content>{{cancelText}}</a>\n        <a id="confirm" class="wx-modal-btn-primary" parse-text-content>{{confirmText}}</a>\n      </div>\n    </div>\n  ',
  behaviors: ["wx-base"],
  properties: {
    title: {
      type: String,
      public: !0
    },
    noCancel: {
      type: Boolean,
      value: !1,
      public: !0
    },
    confirmText: {
      type: String,
      value: "确定",
      public: !0
    },
    cancelText: {
      type: String,
      value: "取消",
      public: !0
    }
  },
  listeners: {
    "mask.tap": "_handleCancel",
    "confirm.tap": "_handleConfirm",
    "cancel.tap": "_handleCancel"
  },
  _handleConfirm: function () {
    this.triggerEvent("confirm")
  },
  _handleCancel: function () {
    this.triggerEvent("cancel")
  }
})

// wx-navigator
window.exparser.registerElement({
  is: "wx-navigator",
  behaviors: ["wx-base", "wx-hover"],
  template: "<slot></slot>",
  properties: {
    url: {
      type: String,
      public: !0
    },
    redirect: {
      type: Boolean,
      value: !1,
      public: !0
    },
    openType: {
      type: String,
      value: "navigate",
      public: !0
    },
    hoverClass: {
      type: String,
      value: "",
      public: !0
    },
    hoverStyle: {
      type: String,
      value: "",
      public: !0
    },
    hover: {
      type: Boolean,
      value: !0
    },
    hoverStayTime: {
      type: Number,
      value: 600,
      public: !0
    }
  },
  listeners: {
    tap: "navigateTo"
  },
  navigateTo: function () {
    if (!this.url) return void console.error("navigator should have url attribute");
    if (this.redirect) return void wx.redirectTo({
      url: this.url
    });
    switch (this.openType) {
      case "navigate":
        return void wx.navigateTo({
          url: this.url
        });
      case "redirect":
        return void wx.redirectTo({
          url: this.url
        });
      case "switchTab":
        return void wx.switchTab({
          url: this.url
        });
      default:
        return void console.error("navigator: invalid openType " + this.openType)
    }
  }
})

// wx-picker
window.exparser.registerElement({
  is: "wx-picker",
  template: '<div id="wrapper"><slot></slot></div>',
  behaviors: ["wx-base", "wx-data-component"],
  properties: {
    range: {
      type: Array,
      value: [],
      public: !0
    },
    value: {
      type: String,
      value: "",
      public: !0
    },
    mode: {
      type: String,
      value: "selector",
      public: !0
    },
    fields: {
      type: String,
      value: "day",
      public: !0
    },
    start: {
      type: String,
      value: "",
      public: !0
    },
    end: {
      type: String,
      value: "",
      public: !0
    },
    disabled: {
      type: Boolean,
      value: !1,
      public: !0
    },
    rangeKey: {
      type: String,
      value: "",
      public: !0
    }
  },
  listeners: {
    "wrapper.tap": "showPickerView"
  },
  resetFormData: function () {
    "selector" == this.mode ? this.value = -1 : this.value = ""
  },
  getFormData: function (formCallback) {
    this.__pickerShow ? this.__formCallback = formCallback : "function" == typeof formCallback && formCallback(this.value)
  },
  formGetDataCallback: function () {
    "function" == typeof this.__formCallback && this.__formCallback(this.value)
    this.__formCallback = void 0
  },
  showPickerView: function () {
    "date" == this.mode || "time" == this.mode ? this.showDatePickerView() : "selector" === this.mode && this.showSelector()
  },
  getCustomerStyle: function () {
    var e = this.$.wrapper.getBoundingClientRect();
    return {
      width: e.width,
      height: e.height,
      left: e.left + window.scrollX,
      top: e.top + window.scrollY
    }
  },
  showSelector: function (e) {
    var that = this;
    if (!this.disabled) {
      var _value = parseInt(this.value);
      (isNaN(_value) || _value >= this.range.length) && (_value = 0);

      var pickerData = [];
      if (this.rangeKey) {
        for (var idx = 0; idx < this.range.length; idx++) {
          var r = this.range[idx];
          pickerData.push(r[this.rangeKey] + "")
        }
      } else {
        for (var o = 0; o < this.range.length; o++) pickerData.push(this.range[o] + "");
      }

      WeixinJSBridge.invoke("showPickerView", {
        array: pickerData,
        current: _value,
        style: this.getCustomerStyle()
      }, function (e) {
        /:ok/.test(e.errMsg) && (that.value = e.index, that.triggerEvent("change", {
          value: that.value
        }))
        that.resetPickerState()
        that.formGetDataCallback()
      })

      this.__pickerShow = !0
    }
  },
  showDatePickerView: function () {
    var _this = this;
    if (!this.disabled) {
      WeixinJSBridge.invoke("showDatePickerView", {
        range: {
          start: this.start,
          end: this.end
        },
        mode: this.mode,
        current: this.value,
        fields: this.fields,
        style: this.getCustomerStyle()
      }, function (t) {
        /:ok/.test(t.errMsg) && (_this.value = t.value, _this.triggerEvent("change", {
          value: _this.value
        }))
        _this.resetPickerState()
        _this.formGetDataCallback()
      })
      this.__pickerShow = !0
    }
  },
  resetPickerState: function () {
    this.__pickerShow = !1
  }
})

// wx-picker-view
window.exparser.registerElement({
  is: "wx-picker-view",
  template: '<div id="wrapper" class="wrapper"><slot></slot></div>',
  behaviors: ["wx-base", "wx-data-component"],
  properties: {
    value: {
      type: Array,
      value: [],
      public: !0,
      observer: "_valueChanged"
    },
    indicatorStyle: {
      type: String,
      value: "",
      public: !0
    }
  },
  listeners: {
    "this.wxPickerColumnValueChanged": "_columnValueChanged"
  },
  attached: function () {
    this._initColumns()
  },
  _initColumns: function () {
    var _this = this,
      columns = this._columns = [],
      getColumns = function getColumns(rootNode) {
        for (var i = 0; i < rootNode.childNodes.length; i++) {
          var node = rootNode.childNodes[i];
          node instanceof exparser.Element && (node.hasBehavior("wx-picker-view-column") ? columns.push(node) : getColumns(node))
        }
      };

    getColumns(this);
    var _value = Array.isArray(this.value) ? this.value : [];
    columns.forEach(function (col, idx) {
      col._setStyle(_this.indicatorStyle)
      col._setHeight(_this.$$.offsetHeight)
      col._setCurrent(_value[idx] || 0), col._init()
    })
  },
  _columnValueChanged: function () {
    var values = this._columns.map(function (column) {
      return column._getCurrent()
    });
    this.triggerEvent("change", {
      value: values
    })
  },
  _valueChanged: function () {
    var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
    (this._columns || []).forEach(function (t, n) {
      t._setCurrent(e[n] || 0)
      t._update()
    })
  }
})

// wx-picker-view-column
!function () {
  function _Animation(model, t, n) {
    function i(t, n, o, r) {
      if (!t || !t.cancelled) {
        o(n);
        var a = model.done();
        a || t.cancelled || (t.id = requestAnimationFrame(i.bind(null, t, n, o, r))), a && r && r(n)
      }
    }

    function cancelAnimation(e) {
      e && e.id && cancelAnimationFrame(e.id)
      e && (e.cancelled = !0)
    }

    var r = {
      id: 0,
      cancelled: !1
    };

    i(r, model, t, n)

    return {
      cancel: cancelAnimation.bind(null, r),
      model: model
    }
  }

  function Friction(e) {
    this._drag = e, this._dragLog = Math.log(e), this._x = 0, this._v = 0, this._startTime = 0
  }

  function n(e, t, n) {
    return e > t - n && e < t + n
  }

  function i(e, t) {
    return n(e, 0, t)
  }

  function Spring(e, t, n) {
    this._m = e
    this._k = t
    this._c = n
    this._solution = null
    this._endPosition = 0
    this._startTime = 0
  }

  function Scroll(e) {
    this._extent = e
    this._friction = new Friction(.01)
    this._spring = new Spring(1, 90, 20)
    this._startTime = 0
    this._springing = !1
    this._springOffset = 0
  }

  function Handler(element, current, itemHeight) {
    this._element = element
    this._extent = this._element.offsetHeight - this._element.parentElement.offsetHeight;
    var i = -current * itemHeight;
    i > 0 ? i = 0 : i < -this._extent && (i = -this._extent)
    this._position = i
    this._scroll = new Scroll(this._extent)
    this._onTransitionEnd = this.onTransitionEnd.bind(this)
    this._itemHeight = itemHeight;
    var o = "translateY(" + i + "px)";
    this._element.style.webkitTransform = o
    this._element.style.transform = o
  }

  Friction.prototype.set = function (e, t) {
    this._x = e
    this._v = t
    this._startTime = (new Date).getTime()
  }
  Friction.prototype.x = function (e) {
    void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3);
    var t;
    return t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e), this._dt = e, this._x + this._v * t / this._dragLog - this._v / this._dragLog
  }
  Friction.prototype.dx = function (e) {
    void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3);
    var t;
    return t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e), this._dt = e, this._v * t
  }
  Friction.prototype.done = function () {
    return Math.abs(this.dx()) < 3
  }
  Friction.prototype.reconfigure = function (e) {
    var t = this.x(),
      n = this.dx();
    this._drag = e, this._dragLog = Math.log(e), this.set(t, n)
  }
  Friction.prototype.configuration = function () {
    var e = this;
    return [{
      label: "Friction",
      read: function () {
        return e._drag
      },
      write: function (t) {
        e.reconfigure(t)
      },
      min: .001,
      max: .1,
      step: .001
    }]
  };
  var s = .1;
  Spring.prototype._solve = function (e, t) {
    var n = this._c,
      i = this._m,
      o = this._k,
      r = n * n - 4 * i * o;
    if (0 == r) {
      var a = -n / (2 * i),
        s = e,
        l = t / (a * e);
      return {
        x: function (e) {
          return (s + l * e) * Math.pow(Math.E, a * e)
        },
        dx: function (e) {
          var t = Math.pow(Math.E, a * e);
          return a * (s + l * e) * t + l * t
        }
      }
    }
    if (r > 0) {
      var c = (-n - Math.sqrt(r)) / (2 * i),
        d = (-n + Math.sqrt(r)) / (2 * i),
        l = (t - c * e) / (d - c),
        s = e - l;
      return {
        x: function (e) {
          var t, n;
          return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, c * e)), n || (n = this._powER2T = Math.pow(Math.E, d * e)), s * t + l * n
        },
        dx: function (e) {
          var t, n;
          return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, c * e)), n || (n = this._powER2T = Math.pow(Math.E, d * e)), s * c * t + l * d * n
        }
      }
    }
    var u = Math.sqrt(4 * i * o - n * n) / (2 * i),
      a = -(n / 2 * i),
      s = e,
      l = (t - a * e) / u;
    return {
      x: function (e) {
        return Math.pow(Math.E, a * e) * (s * Math.cos(u * e) + l * Math.sin(u * e))
      },
      dx: function (e) {
        var t = Math.pow(Math.E, a * e),
          n = Math.cos(u * e),
          i = Math.sin(u * e);
        return t * (l * u * n - s * u * i) + a * t * (l * i + s * n)
      }
    }
  }
  Spring.prototype.x = function (e) {
    return void 0 == e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._endPosition + this._solution.x(e) : 0
  }
  Spring.prototype.dx = function (e) {
    return void 0 == e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._solution.dx(e) : 0
  }
  Spring.prototype.setEnd = function (e, t, n) {
    if (n || (n = (new Date).getTime()), e != this._endPosition || !i(t, s)) {
      t = t || 0;
      var o = this._endPosition;
      this._solution && (i(t, s) && (t = this._solution.dx((n - this._startTime) / 1e3)), o = this._solution.x((n - this._startTime) / 1e3), i(t, s) && (t = 0), i(o, s) && (o = 0), o += this._endPosition), this._solution && i(o - e, s) && i(t, s) || (this._endPosition = e, this._solution = this._solve(o - this._endPosition, t), this._startTime = n)
    }
  }
  Spring.prototype.snap = function (e) {
    this._startTime = (new Date).getTime(), this._endPosition = e, this._solution = {
      x: function () {
        return 0
      },
      dx: function () {
        return 0
      }
    }
  }
  Spring.prototype.done = function (e) {
    return e || (e = (new Date).getTime()), n(this.x(), this._endPosition, s) && i(this.dx(), s)
  }
  Spring.prototype.reconfigure = function (e, t, n) {
    this._m = e, this._k = t, this._c = n, this.done() || (this._solution = this._solve(this.x() - this._endPosition, this.dx()), this._startTime = (new Date).getTime())
  }
  Spring.prototype.springConstant = function () {
    return this._k
  }
  Spring.prototype.damping = function () {
    return this._c
  }
  Spring.prototype.configuration = function () {
    function e(e, t) {
      e.reconfigure(1, t, e.damping())
    }

    function t(e, t) {
      e.reconfigure(1, e.springConstant(), t)
    }

    return [{
      label: "Spring Constant",
      read: this.springConstant.bind(this),
      write: e.bind(this, this),
      min: 100,
      max: 1e3
    }, {
      label: "Damping",
      read: this.damping.bind(this),
      write: t.bind(this, this),
      min: 1,
      max: 500
    }]
  }
  Scroll.prototype.snap = function (e, t) {
    this._springOffset = 0, this._springing = !0, this._spring.snap(e), this._spring.setEnd(t)
  }
  Scroll.prototype.set = function (e, t) {
    this._friction.set(e, t)
    if (e > 0 && t >= 0) {
      this._springOffset = 0, this._springing = !0, this._spring.snap(e), this._spring.setEnd(0)
    } else {
      e < -this._extent && t <= 0 ? (this._springOffset = 0, this._springing = !0, this._spring.snap(e), this._spring.setEnd(-this._extent)) : this._springing = !1, this._startTime = (new Date).getTime()
    }
  }
  Scroll.prototype.x = function (e) {
    if (!this._startTime) return 0;
    if (e || (e = ((new Date).getTime() - this._startTime) / 1e3), this._springing) return this._spring.x() + this._springOffset;
    var t = this._friction.x(e),
      n = this.dx(e);
    return (t > 0 && n >= 0 || t < -this._extent && n <= 0) && (this._springing = !0, this._spring.setEnd(0, n), t < -this._extent ? this._springOffset = -this._extent : this._springOffset = 0, t = this._spring.x() + this._springOffset), t
  }
  Scroll.prototype.dx = function (e) {
    return this._springing ? this._spring.dx(e) : this._friction.dx(e)
  }
  Scroll.prototype.done = function () {
    return this._springing ? this._spring.done() : this._friction.done()
  }
  Scroll.prototype.configuration = function () {
    var e = this._friction.configuration();
    return e.push.apply(e, this._spring.configuration()), e
  };
  var l = .5;
  Handler.prototype.onTouchStart = function () {
    this._startPosition = this._position, this._startPosition > 0 ? this._startPosition /= l : this._startPosition < -this._extent && (this._startPosition = (this._startPosition + this._extent) / l - this._extent), this._animation && this._animation.cancel();
    var e = this._position,
      t = "translateY(" + e + "px)";
    this._element.style.webkitTransform = t, this._element.style.transform = t
  }
  Handler.prototype.onTouchMove = function (e, t) {
    var n = t + this._startPosition;
    n > 0 ? n *= l : n < -this._extent && (n = (n + this._extent) * l - this._extent), this._position = n;
    var i = "translateY(" + n + "px) translateZ(0)";
    this._element.style.webkitTransform = i, this._element.style.transform = i
  }
  Handler.prototype.onTouchEnd = function (t, n, i) {
    var o = this;
    if (this._position > -this._extent && this._position < 0) {
      if ((Math.abs(n) < 34 && Math.abs(i.y) < 300 || Math.abs(i.y) < 150)) {
        return void o.snap()
      }
    }

    this._scroll.set(this._position, i.y)

    this._animation = _Animation(this._scroll, function () {
      var e = o._scroll.x();
      o._position = e;
      var t = "translateY(" + e + "px) translateZ(0)";
      o._element.style.webkitTransform = t
      o._element.style.transform = t
    }, function () {
      o.snap()
    })

    return void(0)
  }

  Handler.prototype.onTransitionEnd = function () {
    this._snapping = !1, this._element.style.transition = "", this._element.style.webkitTransition = "", this._element.removeEventListener("transitionend", this._onTransitionEnd), this._element.removeEventListener("webkitTransitionEnd", this._onTransitionEnd), "function" == typeof this.snapCallback && this.snapCallback(Math.floor(Math.abs(this._position) / this._itemHeight))
  }
  Handler.prototype.snap = function () {
    var e = this._itemHeight,
      t = this._position % e,
      n = Math.abs(t) > 17 ? this._position - (e - Math.abs(t)) : this._position - t;
    this._element.style.transition = "transform .2s ease-out", this._element.style.webkitTransition = "-webkit-transform .2s ease-out", this._element.style.transform = "translateY(" + n + "px) translateZ(0)", this._element.style.webkitTransform = "translateY(" + n + "px) translateZ(0)", this._position = n, this._snapping = !0, this._element.addEventListener("transitionend", this._onTransitionEnd), this._element.addEventListener("webkitTransitionEnd", this._onTransitionEnd)
  }
  Handler.prototype.update = function (e) {
    var t = this._element.offsetHeight - this._element.parentElement.offsetHeight;
    "number" == typeof e && (this._position = -e * this._itemHeight), this._position < -t ? this._position = -t : this._position > 0 && (this._position = 0), this._element.style.transform = "translateY(" + this._position + "px) translateZ(0)", this._element.style.webkitTransform = "translateY(" + this._position + "px) translateZ(0)", this._extent = t, this._scroll._extent = t
  }
  Handler.prototype.configuration = function () {
    return this._scroll.configuration()
  }

  window.exparser.registerElement({
    is: "wx-picker-view-column",
    template: '\n      <div id="main" class="wx-picker__group">\n        <div id="mask" class="wx-picker__mask"></div>\n        <div id="indicator" class="wx-picker__indicator"></div>\n        <div id="content" class="wx-picker__content"><slot></slot></div>\n      </div>\n    ',
    attached: function () {
      var e = this;
      this._observer = exparser.Observer.observer.create(function () {
        e._handlers.update()
      }), this._observer.observe(this, {
        childList: !0,
        subtree: !0
      })
    },
    detached: function () {
      this.$.main.removeEventListener("touchstart", this.__handleTouchStart), document.body.removeEventListener("touchmove", this.__handleTouchMove), document.body.removeEventListener("touchend", this.__handleTouchEnd), document.body.removeEventListener("touchcancel", this.__handleTouchEnd)
    },
    _getCurrent: function () {
      return this._current || 0
    },
    _setCurrent: function (e) {
      this._current = e
    },
    _setStyle: function (e) {
      this.$.indicator.setAttribute("style", e)
    },
    _setHeight: function (e) {
      for (var t = this.$.indicator.offsetHeight, n = this.$.content.children, i = 0, o = n.length; i < o; i++) {
        var r = n.item(i);
        r.style.height = t + "px", r.style.overflow = "hidden"
      }
      this._itemHeight = t, this.$.main.style.height = e + "px";
      var a = (e - t) / 2;
      this.$.mask.style.backgroundSize = "100% " + a + "px", this.$.indicator.style.top = a + "px", this.$.content.style.padding = a + "px 0"
    },
    _init: function () {
      var that = this;
      this._touchInfo = {
        trackingID: -1,
        maxDy: 0,
        maxDx: 0
      }
      this._handlers = new Handler(this.$.content, this._current, this._itemHeight)
      this._handlers.snapCallback = function (t) {
        t !== that._current && (that._current = t, that.triggerEvent("wxPickerColumnValueChanged", {
          idx: t
        }, {
          bubbles: !0
        }))
      }
      this.__handleTouchStart = this._handleTouchStart.bind(this)
      this.__handleTouchMove = this._handleTouchMove.bind(this)
      this.__handleTouchEnd = this._handleTouchEnd.bind(this)
      this.$.main.addEventListener("touchstart", this.__handleTouchStart)
      document.body.addEventListener("touchmove", this.__handleTouchMove)
      document.body.addEventListener("touchend", this.__handleTouchEnd)
      document.body.addEventListener("touchcancel", this.__handleTouchEnd)
    },
    _update: function () {
      this._handlers.update(this._current)
    },
    _findDelta: function (e) {
      var t = this._touchInfo;
      if ("touchmove" != e.type && "touchend" != e.type) return {
        x: e.screenX - t.x,
        y: e.screenY - t.y
      };
      for (var n = e.changedTouches || e.touches, i = 0; i < n.length; i++)
        if (n[i].identifier == t.trackingID) return {
          x: n[i].pageX - t.x,
          y: n[i].pageY - t.y
        };
      return null
    },
    _handleTouchStart: function (e) {
      var t = this._touchInfo;
      if (t.trackingID == -1) {
        var n = this._handlers;
        if (n) {
          if ("touchstart" == e.type) {
            var i = e.changedTouches || e.touches;
            t.trackingID = i[0].identifier, t.x = i[0].pageX, t.y = i[0].pageY
          } else t.trackingID = "mouse", t.x = e.screenX, t.y = e.screenY;
          t.maxDx = 0, t.maxDy = 0, t.historyX = [0], t.historyY = [0], t.historyTime = [e.timeStamp], t.listener = n, n.onTouchStart && n.onTouchStart()
        }
      }
    },
    _handleTouchMove: function (e) {
      var t = this._touchInfo;
      if (t.trackingID != -1) {
        e.preventDefault();
        var n = this._findDelta(e);
        if (n) {
          for (t.maxDy = Math.max(t.maxDy, Math.abs(n.y)), t.maxDx = Math.max(t.maxDx, Math.abs(n.x)), t.historyX.push(n.x), t.historyY.push(n.y), t.historyTime.push(e.timeStamp); t.historyTime.length > 10;) t.historyTime.shift(), t.historyX.shift(), t.historyY.shift();
          t.listener && t.listener.onTouchMove && t.listener.onTouchMove(n.x, n.y, e.timeStamp)
        }
      }
    },
    _handleTouchEnd: function (evt) {
      var t = this._touchInfo;
      if (t.trackingID != -1) {
        evt.preventDefault();
        var n = this._findDelta(evt);
        if (n) {
          var i = t.listener;
          t.trackingID = -1, t.listener = null;
          var o = t.historyTime.length,
            r = {
              x: 0,
              y: 0
            };
          if (o > 2)
            for (var a = t.historyTime.length - 1, s = t.historyTime[a], l = t.historyX[a], c = t.historyY[a]; a > 0;) {
              a--;
              var d = t.historyTime[a],
                u = s - d;
              if (u > 30 && u < 50) {
                r.x = (l - t.historyX[a]) / (u / 1e3), r.y = (c - t.historyY[a]) / (u / 1e3);
                break
              }
            }
          t.historyTime = [], t.historyX = [], t.historyY = [], i && i.onTouchEnd && i.onTouchEnd(n.x, n.y, r)
        }
      }
    }
  })
}()

// wx-progress
window.exparser.registerElement({
  is: "wx-progress",
  template: '\n    <div class="wx-progress-bar" style.height="{{strokeWidth}}px">\n      <div class="wx-progress-inner-bar" style.width="{{curPercent}}%" style.background-color="{{color}}"></div>\n    </div>\n    <diffProps class="wx-progress-info" parse-text-content hidden$="{{!showInfo}}">\n      {{curPercent}}%\n    </diffProps>\n  ',
  behaviors: ["wx-base"],
  properties: {
    percent: {
      type: Number,
      observer: "percentChange",
      public: !0
    },
    curPercent: {
      type: Number
    },
    showInfo: {
      type: Boolean,
      value: !1,
      public: !0
    },
    strokeWidth: {
      type: Number,
      value: 6,
      public: !0
    },
    color: {
      type: String,
      value: "#09BB07",
      public: !0
    },
    active: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "activeAnimation"
    }
  },
  percentChange: function (e) {
    e > 100 && (this.percent = 100), e < 0 && (this.percent = 0), this.__timerId && clearInterval(this.__timerId), this.activeAnimation(this.active)
  },
  activeAnimation: function (e) {
    if (!isNaN(this.percent))
      if (e) {
        var t = function () {
          return this.percent <= this.curPercent + 1 ? (this.curPercent = this.percent, void clearInterval(this.__timerId)) : void++this.curPercent
        };
        this.curPercent = 0, this.__timerId = setInterval(t.bind(this), 30), t.call(this)
      } else this.curPercent = this.percent
  },
  detached: function () {
    this.__timerId && clearInterval(this.__timerId)
  }
})


// wx-radio
window.exparser.registerElement({
  is: "wx-radio",
  template: '\n    <div class="wx-radio-wrapper">\n      <div id="input" class="wx-radio-input" class.wx-radio-input-checked="{{checked}}" class.wx-radio-input-disabled="{{disabled}}" style.background-color="{{_getColor(checked,color)}}" style.border-color="{{_getColor(checked,color)}}"></div>\n      <slot></slot>\n    </div>\n  ',
  behaviors: ["wx-base", "wx-label-target", "wx-disabled", "wx-item"],
  properties: {
    color: {
      type: String,
      value: "#09BB07",
      public: !0
    }
  },
  listeners: {
    tap: "_inputTap"
  },
  _getColor: function (e, t) {
    return e ? t : ""
  },
  _inputTap: function () {
    return !this.disabled && void(this.checked || (this.checked = !0, this.changedByTap()))
  },
  handleLabelTap: function () {
    this._inputTap()
  }
})

// wx-radio-group
window.exparser.registerElement({
  is: "wx-radio-group",
  template: "\n    <slot></slot>\n  ",
  behaviors: ["wx-base", "wx-data-component", "wx-group"],
  properties: {
    value: {
      type: String
    }
  },
  created: function () {
    this._selectedItem = null
  },
  addItem: function (e) {
    e.checked && (this._selectedItem && (this._selectedItem.checked = !1), this.value = e.value, this._selectedItem = e)
  },
  removeItem: function (e) {
    this._selectedItem === e && (this.value = "", this._selectedItem = null)
  },
  renameItem: function (e, t) {
    this._selectedItem === e && (this.value = t)
  },
  changed: function (e) {
    this._selectedItem === e ? this.removeItem(e) : this.addItem(e)
  }
})

// wx-scroll-view
window.exparser.registerElement({
  is: "wx-scroll-view",
  template: '\n    <div id="main" class="wx-scroll-view" style$="overflow-x: hidden; overflow-y: hidden;">\n      <slot></slot>\n    </div>\n  ',
  behaviors: ["wx-base", "wx-touchtrack"],
  properties: {
    scrollX: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "_scrollXChanged"
    },
    scrollY: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "_scrollYChanged"
    },
    upperThreshold: {
      type: Number,
      value: 50,
      public: !0
    },
    lowerThreshold: {
      type: Number,
      value: 50,
      public: !0
    },
    scrollTop: {
      type: Number,
      coerce: "_scrollTopChanged",
      public: !0
    },
    scrollLeft: {
      type: Number,
      coerce: "_scrollLeftChanged",
      public: !0
    },
    scrollIntoView: {
      type: String,
      coerce: "_srollIntoViewChanged",
      public: !0
    }
  },
  created: function () {
    this._lastScrollTop = this.scrollTop || 0, this._lastScrollLeft = this.scrollLeft || 0, this.touchtrack(this.$.main, "_handleTrack")
  },
  attached: function () {
    var e = this;
    this._scrollTopChanged(this.scrollTop), this._scrollLeftChanged(this.scrollLeft), this._srollIntoViewChanged(this.scrollIntoView), this.__handleScroll = function (t) {
      t.preventDefault(), t.stopPropagation(), e._handleScroll.bind(e, t)()
    }, this.__handleTouchMove = function (t) {
      e._checkBounce();
      var n = t.touches[0].pageY,
        i = e.$.main;
      e.__touchStartY < n ? i.scrollTop > 0 && t.stopPropagation() : i.scrollHeight > i.offsetHeight + i.scrollTop && t.stopPropagation()
    }, this.__handleTouchStart = function (t) {
      e.__touchStartY = t.touches[0].pageY, WeixinJSBridge.invoke("disableScrollBounce", {
        disable: !0
      }, function () {
      });
      var n = e.$.main;
      e._touchScrollTop = e.$.main.scrollTop, e._touchScrollLeft = e.$.main.scrollLeft, e._touchScrollBottom = e._touchScrollTop + n.offsetHeight === n.scrollHeight, e._touchScrollRight = e._touchScrollLeft + n.offsetWidth === n.scrollWidth
    }, this.__handleTouchEnd = function () {
      WeixinJSBridge.invoke("disableScrollBounce", {
        disable: !1
      }, function () {
      })
    }, this.$.main.addEventListener("touchstart", this.__handleTouchStart), this.$.main.addEventListener("touchmove", this.__handleTouchMove), this.$.main.addEventListener("touchend", this.__handleTouchEnd), this.$.main.addEventListener("scroll", this.__handleScroll), this.$.main.style.overflowX = this.scrollX ? "auto" : "hidden", this.$.main.style.overflowY = this.scrollY ? "auto" : "hidden";
    var t = window.navigator.userAgent.toLowerCase();
    if (!/wechatdevtools/.test(t) && /iphone/.test(t)) {
      document.getElementById("__scroll_view_hack") && document.body.removeChild(document.getElementById("__scroll_view_hack"));
      var n = document.createElement("div");
      n.setAttribute("style", "position: fixed; left: 0; bottom: 0; line-height: 1; font-size: 1px; z-index: 10000; border-radius: 4px; box-shadow: 0 0 8px rgba(0,0,0,.4); width: 1px; height: 1px; overflow: hidden;"), n.innerText = ".", n.id = "__scroll_view_hack", document.body.appendChild(n)
    }
  },
  detached: function () {
    this.$.main.removeEventListener("scroll", this.__handleScroll), this.$.main.removeEventListener("touchstart", this.__handleTouchStart), this.$.main.removeEventListener("touchmove", this.__handleTouchMove), this.$.main.removeEventListener("touchend", this.__handleTouchEnd)
  },
  _getStyle: function (e, t) {
    var n = e ? "auto" : "hidden",
      i = t ? "auto" : "hidden";
    return "overflow-x: " + n + "; overflow-y: " + i + ";"
  },
  _handleTrack: function (e) {
    return "start" === e.detail.state ? (this._x = e.detail.x, this._y = e.detail.y, void(this._noBubble = null)) : ("end" === e.detail.state && (this._noBubble = !1), null === this._noBubble && this.scrollY && (Math.abs(this._y - e.detail.y) / Math.abs(this._x - e.detail.x) > 1 ? this._noBubble = !0 : this._noBubble = !1), null === this._noBubble && this.scrollX && (Math.abs(this._x - e.detail.x) / Math.abs(this._y - e.detail.y) > 1 ? this._noBubble = !0 : this._noBubble = !1), this._x = e.detail.x, this._y = e.detail.y, void(this._noBubble && e.stopPropagation()))
  },
  _handleScroll: function (e) {
    this._bounce || (clearTimeout(this._timeout), this._timeout = setTimeout(function () {
      var e = this.$.main;
      if (this.triggerEvent("scroll", {
          scrollLeft: e.scrollLeft,
          scrollTop: e.scrollTop,
          scrollHeight: e.scrollHeight,
          scrollWidth: e.scrollWidth,
          deltaX: this._lastScrollLeft - e.scrollLeft,
          deltaY: this._lastScrollTop - e.scrollTop
        }), this.scrollY) {
        var t = this._lastScrollTop - e.scrollTop > 0,
          n = this._lastScrollTop - e.scrollTop < 0;
        e.scrollTop <= this.upperThreshold && t && this.triggerEvent("scrolltoupper", {
          direction: "top"
        }), e.scrollTop + e.offsetHeight + this.lowerThreshold >= e.scrollHeight && n && this.triggerEvent("scrolltolower", {
          direction: "bottom"
        })
      }
      if (this.scrollX) {
        var i = this._lastScrollLeft - e.scrollLeft > 0,
          o = this._lastScrollLeft - e.scrollLeft < 0;
        e.scrollLeft <= this.upperThreshold && i && this.triggerEvent("scrolltoupper", {
          direction: "left"
        }), e.scrollLeft + e.offsetWidth + this.lowerThreshold >= e.scrollWidth && o && this.triggerEvent("scrolltolower", {
          direction: "right"
        })
      }
      this.scrollTop = this._lastScrollTop = e.scrollTop, this.scrollLeft = this._lastScrollLeft = e.scrollLeft
    }.bind(this), 50))
  },
  _checkBounce: function () {
    var e = this,
      t = e.$.main;
    0 === e._touchScrollTop && (!e._bounce && t.scrollTop < 0 && (e._bounce = !0), e._bounce && t.scrollTop > 0 && (e._bounce = !1)), 0 === e._touchScrollLeft && (!e._bounce && t.scrollLeft < 0 && (e._bounce = !0), e._bounce && t.scrollLeft > 0 && (e._bounce = !1)), e._touchScrollBottom && (!e._bounce && t.scrollTop > e._touchScrollTop && (e._bounce = !0), e._bounce && t.scrollTop < e._touchScrollTop && (e._bounce = !1)), e._touchScrollRight && (!e._bounce && t.scrollLeft > e._touchScrollLeft && (e._bounce = !0), e._bounce && t.scrollLeft < e._touchScrollLeft && (e._bounce = !1))
  },
  _scrollXChanged: function (e) {
    this.$.main.style.overflowX = e ? "auto" : "hidden"
  },
  _scrollYChanged: function (e) {
    this.$.main.style.overflowY = e ? "auto" : "hidden"
  },
  _scrollTopChanged: function (e) {
    this.scrollY && (this.$.main.scrollTop = e)
  },
  _scrollLeftChanged: function (e) {
    this.scrollX && (this.$.main.scrollLeft = e)
  },
  _srollIntoViewChanged: function (e) {
    if (e) {
      if (Number(e[0]) >= 0 && Number(e[0]) <= 9) return console.group('scroll-into-view="' + e + '" 有误'), console.warn("id属性不能以数字开头"), void console.groupEnd();
      var t = this.$$.querySelector("#" + e);
      t && (this.$.main.scrollTop = t.offsetTop)
    }
  }
})

// wx-slider
window.exparser.registerElement({
  is: "wx-slider",
  template: '\n    <div class="wx-slider-wrapper" class.wx-slider-disabled="{{disabled}}">\n      <div class="wx-slider-tap-area" id="wrapper">\n        <div class="wx-slider-handle-wrapper" style.background-color="{{color}}">\n          <div class="wx-slider-handle" style.left="{{_getValueWidth(value,min,max)}}" id="handle"></div>\n          <div class="wx-slider-track" style.width="{{_getValueWidth(value,min,max)}}" style.background-color="{{selectedColor}}"></div>\n          <div class="wx-slider-step" id="step"></div>\n        </div>\n      </div>\n      <span hidden$="{{!showValue}}" class="wx-slider-value">\n        <diffProps parse-text-content>{{value}}</diffProps>\n      </span>\n    </div>\n  ',
  properties: {
    min: {
      type: Number,
      value: 0,
      public: !0,
      observer: "_revalicateRange"
    },
    max: {
      type: Number,
      value: 100,
      public: !0,
      observer: "_revalicateRange"
    },
    step: {
      type: Number,
      value: 1,
      public: !0
    },
    value: {
      type: Number,
      value: 0,
      public: !0,
      coerce: "_filterValue"
    },
    showValue: {
      type: Boolean,
      value: !1,
      public: !0
    },
    color: {
      type: String,
      value: "#e9e9e9"
    },
    selectedColor: {
      type: String,
      value: "#1aad19"
    }
  },
  listeners: {
    "wrapper.tap": "_onTap"
  },
  behaviors: ["wx-base", "wx-data-component", "wx-disabled", "wx-touchtrack"],
  created: function () {
    this.touchtrack(this.$.handle, "_onTrack")
  },
  _filterValue: function (e) {
    if (e < this.min) return this.min;
    if (e > this.max) return this.max;
    var t = Math.round((e - this.min) / this.step);
    return t * this.step + this.min
  },
  _revalicateRange: function () {
    this.value = this._filterValue(this.value)
  },
  _getValueWidth: function (e, t, n) {
    return 100 * (e - t) / (n - t) + "%"
  },
  _getXPosition: function (e) {
    for (var t = e.offsetLeft; e; e = e.offsetParent) t += e.offsetLeft;
    return t - document.body.scrollLeft
  },
  _onUserChangedValue: function (e) {
    var t = this.$.step.offsetWidth,
      n = this._getXPosition(this.$.step),
      i = (e.detail.x - n) * (this.max - this.min) / t + this.min;
    i = this._filterValue(i), this.value = i
  },
  _onTrack: function (e) {
    if (!this.disabled) return "move" === e.detail.state ? (this._onUserChangedValue(e), !1) : void("end" === e.detail.state && this.triggerEvent("change", {
        value: this.value
      }))
  },
  _onTap: function (e) {
    this.disabled || (this._onUserChangedValue(e), this.triggerEvent("change", {
      value: this.value
    }))
  },
  resetFormData: function () {
    this.value = this.min
  }
})

// wx-swiper
window.exparser.registerElement({
  is: "wx-swiper",
  template: '\n    <div id="slidesWrapper" class="wx-swiper-wrapper">\n      <div id="slides" class="wx-swiper-slides">\n        <slot></slot>\n      </div>\n      <div id="slidesDots" hidden$="{{!indicatorDots}}" class="wx-swiper-dots" class.wx-swiper-dots-horizontal="{{!vertical}}" class.wx-swiper-dots-vertical="{{vertical}}">\n      </div>\n    </div>\n  ',
  behaviors: ["wx-base", "wx-touchtrack"],
  properties: {
    indicatorDots: {
      type: Boolean,
      value: !1,
      public: !0
    },
    vertical: {
      type: Boolean,
      value: !1,
      observer: "_initSlides",
      public: !0
    },
    autoplay: {
      type: Boolean,
      value: !1,
      observer: "_autoplayChanged",
      public: !0
    },
    circular: {
      type: Boolean,
      value: !1,
      observer: "_initSlides",
      public: !0
    },
    interval: {
      type: Number,
      value: 5e3,
      public: !0,
      observer: "_autoplayChanged"
    },
    duration: {
      type: Number,
      value: 500,
      public: !0
    },
    current: {
      type: Number,
      value: 0,
      observer: "_currentSlideChanged",
      public: !0
    }
  },
  listeners: {
    "slidesDots.tap": "_handleDotTap",
    "slides.canceltap": "_handleSlidesCancelTap",
    "this.wxSwiperItemChanged": "_itemChanged"
  },
  created: function () {
    this.touchtrack(this.$.slides, "_handleContentTrack")
  },
  attached: function () {
    this._attached = !0, this._initSlides(), this.autoplay && this._scheduleNextSlide()
  },
  detached: function () {
    this._attached = !1, this._cancelSchedule()
  },
  _initSlides: function () {
    if (this._attached) {
      this._cancelSchedule();
      var e = this._items = [],
        t = function t(n) {
          for (var i = 0; i < n.childNodes.length; i++) {
            var o = n.childNodes[i];
            o instanceof exparser.Element && (o.hasBehavior("wx-swiper-item") ? e.push(o) : t(o))
          }
        };
      t(this);
      var n = e.length;
      this._slideCount = n;
      var i = -1;
      this._isCurrentSlideLegal(this.current) && (i = this.current, this.autoplay && this._scheduleNextSlide()), this._viewport = i, this._itemPos = [];
      for (var o = 0; o < e.length; o++) e[o]._clearTransform(), i >= 0 ? this._updateItemPos(o, o - i) : this._updateItemPos(o, -1);
      this._updateDots(i)
    }
  },
  _updateViewport: function (e, t) {
    var n = this,
      i = this._viewport;
    this._viewport = e;
    var o = this._slideCount,
      r = function (r) {
        var a = (r % o + o) % o;
        n.circular && n._slideCount > 1 || (r = a);
        var s = !1;
        t && (i <= e ? i - 1 <= r && r <= e + 1 && (s = !0) : e - 1 <= r && r <= i + 1 && (s = !0)), s ? n._updateItemPos(a, r - e, r - i) : n._updateItemPos(a, r - e)
      };
    if (i < e)
      for (var a = Math.ceil(e), s = 0; s < o; s++) r(s + a - o + 1);
    else
      for (var l = Math.floor(e), c = 0; c < o; c++) r(c + l)
  },
  _updateDots: function (e) {
    var t = this.$.slidesDots;
    t.innerHTML = "";
    for (var n = document.createDocumentFragment(), i = 0; i < this._slideCount; i++) {
      var o = document.createElement("div");
      o.setAttribute("data-dot-index", i), i === e ? o.setAttribute("class", "wx-swiper-dot wx-swiper-dot-active") : o.setAttribute("class", "wx-swiper-dot"), n.appendChild(o)
    }
    t.appendChild(n)
  },
  _gotoSlide: function (e, t) {
    if (this._slideCount) {
      if (this._updateDots(e), this.circular && this._slideCount > 1) {
        var n = Math.round(this._viewport),
          i = Math.floor(n / this._slideCount),
          o = i * this._slideCount + e;
        t > 0 ? o < n && (o += this._slideCount) : t < 0 && o > n && (o -= this._slideCount), this._updateViewport(o, !0)
      } else this._updateViewport(e, !0);
      this.autoplay && this._scheduleNextSlide()
    }
  },
  _updateItemPos: function (e, t, n) {
    if (void 0 !== n || this._itemPos[e] !== t) {
      this._itemPos[e] = t;
      var i = "0ms",
        o = "",
        r = "";
      void 0 !== n && (i = this.duration + "ms", r = this.vertical ? "translate(0," + 100 * n + "%) translateZ(0)" : "translate(" + 100 * n + "%,0) translateZ(0)"), o = this.vertical ? "translate(0," + 100 * t + "%) translateZ(0)" : "translate(" + 100 * t + "%,0) translateZ(0)", this._items[e]._setTransform(i, o, r)
    }
  },
  _stopItemsAnimation: function () {
    for (var e = 0; e < this._slideCount; e++) {
      var t = this._items[e];
      t._clearTransform()
    }
  },
  _scheduleNextSlide: function () {
    var e = this;
    this._cancelSchedule(), this._attached && (this._scheduleTimeoutObj = setTimeout(function () {
      e._scheduleTimeoutObj = null, e._nextDirection = 1, e.current = e._normalizeCurrentSlide(e.current + 1)
    }, this.interval))
  },
  _cancelSchedule: function () {
    this._scheduleTimeoutObj && (clearTimeout(this._scheduleTimeoutObj), this._scheduleTimeoutObj = null)
  },
  _normalizeCurrentSlide: function (e) {
    return this._slideCount ? (Math.round(e) % this._slideCount + this._slideCount) % this._slideCount : 0
  },
  _isCurrentSlideLegal: function (e) {
    return this._slideCount ? e === this._normalizeCurrentSlide(e) : 0
  },
  _autoplayChanged: function (e) {
    e ? this._scheduleNextSlide() : this._cancelSchedule()
  },
  _currentSlideChanged: function (e, t) {
    return this._isCurrentSlideLegal(e) && this._isCurrentSlideLegal(t) ? (this._gotoSlide(e, this._nextDirection || 0), this._nextDirection = 0, void(e !== t && this.triggerEvent("change", {
        current: this.current
      }))) : void this._initSlides()
  },
  _itemChanged: function (e) {
    return e.target._relatedSwiper = this, this._initSlides(), !1
  },
  _getDirectionName: function (e) {
    return e ? "vertical" : "horizontal"
  },
  _handleDotTap: function (e) {
    if (this._isCurrentSlideLegal(this.current)) {
      var t = Number(e.target.dataset.dotIndex);
      this.current = t
    }
  },
  _handleSlidesCancelTap: function () {
    this._userWaitingCancelTap = !1
  },
  _handleTrackStart: function () {
    this._cancelSchedule(), this._contentTrackViewport = this._viewport, this._contentTrackSpeed = 0, this._contentTrackT = Date.now(), this._stopItemsAnimation()
  },
  _handleTrackMove: function (e) {
    var t = this,
      n = this._contentTrackT;
    this._contentTrackT = Date.now();
    var i = this._slideCount,
      o = function (e) {
        return .5 - .25 / (e + .5)
      },
      r = function (e, n) {
        var r = t._contentTrackViewport + e;
        t._contentTrackSpeed = .6 * t._contentTrackSpeed + .4 * n, t.circular && t._slideCount > 1 || (r < 0 || r > i - 1) && (r < 0 ? r = -o(-r) : r > i - 1 && (r = i - 1 + o(r - (i - 1))), t._contentTrackSpeed = 0), t._updateViewport(r, !1)
      };
    this.vertical ? r(-e.dy / this.$.slidesWrapper.offsetHeight, -e.ddy / (this._contentTrackT - n)) : r(-e.dx / this.$.slidesWrapper.offsetWidth, -e.ddx / (this._contentTrackT - n))
  },
  _handleTrackEnd: function () {
    this.autoplay && this._scheduleNextSlide(), this._tracking = !1;
    var e = 0;
    Math.abs(this._contentTrackSpeed) > .2 && (e = .5 * this._contentTrackSpeed / Math.abs(this._contentTrackSpeed));
    var t = this._normalizeCurrentSlide(this._viewport + e);
    this.current !== t ? (this._nextDirection = this._contentTrackSpeed, this.current = t) : this._gotoSlide(t, 0), this.autoplay && this._scheduleNextSlide()
  },
  _handleContentTrack: function (e) {
    if (this._isCurrentSlideLegal(this.current)) {
      if ("start" === e.detail.state) return this._userTracking = !0, this._userWaitingCancelTap = !1, this._userDirectionChecked = !1, this._handleTrackStart();
      if (this._userTracking) {
        if (this._userWaitingCancelTap) return !1;
        if (!this._userDirectionChecked) {
          this._userDirectionChecked = !0;
          var t = Math.abs(e.detail.dx),
            n = Math.abs(e.detail.dy);
          if (t >= n && this.vertical ? this._userTracking = !1 : t <= n && !this.vertical && (this._userTracking = !1), !this._userTracking) return void(this.autoplay && this._scheduleNextSlide())
        }
        return "end" === e.detail.state ? this._handleTrackEnd(e.detail) : (this._handleTrackMove(e.detail), !1)
      }
    }
  }
})


// wx-swiper-item
!function () {
  var e = 1,
    t = null,
    n = [],
    i = function (i, o) {
      var r = e++;
      n.push({
        id: r,
        self: i,
        func: o,
        frames: 2
      });
      var a = function e() {
        t = null;
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          o.frames--, o.frames || (o.func.call(o.self), n.splice(i--, 1))
        }
        t = n.length ? requestAnimationFrame(e) : null
      };
      return t || (t = requestAnimationFrame(a)), r
    },
    o = function (e) {
      for (var t = 0; t < n.length; t++)
        if (n[t].id === e) return void n.splice(t, 1)
    };
  window.exparser.registerElement({
    is: "wx-swiper-item",
    template: "\n    <slot></slot>\n  ",
    properties: {},
    listeners: {
      "this.wxSwiperItemChanged": "_invalidChild"
    },
    behaviors: ["wx-base"],
    _invalidChild: function (e) {
      if (e.target !== this) return !1
    },
    _setDomStyle: function () {
      var e = this.$$;
      e.style.position = "absolute", e.style.width = "100%", e.style.height = "100%"
    },
    attached: function () {
      this._setDomStyle(), this._pendingTimeoutId = 0, this._pendingTransform = "", this._relatedSwiper = null, this.triggerEvent("wxSwiperItemChanged", void 0, {
        bubbles: !0
      })
    },
    detached: function () {
      this._clearTransform(), this._relatedSwiper && (this._relatedSwiper.triggerEvent("wxSwiperItemChanged"), this._relatedSwiper = null)
    },
    _setTransform: function (e, t, n) {
      n ? (this.$$.style.transitionDuration = "0ms", this.$$.style["-webkit-transform"] = n, this.$$.style.transform = n, this._pendingTransform = t, this._pendingTimeoutId = i(this, function () {
          this.$$.style.transitionDuration = e, this.$$.style["-webkit-transform"] = t, this.$$.style.transform = t
        })) : (this._clearTransform(), this.$$.style.transitionDuration = e, this.$$.style["-webkit-transform"] = t, this.$$.style.transform = t)
    },
    _clearTransform: function () {
      this.$$.style.transitionDuration = "0ms", this._pendingTimeoutId && (this.$$.style["-webkit-transform"] = this._pendingTransform, this.$$.style.transform = this._pendingTransform, o(this._pendingTimeoutId), this._pendingTimeoutId = 0)
    }
  })
}()

// wx-switch
window.exparser.registerElement({
  is: "wx-switch",
  template: '\n    <div class="wx-switch-wrapper">\n      <div hidden$="{{!isSwitch(type)}}" id="switchInput" type="checkbox" class="wx-switch-input" class.wx-switch-input-checked="{{checked}}" class.wx-switch-input-disabled="{{disabled}}" style.background-color="{{color}}" style.border-color="{{_getSwitchBorderColor(checked,color)}}"></div>\n      <div hidden$="{{!isCheckbox(type)}}" id="checkboxInput" type="checkbox" class="wx-checkbox-input" class.wx-checkbox-input-checked="{{checked}}" class.wx-checkbox-input-disabled="{{disabled}}" style.color="{{color}}"></div>\n    </div>\n  ',
  properties: {
    checked: {
      type: Boolean,
      value: !1,
      public: !0
    },
    type: {
      type: String,
      value: "switch",
      public: !0
    },
    color: {
      type: String,
      value: "#04BE02",
      public: !0
    }
  },
  behaviors: ["wx-base", "wx-label-target", "wx-disabled", "wx-data-component"],
  listeners: {
    "switchInput.tap": "onInputChange",
    "checkboxInput.tap": "onInputChange"
  },
  _getSwitchBorderColor: function (e, t) {
    return e ? t : ""
  },
  handleLabelTap: function (e) {
    this.disabled || (this.checked = !this.checked)
  },
  onInputChange: function (e) {
    return this.checked = !this.checked, this.disabled ? void(this.checked = !this.checked) : void this.triggerEvent("change", {
        value: this.checked
      })
  },
  isSwitch: function (e) {
    return "checkbox" !== e
  },
  isCheckbox: function (e) {
    return "checkbox" === e
  },
  getFormData: function () {
    return this.checked
  },
  resetFormData: function () {
    this.checked = !1
  }
})

// wx-text
window.exparser.registerElement({
  is: "wx-text",
  template: '\n    <span id="raw" style="display:none;"><slot></slot></span>\n    <span id="main"></span>\n  ',
  behaviors: ["wx-base"],
  properties: {
    style: {
      type: String,
      public: !0,
      observer: "_styleChanged"
    },
    class: {
      type: String, public: !0, observer: "_classChanged"
    },
    selectable: {
      type: Boolean,
      value: !1,
      public: !0
    }
  },
  _styleChanged: function (e) {
    this.$$.setAttribute("style", e)
  },
  _classChanged: function (e) {
    this.$$.setAttribute("class", e)
  },
  _htmlEncode: function (e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
  },
  _update: function () {
    for (var e = this.$.raw, t = document.createDocumentFragment(), n = 0, i = e.childNodes.length; n < i; n++) {
      var o = e.childNodes.item(n);
      if (o.nodeType === o.TEXT_NODE) {
        var r = document.createElement("span");
        r.innerHTML = this._htmlEncode(o.textContent).replace(/\n/g, "<br>"), t.appendChild(r)
      } else o.nodeType === o.ELEMENT_NODE && "WX-TEXT" === o.tagName && t.appendChild(o.cloneNode(!0))
    }
    this.$.main.innerHTML = "", this.$.main.appendChild(t)
  },
  created: function () {
    this._observer = exparser.Observer.observer.create(function () {
      this._update()
    }), this._observer.observe(this, {
      childList: !0,
      subtree: !0,
      characterData: !0,
      properties: !0
    })
  },
  attached: function () {
    this._update()
  }
});


// wx-textarea
!function () {
  /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) && window.exparser.registerElement({
    is: "wx-textarea",
    behaviors: ["wx-base", "wx-data-component"],
    template: '<div id="wrapped">\n      <div id="placeholder" parse-text-content>\n        {{placeholder}}\n      </div>\n      <textarea id="textarea" maxlength$="{{_getMaxlength(maxlength)}}" ></textarea>\n      <div id="compute" class="compute"></div>\n      <div id="stylecompute" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{_getPlaceholderStyle(placeholderStyle)}}" ></div>\n    </div>\n    ',
    properties: {
      value: {
        type: String,
        value: "",
        public: !0,
        coerce: "defaultValueChange"
      },
      maxlength: {
        type: Number,
        value: 140,
        public: !0,
        observer: "maxlengthChanged"
      },
      placeholder: {
        type: String,
        value: "",
        public: !0
      },
      hidden: {
        type: Boolean,
        value: !1,
        public: !0
      },
      disabled: {
        type: Boolean,
        value: !1,
        public: !0
      },
      focus: {
        type: Number,
        value: 0,
        public: !0,
        coerce: "focusChanged"
      },
      autoFocus: {
        type: Boolean,
        value: !1,
        public: !0
      },
      placeholderClass: {
        type: String,
        value: "textarea-placeholder",
        observer: "_getComputePlaceholderStyle",
        public: !0
      },
      placeholderStyle: {
        type: String,
        value: "",
        observer: "_getComputePlaceholderStyle",
        public: !0
      },
      autoHeight: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "autoHeightChanged"
      },
      bindinput: {
        type: String,
        value: "",
        public: !0
      }
    },
    listeners: {
      "textarea.input": "onTextAreaInput",
      "textarea.focus": "onTextAreaFocus",
      "textarea.blur": "onTextAreaBlur"
    },
    resetFormData: function () {
      this.$.textarea.value = ""
      this.value = ""
    },
    getFormData: function (e) {
      var t = this;
      this.value = this.$.textarea.value
      setTimeout(function () {
        "function" == typeof e && e(t.value)
      }, 0)
    },
    couldFocus: function (e) {
      var t = this;
      this.__attached && (!this._keyboardShow && e ? this.disabled || window.requestAnimationFrame(function () {
          t.$.textarea.focus()
        }) : this._keyboardShow && !e && this.$.textarea.blur())
    },
    focusChanged: function (e, t) {
      return this.couldFocus(Boolean(e)), e
    },
    attached: function () {
      var e = this;
      this.__attached = !0, this.__scale = 750 / window.innerWidth, this.getComputedStyle(), this.checkRows(this.value), this.__updateTextArea = this.updateTextArea.bind(this), document.addEventListener("pageReRender", this.__updateTextArea), this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function () {
        e.checkAutoFocus()
      }), this.checkPlaceholderStyle(this.value)
    },
    checkAutoFocus: function () {
      this.__autoFocused || (this.__autoFocused = !0, this.couldFocus(this.autoFocus || this.focus))
    },
    detached: function () {
      document.removeEventListener("pageReRender", this.__updateTextArea)
      exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId)
    },
    getHexColor: function (e) {
      try {
        var t, n, i = function () {
          if (e.indexOf("#") >= 0) return {
            v: e
          };
          t = e.match(/\d+/g);
          var i = [];
          return t.map(function (e, t) {
            if (t < 3) {
              var n = parseInt(e);
              n = n > 9 ? n.toString(16) : "0" + n, i.push(n)
            }
          }), t.length > 3 && (n = parseFloat(t.slice(3).join(".")), 0 == n ? i.push("00") : n >= 1 ? i.push("ff") : (n = parseInt(255 * n), n = n > 9 ? n.toString(16) : "0" + n, i.push(n))), {
            v: "#" + i.join("")
          }
        }();
        if ("object" === ("undefined" == typeof i ? "undefined" : _typeof(i))) return i.v
      } catch (e) {
        return ""
      }
    },
    getComputedStyle: function () {
      var e = this;
      window.requestAnimationFrame(function () {
        var t = window.getComputedStyle(e.$$),
          n = e.$$.getBoundingClientRect(),
          i = ["Left", "Right"].map(function (e) {
            return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
          }),
          o = ["Top", "Bottom"].map(function (e) {
            return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
          }),
          r = e.$.textarea;
        r.style.width = n.width - i[0] - i[1] + "px", r.style.height = n.height - o[0] - o[1] + "px", r.style.fontWeight = t.fontWeight, r.style.fontSize = t.fontSize || "16px", r.style.color = t.color, e.$.compute.style.fontSize = t.fontSize || "16px", e.$.compute.style.width = r.style.width, e.$.placeholder.style.width = r.style.width, e.$.placeholder.style.height = r.style.height, e.disabled ? r.setAttribute("disabled", !0) : r.removeAttribute("disabled")
      })
    },
    getCurrentRows: function (e) {
      var t = window.getComputedStyle(this.$.compute),
        n = 1.2 * (parseFloat(t.fontSize) || 16);
      return this.$.compute.innerText = e, this.$.compute.appendChild(document.createElement("br")), {
        height: Math.max(this.$.compute.scrollHeight, n),
        heightRpx: this.__scale * this.$.compute.scrollHeight,
        lineHeight: n,
        lineCount: Math.ceil(this.$.compute.scrollHeight / n)
      }
    },
    onTextAreaInput: function (e) {
      if (this.value = e.target.value, this.bindinput) {
        var t = {
          id: this.$$.id,
          dataset: this.dataset,
          offsetTop: this.$$.offsetTop,
          offsetLeft: this.$$.offsetLeft
        };
        WeixinJSBridge.publish("SPECIAL_PAGE_EVENT", {
          eventName: this.bindinput,
          ext: {
            setKeyboardValue: !1
          },
          data: {
            data: {
              type: "input",
              timestamp: Date.now(),
              detail: {
                value: e.target.value
              },
              target: t,
              currentTarget: t,
              touches: []
            },
            eventName: this.bindinput
          }
        })
      }
      return !1
    },
    onTextAreaFocus: function (e) {
      this._keyboardShow = !0, this.triggerEvent("focus", {
        value: this.value
      })
    },
    onTextAreaBlur: function (e) {
      this._keyboardShow = !1, this.triggerEvent("blur", {
        value: this.value
      })
    },
    updateTextArea: function () {
      this.checkAutoFocus(), this.getComputedStyle(), this.autoHeightChanged(this.autoHeight)
    },
    hiddenChanged: function (e, t) {
      this.$$.style.display = e ? "none" : ""
    },
    _getPlaceholderStyle: function (e) {
      return e + ";display:none;"
    },
    _getComputePlaceholderStyle: function () {
      var e = this.$.stylecompute,
        t = window.getComputedStyle(e),
        n = parseInt(t.fontWeight);
      isNaN(n) ? n = t.fontWeight : n < 500 ? n = "normal" : n >= 500 && (n = "bold"), this.placeholderStyle && this.placeholderStyle.split(";");
      var i = this.$.placeholder;
      i.style.position = "absolute", i.style.fontSize = (parseFloat(t.fontSize) || 16) + "px", i.style.fontWeight = n, i.style.color = this.getHexColor(t.color)
    },
    defaultValueChange: function (e) {
      return this.maxlength > 0 && e.length > this.maxlength && (e = e.slice(0, this.maxlength)), this.checkPlaceholderStyle(e), this.$.textarea.value = e, this.__attached && this.checkRows(e), e
    },
    autoHeightChanged: function (e) {
      if (e) {
        var t = this.getCurrentRows(this.value),
          n = t.height < t.lineHeight ? t.lineHeight : t.height;
        this.$$.style.height = n + "px", this.getComputedStyle()
      }
    },
    checkRows: function (e) {
      var t = this.getCurrentRows(e);
      if (this.lastRows != t.lineCount) {
        if (this.lastRows = t.lineCount, this.autoHeight) {
          var n = t.height < t.lineHeight ? t.lineHeight : t.height;
          this.$$.style.height = n + "px", this.getComputedStyle()
        }
        this.triggerEvent("linechange", t)
      }
    },
    checkPlaceholderStyle: function (e) {
      e ? this.$.placeholder.style.display = "none" : (this._getComputePlaceholderStyle(), this.$.placeholder.style.display = "")
    },
    _getPlaceholderClass: function (e) {
      return "textarea-placeholder " + e
    },
    _getMaxlength: function (e) {
      return e <= 0 ? -1 : e
    },
    maxlengthChanged: function (e) {
      e > 0 && this.value.length > e && (this.value = this.value.slice(0, e))
    }
  })
}();

// wx-textarea
!function () {
  /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) || window.exparser.registerElement({
    is: "wx-textarea",
    behaviors: ["wx-base", "wx-native", "wx-data-component"],
    template: '<div id="textarea" >\n          <diffProps id="placeholder" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{_getPlaceholderStyle(placeholderStyle)}}"></diffProps>\n        </div>',
    properties: {
      value: {
        type: String,
        value: "",
        coerce: "defaultValueChange",
        public: !0
      },
      maxlength: {
        type: Number,
        value: 140,
        public: !0
      },
      placeholder: {
        type: String,
        value: "",
        public: !0
      },
      disabled: {
        type: Boolean,
        value: !1,
        public: !0
      },
      hidden: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "hiddenChanged"
      },
      focus: {
        type: Boolean,
        value: !1,
        public: !0,
        coerce: "focusChanged"
      },
      autoFocus: {
        type: Boolean,
        value: !1,
        public: !0
      },
      placeholderStyle: {
        type: String,
        value: "",
        public: !0
      },
      placeholderClass: {
        type: String,
        value: "textarea-placeholder",
        public: !0
      },
      autoHeight: {
        type: Boolean,
        value: !1,
        public: !0
      },
      confirm: {
        type: Boolean,
        value: !0,
        public: !0
      },
      bindinput: {
        type: String,
        value: "",
        public: !0
      },
      cursorSpacing: {
        type: Number,
        value: 0,
        public: !0
      },
      fixed: {
        type: Boolean,
        value: !1,
        public: !0
      }
    },
    resetFormData: function () {
      this._keyboardShow && (this.__formResetCallback = !0, wx.hideKeyboard()), this.value = ""
    },
    getFormData: function (e) {
      this._keyboardShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
    },
    attached: function () {
      var e = this;
      this._isReady = !1, this.__scale = 750 / window.innerWidth, this.__reRenderCallback = this.reRenderCallback.bind(this), document.addEventListener("pageReRender", this.__reRenderCallback, !1), this.__onKeyboardShowId = exparser.addListenerToElement(document, "onKeyboardShow", this.onKeyboardShow.bind(this)), this.__onKeyboardCompleteId = exparser.addListenerToElement(document, "onKeyboardComplete", this.onKeyboardComplete.bind(this)), this.__onTextAreaHeightChangeId = exparser.addListenerToElement(document, "onTextAreaHeightChange", this.onTextAreaHeightChange.bind(this)), this.__onKeyboardConfirmId = exparser.addListenerToElement(document, "onKeyboardConfirm", this.onKeyboardConfirm.bind(this)), this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function () {
        e.checkAutoFocus()
      })
    },
    detached: function () {
      this.__detached = !0, document.removeEventListener("pageReRender", this.__reRenderCallback, !1), exparser.removeListenerFromElement(document, "onKeyboardShow", this.__onKeyboardShowId), exparser.removeListenerFromElement(document, "onKeyboardComplete", this.__onKeyboardCompleteId), exparser.removeListenerFromElement(document, "onTextAreaHeightChange", this.__onTextAreaHeightChangeId), exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId), exparser.removeListenerFromElement(document, "onKeyboardConfirm", this.__onKeyboardConfirmId), this.removeTextArea()
    },
    removeTextArea: function () {
      this.__detached && this._inputId && WeixinJSBridge.invoke("removeTextArea", {
        inputId: this._inputId
      }, function (e) {
      })
    },
    checkInsert: function () {
      this.__insert || (this.insertTextArea(), this.__insert = !0)
    },
    checkAutoFocus: function () {
      this.__autoFocused || window.__onAppRouteDone && (this.__autoFocused = !0, this.couldFocus(this.autoFocus || this.focus))
    },
    couldFocus: function (e) {
      this._isReady && window.__onAppRouteDone && (!this._keyboardShow && e ? this.hidden || this.disabled || !this._inputId || WeixinJSBridge.invoke("showKeyboard", {
          inputId: this._inputId
        }, function (e) {
        }) : this._keyboardShow && !e && wx.hideKeyboard())
    },
    focusChanged: function (e) {
      this.couldFocus(e)
    },
    onKeyboardConfirm: function (e) {
      e.detail.inputId === this._inputId && (this.value = e.detail.value, this.triggerEvent("confirm", {
        value: this.value
      }))
    },
    onKeyboardShow: function (e) {
      e.detail.inputId === this._inputId && (this._keyboardShow = !0, this.triggerEvent("focus", {
        value: this.value
      }))
    },
    onKeyboardComplete: function (e) {
      e.detail.inputId === this._inputId && (this.value = e.detail.value, this.__formResetCallback && (this.value = "", this.__formResetCallback = void 0), "function" == typeof this.__formCallback && this.__formCallback(this.value), this._keyboardShow = !1, this.triggerEvent("blur", {
        value: this.value
      }))
    },
    onTextAreaHeightChange: function (e) {
      e.detail.inputId === this._inputId && (this.triggerEvent("linechange", {
        lineCount: e.detail.lineCount,
        height: e.detail.height,
        heightRpx: e.detail.height * this.__scale
      }), this.styleHeight = e.detail.height + this.invalidHeight, this.autoHeight && (this.$$.style.height = this.styleHeight + "px", document.dispatchEvent(new CustomEvent("pageReRender", {}))))
    },
    getHexColor: function (e) {
      if (!e) return "#000000";
      if (e.indexOf("#") >= 0) return e;
      try {
        var t, n, i = function () {
          t = e.match(/\d+/g);
          var i = [];
          return t.map(function (e, t) {
            if (t < 3) {
              var n = parseInt(e).toString(16);
              n = n.length > 1 ? n : "0" + n, i.push(n)
            }
          }), t.length > 3 && (n = parseFloat(t.slice(3).join(".")), 0 == n ? i.push("00") : n >= 1 ? i.push("ff") : (n = parseInt(255 * n).toString(16), n = n.length > 1 ? n : "0" + n, i.push(n))), {
            v: "#" + i.join("")
          }
        }();
        if ("object" === ("undefined" == typeof i ? "undefined" : _typeof(i))) return i.v
      } catch (e) {
        return "#000000"
      }
    },
    getComputedStyle: function () {
      var e = window.getComputedStyle(this.$$),
        t = this.$$.getBoundingClientRect(),
        n = ["Left", "Right"].map(function (t) {
          return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
        }),
        i = ["Top", "Bottom"].map(function (t) {
          return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
        }),
        o = parseInt(e.fontWeight);
      isNaN(o) ? o = e.fontWeight : o < 500 ? o = "normal" : o >= 500 && (o = "bold"), this.invalidHeight = i[0] + i[1], this.invalidWidth = n[0] + n[1];
      var r = {
        width: t.width - this.invalidWidth,
        left: t.left + n[0] + window.scrollX,
        top: this.fixed ? t.top + i[0] : t.top + i[0] + window.scrollY,
        fontWeight: o,
        fontSize: parseFloat(e.fontSize) || 14,
        color: this.getHexColor(e.color),
        marginBottom: this.cursorSpacing || parseFloat(e.marginBottom)
      };
      return this.autoHeight || (r.height = t.height - this.invalidHeight), r
    },
    getPlaceholderStyle: function () {
      var e = this.$.placeholder,
        t = window.getComputedStyle(e),
        n = parseInt(t.fontWeight);
      return isNaN(n) ? n = t.fontWeight : n < 500 ? n = "normal" : n >= 500 && (n = "bold"), this.placeholderStyle && this.placeholderStyle.split(";"), {
        fontSize: parseFloat(t.fontSize) || 16,
        fontWeight: n,
        color: this.getHexColor(t.color)
      }
    },
    insertTextArea: function () {
      var e = this;
      this.args = this.getCurrrentArgs(), this.args.value = this.value, WeixinJSBridge.invoke("insertTextArea", this.args, function (t) {
        if (/:ok/.test(t.errMsg)) {
          if (e._ready(), e._inputId = t.inputId, e.__detached && e.removeTextArea(), e.checkAutoFocus(), e._isiOS() && (e.triggerEvent("linechange", {
              lineCount: t.lineCount,
              height: t.height,
              heightRpx: t.height * e.__scale
            }), e.styleHeight = t.height + e.invalidHeight, e.autoHeight && (e.$$.style.height = e.styleHeight + "px", document.dispatchEvent(new CustomEvent("pageReRender", {}))), e._needUpdate)) {
            var n = e.getCurrrentArgs();
            n.value = e.value, e.updateTextArea(n)
          }
        } else console.error(t.errMsg)
      })
    },
    diff: function e(t, n) {
      var e = {},
        i = !1;
      for (var o in n) "[object Object]" === Object.prototype.toString.call(n[o]) ? JSON.stringify(n[o]) != JSON.stringify(t[o]) && (e[o] = n[o], i = !0) : t[o] != n[o] && (e[o] = n[o], i = !0);
      return i ? e : void 0
    },
    reRenderCallback: function () {
      var e = this;
      window.requestAnimationFrame(function () {
        e.afterRerender()
      })
    },
    afterRerender: function () {
      if (!this.__detached) {
        this.checkInsert();
        var e = this.getCurrrentArgs();
        this.updateTextArea(e)
      }
    },
    getCurrrentArgs: function () {
      return {
        style: this.getComputedStyle(),
        placeholderStyle: this.getPlaceholderStyle(),
        maxLength: this.maxlength,
        placeholder: this.placeholder,
        disabled: this.disabled,
        hidden: this.hidden,
        autoSize: this.autoHeight,
        confirm: this.confirm,
        data: this.formateEventTarget(),
        fixed: this.fixed
      }
    },
    updateTextArea: function (e) {
      var t = this;
      if (!this._isReady) return void(this._needUpdate = !0);
      this.autoHeight && this.styleHeight && (this.$$.style.height = this.styleHeight + "px");
      var n = this.diff(this.args, e);
      n && (n.inputId = this._inputId, WeixinJSBridge.invoke("updateTextArea", n, function (n) {
        if (/:ok/.test(n.errMsg))
          for (var i in e) t.args[i] = e[i]
      }))
    },
    hiddenChanged: function (e) {
      e && this._keyboardShow && wx.hideKeyboard()
    },
    _getPlaceholderStyle: function (e) {
      return e + ";display:none;"
    },
    _getPlaceholderClass: function (e) {
      return "textarea-placeholder " + e
    },
    defaultValueChange: function (e, t) {
      return this.maxlength > 0 && e.length > this.maxlength && (e = e.slice(0, this.maxlength)), this.args && (this.args.value = void 0), this.updateTextArea({
        value: e
      }), e
    },
    formateEventTarget: function () {
      var e = {
        bindinput: this.bindinput,
        target: {
          id: this.$$.id,
          dataset: this.dataset,
          offsetTop: this.$$.offsetTop,
          offsetLeft: this.$$.offsetLeft
        },
        setKeyboardValue: !1
      };
      return e.currentTarget = e.target, this.bindinput ? JSON.stringify(e) : ""
    }
  })
}()

// wx-toast
window.exparser.registerElement({
  is: "wx-toast",
  template: '\n    <div class="wx-toast-mask" id="mask" style$="{{_getMaskStyle(mask)}}"></div>\n    <div class="wx-toast">\n      <invoke class$="wx-toast-icon wx-icon-{{icon}}" style.color="#FFFFFF" style.font-size="55px" style.display="block"></invoke>\n      <diffProps class="wx-toast-content"><slot></slot></diffProps>\n    </div>\n  ',
  behaviors: ["wx-base", "wx-mask-behavior"],
  properties: {
    icon: {
      type: String,
      value: "success_no_circle",
      public: !0
    },
    hidden: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "hiddenChange"
    },
    duration: {
      type: Number,
      value: 1500,
      public: !0,
      observer: "durationChange"
    }
  },
  durationChange: function (e, t) {
    this.timer && (clearTimeout(this.timer), this.hiddenChange(this.hidden))
  },
  hiddenChange: function (e) {
    if (!e && 0 != this.duration) {
      var t = this;
      this.timer = setTimeout(function () {
        t.triggerEvent("change", {
          value: t.hidden
        })
      }, this.duration)
    }
  }
});


// wx-video not on ios
"ios" !== wx.getPlatform() && window.exparser.registerElement({
  is: "wx-video",
  behaviors: ["wx-base", "wx-player"],
  template: '\n      <div class="wx-video-container">\n        <video id="player" webkit-playsinline style="display: none;"></video>\n        <div id="default" class$="wx-video-bar {{_barType}}" style="display: none;">\n          <div id="controls" class="wx-video-controls">\n            <div id="button" class$="wx-video-button {{_buttonType}}"></div>\n            <div class="wx-video-time" parse-text-content>{{_currentTime}}</div>\n            <div id="progress" class="wx-video-progress">\n              <div id="ball" class="wx-video-ball" style$="left: {{_progressLeft}}px;">\n                <div class="wx-video-inner"></div>\n              </div>\n              <div class="wx-video-inner" style$="width: {{_progressLength}}px;"></div>\n            </div>\n            <div class="wx-video-time" parse-text-content>{{_duration}}</div>\n          </div>\n          <div id="danmuBtn" class$="wx-video-danmu-btn {{_danmuStatus}}" style="display: none">弹幕</div>\n          <div id="fullscreen" class="wx-video-fullscreen"></div>\n        </div>\n        <div id="danmu" class="wx-video-danmu" style="z-index: -9999">\n        </div>\n      </div>\n      <div id="fakebutton"></div>\n    ',
  properties: {
    hidden: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "_hiddenChanged"
    },
    autoplay: {
      type: Boolean,
      value: !1,
      public: !0
    },
    danmuBtn: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "danmuBtnChanged"
    },
    enableDanmu: {
      type: Boolean,
      value: !1,
      observer: "enableDanmuChanged",
      public: !0
    },
    enableFullScreen: {
      type: Boolean,
      value: !1,
      public: !0
    },
    controls: {
      type: Boolean,
      value: !0,
      public: !0,
      observer: "controlsChanged"
    },
    danmuList: {
      type: Array,
      value: [],
      public: !0
    },
    objectFit: {
      type: String,
      value: "contain",
      public: !0,
      observer: "objectFitChanged"
    },
    duration: {
      type: Number,
      value: 0,
      public: !0,
      observer: "durationChanged"
    },
    _videoId: {
      type: Number
    },
    _isLockTimeUpdateProgress: {
      type: Boolean,
      value: !1
    },
    _rate: {
      type: Number,
      value: 0
    },
    _progressLeft: {
      type: Number,
      value: -22
    },
    _progressLength: {
      type: Number,
      value: 0
    },
    _barType: {
      type: String,
      value: "full"
    },
    _danmuStatus: {
      type: String,
      value: ""
    }
  },
  listeners: {
    "ball.touchstart": "onBallTouchStart"
  },
  _reset: function () {
    this._buttonType = "play", this._currentTime = "00:00", this._duration = this._formatTime(this.duration), this._progressLeft = -22, this._progressLength = 0, this._barType = this.controls ? "full" : "part"
  },
  _hiddenChanged: function (e, t) {
    this.$.player.pause(), this.$$.style.display = e ? "none" : ""
  },
  posterChanged: function (e, t) {
    this._isError || (this.$.player.poster = e)
  },
  srcChanged: function (e, t) {
    if (!this._isError && e)
      if ("wechatdevtools" === wx.getPlatform()) {
        this.$.player.src = e.replace("wxfile://", "http://wxfile.open.weixin.qq.com/");
        var n = this;
        setTimeout(function () {
          n._reset()
        }, 0)
      } else {
        this.$.player.src = e;
        var n = this;
        setTimeout(function () {
          n._reset()
        }, 0)
      }
  },
  controlsChanged: function (e, t) {
    this.controls ? this._barType = "full" : this.danmuBtn ? this._barType = "part" : this._barType = "none", this.$.fullscreen.style.display = e ? "block" : "none", this.$.controls.style.display = e ? "flex" : "none"
  },
  objectFitChanged: function (e, t) {
    this.$.player.style.objectFit = e
  },
  durationChanged: function (e, t) {
    console.log("durationChanged", e), e > 0 && (this._duration = this._formatTime(Math.floor(e)))
  },
  danmuBtnChanged: function (e, t) {
    this.controls ? this._barType = "full" : this.danmuBtn ? this._barType = "part" : this._barType = "none", this.$.danmuBtn.style.display = e ? "" : "none"
  },
  enableDanmuChanged: function (e, t) {
    this._danmuStatus = e ? "active" : "", this.$.danmu.style.zIndex = e ? "0" : "-9999"
  },
  actionChanged: function (e, t) {
    if ("object" === ("undefined" == typeof e ? "undefined" : _typeof(e))) {
      var n = e.method,
        i = e.data;
      if ("play" === n) this.$.player.play();
      else if ("pause" === n) this.$.player.pause();
      else if ("seek" === n) this.$.player.currentTime = i[0], this._resetDanmu();
      else if ("sendDanmu" === n) {
        var o = _slicedToArray(i, 2),
          r = o[0],
          a = o[1],
          s = parseInt(this.$.player.currentTime);
        this.danmuObject[s] ? this.danmuObject[s].push({
            text: r,
            color: a,
            time: s
          }) : this.danmuObject[s] = [{
            text: r,
            color: a,
            time: s
          }]
      }
    }
  },
  onPlay: function (e) {
    var t = this,
      n = document.querySelectorAll(".wx-video-danmu-item");
    Array.prototype.forEach.apply(n, [function (e) {
      var n = 3 * (parseInt(getComputedStyle(e).left) + e.offsetWidth) / (e.offsetWidth + t.$$.offsetWidth);
      e.style.left = "-" + e.offsetWidth + "px", e.style.transitionDuration = n + "checkScrollBottom", e.style.webkitTransitionDuration = n + "checkScrollBottom"
    }])
  },
  onPause: function (e) {
    var t = document.querySelectorAll(".wx-video-danmu-item");
    Array.prototype.forEach.apply(t, [function (e) {
      e.style.left = getComputedStyle(e).left
    }])
  },
  onEnded: function (e) {
  },
  _computeRate: function (e) {
    var t = this.$.progress.getBoundingClientRect().left,
      n = this.$.progress.offsetWidth,
      i = (e - t) / n;
    return i < 0 ? i = 0 : i > 1 && (i = 1), i
  },
  _setProgress: function (e) {
    this._progressLength = Math.floor(this.$.progress.offsetWidth * e), this._progressLeft = this._progressLength - 22
  },
  _sendDanmu: function (e) {
    if (this.playing && !e.flag) {
      e.flag = !0;
      var t = document.createElement("diffProps");
      t.className += "wx-video-danmu-item", t.textContent = e.text, t.style.top = this._genDanmuPosition() + "%", t.style.color = e.color, this.$.danmu.appendChild(t), t.style.left = "-" + t.offsetWidth + "px"
    }
  },
  _genDanmuPosition: function () {
    if (this.lastDanmuPosition) {
      var e = 100 * Math.random();
      Math.abs(e - this.lastDanmuPosition) < 10 ? this.lastDanmuPosition = (this.lastDanmuPosition + 50) % 100 : this.lastDanmuPosition = e
    } else this.lastDanmuPosition = 100 * Math.random();
    return this.lastDanmuPosition
  },
  attached: function () {
    var e = this,
      t = this;
    WeixinJSBridge.publish("videoPlayerInsert", {
      domId: this.id,
      videoPlayerId: 0
    }), this.$.default.style.display = "", this.$.player.style.display = "", this.$.player.autoplay = this.autoplay, this.$.player.style.objectFit = this.objectFit, console.log("attached", this.objectFit), this.danmuObject = this.danmuList.reduce(function (e, t) {
      return "number" == typeof t.time && t.time >= 0 && "string" == typeof t.text && t.text.length > 0 && (e[t.time] ? e[t.time].push({
          text: t.text,
          color: t.color || "#ffffff"
        }) : e[t.time] = [{
          text: t.text,
          color: t.color || "#ffffff"
        }]), e
    }, {}), this.$.button.onclick = function (e) {
      e.stopPropagation(), t.$.player[t._buttonType]()
    }, this.$.progress.onclick = function (e) {
      e.stopPropagation();
      var n = t._computeRate(e.clientX);
      t.$.player.currentTime = t.$.player.duration * n, t._resetDanmu()
    }, this.$.fullscreen.onclick = function (e) {
      e.stopPropagation(), "android" === wx.getPlatform() ? t.enableFullScreen = !0 : t.enableFullScreen = !t.enableFullScreen, t.enableFullScreen && t.$.player.webkitEnterFullscreen(), t.triggerEvent("togglefullscreen", {
        enable: t.enableFullScreen
      })
    }, this.$.danmuBtn.onclick = function (e) {
      e.stopPropagation(), t.enableDanmu = !t.enableDanmu, t.triggerEvent("toggledanmu", {
        enable: t.enableDanmu
      })
    }, WeixinJSBridge.subscribe("video_" + this.id + "_actionChanged", function (t) {
      e.action = t, e.actionChanged(t)
    })
  },
  onTimeUpdate: function (e) {
    var t = this;
    e.stopPropagation();
    var n = this.$.player.currentTime / this.$.player.duration;
    this._isLockTimeUpdateProgress || this._setProgress(n);
    var i = this.danmuObject[parseInt(this.$.player.currentTime)];
    void 0 !== i && i.length > 0 && i.forEach(function (e) {
      t._sendDanmu(e)
    })
  },
  detached: function () {
  },
  onBallTouchStart: function () {
    if (!this.isLive) {
      var e = this;
      e._isLockTimeUpdateProgress = !0;
      var t = function (t) {
          t.stopPropagation(), t.preventDefault(), e._rate = e._computeRate(t.touches[0].clientX), e._setProgress(e._rate)
        },
        n = function n(i) {
          e.$.player.currentTime = e.$.player.duration * e._rate, document.removeEventListener("touchmove", t), document.removeEventListener("touchend", n), e._isLockTimeUpdateProgress = !1, e._resetDanmu()
        };
      document.addEventListener("touchmove", t), document.addEventListener("touchend", n)
    }
  },
  _resetDanmu: function () {
    var e = this;
    this.$.danmu.innerHTML = "", Object.keys(this.danmuObject).forEach(function (t) {
      e.danmuObject[t].forEach(function (e) {
        e.flag = !1
      })
    })
  }
});

// wx-video on ios
"ios" === wx.getPlatform() && window.exparser.registerElement({
  is: "wx-video",
  behaviors: ["wx-base", "wx-player", "wx-native"],
  template: '\n      <div class="wx-video-container">\n        <video id="player" webkit-playsinline style="display: none;"></video>\n        <div id="default" class$="wx-video-bar {{_barType}}" style="display: none;">\n          <div id="controls" class="wx-video-controls">\n            <div id="button" class$="wx-video-button {{_buttonType}}"></div>\n            <div class="wx-video-time" parse-text-content>{{_currentTime}}</div>\n            <div id="progress" class="wx-video-progress">\n              <div id="ball" class="wx-video-ball" style$="left: {{_progressLeft}}px;">\n                <div class="wx-video-inner"></div>\n              </div>\n              <div class="wx-video-inner" style$="width: {{_progressLength}}px;"></div>\n            </div>\n            <div class="wx-video-time" parse-text-content>{{_duration}}</div>\n          </div>\n          <div id="danmuBtn" class$="wx-video-danmu-btn {{_danmuStatus}}" style="display: none">弹幕</div>\n          <div id="fullscreen" class="wx-video-fullscreen"></div>\n        </div>\n        <div id="danmu" class="wx-video-danmu" style="z-index: -9999">\n        </div>\n      </div>\n      <div id="fakebutton"></div>\n    ',
  properties: {
    autoplay: {
      type: Boolean,
      value: !1,
      public: !0
    },
    bindplay: {
      type: String,
      value: "",
      public: !0
    },
    bindpause: {
      type: String,
      value: "",
      public: !0,
      observer: "handlersChanged"
    },
    bindended: {
      type: String,
      value: "",
      public: !0,
      observer: "handlersChanged"
    },
    bindtimeupdate: {
      type: String,
      value: "",
      public: !0,
      observer: "handlersChanged"
    },
    danmuBtn: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "danmuBtnChanged"
    },
    enableDanmu: {
      type: Boolean,
      value: !1,
      observer: "enableDanmuChanged",
      public: !0
    },
    enableFullScreen: {
      type: Boolean,
      value: !1,
      public: !0
    },
    controls: {
      type: Boolean,
      value: !0,
      public: !0,
      observer: "controlsChanged"
    },
    danmuList: {
      type: Array,
      value: [],
      public: !0
    },
    objectFit: {
      type: String,
      value: "contain",
      public: !0
    },
    duration: {
      type: Number,
      value: 0,
      public: !0
    },
    _videoId: {
      type: Number
    },
    _isLockTimeUpdateProgress: {
      type: Boolean,
      value: !1
    },
    _rate: {
      type: Number,
      value: 0
    },
    _progressLeft: {
      type: Number,
      value: -22
    },
    _progressLength: {
      type: Number,
      value: 0
    },
    _barType: {
      type: String,
      value: "full"
    },
    _danmuStatus: {
      type: String,
      value: ""
    }
  },
  listeners: {
    "ball.touchstart": "onBallTouchStart"
  },
  handlersChanged: function () {
    this._update()
  },
  _reset: function () {
    this._buttonType = "play"
    this._currentTime = "00:00"
    this._duration = "00:00"
    this._progressLeft = -22
    this._progressLength = 0
    this._barType = this.controls ? "full" : "part"
  },
  _update: function () {
    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
      _this = this;
    e.videoPlayerId = this._videoId
    e.hide = this.hidden;
    var _data = this._getData();
    e.needEvent = Object.keys(_data.handlers).length > 0
    e.objectFit = this.objectFit
    e.showBasicControls = this.controls
    e.showDanmuBtn = this.danmuBtn
    e.enableDanmu = this.enableDanmu
    e.data = JSON.stringify(_data)
    this.duration > 0 && (e.duration = this.duration)
    WeixinJSBridge.invoke("updateVideoPlayer", e, function (e) {
      /ok/.test(e.errMsg) || _this._publish("error", {
        errMsg: e.errMsg
      })
    })
  },
  _updatePosition: function () {
    if (this._isiOS()) {
      this._update({
        position: this._box
      }, "位置")
    } else {
      this.$.player.width = this._box.width
      this.$.player.height = this._box.height
    }
  },
  _hiddenChanged: function (e, t) {
    if (this._isiOS()) {
      this.$$.style.display = e ? "none" : ""
      this._update({
        hide: e
      }, e ? "隐藏" : "显示")
    } else {
      this.$.player.pause()
      this.$$.style.display = e ? "none" : ""
    }
  },
  posterChanged: function (e, t) {
    if (!this._isError) {
      if (this._isReady) {
        return void(this._isiOS() && (/http:\/\//.test(e) || /https:\/\//.test(e)) ? this._update({
            poster: e
          }, "封面") : this.$.player.poster = e)
      } else {
        return void this._deferred.push({
          callback: "posterChanged",
          args: [e, t]
        })
      }
    }
  },
  srcChanged: function (e, t) {
    if (!this._isError && e) {
      if (!this._isReady) return void this._deferred.push({
        callback: "srcChanged",
        args: [e, t]
      });
      if (this._isiOS()) /wxfile:\/\//.test(e) || /http:\/\//.test(e) || /https:\/\//.test(e) ? this._update({
          filePath: e
        }, "资源") : this._publish("error", {
          errMsg: "MEDIA_ERR_SRC_NOT_SUPPORTED"
        });
      else if (this._isDevTools()) {
        this.$.player.src = e.replace("wxfile://", "http://wxfile.open.weixin.qq.com/");
        var n = this;
        setTimeout(function () {
          n._reset()
        }, 0)
      } else {
        this.$.player.src = e;
        var n = this;
        setTimeout(function () {
          n._reset()
        }, 0)
      }
    }
  },
  controlsChanged: function (e, t) {
    this._update({}), this.$.controls.style.display = e ? "flex" : "none"
  },
  danmuBtnChanged: function (e, t) {
    this._update({}), this.$.danmuBtn.style.display = e ? "" : "none"
  },
  enableDanmuChanged: function (e, t) {
    this._update({}), this._danmuStatus = e ? "active" : "", this.$.danmu.style.zIndex = e ? "0" : "-9999"
  },
  actionChanged: function (e, t) {
    if (this._isiOS());
    else {
      if ("object" !== ("undefined" == typeof e ? "undefined" : _typeof(e))) return;
      var n = e.method,
        i = e.data;
      if ("play" === n) this.$.player.play();
      else if ("pause" === n) this.$.player.pause();
      else if ("seek" === n) this.$.player.currentTime = i[0], this._resetDanmu();
      else if ("sendDanmu" === n) {
        var o = _slicedToArray(i, 2),
          r = o[0],
          a = o[1],
          s = parseInt(this.$.player.currentTime);
        this.danmuObject[s] ? this.danmuObject[s].push({
            text: r,
            color: a,
            time: s
          }) : this.danmuObject[s] = [{
            text: r,
            color: a,
            time: s
          }]
      }
    }
  },
  onPlay: function (e) {
    var t = this,
      n = document.querySelectorAll(".wx-video-danmu-item");
    Array.prototype.forEach.apply(n, [function (e) {
      var n = 3 * (parseInt(getComputedStyle(e).left) + e.offsetWidth) / (e.offsetWidth + t.$$.offsetWidth);
      e.style.left = "-" + e.offsetWidth + "px", e.style.transitionDuration = n + "checkScrollBottom", e.style.webkitTransitionDuration = n + "checkScrollBottom"
    }]), this.bindplay && wx.publishPageEvent(this.bindplay, {
      type: "play"
    })
  },
  onPause: function (e) {
    var t = document.querySelectorAll(".wx-video-danmu-item");
    Array.prototype.forEach.apply(t, [function (e) {
      e.style.left = getComputedStyle(e).left
    }]), wx.publishPageEvent(this.bindpause, {
      type: "pause"
    })
  },
  onEnded: function (e) {
    wx.publishPageEvent(this.bindended, {
      type: "ended"
    })
  },
  _computeRate: function (e) {
    var t = this.$.progress.getBoundingClientRect().left,
      n = this.$.progress.offsetWidth,
      i = (e - t) / n;
    return i < 0 ? i = 0 : i > 1 && (i = 1), i
  },
  _setProgress: function (e) {
    this._progressLength = Math.floor(this.$.progress.offsetWidth * e), this._progressLeft = this._progressLength - 22
  },
  _sendDanmu: function (e) {
    if (this.playing && !e.flag) {
      e.flag = !0;
      var t = document.createElement("diffProps");
      t.className += "wx-video-danmu-item", t.textContent = e.text, t.style.top = this._genDanmuPosition() + "%", t.style.color = e.color, this.$.danmu.appendChild(t), t.style.left = "-" + t.offsetWidth + "px"
    }
  },
  _genDanmuPosition: function () {
    if (this.lastDanmuPosition) {
      var e = 100 * Math.random();
      Math.abs(e - this.lastDanmuPosition) < 10 ? this.lastDanmuPosition = (this.lastDanmuPosition + 50) % 100 : this.lastDanmuPosition = e
    } else this.lastDanmuPosition = 100 * Math.random();
    return this.lastDanmuPosition
  },
  attached: function () {
    var e = this,
      t = this;
    if (this._isiOS()) {
      this._box = this._getBox();
      var n = this._getData(),
        i = {
          data: JSON.stringify(n),
          needEvent: Object.keys(n.handlers).length > 0,
          position: this._box,
          hide: this.hidden,
          enableDanmu: this.enableDanmu,
          showDanmuBtn: this.danmuBtn,
          showBasicControls: this.controls,
          objectFit: this.objectFit,
          autoplay: this.autoplay,
          danmuList: this.danmuList
        };
      this.duration > 0 && (i.duration = this.duration), WeixinJSBridge.invoke("insertVideoPlayer", i, function (e) {
        /ok/.test(e.errMsg) ? (t._videoId = e.videoPlayerId, t._ready(), t.createdTimestamp = Date.now(), document.addEventListener("pageReRender", t._pageReRenderCallback.bind(t)), WeixinJSBridge.publish("videoPlayerInsert", {
            domId: t.id,
            videoPlayerId: e.videoPlayerId
          })) : (t._isError = !0, t.$$.style.display = "none", t._publish("error", {
            errMsg: e.errMsg
          }))
      })
    } else WeixinJSBridge.publish("videoPlayerInsert", {
      domId: this.id,
      videoPlayerId: 0
    })
    this.$.default.style.display = ""
    this.$.player.style.display = ""
    this.$.player.autoplay = this.autoplay
    this.danmuObject = this.danmuList.reduce(function (e, t) {
      return "number" == typeof t.time && t.time >= 0 && "string" == typeof t.text && t.text.length > 0 && (e[t.time] ? e[t.time].push({
          text: t.text,
          color: t.color || "#ffffff"
        }) : e[t.time] = [{
          text: t.text,
          color: t.color || "#ffffff"
        }]), e
    }, {})
    this.$.button.onclick = function (e) {
      e.stopPropagation(), t.$.player[t._buttonType]()
    }
    this.$.progress.onclick = function (e) {
      e.stopPropagation();
      var n = t._computeRate(e.clientX);
      t.$.player.currentTime = t.$.player.duration * n, t._resetDanmu()
    }
    this.$.fullscreen.onclick = function (e) {
      e.stopPropagation(), t.enableFullScreen = !t.enableFullScreen, t.enableFullScreen && t.$.player.webkitEnterFullscreen(), t.triggerEvent("togglefullscreen", {
        enable: t.enableFullScreen
      })
    }
    this.$.danmuBtn.onclick = function (e) {
      e.stopPropagation(), t.enableDanmu = !t.enableDanmu, t.triggerEvent("toggledanmu", {
        enable: t.enableDanmu
      })
    }
    this._ready()
    document.addEventListener("pageReRender", this._pageReRenderCallback.bind(this));
    WeixinJSBridge.subscribe("video_" + this.id + "_actionChanged", function (t) {
      e.action = t, e.actionChanged(t)
    })
  },
  onTimeUpdate: function (e) {
    var t = this;
    e.stopPropagation();
    var n = this.$.player.currentTime / this.$.player.duration;
    this._isLockTimeUpdateProgress || this._setProgress(n);
    var i = this.danmuObject[parseInt(this.$.player.currentTime)];
    void 0 !== i && i.length > 0 && i.forEach(function (e) {
      t._sendDanmu(e)
    }), this.bindtimeupdate && wx.publishPageEvent(this.bindtimeupdate, {
      type: "timeupdate",
      detail: {
        currentTime: this.$.player.currentTime,
        duration: this.$.player.duration
      }
    })
  },
  detached: function () {
    this._isiOS() && wx.removeVideoPlayer({
      videoPlayerId: this._videoId,
      success: function (e) {
      }
    }), WeixinJSBridge.publish("videoPlayerRemoved", {
      domId: this.id,
      videoPlayerId: this.videoPlayerId
    })
  },
  onBallTouchStart: function () {
    var e = this;
    e._isLockTimeUpdateProgress = !0;
    var t = function (t) {
        t.stopPropagation(), t.preventDefault(), e._rate = e._computeRate(t.touches[0].clientX), e._setProgress(e._rate)
      },
      n = function n(i) {
        e.$.player.currentTime = e.$.player.duration * e._rate, document.removeEventListener("touchmove", t), document.removeEventListener("touchend", n), e._isLockTimeUpdateProgress = !1, e._resetDanmu()
      };
    document.addEventListener("touchmove", t), document.addEventListener("touchend", n)
  },
  _resetDanmu: function () {
    var e = this;
    this.$.danmu.innerHTML = "", Object.keys(this.danmuObject).forEach(function (t) {
      e.danmuObject[t].forEach(function (e) {
        e.flag = !1
      })
    })
  },
  _getData: function () {
    var e = this;
    return {
      handlers: ["bindplay", "bindpause", "bindended", "bindtimeupdate"].reduce(function (t, n) {
        return n && (t[n] = e[n]), t
      }, {}),
      event: {
        target: {
          dataset: this.dataset,
          id: this.$$.id,
          offsetTop: this.$$.offsetTop,
          offsetLeft: this.$$.offsetLeft
        },
        currentTarget: {
          dataset: this.dataset,
          id: this.$$.id,
          offsetTop: this.$$.offsetTop,
          offsetLeft: this.$$.offsetLeft
        }
      },
      createdTimestamp: this.createdTimestamp
    }
  }
})

window.exparser.registerElement({
  is: "wx-view",
  template: "<slot></slot>",
  behaviors: ["wx-base", "wx-hover"],
  properties: {
    inline: {
      type: Boolean,
      public: !0
    },
    hover: {
      type: Boolean,
      value: !1,
      public: !0
    }
  }
});

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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _WxVirtualNode = __webpack_require__(1);

	var _WxVirtualNode2 = _interopRequireDefault(_WxVirtualNode);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _WxVirtualText = __webpack_require__(11);

	var _WxVirtualText2 = _interopRequireDefault(_WxVirtualText);

	var _AppData = __webpack_require__(12);

	var _AppData2 = _interopRequireDefault(_AppData);

	var _catchError = __webpack_require__(14);

	var _catchError2 = _interopRequireDefault(_catchError);

	var _touchEvents = __webpack_require__(15);

	var _touchEvents2 = _interopRequireDefault(_touchEvents);

	var _init = __webpack_require__(16);

	var _init2 = _interopRequireDefault(_init);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function speedReport(key, startTime, endTime, data) {
	    Reporter.speedReport({
	        key: key,
	        timeMark: {
	            startTime: startTime,
	            endTime: endTime
	        },
	        force: "reRenderTime" !== key,
	        data: data
	    });
	}

	(0, _init2.default.init)();

	window.__mergeData__ = _AppData2.default.mergeData;

	var domReady = "__DOMReady",
	    createWXVirtualNode = function createWXVirtualNode(e, t, n, i, o, r) {
	    return new _WxVirtualNode2.default(e, t, n, i, o, r);
	},
	    createWxVirtualText = function createWxVirtualText(e) {
	    return new _WxVirtualText2.default(e);
	},
	    createWXVirtualNodeRec = function createWXVirtualNodeRec(t) {
	    // Recursively
	    if ((0, _utils2.default.isString)(t) || Number(t) === t && Number(t) % 1 === 0) {
	        return createWxVirtualText(String(t));
	    }
	    var n = [];
	    t.children.forEach(function (t) {
	        n.push(createWXVirtualNodeRec(t));
	    });
	    return createWXVirtualNode(t.tag, t.attr, t.n, t.wxKey, t.wxVkey, n);
	},
	    createBodyNode = function createBodyNode(e) {
	    var t = window.__generateFunc__(_AppData2.default.getAppData(), e);
	    t.tag = "body";
	    return createWXVirtualNodeRec(t);
	},
	    rootNode = void 0,
	    nonsenseVar = {},
	    stateFlags = {
	    funcReady: !1,
	    dataReady: !1,
	    firstRender: !1
	},
	    dataChangeEventQueue = [];
	window.__DOMTree__ = void 0;
	//window.firstRender = 0;
	var webViewInfo = {
	    webviewStartTime: Date.now(),
	    funcReady: 0
	};

	exports.default = {
	    reset: function reset() {
	        rootNode = void 0;
	        window.__DOMTree__ = void 0;
	        nonsenseVar = {};
	    }
	};


	window.onerror = function (e, t, n, i, o) {
	    console.error(o.stack);
	    Reporter.errorReport({
	        key: "webviewScriptError",
	        error: o
	    });
	    if ("ios" === wx.getPlatform()) {
	        webkit.messageHandlers.publishHandler.postMessage("wawebview sdk error:" + o.msg);
	    }
	};

	var firstRender = function firstRender(event) {
	    if (event.ext) {
	        "undefined" != typeof event.ext.webviewId && (window.__webviewId__ = event.ext.webviewId);
	        event.ext.enablePullUpRefresh && (window.__enablePullUpRefresh__ = !0);
	    }
	    rootNode = createBodyNode(event.data);
	    window.__DOMTree__ = rootNode.render();
	    exparser.Element.replaceDocumentElement(window.__DOMTree__, document.body);
	    setTimeout(function () {
	        wx.publishPageEvent(domReady, {});
	        wx.initReady();
	        (0, _touchEvents2.default.enablePullUpRefresh)();
	    }, 0);
	};

	var reRender = function reRender(event) {
	    var t = createBodyNode(event.data),
	        n = rootNode.diff(t);
	    n.apply(window.__DOMTree__);
	    rootNode = t;
	};

	wx.onAppDataChange((0, _catchError2.default.catchError)(function (event) {
	    stateFlags.dataReady = !0;
	    stateFlags.funcReady ? renderOnDataChange(event) : dataChangeEventQueue.push(event);
	    //renderOnDataChange(event)
	}));

	document.addEventListener("generateFuncReady", (0, _catchError2.default.catchError)(function (event) {
	    webViewInfo.funcReady = Date.now();
	    speedReport("funcReady", webViewInfo.webviewStartTime, webViewInfo.funcReady);
	    window.__pageFrameStartTime__ && window.__pageFrameEndTime__ && speedReport("pageframe", window.__pageFrameStartTime__, window.__pageFrameEndTime__);
	    window.__WAWebviewStartTime__ && window.__WAWebviewEndTime__ && speedReport("WAWebview", window.__WAWebviewStartTime__, window.__WAWebviewEndTime__);
	    window.__generateFunc__ = event.detail.generateFunc;
	    stateFlags.funcReady = !0;
	    if (stateFlags.dataReady) {
	        for (var t in dataChangeEventQueue) {
	            var n = dataChangeEventQueue[t];
	            renderOnDataChange(n);
	        }
	    }
	}));

	var renderOnDataChange = function renderOnDataChange(event) {
	    if (stateFlags.firstRender) {
	        setTimeout(function () {
	            var t = Date.now();
	            reRender(event);
	            speedReport("reRenderTime", t, Date.now());
	            document.dispatchEvent(new CustomEvent("pageReRender", {}));
	        }, 0);
	    } else {
	        var t = Date.now();
	        speedReport("firstGetData", webViewInfo.funcReady, Date.now());
	        firstRender(event);
	        speedReport("firstRenderTime", t, Date.now());
	        if (!(event.options && event.options.firstRender)) {
	            console.error("firstRender not the data from Page.data");
	            Reporter.errorReport({
	                key: "webviewScriptError",
	                error: new Error("firstRender not the data from Page.data"),
	                extend: "firstRender not the data from Page.data"
	            });
	        }
	        stateFlags.firstRender = !0;
	        document.dispatchEvent(new CustomEvent("pageReRender", {}));
	    }
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _propertyMethods = __webpack_require__(4);

	var _propertyMethods2 = _interopRequireDefault(_propertyMethods);

	var _Diff = __webpack_require__(6);

	var _Diff2 = _interopRequireDefault(_Diff);

	var _WxVirtualText = __webpack_require__(11);

	var _WxVirtualText2 = _interopRequireDefault(_WxVirtualText);

	__webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WxVirtualNode = function () {
	    function WxVirtualNode(tagName, props, newProps, wxKey, wxVkey, children) {
	        _classCallCheck(this, WxVirtualNode);

	        this.tagName = tagName || "div";
	        this.props = props || {};
	        this.children = children || [];
	        this.newProps = newProps || [];
	        this.wxVkey = wxVkey;
	        _utils2.default.isUndefined(wxKey) ? this.wxKey = void 0 : this.wxKey = String(wxKey);
	        this.descendants = 0;
	        for (var c = 0; c < this.children.length; ++c) {
	            var child = this.children[c];
	            if ((0, _utils2.default.isVirtualNode)(child)) {
	                this.descendants += child.descendants;
	            } else {
	                if ((0, _utils2.default.isString)(child)) {
	                    this.children[c] = new _WxVirtualText2.default(child);
	                } else {
	                    (0, _utils2.default.isVirtualText)(child) || console.log("invalid child", tagName, props, children, child);
	                }
	            }
	            ++this.descendants;
	        }
	    }

	    _createClass(WxVirtualNode, [{
	        key: 'render',
	        value: function render() {
	            var ele = "virtual" !== this.tagName ? exparser.createElement(this.tagName) : exparser.VirtualNode.create("virtual");
	            (0, _propertyMethods2.default.applyProperties)(ele, this.props);

	            this.children.forEach(function (child) {
	                var dom = child.render();
	                ele.appendChild(dom);
	            });

	            return ele;
	        }
	    }, {
	        key: 'diff',
	        value: function diff(e) {
	            return (0, _Diff2.default.diff)(this, e);
	        }
	    }]);

	    return WxVirtualNode;
	}();

	WxVirtualNode.prototype.type = "WxVirtualNode";

	exports.default = WxVirtualNode;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _varEnum = __webpack_require__(3);

	var _varEnum2 = _interopRequireDefault(_varEnum);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var objAssign = Object.assign || function (originObj) {
	    for (var t = 1; t < arguments.length; t++) {
	        var n = arguments[t];
	        for (var i in n) {
	            Object.prototype.hasOwnProperty.call(n, i) && (originObj[i] = n[i]);
	        }
	    }
	    return originObj;
	};

	var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
	    return typeof e === "undefined" ? "undefined" : _typeof2(e);
	} : function (e) {
	    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
	};

	var isString = function isString(e) {
	    return "[object String]" === Object.prototype.toString.call(e);
	};

	var isIphone = navigator.userAgent.match("iPhone"),
	    screenWidth = window.screen.width || 375,
	    devicePixelRatio = window.devicePixelRatio || 2,
	    smallNum = 1e-4,
	    u = function u(e) {
	    e = e / _varEnum2.default.BASE_DEVICE_WIDTH * screenWidth;
	    e = Math.floor(e + smallNum);
	    return 0 === e ? 1 !== devicePixelRatio && isIphone ? .5 : 1 : e;
	},
	    h = function h(e) {
	    for (var t = 0, n = 1, i = !1, o = !1, r = 0; r < e.length; ++r) {
	        var a = e[r];
	        a >= "0" && a <= "9" ? i ? (n *= .1, t += (a - "0") * n) : t = 10 * t + (a - "0") : "." === a ? i = !0 : "-" === a && (o = !0);
	    }
	    o && (t = -t);
	    return u(t);
	},
	    p = /%%\?[+-]?\d+(\.\d+)?rpx\?%%/g,
	    g = /(:|\s)[+-]?\d+(\.\d+)?rpx/g;

	exports.default = {
	    isString: isString,
	    isArray: function isArray(e) {
	        return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e);
	    },
	    getPrototype: function getPrototype(e) {
	        return Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__ ? e.__proto__ : e.constructor ? e.constructor.prototype : void 0;
	    },
	    isObject: function isObject(e) {
	        return "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) && null !== e;
	    },
	    isEmptyObject: function isEmptyObject(e) {
	        for (var t in e) {
	            return !1;
	        }return !0;
	    },
	    isVirtualNode: function isVirtualNode(e) {
	        return e && "WxVirtualNode" === e.type;
	    },
	    isVirtualText: function isVirtualText(e) {
	        return e && "WxVirtualText" === e.type;
	    },
	    isUndefined: function isUndefined(e) {
	        return "[object Undefined]" === Object.prototype.toString.call(e);
	    },
	    transformRpx: function transformRpx(e, t) {
	        if (!isString(e)) return e;
	        var n = void 0;
	        n = t ? e.match(g) : e.match(p);
	        n && n.forEach(function (n) {
	            var i = h(n);
	            var o = (t ? n[0] : "") + i + "px";
	            e = e.replace(n, o);
	        });
	        return e;
	    },
	    uuid: function uuid() {
	        var e = function e() {
	            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
	        };
	        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
	    },
	    getDataType: function getDataType(e) {
	        return Object.prototype.toString.call(e).split(" ")[1].split("]")[0];
	    },
	    getPageConfig: function getPageConfig() {
	        var e = {};
	        if (window.__wxConfig && window.__wxConfig.window) e = window.__wxConfig.window;else {
	            var t = {};
	            window.__wxConfig && window.__wxConfig.global && window.__wxConfig.global.window && (t = window.__wxConfig.global.window);
	            var n = {};
	            window.__wxConfig && window.__wxConfig.page && window.__wxConfig.page[window.__route__] && window.__wxConfig.page[window.__route__].window && (n = window.__wxConfig.page[window.__route__].window), e = objAssign({}, t, n);
	        }
	        return e;
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    PATCH_TYPE: {
	        NONE: 0,
	        TEXT: 1,
	        VNODE: 2,
	        PROPS: 3,
	        REORDER: 4,
	        INSERT: 5,
	        REMOVE: 6
	    },
	    WX_KEY: "wxKey",
	    ATTRIBUTE_NAME: ["class", "style"],
	    RPX_RATE: 20,
	    BASE_DEVICE_WIDTH: 750,
	    INLINE_STYLE: ["placeholderStyle", "hoverStyle", "style"]
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _varEnum = __webpack_require__(3);

	var _varEnum2 = _interopRequireDefault(_varEnum);

	var _propNameConversion = __webpack_require__(5);

	var _propNameConversion2 = _interopRequireDefault(_propNameConversion);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
	    return typeof e === 'undefined' ? 'undefined' : _typeof2(e);
	} : function (e) {
	    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e === 'undefined' ? 'undefined' : _typeof2(e);
	};

	function removeProperty(ele, props) {
	    var hasProp = exparser.Component.hasProperty(ele, props);
	    if (hasProp) {
	        ele[props] = void 0;
	    } else {
	        if ("bind" === props.slice(0, 4)) {
	            addEventHandler(ele, props.slice(4), "");
	        } else {
	            if ("catch" === props.slice(0, 5)) {
	                addEventHandler(ele, props.slice(5), "", !0);
	            } else {
	                if ("on" === props.slice(0, 2)) {
	                    addEventHandler(ele, props.slice(2), "");
	                } else {
	                    if (_varEnum2.default.ATTRIBUTE_NAME.indexOf(props) !== -1 || dataPrefixReg.test(props)) {
	                        ele.$$.removeAttribute(props);
	                    }
	                }
	            }
	        }
	    }
	}

	function applyProperties(ele, props) {
	    ele.dataset = ele.dataset || {};
	    for (var propName in props) {
	        var propValue = props[propName],
	            propExist = exparser.Component.hasProperty(ele, propName);
	        if (/^data-/.test(propName)) {
	            var h = (0, _propNameConversion2.default.dashToCamelCase)(propName.substring(5).toLowerCase());
	            ele.dataset[h] = propValue;
	        }

	        if (void 0 === propValue) {
	            removeProperty(ele, propName);
	        } else {
	            if (propExist) {
	                if (_varEnum2.default.INLINE_STYLE.indexOf(propName) !== -1) {
	                    ele[propName] = (0, _utils2.default.transformRpx)(propValue, !0);
	                } else {
	                    ele[propName] = propValue;
	                }
	            } else {
	                if ("bind" === propName.slice(0, 4)) {
	                    addEventHandler(ele, propName.slice(4), propValue);
	                } else {
	                    if ("catch" === propName.slice(0, 5)) {
	                        addEventHandler(ele, propName.slice(5), propValue, !0);
	                    } else {
	                        if ("on" === propName.slice(0, 2)) {
	                            addEventHandler(ele, propName.slice(2), propValue);
	                        } else {
	                            var flag = _varEnum2.default.ATTRIBUTE_NAME.indexOf(propName) !== -1 || dataPrefixReg.test(propName);
	                            if (flag) {
	                                if ("style" === propName) {
	                                    !function () {
	                                        var t = ele.animationStyle || {},
	                                            i = t.transition,
	                                            r = t.transform,
	                                            a = t.transitionProperty,
	                                            s = t.transformOrigin,
	                                            c = {
	                                            transition: i,
	                                            transform: r,
	                                            transitionProperty: a,
	                                            transformOrigin: s
	                                        };
	                                        c["-webkit-transition"] = c.transition;
	                                        c["-webkit-transform"] = c.transform;
	                                        c["-webkit-transition-property"] = c.transitionProperty;
	                                        c["-webkit-transform-origin"] = c.transformOrigin;

	                                        var refinedAttrs = Object.keys(c).filter(function (e) {
	                                            return !(/transform|transition/i.test(e) && "" === c[e] || "" === e.trim() || void 0 === c[e] || "" === c[e] || !isNaN(parseInt(e)));
	                                        }).map(function (e) {
	                                            var t = e.replace(/([A-Z]{1})/g, function (e) {
	                                                return "-" + e.toLowerCase();
	                                            });
	                                            return t + ":" + c[e];
	                                        }).join(";");

	                                        ele.$$.setAttribute(propName, (0, _utils2.default.transformRpx)(propValue, !0) + refinedAttrs);
	                                    }();
	                                } else {
	                                    ele.$$.setAttribute(propName, propValue);
	                                }
	                            } else {
	                                var flag1 = "animation" === propName && "object" === ("undefined" == typeof propValue ? "undefined" : _typeof(propValue));
	                                var flag2 = propValue.actions && propValue.actions.length > 0;
	                                if (flag1 && flag2) {
	                                    !function () {
	                                        var execAnimationAction = function execAnimationAction() {
	                                            if (turns < actonsLen) {
	                                                var t = wx.animationToStyle(actons[turns]),
	                                                    transition = t.transition,
	                                                    transitionProperty = t.transitionProperty,
	                                                    transform = t.transform,
	                                                    transformOrigin = t.transformOrigin,
	                                                    d = t.style;
	                                                ele.$$.style.transition = transition;
	                                                ele.$$.style.transitionProperty = transitionProperty;
	                                                ele.$$.style.transform = transform;
	                                                ele.$$.style.transformOrigin = transformOrigin;
	                                                ele.$$.style.webkitTransition = transition;
	                                                ele.$$.style.webkitTransitionProperty = transitionProperty;
	                                                ele.$$.style.webkitTransform = transform;
	                                                ele.$$.style.webkitTransformOrigin = transformOrigin;
	                                                for (var u in d) {
	                                                    ele.$$.style[u] = (0, _utils2.default.transformRpx)(" " + d[u], !0);
	                                                }

	                                                ele.animationStyle = {
	                                                    transition: transition,
	                                                    transform: transform,
	                                                    transitionProperty: transitionProperty,
	                                                    transformOrigin: transformOrigin
	                                                };
	                                            }
	                                        },
	                                            turns = 0,
	                                            actons = propValue.actions,
	                                            actonsLen = propValue.actions.length;

	                                        ele.addListener("transitionend", function () {
	                                            turns += 1, execAnimationAction();
	                                        });
	                                        execAnimationAction();
	                                    }();
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }
	}

	var dataPrefixReg = /^data-/,
	    getEleInfo = function getEleInfo(ele) {
	    return {
	        id: ele.id,
	        offsetLeft: ele.$$.offsetLeft,
	        offsetTop: ele.$$.offsetTop,
	        dataset: ele.dataset
	    };
	},
	    getTouchInfo = function getTouchInfo(e) {
	    if (e) {
	        for (var t = [], n = 0; n < e.length; n++) {
	            var i = e[n];
	            t.push({
	                identifier: i.identifier,
	                pageX: i.pageX,
	                pageY: i.pageY,
	                clientX: i.clientX,
	                clientY: i.clientY
	            });
	        }
	        return t;
	    }
	},
	    addEventHandler = function addEventHandler(ele, prop, propValue, useCapture) {
	    ele.__wxEventHandleName || (ele.__wxEventHandleName = Object.create(null));
	    void 0 === ele.__wxEventHandleName[prop] && ele.addListener(prop, function (event) {
	        if (ele.__wxEventHandleName[prop]) {
	            window.wx.publishPageEvent(ele.__wxEventHandleName[prop], {
	                type: event.type,
	                timeStamp: event.timeStamp,
	                target: getEleInfo(event.target),
	                currentTarget: getEleInfo(this),
	                detail: event.detail,
	                touches: getTouchInfo(event.touches),
	                changedTouches: getTouchInfo(event.changedTouches)
	            });
	            return !useCapture && void 0;
	        }
	    });
	    ele.__wxEventHandleName[prop] = propValue;
	};

	exports.default = {
	    removeProperty: removeProperty,
	    applyProperties: applyProperties
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var cache = {},
	    regx = {
	    dashToCamel: /-[a-z]/g,
	    camelToDash: /([A-Z])/g
	};

	var dashToCamelCase = function dashToCamelCase(e) {
	    if (cache[e]) {
	        return cache[e];
	    } else {
	        if (e.indexOf("-") <= 0) {
	            cache[e] = e;
	        } else {
	            cache[e] = e.replace(regx.dashToCamel, function (e) {
	                return e[1].toUpperCase();
	            });
	        }
	        return cache[e];
	    }
	};

	var camelToDashCase = function camelToDashCase(e) {
	    return cache[e] || (cache[e] = e.replace(regx.camelToDash, "-$1").toLowerCase());
	};

	exports.default = {
	    dashToCamelCase: dashToCamelCase,
	    camelToDashCase: camelToDashCase
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _VPatch = __webpack_require__(7);

	var _VPatch2 = _interopRequireDefault(_VPatch);

	var _Patch = __webpack_require__(8);

	var _Patch2 = _interopRequireDefault(_Patch);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _listDiff = __webpack_require__(10);

	var _listDiff2 = _interopRequireDefault(_listDiff);

	var _varEnum = __webpack_require__(3);

	var _varEnum2 = _interopRequireDefault(_varEnum);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var diff = function diff(oriEle, newEle) {
	    var patch = {};
	    diffNode(oriEle, newEle, patch, 0);
	    return new _Patch2.default(oriEle, patch);
	};

	var diffNode = function diffNode(oriEle, newEle, patch, index) {
	    if (oriEle !== newEle) {
	        var apply = patch[index];
	        if (null == newEle) {
	            apply = appendPatch(apply, new _VPatch2.default(_varEnum2.default.PATCH_TYPE.REMOVE, oriEle));
	        } else if ((0, _utils2.default.isVirtualNode)(newEle)) {
	            if ((0, _utils2.default.isVirtualNode)(oriEle)) {
	                if (oriEle.tagName === newEle.tagName && oriEle.wxKey === newEle.wxKey) {
	                    if ("virtual" === oriEle.tagName && oriEle.wxVkey !== newEle.wxVkey) {
	                        apply = appendPatch(apply, new _VPatch2.default(_varEnum2.default.PATCH_TYPE.VNODE, oriEle, newEle));
	                    } else {
	                        var a = diffProps(newEle.props, newEle.newProps);
	                        a && (apply = appendPatch(apply, new _VPatch2.default(_varEnum2.default.PATCH_TYPE.PROPS, oriEle, a)));
	                        apply = diffChildren(oriEle, newEle, patch, apply, index);
	                    }
	                } else {
	                    apply = appendPatch(apply, new _VPatch2.default(_varEnum2.default.PATCH_TYPE.VNODE, oriEle, newEle));
	                }
	            } else {
	                apply = appendPatch(apply, new _VPatch2.default(_varEnum2.default.PATCH_TYPE.VNODE, oriEle, newEle));
	            }
	        } else {
	            if (!(0, _utils2.default.isVirtualText)(newEle)) {
	                throw console.log("unknow node type", oriEle, newEle), {
	                    message: "unknow node type",
	                    node: newEle
	                };
	            }
	            newEle.text !== oriEle.text && (apply = appendPatch(apply, new _VPatch2.default(_varEnum2.default.PATCH_TYPE.TEXT, oriEle, newEle)));
	        }
	        apply && (patch[index] = apply);
	    }
	};

	var diffChildren = function diffChildren(old, newEle, patch, apply, index) {
	    var oldChildren = old.children;
	    var orderedSet = (0, _listDiff2.default.listDiff)(oldChildren, newEle.children);
	    var newChildren = orderedSet.children;
	    var len = oldChildren.length > newChildren.length ? oldChildren.length : newChildren.length;
	    var idx = 0;
	    for (; idx < len; ++idx) {
	        var oldChild = oldChildren[idx],
	            newChild = newChildren[idx];
	        ++index;

	        if (oldChild) {
	            diffNode(oldChild, newChild, patch, index);
	        } else {
	            if (newChild) {
	                apply = appendPatch(apply, new _VPatch2.default(_varEnum2.default.PATCH_TYPE.INSERT, oldChild, newChild));
	            }
	        }
	        (0, _utils2.default.isVirtualNode)(oldChild) && (index += oldChild.descendants);
	    }
	    orderedSet.moves && (apply = appendPatch(apply, new _VPatch2.default(_varEnum2.default.PATCH_TYPE.REORDER, old, orderedSet.moves)));
	    return apply;
	};

	var diffProps = function diffProps(props, newProps) {
	    var n = {};
	    for (var i in newProps) {
	        var propValue = newProps[i];
	        n[propValue] = props[propValue];
	    }
	    return (0, _utils2.default.isEmptyObject)(n) ? void 0 : n;
	};

	var appendPatch = function appendPatch(patches, newPatch) {
	    return patches ? (patches.push(newPatch), patches) : [newPatch];
	};

	exports.default = {
	    diff: diff,
	    diffChildren: diffChildren,
	    diffNode: diffNode,
	    diffProps: diffProps,
	    appendPatch: appendPatch
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _propertyMethods = __webpack_require__(4);

	var _propertyMethods2 = _interopRequireDefault(_propertyMethods);

	var _varEnum = __webpack_require__(3);

	var _varEnum2 = _interopRequireDefault(_varEnum);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VPatch = function () {
	    function VPatch(type, vNode, patch) {
	        _classCallCheck(this, VPatch);

	        this.type = Number(type);
	        this.vNode = vNode;
	        this.patch = patch;
	    }

	    _createClass(VPatch, [{
	        key: 'apply',
	        value: function apply(node) {
	            switch (this.type) {
	                case _varEnum2.default.PATCH_TYPE.TEXT:
	                    return VPatch.stringPatch(node, this.patch);
	                case _varEnum2.default.PATCH_TYPE.VNODE:
	                    return VPatch.vNodePatch(node, this.patch);
	                case _varEnum2.default.PATCH_TYPE.PROPS:
	                    return VPatch.applyProperties(node, this.patch, this.vNode.props);
	                case _varEnum2.default.PATCH_TYPE.REORDER:
	                    return VPatch.reorderChildren(node, this.patch);
	                case _varEnum2.default.PATCH_TYPE.INSERT:
	                    return VPatch.insertNode(node, this.patch);
	                case _varEnum2.default.PATCH_TYPE.REMOVE:
	                    return VPatch.removeNode(node);
	                default:
	                    return node;
	            }
	        }
	    }], [{
	        key: 'stringPatch',
	        value: function stringPatch(e, t) {
	            var n = e.parentNode,
	                i = t.render();
	            n && i !== e && n.replaceChild(i, e);
	            return i;
	        }
	    }, {
	        key: 'vNodePatch',
	        value: function vNodePatch(e, t) {
	            var n = e.parentNode,
	                i = t.render();
	            n && i !== e && n.replaceChild(i, e);
	            return i;
	        }
	    }, {
	        key: 'applyProperties',
	        value: function applyProperties(e, t, n) {
	            (0, _propertyMethods2.default.applyProperties)(e, t, n);
	            return e;
	        }
	    }, {
	        key: 'reorderChildren',
	        value: function reorderChildren(e, t) {
	            var n = t.removes,
	                i = t.inserts,
	                o = e.childNodes,
	                r = {};
	            n.forEach(function (t) {
	                var n = o[t.index];
	                t.key && (r[t.key] = n);
	                e.removeChild(n);
	            });

	            i.forEach(function (t) {
	                var n = r[t.key];
	                e.insertBefore(n, o[t.index]);
	            });

	            return e;
	        }
	    }, {
	        key: 'insertNode',
	        value: function insertNode(e, t) {
	            var n = t.render();
	            e && e.appendChild(n);
	            return e;
	        }
	    }, {
	        key: 'removeNode',
	        value: function removeNode(e) {
	            var t = e.parentNode;
	            t && t.removeChild(e);
	            return null;
	        }
	    }]);

	    return VPatch;
	}();

	exports.default = VPatch;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DomIndex = __webpack_require__(9);

	var _DomIndex2 = _interopRequireDefault(_DomIndex);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Patch = function () {
	    function Patch(oldTree, patches) {
	        _classCallCheck(this, Patch);

	        this.oldTree = oldTree;
	        this.patches = patches;
	        this.patchIndexes = Object.keys(this.patches).map(function (e) {
	            return Number(e);
	        });
	    }

	    _createClass(Patch, [{
	        key: 'apply',
	        value: function apply(rootNode) {
	            var that = this;
	            if (0 === this.patchIndexes.length) return rootNode;

	            var n = (0, _DomIndex2.default.getDomIndex)(rootNode, this.oldTree, this.patchIndexes);

	            this.patchIndexes.forEach(function (e) {
	                var i = n[e];
	                if (i) {
	                    var o = that.patches[e];
	                    o.forEach(function (e) {
	                        e.apply(i);
	                    });
	                }
	            });
	            return rootNode;
	        }
	    }]);

	    return Patch;
	}();

	exports.default = Patch;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var getDomIndex = function getDomIndex(rootNode, tree, patchIndexs) {
	    if (patchIndexs && 0 != patchIndexs.length) {
	        patchIndexs = patchIndexs.sort(function (e, t) {
	            return e - t;
	        });
	        var nodes = {};
	        mapIndexToDom(rootNode, tree, patchIndexs, nodes, 0);
	        return nodes;
	    }
	    return {};
	};

	var mapIndexToDom = function mapIndexToDom(rootNode, tree, patchIndexs, nodes, rootIndex) {
	    if (rootNode) {
	        oneOfIndexesInRange(patchIndexs, rootIndex, rootIndex) && (nodes[rootIndex] = rootNode);
	        var vChildren = tree.children;
	        if (vChildren) {
	            for (var childNodes = rootNode.childNodes, idx = 0; idx < vChildren.length; ++idx) {
	                var vChild = vChildren[idx];
	                ++rootIndex;
	                var u = rootIndex + (vChild.descendants || 0);
	                oneOfIndexesInRange(patchIndexs, rootIndex, u) && mapIndexToDom(childNodes[idx], vChild, patchIndexs, nodes, rootIndex);
	                rootIndex = u;
	            }
	        }
	    }
	};

	// Binary search for an index in the interval [left, right]
	var oneOfIndexesInRange = function oneOfIndexesInRange(indices, left, right) {
	    for (var i = 0, o = indices.length - 1; i <= o;) {
	        var r = o + i >> 1,
	            a = indices[r];
	        if (a < left) i = r + 1;else {
	            if (!(a > right)) return !0;
	            o = r - 1;
	        }
	    }
	    return !1;
	};

	exports.default = { getDomIndex: getDomIndex, mapIndexToDom: mapIndexToDom, oneOfIndexesInRange: oneOfIndexesInRange };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var listDiff = function listDiff(oldChildren, newChildren) {
	    function remove(arr, index, key) {
	        arr.splice(index, 1);
	        return {
	            index: index,
	            key: key
	        };
	    }

	    var keyAndIndexOfOldChildren = makeKeyAndFreeIndexes(oldChildren),
	        keyIndexesOfOldChildren = keyAndIndexOfOldChildren.keyIndexes;

	    if ((0, _utils2.default.isEmptyObject)(keyIndexesOfOldChildren)) return {
	        children: newChildren,
	        moves: null
	    };
	    var keyFreeIndexesOfNewChildren = makeKeyAndFreeIndexes(newChildren),
	        keyIdxsOfNewCh = keyFreeIndexesOfNewChildren.keyIndexes,
	        freeIdxsOfNew = keyFreeIndexesOfNewChildren.freeIndexes;
	    if ((0, _utils2.default.isEmptyObject)(keyIdxsOfNewCh)) {
	        return {
	            children: newChildren,
	            moves: null
	        };
	    }
	    var oNewChildren = []; // o for output
	    var freeIndex = 0;
	    var deletedItems = 0;

	    // Iterate through a and match a node in b
	    // O(N) time,
	    for (var idx = 0; idx < oldChildren.length; ++idx) {
	        var oldChild = oldChildren[idx],
	            itemKeyOfOldCh = getItemKey(oldChild);
	        if (itemKeyOfOldCh) {
	            if (keyIdxsOfNewCh.hasOwnProperty(itemKeyOfOldCh)) {
	                // Match up the old keys
	                var itemIndex = keyIdxsOfNewCh[itemKeyOfOldCh];
	                oNewChildren.push(newChildren[itemIndex]);
	            } else {
	                // Remove old keyed items
	                ++deletedItems;
	                oNewChildren.push(null);
	            }
	        }
	        // Match the item in a with the next free item in b
	        else if (freeIndex < freeIdxsOfNew.length) {
	                var itemIndex = freeIdxsOfNew[freeIndex];
	                oNewChildren.push(newChildren[itemIndex]);
	                ++freeIndex;
	            } else {
	                // There are no free items in b to match with
	                // the free items in a, so the extra free nodes
	                // are deleted.
	                ++deletedItems;
	                oNewChildren.push(null);
	            }
	    }

	    // Iterate through b and append any new keys
	    // O(M) time
	    var lastFreeIndex = freeIdxsOfNew[freeIndex] || newChildren.length;
	    for (var idx = 0; idx < newChildren.length; ++idx) {
	        var newChild = newChildren[idx];
	        if (getItemKey(newChild)) {
	            keyIndexesOfOldChildren.hasOwnProperty(getItemKey(newChild)) || oNewChildren.push(newChild);
	        } else {
	            idx >= lastFreeIndex && oNewChildren.push(newChild);
	        }
	    }

	    var simulate = oNewChildren.slice(0);
	    var simulateIndex = 0;
	    var removes = [];
	    var inserts = [];

	    for (var idx = 0; idx < newChildren.length;) {
	        var wantedItem = newChildren[idx];
	        var itemKeyOfWantedItem = getItemKey(wantedItem);
	        var simulateItem = simulate[simulateIndex];
	        var itemKeyOfSimulateItem = getItemKey(simulateItem);
	        for (; null === simulateItem;) {
	            removes.push(remove(simulate, simulateIndex, itemKeyOfSimulateItem));
	            simulateItem = simulate[simulateIndex];
	            itemKeyOfSimulateItem = getItemKey(simulateItem);
	        }
	        if (itemKeyOfSimulateItem === itemKeyOfWantedItem) {
	            ++simulateIndex, ++idx;
	        } else {
	            // if we need a key in this position...
	            if (itemKeyOfWantedItem) {
	                if (itemKeyOfSimulateItem) {
	                    if (keyIdxsOfNewCh[itemKeyOfSimulateItem] === idx + 1) {
	                        inserts.push({
	                            key: itemKeyOfWantedItem,
	                            index: idx
	                        });
	                    } else {
	                        // if an insert doesn't put this key in place, it needs to move
	                        removes.push(remove(simulate, simulateIndex, itemKeyOfSimulateItem));
	                        simulateItem = simulate[simulateIndex];
	                        // items are matching, so skip ahead
	                        if (simulateItem && getItemKey(simulateItem) === itemKeyOfWantedItem) {
	                            ++simulateIndex;
	                        }
	                        // if the remove didn't put the wanted item in place, we need to insert it
	                        else {
	                                inserts.push({
	                                    key: itemKeyOfWantedItem,
	                                    index: idx
	                                });
	                            }
	                    }
	                } else {
	                    inserts.push({
	                        key: itemKeyOfWantedItem,
	                        index: idx
	                    });
	                    ++idx;
	                }
	            } else {
	                removes.push(remove(simulate, simulateIndex, itemKeyOfSimulateItem));
	            }
	        }
	    }

	    // remove all the remaining nodes from simulate
	    for (; simulateIndex < simulate.length;) {
	        var simulateItem = simulate[simulateIndex],
	            itemKey = getItemKey(simulateItem);
	        removes.push(remove(simulate, simulateIndex, itemKey));
	    }

	    return removes.length === deletedItems && 0 == inserts.length ? {
	        children: oNewChildren,
	        moves: null
	    } : {
	        children: oNewChildren,
	        moves: {
	            removes: removes,
	            inserts: inserts
	        }
	    };
	};

	var makeKeyAndFreeIndexes = function makeKeyAndFreeIndexes(children) {
	    var keyIndexes = {},
	        freeIndexes = [];
	    for (var idx = 0; idx < children.length; ++idx) {
	        var child = children[idx];
	        var itemKeyOfChild = getItemKey(child);
	        itemKeyOfChild ? keyIndexes[itemKeyOfChild] = idx : freeIndexes.push(idx);
	    }
	    return {
	        keyIndexes: keyIndexes,
	        freeIndexes: freeIndexes
	    };
	};

	var getItemKey = function getItemKey(ele) {
	    if (ele) return ele.wxKey;
	};

	exports.default = {
	    listDiff: listDiff,
	    makeKeyAndFreeIndexes: makeKeyAndFreeIndexes,
	    getItemKey: getItemKey
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var wxVirtualText = function () {
	    function wxVirtualText(t) {
	        _classCallCheck(this, wxVirtualText);

	        this.text = String(t);
	    }

	    _createClass(wxVirtualText, [{
	        key: "render",
	        value: function render(e) {
	            var t = e ? e.document || exparser : exparser;
	            return t.createTextNode(this.text);
	        }
	    }]);

	    return wxVirtualText;
	}();

	wxVirtualText.prototype.type = "WxVirtualText";

	exports.default = wxVirtualText;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _objPath = __webpack_require__(13);

	var _objPath2 = _interopRequireDefault(_objPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var data = {};

	var AppData = function () {
	    function AppData() {
	        _classCallCheck(this, AppData);
	    }

	    _createClass(AppData, null, [{
	        key: 'getAppData',
	        value: function getAppData() {
	            return data;
	        }
	    }, {
	        key: 'mergeData',
	        value: function mergeData(originObj, anotherObj) {
	            var originData = JSON.parse(JSON.stringify(originObj));
	            for (var idx in anotherObj) {
	                var o = (0, _objPath2.default.parsePath)(idx),
	                    a = (anotherObj[idx], (0, _objPath2.default.getObjectByPath)(originObj, o, !1)),
	                    s = a.obj,
	                    l = a.key,
	                    c = (0, _objPath2.default.getObjectByPath)(originData, o, !0),
	                    d = c.obj,
	                    u = c.key,
	                    changed = c.changed;

	                s && (s[l] = anotherObj[idx]);

	                if (d) {
	                    if (changed) {
	                        d[u] = anotherObj[idx];
	                    } else {
	                        d[u] = {
	                            __value__: anotherObj[idx],
	                            __wxspec__: !0
	                        };
	                    }
	                }
	            }
	            return originData;
	        }
	    }]);

	    return AppData;
	}();

	exports.default = AppData;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var parsePath = function parsePath(path) {
	    for (var pathLen = path.length, strs = [], tempstr = "", o = 0, r = !1, a = !1, index = 0; index < pathLen; index++) {
	        var ch = path[index];
	        if ("\\" === ch) index + 1 < pathLen && ("." === path[index + 1] || "[" === path[index + 1] || "]" === path[index + 1]) ? (tempstr += path[index + 1], index++) : tempstr += "\\";else if ("." === ch) tempstr && (strs.push(tempstr), tempstr = "");else if ("[" === ch) {
	            if (tempstr && (strs.push(tempstr), tempstr = ""), 0 === strs.length) throw new Error("path can not start with []: " + path);
	            a = !0, r = !1;
	        } else if ("]" === ch) {
	            if (!r) throw new Error("must have number in []: " + path);
	            a = !1, strs.push(o), o = 0;
	        } else if (a) {
	            if (ch < "0" || ch > "9") throw new Error("only number 0-9 could inside []: " + path);
	            r = !0, o = 10 * o + ch.charCodeAt(0) - 48;
	        } else tempstr += ch;
	    }
	    if (tempstr && strs.push(tempstr), 0 === strs.length) throw new Error("path can not be empty");
	    return strs;
	};

	var getObjectByPath = function getObjectByPath(obj, paths, secondTime) {
	    for (var parentObj = void 0, key = void 0, originObj = obj, changed = !1, idx = 0; idx < paths.length; idx++) {
	        var isNumber = Number(paths[idx]) === paths[idx] && paths[idx] % 1 === 0;
	        if (isNumber) {
	            var notArray = "Array" !== (0, _utils2.default.getDataType)(originObj);
	            if (notArray) {
	                var flag = secondTime && !changed;
	                if (flag) {
	                    changed = !0;
	                    parentObj[key] = {
	                        __value__: [],
	                        __wxspec__: !0
	                    };
	                    originObj = parentObj[key].__value__;
	                } else {
	                    parentObj[key] = [];
	                    originObj = parentObj[key];
	                }
	            }
	        } else {
	            var _flag = "Object" !== (0, _utils2.default.getDataType)(originObj);
	            if (_flag) {
	                var _flag2 = secondTime && !changed;
	                if (_flag2) {
	                    changed = !0;
	                    parentObj[key] = {
	                        __value__: {},
	                        __wxspec__: !0
	                    };
	                    originObj = parentObj[key].__value__;
	                } else {
	                    parentObj[key] = {};
	                    originObj = parentObj[key];
	                }
	            }
	            key = paths[idx];
	            parentObj = originObj;
	            originObj = originObj[paths[idx]];
	            originObj && originObj.__wxspec__ && (originObj = originObj.__value__, changed = !0);
	        }
	    }

	    return {
	        obj: obj,
	        key: key,
	        changed: changed
	    };
	};

	exports.default = {
	    parsePath: parsePath,
	    getObjectByPath: getObjectByPath
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var catchError = function catchError(func) {
	    return function () {
	        try {
	            func.apply(void 0, Array.from(arguments));
	        } catch (err) {
	            console.error(err.stack), Reporter.errorReport({
	                key: "exparserScriptError",
	                error: err
	            });
	        }
	    };
	};

	exparser.addGlobalErrorListener(function (e, t) {
	    Reporter.errorReport({
	        key: "webviewScriptError",
	        error: e,
	        extend: t.message
	    });
	});

	exports.default = { catchError: catchError };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	__webpack_require__(2);

	var bottomCheckDistance = 20,
	    windowScrollY = 0,
	    touching = !1,
	    refreshFinish = !0;

	var getWindowHeight = function getWindowHeight() {
	    return "CSS1Compat" === document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight;
	};
	var getScrollHeight = function getScrollHeight() {
	    var e = 0,
	        t = 0;
	    document.body && (e = document.body.scrollHeight);
	    document.documentElement && (t = document.documentElement.scrollHeight);
	    return Math.max(e, t);
	};

	var checkScrollBottom = function checkScrollBottom() {
	    var e = windowScrollY - window.scrollY <= 0;
	    windowScrollY = window.scrollY;
	    return !!(window.scrollY + getWindowHeight() + bottomCheckDistance >= getScrollHeight() && e);
	};

	var triggerPullUpRefresh = function triggerPullUpRefresh() {
	    if (refreshFinish && !touching) {
	        wx.publishPageEvent("onReachBottom", {});
	        refreshFinish = !1;
	        setTimeout(function () {
	            refreshFinish = !0;
	        }, 350);
	    }
	};

	var enablePullUpRefresh = function enablePullUpRefresh() {
	    window.__enablePullUpRefresh__ && !function () {
	        window.onscroll = function () {
	            checkScrollBottom() && triggerPullUpRefresh();
	        };
	        var startPoint = 0;
	        window.__DOMTree__.addListener("touchstart", function (t) {
	            startPoint = t.touches[0].pageY, touching = !1;
	        });
	        window.__DOMTree__.addListener("touchmove", function (t) {
	            if (!touching) {
	                var currentPoint = t.touches[0].pageY;
	                currentPoint < startPoint && checkScrollBottom() && (triggerPullUpRefresh(), touching = !0);
	            }
	        });
	        window.__DOMTree__.addListener("touchend", function (e) {
	            touching = !1;
	        });
	    }();
	};

	exports.default = {
	    getScrollHeight: getScrollHeight,
	    getWindowHeight: getWindowHeight,
	    checkScrollBottom: checkScrollBottom,
	    triggerPullUpRefresh: triggerPullUpRefresh,
	    enablePullUpRefresh: enablePullUpRefresh
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _varEnum = __webpack_require__(3);

	var _varEnum2 = _interopRequireDefault(_varEnum);

	__webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initFontSize = function initFontSize() {
	    document.addEventListener("DOMContentLoaded", function () {
	        var e = window.innerWidth > 0 ? window.innerWidth : screen.width;
	        document.documentElement.style.fontSize = e / _varEnum2.default.RPX_RATE + "px";
	    }, 1e3);
	};

	var init = function init() {
	    window.__webview_engine_version__ = .02, initFontSize();
	};

	exports.default = { init: init };

/***/ }
/******/ ]);
!function(htmlTxt) {
    function insert2html() {
        var styleEle = document.createElement("style");
        document.getElementsByTagName("head")[0].insertBefore(styleEle, document.getElementsByTagName("head")[0].firstChild)
        if (styleEle.styleSheet) {
            styleEle.styleSheet.disabled || (styleEle.styleSheet.cssText = htmlTxt);
        } else{
            try {
                styleEle.innerHTML = htmlTxt
            } catch (n) {
                styleEle.innerText = htmlTxt
            }
        }
    }
    window.document && "complete" === window.document.readyState ? insert2html() : window.onload = insert2html
}('html {\n  -webkit-user-select: none;\n          user-select: none;\n  height: 100%;\n  width: 100%;\n}\nbody {\n  -webkit-user-select: none;\n          user-select: none;\n  width: 100%;\n  overflow-x: hidden;\n}\nwx-action-sheet-item {\n  background-color: #FFFFFF;\n  position: relative;\n  padding: 10px 0;\n  text-align: center;\n  font-size: 18px;\n  display: block;\n}\nwx-action-sheet-item:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n}\nwx-action-sheet-item:active {\n  background-color: #ECECEC;\n}\nwx-action-sheet .wx-action-sheet {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  -webkit-transform: translate(0, 100%);\n          transform: translate(0, 100%);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  z-index: 5000;\n  width: 100%;\n  background-color: #FFFFFF;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\nwx-action-sheet .wx-action-sheet-show {\n  -webkit-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\nwx-action-sheet .wx-action-sheet-menu {\n  background-color: #FFFFFF;\n}\nwx-action-sheet .wx-action-sheet-mask {\n  position: fixed;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  transition: background-color 0.3s;\n  background-color: rgba(0, 0, 0, 0.6);\n}\nwx-audio {\n  display: inline-block;\n  line-height: 0;\n}\nwx-audio[hidden] {\n  display: none;\n}\nwx-audio > .wx-audio-default {\n  max-width: 100%;\n  min-width: 302px;\n  height: 65px;\n  background: #fcfcfc;\n  border: 1px solid #e0e0e0;\n  border-radius: 2.5px;\n  display: inline-block;\n  overflow: hidden;\n}\nwx-audio > .wx-audio-default > .wx-audio-left {\n  width: 65px;\n  height: 65px;\n  float: left;\n  background-color: #e6e6e6;\n  background-size: 100% 100%;\n  background-position: 50% 50%;\n}\nwx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button {\n  width: 24px;\n  height: 24px;\n  margin: 20.5px;\n  background-size: cover;\n}\nwx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button.play {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAB4dJREFUaAXNWg1MlVUYvpcfIRCJ+MnCaOBl8dOcOCEQZ9kmI5cQG5Yb6MifKbMaGVobOtlibTWHDpgpxBUwF07826iFsMkYJhg559JdGiQSkUzSBA0QkZ7n4/u+nXsvwf3jwru99/y/3/N+3znvec97rlbjABofH38GYtaAV4MjwDqwH9gHTBoE3wd3gA3gi+B6rVY7hHR2CKD9wFngs+BHYGuJYziWMqiscwgP8wLvBQ+AHUWURZle1mqhtXQAhLui7xZwPvgFsBENDg7+Drp069at2z09Pf03b978u6mpqZ+dVq1aFRAVFeW/aNGigNDQ0JfDwsISfXx8wowETBT+QpIPLsf0GpuomvrXIgUAPhhizoGXi+II+tq1az/o9fpLFRUVd8S26fJZWVkLN2/enBgTE/PW/PnzF5v0b0P5HSjxp0m9WXFaBQD+NYw6C1bf+vDwcF9DQ4N+/fr19ciPm0m1osLT01N76tSpNaD3PTw8FgpD+TXSoESrUGeWnVIBgM/EiDKwJ0eiPNrS0nJsw4YNNd3d3aOscxSFhIS4V1dXpyckJGRB5jxZ7jDSbVDiW7lslriY1cgVMvjjKErgR0dH/zl06NCuFStWfOdo8HwkZVL2wYMHP3ny5AlNLonPPi5jkSpMfyb9AhjAadMIlsBjrndmZ2fnnThxos9UwEyUMzIynj9y5EgB1gb3ExK/xBuTTSczBQCeC/ZnsDTnCR6f9YMbN25QiNMoOjras7W1tcjb2ztcfijXRKzpwjaaQgBPU0lrI4HntOGbdzZ4AuYzt2/fvm9sbOweyyBiOidjlCr4Y6QAyrTzkqlEx9GSkpJ9zpo2BGNKfHZRUdF+1D+W24iNGFVSpxAAcxekryK9/cuXLx/FoqpWe85iBlPpvbi4uB0yBE4lHabSvyyLX2AXyhJ42nmYytPsMBcI+80ZWKZeGQsxEqtEkgJ4+3Sm9sh1Gm5SM2EqFfnWpsRSV1dXIYzbI2NWv0AqGiXXl+4Bd1ihs0XZu3fvHhgYGNBXVVUlWDTAyk7p6ekNIyMj7fIwYiVmIwWkNvo2trgHAQEBy+CghW7cuPGLvr6+L3fu3PmSJNBBP8R09erVHwVxEwrgU/AwkqQ00DFT8lamqkEICgqKKy4u1sMU7li6dKnVLvL/Pbe0tLRFaEsidi1+UlB5ng3ctBYsWLBV6GRxFnJ4yjIj7CX36uvrS1NTU+uwEM3ara3Al/gaTl+EPC6Vi/hNRUhHR8dPSt5Rqbu7+3Nr1679rL+//3BBQYHyYJvFd3V1iTNkNRV4RZF2G6TkHZ36+vpG5uXlHcah59Pk5GSbj5AY3y1gi6ACisOk4UlKaJyJrBYnsuTa2trjzc3N7/r7+9N1sYo6OzsfCAN0VEB9GzwGCo0zlnV1dfVOTEzMhn3Xl5eXx1rzIBOMflRAsv8UopxhrRFoT18vL68QHCu/am9vz7FUjglGHyow6xQcHBxjKwgqwKCTRIweKHlnpZhGDfC7LP4CJhgH3QCUxzd/AmboA0kP8zNNcDt+w8ZUvHv37l+tedaSJUueFfrfpwJ0oSVLxLiN0DgjWWxsDxobG79JSUn53haXRafT+QrAOjiFDEoFg05K3tEpduoxg8FweuXKlRlJSUm1toAnpvDwcB55FTJQAdUFYMRMaXFkil34l9zc3K2RkZElV65ceWSPbCz414XxF6kAXWfpdMNwHyNmQge7skNDQ3dOnjy5PzAwMLewsLDLLmEYDJMb5ObmFiXLIeZ6FxzNGOK+IFeyk91f4enTpyNtbW3HIiIiNsHCNCmy7U1zcnKWCTIuEDu/AOn8RKLRMFbJcJ9StjRlBIN94Y40ZmZmboqNja3iScrS8dP1IyaEWt4W+kmYaYVILHA/8GGglbHKdevWqV+FHaYjOGofw811hcfZOV1fW9pxzE1wcXGJlscSq6SA+qZhJfai8nN2wNHtDhb0pt7eXoe9Qcq1lRg3hRvNkLtyytuHfAHlKVOI+UIwQxYaRolramrSmZ8LhLefJIAnRmKVSFUAHbiq8yeqNRpGiWE5XlXKs5WWlZUthu3/SHh+voxVqlKnEEuYRvTPee5czjKjxDCr2bMVnYNF9IO7fRRQAokHxIuPeCig3t4YKcAeUCIYiRrcffjwYUd8fPyHzo6PwuJ4XL9+/QAWrjILOHWmDu5SAWjHa500sBSNZoibUWKGvNnuDOKbNwFPLLytITYjUteAWIuOvNbZptQxxF1ZWXnYGWuCc57TRnjzhMFbGmIyI7MpJPbAdMpEuQzsKdc/hi+jT0tLO+NoE0tTSWsjL9h58vP45qe8YppSAQqBEmaXfAy0MlbJcJ+tXqUMUMMdlpsUIuE78JYVO89mznn7LvmUh8gL+xzKknVS6hmrZLiPETNrr1npmNG3oXsg7LCKaFobx1yzKhKhBE3sFnA+mCFuI4IyBuyWzYjb/MHQh+lFN09SPIxgirxIlxhepeIWiHL41vPBFl90i4MtykOROfVXA4tAT9YJisyJP3tMu4gnA29aB2UY4V4DXg1m/FMH9gMrMSd6jwwe8PxtAPMU6JC/2/wHuyI2cMsNBRIAAAAASUVORK5CYII=\');\n}\nwx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button.pause {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABatJREFUaAXVWl1IpFUYnllZGUf3wlz6MXER1ES7s83VUDJw6KpdaSTDwMnYFSK6KNirooHullKQCNzQRjZ/wom1u9ALQ0mT1ktFdEBWXLdibaH1jwmx5zme83W+z2Hm+7bZmc8X3jl/73vO837n/z3j9aSBjo6O8lBNC7gZXAUuBxeCz4FJj8APwTHwCngaPOX1evcRZocAuhAcAt8G74KdEnWoyzpobGYIjfnBn4D/BqeLWBfr9Du1wmtXAZXnQPY9cBj8HNhEe3t7sbW1tfn19fW7m5ubD5aXl7dnZmYeUKipqel8dXV1UUlJyfmysrILFRUV9X6/n8PMSveREQYPYHgdWgsTpW0ZAPDPQ3kC/JJeCUEvLi7+NDg4+EskEvldL0sVD4VCz3Z1db1SW1v7egJj7kD/Coy4l6qelAYAfB0quQ02vno8Hr8/OTkZaWtrmzo4ODhK1Uiycp/P5x0fH28JBAKh3Nxcow3osDdaYcRCMv2kBgD8O1D+BuyTlcTn5+cj7e3t0Y2NjX+SVey0rLS09OzY2Fiwvr4+BN1cqX+A8CqM+E6mTwRnTuTIDAn+FpIC/OHh4V+9vb0fNzQ0jKYbPJtknaybbbAtCYNt35JYZJY5SNgDctj8DFEBfnd3d627u/vT4eHhP8zqTybV0dHxTH9//+f5+fkVsgX2xKuJhtMJAwCeE/Y3sBiPBF9XV/fh0tISK8kY1dTU+BYWFvo0IzgnLlontmkIATyXSq42Ajy7kl8+0+D5ldgm29aGEzFNSIwUEWQyADlc59VSGe/r6/ssU8PmGI75l20TA3LjsoTYiNEgYwjBMu6CPKuIr4/Vph+TasyQzGJkbm7ubaxO1yQEDqVyDKU9pvUe+AhpAZ7rPJbKHyjgBuKyTUwSCzESqyBhAL4+D1PXZZ6Hm9STWCpV/U5DYiEmTe+6xOwRQwiJEAq/pQCPB0VFRdf+7w7LutJJ3LG3t7dvaseOdzGMImoIXVaN8WzjNvDERkzEpnAiFJjP4OvzMhJQBTyYqbjdEDov7+/vf4+6pu0wZQcGBi7arV/JWbAFiN2Lnzcg8COFuGkVFBSo2a70UoYEhC5+OqWgJoAv+mdeXt5bWpat6M7Ozk1tc7vMIfSa0lxdXf1VxZ2ETsGz7sfRoV4sFtMxNtOAF1hAugs6jrn3lxcmDV0VDTBuRrxJaYWujFowltMA40LNa6ArUWugLBgLaYByfXjUHVaTd13UgvEcDTjVRAPodBJE74GKuzW0YHxEA+gxE0TXh4q7NbRgfEgDeIQWRL+Nirs1tGCM0YAVBZZOJxV3a2jBuEIDphVYesxU3EnIY4ETeco+jg71LBinacAUWNxueFSlx4yCTmh0dPRLJ4AoOzIy8oWTNihLbNpxmpin1H2AnrcrFJqdnf0KM901tzFiUoQ94M3GxsYPZHoC94FW9gBJnEYZoa8SBy1hGNNuIWIiNg2PwKwbIPYDdhF9lZqgK6LEpA0fYv3PAHQF94IbCikdrcXFxWdVOtsh/abEpOG4ITGbvBI9EBA3f3qJo9FoUFPIapROX81zTYzEKkgNIQ8s4qwOH2d7PPQS9/T0vKjS2QqJQXqsFYSwxCrSpsmK6yVdi7zx0APmoVuvs7Pz/Wx55+jkHRoa+jonJ+cp4gHdAV+CAcbrjckASsCI0+vcpQGw7h6CVrDwRvMCTS8xvwbLM0Fsy+KZJha+1hCbiYw5oOdCkM86V1UejWBXZmJOsA22pXkeCIOvNAmfmk4MIQWaIYZTwiemYDAY3dracsUTU1IDpBGn95FP9Yac2KfzmVUzgkssHxfCYOGGR2gQvXp0jNG3lOyh+wKosrLykmWMq3q4SYXBth+6laLtEL3hqr8a2AZuFYQhrvizR8pJbAWeKA1j6OFuATeDq8D09hWClc+Jp0ceGHn/5hWWt8C0/N3mX15C4bDnCIuAAAAAAElFTkSuQmCC\');\n}\nwx-audio > .wx-audio-default > .wx-audio-right {\n  box-sizing: border-box;\n  height: 65px;\n  margin-left: 65px;\n  padding: 11px 16.5px 13.5px 15px;\n  overflow: hidden;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info {\n  margin-right: 70px;\n  overflow: hidden;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info > .wx-audio-name {\n  height: 22.5px;\n  line-height: 22.5px;\n  margin-bottom: 3.5px;\n  font-size: 14px;\n  color: #353535;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info > .wx-audio-author {\n  height: 14.5px;\n  line-height: 14.5px;\n  font-size: 12px;\n  color: #888888;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-time {\n  margin-top: 3.5px;\n  height: 16.5px;\n  font-size: 12px;\n  color: #888888;\n  float: right;\n}\nwx-button {\n  position: relative;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 14px;\n  padding-right: 14px;\n  box-sizing: border-box;\n  font-size: 18px;\n  text-align: center;\n  text-decoration: none;\n  line-height: 2.55555556;\n  border-radius: 5px;\n  -webkit-tap-highlight-color: transparent;\n  overflow: hidden;\n  color: #000000;\n  background-color: #F8F8F8;\n}\nwx-button[hidden] {\n  display: none !important;\n}\nwx-button:after {\n  content: " ";\n  width: 200%;\n  height: 200%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  -webkit-transform: scale(0.5);\n          transform: scale(0.5);\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  box-sizing: border-box;\n  border-radius: 10px;\n}\nwx-button[type=default] {\n  color: #000000;\n  background-color: #F8F8F8;\n}\nwx-button[type=primary] {\n  color: #FFFFFF;\n  background-color: #1AAD19;\n}\nwx-button[type=warn] {\n  color: #FFFFFF;\n  background-color: #E64340;\n}\nwx-button[type=warn]:not([disabled]):visited {\n  color: #FFFFFF;\n}\nwx-button[type=warn]:not([disabled]):active {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #CE3C39;\n}\nwx-button[disabled] {\n  color: rgba(255, 255, 255, 0.6);\n}\nwx-button[disabled][type=default],\nwx-button[disabled]:not([type]) {\n  color: rgba(0, 0, 0, 0.3);\n  background-color: #F7F7F7;\n}\nwx-button[disabled][type=primary] {\n  background-color: #9ED99D;\n}\nwx-button[disabled][type=warn] {\n  background-color: #EC8B89;\n}\nwx-button[type=primary][plain] {\n  color: #1aad19;\n  border: 1px solid #1aad19;\n  background-color: transparent;\n}\nwx-button[type=primary][plain]:not([disabled]):active {\n  color: rgba(26, 173, 25, 0.6);\n  border-color: rgba(26, 173, 25, 0.6);\n  background-color: transparent;\n}\nwx-button[type=primary][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[type=primary][plain]:after {\n  border-width: 0;\n}\nwx-button[type=default][plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\nwx-button[type=default][plain]:not([disabled]):active {\n  color: rgba(53, 53, 53, 0.6);\n  border-color: rgba(53, 53, 53, 0.6);\n  background-color: transparent;\n}\nwx-button[type=default][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[type=default][plain]:after {\n  border-width: 0;\n}\nwx-button[plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\nwx-button[plain]:not([disabled]):active {\n  color: rgba(53, 53, 53, 0.6);\n  border-color: rgba(53, 53, 53, 0.6);\n  background-color: transparent;\n}\nwx-button[plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[plain]:after {\n  border-width: 0;\n}\nwx-button[type=warn][plain] {\n  color: #e64340;\n  border: 1px solid #e64340;\n  background-color: transparent;\n}\nwx-button[type=warn][plain]:not([disabled]):active {\n  color: rgba(230, 67, 64, 0.6);\n  border-color: rgba(230, 67, 64, 0.6);\n  background-color: transparent;\n}\nwx-button[type=warn][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[type=warn][plain]:after {\n  border-width: 0;\n}\nwx-button[size=mini] {\n  display: inline-block;\n  line-height: 2.3;\n  font-size: 13px;\n  padding: 0 1.34em;\n}\nwx-button[loading]:before {\n  content: " ";\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n  vertical-align: middle;\n  -webkit-animation: wx-button-loading-animate 1s steps(12, end) infinite;\n          animation: wx-button-loading-animate 1s steps(12, end) infinite;\n  background: transparent url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;\n  background-size: 100%;\n}\nwx-button[loading][type=primary] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #179B16;\n}\nwx-button[loading][type=primary][plain] {\n  color: #1aad19;\n  background-color: transparent;\n}\nwx-button[loading][type=default] {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #DEDEDE;\n}\nwx-button[loading][type=default][plain] {\n  color: #353535;\n  background-color: transparent;\n}\nwx-button[loading][type=warn] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #CE3C39;\n}\nwx-button[loading][type=warn][plain] {\n  color: #e64340;\n  background-color: transparent;\n}\n@-webkit-keyframes wx-button-loading-animate {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n            transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n            transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes wx-button-loading-animate {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n            transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n            transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n.button-hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.button-hover[type=primary] {\n  background-color: #179B16;\n}\n.button-hover[type=default] {\n  background-color: #DEDEDE;\n}\nwx-canvas {\n  width: 300px;\n  height: 150px;\n  display: block;\n}\nwx-checkbox {\n  -webkit-tap-highlight-color: transparent;\n  display: inline-block;\n}\nwx-checkbox[hidden] {\n  display: none;\n}\nwx-checkbox .wx-checkbox-wrapper {\n  display: -webkit-inline-flex;\n  display: inline-flex;\n  -webkit-align-items: center;\n          align-items: center;\n  vertical-align: middle;\n}\nwx-checkbox .wx-checkbox-input {\n  margin-right: 5px;\n  -webkit-appearance: none;\n          appearance: none;\n  outline: 0;\n  border: 1px solid #D1D1D1;\n  background-color: #FFFFFF;\n  border-radius: 3px;\n  width: 22px;\n  height: 22px;\n  position: relative;\n}\nwx-checkbox .wx-checkbox-input.wx-checkbox-input-checked {\n  color: #09BB07;\n}\nwx-checkbox .wx-checkbox-input.wx-checkbox-input-checked:before {\n  font: normal normal normal 14px/1 "weui";\n  content: "\\EA08";\n  font-size: 22px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -48%) scale(0.73);\n  -webkit-transform: translate(-50%, -48%) scale(0.73);\n}\nwx-checkbox .wx-checkbox-input.wx-checkbox-input-disabled {\n  background-color: #E1E1E1;\n}\nwx-checkbox .wx-checkbox-input.wx-checkbox-input-disabled:before {\n  color: #ADADAD;\n}\nwx-checkbox-group {\n  display: block;\n}\nwx-checkbox-group[hidden] {\n  display: none;\n}\nwx-icon {\n  display: inline-block;\n  font-size: 0;\n}\nwx-icon[hidden] {\n  display: none;\n}\nwx-icon i {\n  font: normal normal normal 14px/1 "weui";\n}\n@font-face {\n  font-weight: normal;\n  font-style: normal;\n  font-family: "weui";\n  src: url(\'data:application/octet-stream;base64,AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzJAKEx1AAABfAAAAFZjbWFw64JcfgAAAhQAAAI0Z2x5ZvCBJt8AAARsAAAHLGhlYWQIuM5WAAAA4AAAADZoaGVhCC0D+AAAALwAAAAkaG10eDqYAAAAAAHUAAAAQGxvY2EO3AzsAAAESAAAACJtYXhwAR4APgAAARgAAAAgbmFtZeNcHtgAAAuYAAAB5nBvc3RP98ExAAANgAAAANYAAQAAA+gAAABaA+gAAP//A+kAAQAAAAAAAAAAAAAAAAAAABAAAQAAAAEAAKZXmK1fDzz1AAsD6AAAAADS2MTEAAAAANLYxMQAAAAAA+kD6QAAAAgAAgAAAAAAAAABAAAAEAAyAAQAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAAAAQOqAZAABQAIAnoCvAAAAIwCegK8AAAB4AAxAQIAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA6gHqDwPoAAAAWgPpAAAAAAABAAAAAAAAAAAAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAAAAAUAAAADAAAALAAAAAQAAAFwAAEAAAAAAGoAAwABAAAALAADAAoAAAFwAAQAPgAAAAQABAABAADqD///AADqAf//AAAAAQAEAAAAAQACAAMABAAFAAYABwAIAAkACgALAAwADQAOAA8AAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAMQAAAAAAAAADwAA6gEAAOoBAAAAAQAA6gIAAOoCAAAAAgAA6gMAAOoDAAAAAwAA6gQAAOoEAAAABAAA6gUAAOoFAAAABQAA6gYAAOoGAAAABgAA6gcAAOoHAAAABwAA6ggAAOoIAAAACAAA6gkAAOoJAAAACQAA6goAAOoKAAAACgAA6gsAAOoLAAAACwAA6gwAAOoMAAAADAAA6g0AAOoNAAAADQAA6g4AAOoOAAAADgAA6g8AAOoPAAAADwAAAAAALgBmAKIA3gEaAV4BtgHkAgoCRgKIAtIDFANOA5YAAAACAAAAAAOvA60ACwAXAAABDgEHHgEXPgE3LgEDLgEnPgE3HgEXDgEB9bz5BQX5vLv5BQX5u6zjBQXjrKvjBQXjA60F+by7+gQE+ru8+fy0BOSrq+QEBOSrq+QAAAIAAAAAA7MDswALACEAAAEOAQceARc+ATcuAQMHBiIvASY2OwERNDY7ATIWFREzMhYB7rn7BQX7ucL+BQX+JHYPJg92DgwYXQsHJggKXRgMA7MF/sK5+wUF+7nC/v31mhISmhIaARcICwsI/ukaAAADAAAAAAOtA6sACwAZACIAAAEOAQceARc+ATcuAQMUBisBIiY1ETY3MxYXJy4BNDYyFhQGAfC49gUF9ri++gUF+poKBxwHCgEILAgBHxMZGSYZGQOrBfq+uPYFBfa4vvr9dQcKCgcBGggBAQg5ARklGRklGQAAAAACAAAAAAOSA8IADQAfAAABDgEHERYEFzYkNxEuARMBBi8BJj8BNh8BFjclNh8BFgH0gchUCQEDkZEBAwlUyHr+vwQDlAMCFQMDegMEAScEAxMDA8IePRz+w9TwJCTw1AE9HD3+3f7DAgOZBAMcBANdAgL2AwMTBAADAAAAAAOCA7AADQAZACIAAAEOAQcRHgEXPgE3ES4BBzMWFQcGByMmLwE0EyImNDYyFhQGAfV7wVEJ+YuL+QlRwZIuCQoBBCIEAQogDhISHBISA7AdOxr+z8vnIyPnywExGjv3AQjYBAEBBNgI/rETHBISHBMAAAACAAAAAAO9A70AFwAjAAABLgE/AT4BHwEWMjclNhYXJxYUBwEGJiclJgAnBgAHFgAXNgABIAUCBQMFEAdiBxIGARMHEQYCBgb+0AYQBgIcBf79x77/AAUFAQC+xwEDAccGEQcEBwIFTAQF5QYBBgIGEAb+1QYBBqzHAQMFBf79x77/AAUFAQAABAAAAAADrwOtAAsAFwAtADEAAAEOAQceARc+ATcuAQMuASc+ATceARcOARMFDgEvASYGDwEGFh8BFjI3AT4BJiIXFjEXAfW8+QUF+by7+QUF+bus4wUF46yr4wUF4yv+9gcRBmAGDwUDBQEGfQUQBgElBQELDxQBAQOtBfm8u/oEBPq7vPn8tATkq6vkBATkq6vkAiLdBQEFSQUCBgQHEQaABgUBIQUPCwQBAQAAAAABAAAAAAO7AzoAFwAAEy4BPwE+AR8BFjY3ATYWFycWFAcBBiInPQoGBwUIGQzLDSALAh0MHgsNCgr9uQscCwGzCyEOCw0HCZMJAQoBvgkCCg0LHQv9sQsKAAAAAAIAAAAAA7gDuAALABEAAAEGAgceARc2JDcmABMhETMRMwHuvP0FBf28xQEABQX/ADr+2i35A7gF/wDFvP0FBf28xQEA/d4BTv7fAAAEAAAAAAOvA60AAwAPABsAIQAAARYxFwMOAQceARc+ATcuAQMuASc+ATceARcOAQMjFTM1IwLlAQHyvPkFBfm8u/kFBfm7rOMFBeOsq+MFBePZJP3ZAoMBAQEsBfm8u/oEBPq7vPn8tATkq6vkBATkq6vkAi39JAADAAAAAAPDA8MACwAbACQAAAEGAAcWABc2ADcmAAczMhYVAw4BKwEiJicDNDYTIiY0NjIWFAYB7sD+/AUFAQTAyQEHBQX++d42CAoOAQUEKgQFAQ4KIxMaGiYaGgPDBf75ycD+/AUFAQTAyQEH5woI/tMEBgYEASwIC/4oGicZGScaAAAEAAAAAAPAA8AACAASAB4AKgAAAT4BNCYiBhQWFyMVMxEjFTM1IwMGAAcWBBc+ATcmAgMuASc+ATceARcOAQH0GCEhMCEhUY85Ock6K83++AQEAQjNuf8FBf/Hq+MEBOOrq+MEBOMCoAEgMSAgMSA6Hf7EHBwCsQT++M25/wUF/7nNAQj8pwTjq6vjBATjq6vjAAAAAwAAAAADpwOnAAsAFwAjAAABBycHFwcXNxc3JzcDDgEHHgEXPgE3LgEDLgEnPgE3HgEXDgECjpqaHJqaHJqaHJqatrn1BQX1ubn1BQX1uajfBATfqKjfBATfAqqamhyamhyamhyamgEZBfW5ufUFBfW5ufX8xwTfqKjfBATfqKjfAAAAAwAAAAAD6QPpABEAHQAeAAABDgEjLgEnPgE3HgEXFAYHAQcBPgE3LgEnDgEHHgEXAo41gEmq4gQE4qqq4gQvKwEjOf3giLUDA7WIiLUDBLSIASMrLwTiqqriBATiqkmANP7dOQEZA7WIiLUDA7WIiLUDAAACAAAAAAPoA+gACwAnAAABBgAHFgAXNgA3JgADFg4BIi8BBwYuATQ/AScmPgEyHwE3Nh4BFA8BAfTU/uUFBQEb1NQBGwUF/uUDCgEUGwqiqAobEwqoogoBFBsKoqgKGxMKqAPoBf7l1NT+5QUFARvU1AEb/WgKGxMKqKIKARQbCqKoChsTCqiiCgEUGwqiAAAAABAAxgABAAAAAAABAAQAAAABAAAAAAACAAcABAABAAAAAAADAAQACwABAAAAAAAEAAQADwABAAAAAAAFAAsAEwABAAAAAAAGAAQAHgABAAAAAAAKACsAIgABAAAAAAALABMATQADAAEECQABAAgAYAADAAEECQACAA4AaAADAAEECQADAAgAdgADAAEECQAEAAgAfgADAAEECQAFABYAhgADAAEECQAGAAgAnAADAAEECQAKAFYApAADAAEECQALACYA+ndldWlSZWd1bGFyd2V1aXdldWlWZXJzaW9uIDEuMHdldWlHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQB3AGUAdQBpAFIAZQBnAHUAbABhAHIAdwBlAHUAaQB3AGUAdQBpAFYAZQByAHMAaQBvAG4AIAAxAC4AMAB3AGUAdQBpAEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERAAZjaXJjbGUIZG93bmxvYWQEaW5mbwxzYWZlX3N1Y2Nlc3MJc2FmZV93YXJuB3N1Y2Nlc3MOc3VjY2Vzc19jaXJjbGURc3VjY2Vzc19ub19jaXJjbGUHd2FpdGluZw53YWl0aW5nX2NpcmNsZQR3YXJuC2luZm9fY2lyY2xlBmNhbmNlbAZzZWFyY2gFY2xvc2UAAAAA\') format(\'truetype\');\n}\n[class^="wx-icon-"]:before,\n[class*=" wx-icon-"]:before {\n  margin: 0;\n}\n.wx-icon-success {\n  color: #09BB07;\n}\n.wx-icon-success:before {\n  content: "\\EA06";\n}\n.wx-icon-info {\n  color: #10AEFF;\n}\n.wx-icon-info:before {\n  content: "\\EA03";\n}\n.wx-icon-warn {\n  color: #F76260;\n}\n.wx-icon-warn:before {\n  content: "\\EA0B";\n}\n.wx-icon-waiting {\n  color: #10AEFF;\n}\n.wx-icon-waiting:before {\n  content: "\\EA09";\n}\n.wx-icon-safe_success {\n  color: #09BB07;\n}\n.wx-icon-safe_success:before {\n  content: "\\EA04";\n}\n.wx-icon-safe_warn {\n  color: #FFBE00;\n}\n.wx-icon-safe_warn:before {\n  content: "\\EA05";\n}\n.wx-icon-success_circle {\n  color: #09BB07;\n}\n.wx-icon-success_circle:before {\n  content: "\\EA07";\n}\n.wx-icon-success_no_circle {\n  color: #09BB07;\n}\n.wx-icon-success_no_circle:before {\n  content: "\\EA08";\n}\n.wx-icon-waiting_circle {\n  color: #10AEFF;\n}\n.wx-icon-waiting_circle:before {\n  content: "\\EA0A";\n}\n.wx-icon-circle {\n  color: #C9C9C9;\n}\n.wx-icon-circle:before {\n  content: "\\EA01";\n}\n.wx-icon-download {\n  color: #09BB07;\n}\n.wx-icon-download:before {\n  content: "\\EA02";\n}\n.wx-icon-info_circle {\n  color: #09BB07;\n}\n.wx-icon-info_circle:before {\n  content: "\\EA0C";\n}\n.wx-icon-cancel {\n  color: #F43530;\n}\n.wx-icon-cancel:before {\n  content: "\\EA0D";\n}\n.wx-icon-search {\n  color: #B2B2B2;\n}\n.wx-icon-search:before {\n  content: "\\EA0E";\n}\n.wx-icon-clear {\n  color: #B2B2B2;\n}\n.wx-icon-clear:before {\n  content: "\\EA0F";\n}\n[class^="wx-icon-"]:before,\n[class*=" wx-icon-"]:before {\n  box-sizing: border-box;\n}\nwx-image {\n  width: 320px;\n  height: 240px;\n  display: inline-block;\n  overflow: hidden;\n}\nwx-image[hidden] {\n  display: none;\n}\nwx-image > div {\n  width: 100%;\n  height: 100%;\n}\nwx-image > img {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  display: block;\n}\n.input-placeholder {\n  color: gray;\n}\nwx-input {\n  display: block;\n  height: 1.4rem;\n  text-overflow: clip;\n  overflow: hidden;\n  white-space: nowrap;\n  font-family: UICTFontTextStyleBody;\n  min-height: 1.4rem;\n}\nwx-input input {\n  position: relative;\n  min-height: 1.4rem;\n  border: none;\n  height: inherit;\n  width: 100%;\n  font-size: inherit;\n  font-weight: inherit;\n  font-family: UICTFontTextStyleBody;\n  color: inherit;\n  background: transparent;\n  display: inherit;\n  padding: 0;\n  margin: 0;\n  outline: none;\n  vertical-align: middle;\n  text-align: inherit;\n  overflow: inherit;\n  white-space: inherit;\n  text-overflow: inherit;\n  -webkit-tap-highlight-color: transparent;\n  z-index: 2;\n}\nwx-input[disabled] div {\n  color: grey;\n}\nwx-input[hidden] {\n  display: none;\n}\nwx-input div {\n  position: relative;\n  min-height: 1.4rem;\n  text-overflow: inherit;\n  border: none;\n  height: inherit;\n  width: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n  font-family: UICTFontTextStyleBody;\n  color: inherit;\n  background: inherit;\n  padding: 0;\n  margin: 0;\n  outline: none;\n  text-align: inherit;\n  -webkit-tap-highlight-color: transparent;\n}\nwx-input div[type=password] div {\n  color: black;\n}\nwx-input div div {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  line-height: 100%;\n  height: inherit;\n  min-height: 1.4rem;\n  white-space: nowrap;\n  text-align: inherit;\n  overflow: hidden;\n  vertical-align: middle;\n  z-index: 1;\n}\n.wx-loading {\n  position: fixed;\n  z-index: 2000000000;\n  width: 7.6em;\n  min-height: 7.6em;\n  top: 180px;\n  left: 50%;\n  margin-left: -3.8em;\n  background: rgba(40, 40, 40, 0.75);\n  text-align: center;\n  border-radius: 5px;\n  color: #FFFFFF;\n  font-size: 16px;\n  line-height: normal;\n}\n.wx-loading-icon {\n  margin: 30px 0 10px;\n  width: 38px;\n  height: 38px;\n  vertical-align: baseline;\n  display: inline-block;\n  -webkit-animation: weuiLoading 1s steps(12, end) infinite;\n          animation: weuiLoading 1s steps(12, end) infinite;\n  background: transparent url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;\n  background-size: 100%;\n}\n.wx-loading-content {\n  margin: 0 0 15px;\n}\n.wx-loading-mask {\n  position: fixed;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n@-webkit-keyframes weuiLoading {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes weuiLoading {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\nwx-map {\n  position: relative;\n  width: 300px;\n  height: 150px;\n  display: block;\n}\n.wx-mask {\n  position: fixed;\n  z-index: inherit;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  transition: background-color 0.3s;\n  background-color: inherit;\n}\n.wx-mask[show=false] {\n  display: none;\n}\n.wx-mask-transparent {\n  background-color: rgba(0, 0, 0, 0);\n}\nwx-mask {\n  z-index: 1000;\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.6);\n}\nwx-modal .wx-modal-mask {\n  z-index: inherit;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  transition: background-color 0.3s;\n  background-color: inherit;\n  z-index: 1000;\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.6);\n  -webkit-animation: fadeIn ease .3s forwards;\n          animation: fadeIn ease .3s forwards;\n}\nwx-modal .wx-modal-dialog {\n  position: fixed;\n  z-index: 5000;\n  width: 85%;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  background-color: #FAFAFC;\n  text-align: center;\n  border-radius: 3px;\n  overflow: hidden;\n}\nwx-modal .wx-modal-dialog-hd {\n  padding: 1.2em 20px .5em;\n}\nwx-modal .wx-modal-dialog-hd strong {\n  font-weight: normal;\n  font-size: 17px;\n}\nwx-modal .wx-modal-dialog-bd {\n  text-align: left;\n  padding: 0 20px;\n  font-size: 15px;\n  color: #888;\n  word-wrap: break-word;\n  word-break: break-all;\n}\nwx-modal .wx-modal-dialog-ft {\n  position: relative;\n  line-height: 42px;\n  margin-top: 20px;\n  font-size: 17px;\n  display: -webkit-flex;\n  display: flex;\n}\nwx-modal .wx-modal-dialog-ft:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 1px;\n  border-top: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\nwx-modal .wx-modal-dialog-ft a {\n  position: relative;\n  display: block;\n  -webkit-flex: 1;\n          flex: 1;\n  text-decoration: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nwx-modal .wx-modal-dialog-ft a[hidden] {\n  display: none;\n}\nwx-modal .wx-modal-dialog-ft a:active {\n  background-color: #eee;\n}\nwx-modal .wx-modal-btn-primary {\n  color: #3CC51F;\n}\nwx-modal .wx-modal-btn-default {\n  color: #000000;\n}\nwx-modal .wx-modal-btn-default:before {\n  content: " ";\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 1px;\n  height: 100%;\n  border-right: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 100% 0;\n          transform-origin: 100% 0;\n  -webkit-transform: scaleX(0.5);\n          transform: scaleX(0.5);\n}\n@media screen and (min-width: 1024px) {\n  wx-modal .wx-modal-dialog {\n    width: 35%;\n  }\n}\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\nwx-picker {\n  display: block;\n}\nwx-picker-view {\n  display: block;\n}\nwx-picker-view .wrapper {\n  display: -webkit-flex;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n}\nwx-picker-view[hidden] {\n  display: none;\n}\nwx-picker-view-column {\n  -webkit-flex: 1;\n  flex: 1;\n  position: relative;\n  height: 100%;\n  overflow: hidden;\n}\n.wx-picker__mask {\n  transform: translateZ(0);\n  -webkit-transform: translateZ(0);\n}\n.wx-picker__indicator,\n.wx-picker__mask {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  z-index: 3;\n}\n.wx-picker__mask {\n  top: 0;\n  height: 100%;\n  margin: 0 auto;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\n  background-position: top,bottom;\n  background-size: 100% 102px;\n  background-repeat: no-repeat;\n}\n.wx-picker__indicator {\n  height: 34px;\n  top: 102px;\n}\n.wx-picker__indicator,\n.wx-picker__mask {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  z-index: 3;\n  pointer-events: none;\n}\n.wx-picker__content {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n}\n.wx-picker__indicator:after,\n.wx-picker__indicator:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 1px;\n  color: #e5e5e5;\n}\n.wx-picker__indicator:before {\n  top: 0;\n  border-top: 1px solid #e5e5e5;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n}\n.wx-picker__indicator:after {\n  bottom: 0;\n  border-bottom: 1px solid #e5e5e5;\n  -webkit-transform-origin: 0 100%;\n  transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n}\n.wx-picker__indicator:after,\n.wx-picker__indicator:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 1px;\n  color: #e5e5e5;\n}\nwx-progress {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n          align-items: center;\n}\nwx-progress[hidden] {\n  display: none;\n}\n.wx-progress-bar {\n  background-color: #EBEBEB;\n  -webkit-flex: 1;\n          flex: 1;\n}\n.wx-progress-inner-bar {\n  width: 0;\n  height: 100%;\n}\n.wx-progress-info {\n  margin-top: 0;\n  margin-bottom: 0;\n  min-width: 2em;\n  margin-left: 15px;\n  font-size: 16px;\n}\nwx-radio {\n  -webkit-tap-highlight-color: transparent;\n  display: inline-block;\n}\nwx-radio[hidden] {\n  display: none;\n}\nwx-radio .wx-radio-wrapper {\n  display: -webkit-inline-flex;\n  display: inline-flex;\n  -webkit-align-items: center;\n          align-items: center;\n  vertical-align: middle;\n}\nwx-radio .wx-radio-input {\n  -webkit-appearance: none;\n          appearance: none;\n  margin-right: 5px;\n  outline: 0;\n  border: 1px solid #D1D1D1;\n  background-color: #ffffff;\n  border-radius: 50%;\n  width: 22px;\n  height: 22px;\n  position: relative;\n}\nwx-radio .wx-radio-input.wx-radio-input-checked {\n  background-color: #09BB07;\n  border-color: #09BB07;\n}\nwx-radio .wx-radio-input.wx-radio-input-checked:before {\n  font: normal normal normal 14px/1 "weui";\n  content: "\\EA08";\n  color: #ffffff;\n  font-size: 18px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -48%) scale(0.73);\n  -webkit-transform: translate(-50%, -48%) scale(0.73);\n}\nwx-radio .wx-radio-input.wx-radio-input-disabled {\n  background-color: #E1E1E1;\n  border-color: #D1D1D1;\n}\nwx-radio .wx-radio-input.wx-radio-input-disabled:before {\n  color: #ADADAD;\n}\nwx-radio-group {\n  display: block;\n}\nwx-radio-group[hidden] {\n  display: none;\n}\nwx-scroll-view {\n  display: block;\n  width: 100%;\n}\nwx-scroll-view[hidden] {\n  display: none;\n}\n.wx-scroll-view {\n  position: relative;\n  -webkit-overflow-scrolling: touch;\n  height: 100%;\n}\nwx-swiper {\n  display: block;\n  height: 150px;\n}\nwx-swiper[hidden] {\n  display: none;\n}\nwx-swiper .wx-swiper-wrapper {\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\nwx-swiper .wx-swiper-slides {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n}\nwx-swiper .wx-swiper-slides-tracking {\n  transition: none;\n}\nwx-swiper .wx-swiper-dots {\n  position: absolute;\n  font-size: 20px;\n  line-height: 20px;\n}\nwx-swiper .wx-swiper-dots-horizontal {\n  left: 50%;\n  bottom: 0;\n  text-align: center;\n  white-space: nowrap;\n  height: 24px;\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n}\nwx-swiper .wx-swiper-dots-vertical {\n  right: 0;\n  top: 50%;\n  text-align: right;\n  width: 24px;\n  -webkit-transform: translate(0, -50%);\n  transform: translate(0, -50%);\n}\nwx-swiper .wx-swiper-dot {\n  display: inline-block;\n  width: 24px;\n  text-align: center;\n  cursor: pointer;\n  color: grey;\n  transition-property: color;\n  transition-timing-function: ease;\n}\nwx-swiper .wx-swiper-dot-active {\n  color: black;\n}\nwx-swiper .wx-swiper-dot::before {\n  content: "\\2022";\n}\nwx-swiper-item {\n  display: block;\n  overflow: hidden;\n  transition-property: -webkit-transform;\n  transition-property: transform;\n  transition-property: transform, -webkit-transform;\n  transition-timing-function: ease;\n  will-change: transform;\n}\nwx-swiper-item[hidden] {\n  display: none;\n}\nwx-slider {\n  margin: 10px 18px;\n  padding: 0;\n  display: block;\n}\nwx-slider[hidden] {\n  display: none;\n}\nwx-slider .wx-slider-wrapper {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n          align-items: center;\n  min-height: 16px;\n}\nwx-slider .wx-slider-tap-area {\n  -webkit-flex: 1;\n          flex: 1;\n  padding: 8px 0;\n}\nwx-slider .wx-slider-handle-wrapper {\n  position: relative;\n  height: 2px;\n  border-radius: 5px;\n  background-color: #e9e9e9;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  -webkit-tap-highlight-color: transparent;\n}\nwx-slider .wx-slider-track {\n  height: 100%;\n  border-radius: 6px;\n  background-color: #1aad19;\n  transition: background-color 0.3s ease;\n}\nwx-slider .wx-slider-handle {\n  position: absolute;\n  width: 28px;\n  height: 28px;\n  left: 50%;\n  top: 50%;\n  margin-left: -14px;\n  margin-top: -14px;\n  cursor: pointer;\n  border-radius: 50%;\n  background-color: #fff;\n  z-index: 2;\n  transition: border-color 0.3s ease;\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);\n}\nwx-slider .wx-slider-step {\n  position: absolute;\n  width: 100%;\n  height: 2px;\n  background: transparent;\n  z-index: 1;\n}\nwx-slider .wx-slider-value {\n  color: #888;\n  font-size: 14px;\n  margin-left: 1em;\n}\nwx-slider .wx-slider-disabled .wx-slider-track {\n  background-color: #ccc;\n}\nwx-slider .wx-slider-disabled .wx-slider-handle {\n  background-color: #FFF;\n  border-color: #ccc;\n}\n* {\n  margin: 0;\n}\nwx-switch {\n  -webkit-tap-highlight-color: transparent;\n  display: inline-block;\n}\nwx-switch[hidden] {\n  display: none;\n}\nwx-switch .wx-switch-wrapper {\n  display: -webkit-inline-flex;\n  display: inline-flex;\n  -webkit-align-items: center;\n          align-items: center;\n  vertical-align: middle;\n}\nwx-switch .wx-switch-input {\n  -webkit-appearance: none;\n          appearance: none;\n  position: relative;\n  width: 52px;\n  height: 32px;\n  margin-right: 5px;\n  border: 1px solid #DFDFDF;\n  outline: 0;\n  border-radius: 16px;\n  box-sizing: border-box;\n  background-color: #DFDFDF;\n  transition: background-color 0.1s, border 0.1s;\n}\nwx-switch .wx-switch-input:before {\n  content: " ";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 50px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FDFDFD;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\nwx-switch .wx-switch-input:after {\n  content: " ";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FFFFFF;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\nwx-switch .wx-switch-input.wx-switch-input-checked {\n  border-color: #04BE02;\n  background-color: #04BE02;\n}\nwx-switch .wx-switch-input.wx-switch-input-checked:before {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\nwx-switch .wx-switch-input.wx-switch-input-checked:after {\n  -webkit-transform: translateX(20px);\n          transform: translateX(20px);\n}\nwx-switch .wx-checkbox-input {\n  margin-right: 5px;\n  -webkit-appearance: none;\n          appearance: none;\n  outline: 0;\n  border: 1px solid #D1D1D1;\n  background-color: #FFFFFF;\n  border-radius: 3px;\n  width: 22px;\n  height: 22px;\n  position: relative;\n  color: #09BB07;\n}\nwx-switch .wx-checkbox-input.wx-checkbox-input-checked:before {\n  font: normal normal normal 14px/1 "weui";\n  content: "\\EA08";\n  color: inherit;\n  font-size: 22px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -48%) scale(0.73);\n  -webkit-transform: translate(-50%, -48%) scale(0.73);\n}\nwx-switch .wx-checkbox-input.wx-checkbox-input-disabled {\n  background-color: #E1E1E1;\n}\nwx-switch .wx-checkbox-input.wx-checkbox-input-disabled:before {\n  color: #ADADAD;\n}\nwx-text[selectable] {\n  user-select: text;\n  -webkit-user-select: text;\n}\n.wx-toast {\n  position: fixed;\n  z-index: 2000000000;\n  width: 7.6em;\n  min-height: 7.6em;\n  top: 180px;\n  left: 50%;\n  margin-left: -3.8em;\n  background: rgba(40, 40, 40, 0.75);\n  text-align: center;\n  border-radius: 5px;\n  color: #FFFFFF;\n  font-size: 16px;\n  line-height: normal;\n}\n.wx-toast-icon {\n  margin-top: 14px;\n  margin-bottom: 8px;\n  font-family: weui;\n  font-style: normal;\n}\n.wx-toast-content {\n  margin: 0 0 15px;\n}\n.wx-toast-mask {\n  position: fixed;\n  z-index: 1000;\n  background-color: rgba(0, 0, 0, 0.6);\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\nwx-video {\n  width: 300px;\n  height: 225px;\n  display: inline-block;\n  line-height: 0;\n  overflow: hidden;\n}\nwx-video[hidden] {\n  display: none;\n}\nwx-video .wx-video-container {\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  display: inline-block;\n  position: relative;\n}\nwx-video video {\n  width: 100%;\n  height: 100%;\n}\nwx-video .wx-video-bar {\n  height: 44px;\n  background-color: rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n          align-items: center;\n  padding: 0 10px;\n}\nwx-video .wx-video-bar.full {\n  left: 0;\n}\nwx-video .wx-video-bar.part {\n  margin: 5px;\n  border-radius: 5px;\n  height: 34px;\n}\nwx-video .wx-video-bar.none {\n  display: none;\n}\nwx-video .wx-video-bar > .wx-video-controls {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-grow: 1;\n          flex-grow: 1;\n  margin: 0 8.5px;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-button {\n  width: 13px;\n  height: 15px;\n  margin: 14.5px 12.5px 14.5px 0;\n  background-size: cover;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-button.play {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAWhJREFUSA1j+P///0cgBoHjQGzCQCsAtgJB/AMy5wCxGNXtQ9iBwvoA5BUCMQvVLEQxHpNzDSjkRhXLMM3GKrIeKKpEkYVYjcUu+AMo3ALE3GRZiN1MvKKPgbIRJFuG10j8koeA0gZEW4jfLIKyf4EqpgOxMEELCRpFnIJ3QGU5QMyM00LizCFa1SWgSkeslhFtBGkKVwGVy6FYSJp+klR/A6quB2JOkIWMIK0oNlOf8xBoZDE9LAI7nYn6HsBq4l96WHQEaLUpAyiOaASeAM2NgvuPBpaACt82IEYtfKls0UagecpwXyAzqGTRdaA57sjmYrAptAjUsCkGYlYMg9EFyLQI1IiZB8Ti6Obh5JNh0QmgHlOcBuKSIMGi50C18UDMiMssvOJEWPQLqKYbiHnxGkRIkoBF24DyaoTMIEoeh0W3geI+RBlArCI0iz4D+RVAzEasfqLVAQ19AcSg5LoYiKWI1kiiQgCMBLnEEcfDSgAAAABJRU5ErkJggg==\');\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-button.pause {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAAXNSR0IArs4c6QAAAFlJREFUSA3tksEKACAIQ7X//5zq98wOgQayum8QaGweHhMzG/6OujzKAymn+0LMqivu1XznWmX8/echTIyMyAgTwA72iIwwAexgj8gIE8CO3aMRbDPMaEy5BRGaKcZv8YxRAAAAAElFTkSuQmCC\');\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress {\n  height: 2px;\n  margin: 21px 12px;\n  background-color: rgba(255, 255, 255, 0.5);\n  position: relative;\n  -webkit-flex-grow: 2;\n          flex-grow: 2;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress > .wx-video-ball {\n  width: 16px;\n  height: 16px;\n  padding: 14px;\n  position: absolute;\n  top: -21px;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress > .wx-video-ball > .wx-video-inner {\n  width: 100%;\n  height: 100%;\n  background-color: #ffffff;\n  border-radius: 50%;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress > .wx-video-inner {\n  width: 0;\n  height: 100%;\n  background-color: #ffffff;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-time {\n  height: 14.5px;\n  line-height: 14.5px;\n  margin-top: 15px;\n  margin-bottom: 14.5px;\n  font-size: 12px;\n  color: #cbcbcb;\n}\nwx-video .wx-video-bar > .wx-video-danmu-btn {\n  white-space: nowrap;\n  line-height: 1;\n  padding: 2px 10px;\n  border: 1px solid #fff;\n  border-radius: 5px;\n  font-size: 13px;\n  color: #fff;\n  margin: 0 8.5px;\n}\nwx-video .wx-video-bar > .wx-video-danmu-btn.active {\n  border-color: #48c23d;\n  color: #48c23d;\n}\nwx-video .wx-video-bar > .wx-video-fullscreen {\n  width: 17px;\n  height: 17px;\n  /*margin: 13.5px 16px 13.5px 17px;*/\n  margin: 0 8.5px;\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAQRJREFUWAnt1d0NwiAQB/CmS7hHX5zFxLF0Ah2hE/lg7BT4PyMJUj6Oyt299BIioZT7ARYG59wLpTXmoXOMGO/QecxtwyWW4o42AupGALkFdX1MkHxE3Q7jIbQPqNthQogpJoZkMLRlsn/gFMQEk4OoY0oQVUwNoobhQFQwgMxUKFkt0C8+Zy61d8SeR5iHWCLOwF/MCb8Tp//ex3QFsE1HlCfKFUX2OijNFMnPKD7k76YcBoL402Zh8B77+MjlXrVvwfglXA32b0MrRgxCE2nBiEJaMOIQLkYFwsGoQWoYVUgJow4pYD4Weq4ayBqfwDYQmnUK0301kITujuawu65/l2B5A4z3Qe+Ut7EBAAAAAElFTkSuQmCC\');\n  background-size: cover;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n}\nwx-video .wx-video-danmu {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  margin-bottom: 44px;\n}\nwx-video .wx-video-danmu > .wx-video-danmu-item {\n  line-height: 1;\n  position: absolute;\n  color: #ffffff;\n  white-space: nowrap;\n  left: 100%;\n  transition: 3s linear;\n}\nwx-view {\n  display: block;\n}\nwx-view[hidden] {\n  display: none;\n}\n.navigator-hover {\n  background-color: rgba(0, 0, 0, 0.1);\n  opacity: 0.7;\n}\nwx-navigator {\n  height: auto;\n  width: auto;\n  display: block;\n}\nwx-navigator[hidden] {\n  display: none;\n}\nwx-action-sheet-cancel {\n  background-color: #FFFFFF;\n  font-size: 18px;\n}\nwx-action-sheet-cancel .wx-action-sheet-middle {\n  background-color: #EFEFF4;\n  height: 6px;\n  width: 100%;\n}\nwx-action-sheet-cancel .wx-action-sheet-cancel {\n  background-color: inherit;\n  position: relative;\n  padding: 10px 0;\n  text-align: center;\n  font-size: inherit;\n  display: block;\n}\nwx-action-sheet-cancel .wx-action-sheet-cancel:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n}\nwx-action-sheet-cancel .wx-action-sheet-cancel:active {\n  background-color: #ECECEC;\n}\n.textarea-placeholder {\n  color: grey;\n}\nwx-textarea {\n  width: 300px;\n  height: 150px;\n  display: block;\n  position: relative;\n}\nwx-textarea[hidden] {\n  display: none;\n}\nwx-textarea textarea {\n  outline: none;\n  border: none;\n  resize: none;\n  background-color: transparent;\n  line-height: 1.2;\n  z-index: 2;\n  position: absolute;\n  padding: 0;\n  font-family: inherit;\n  background: transparent;\n}\nwx-textarea .compute {\n  color: transparent;\n  top: 0;\n  z-index: 0;\n}\nwx-textarea div {\n  word-break: break-all;\n  line-height: 1.2;\n  font-family: inherit;\n  position: absolute;\n}\n/*wx-share-button {*/\n/*display: inline-block;*/\n/*line-height: 0;*/\n/*z-index: 9999999999;*/\n/*-webkit-tap-highlight-color: transparent;*/\n/*>.wx-share-button-wrapper {*/\n/*width: 36px;*/\n/*height: 36px;*/\n/*display: inline-block;*/\n/*background-size: 100% 100%;*/\n/*background-repeat: no-repeat;*/\n/*-webkit-tap-highlight-color: transparent;*/\n/*}*/\n/*}*/\nwx-contact-button {\n  display: inline-block;\n  line-height: 0;\n  z-index: 9999999999;\n}\nwx-contact-button[hidden] {\n  display: none;\n}\nwx-contact-button > .wx-contact-button-wrapper {\n  width: 18px;\n  height: 18px;\n  display: inline-block;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  -webkit-tap-highlight-color: transparent;\n}\n\n/*# sourceMappingURL=wx-components.css.map */'),
    wx.version = {
        updateTime: "2017.1.4 22:02:06",
        info: "",
        version: 0
    }

__WAWebviewEndTime__ = Date.now();

define("config.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

module.exports = { domain: { request: "https://xcx.weidian.com", proxyRouter: "https://xcx.weidian.com/wxapp/h5/router.do?pfr=h5", proxy: "https://sso.weidian.com/user/oauth/lite/proxy", uploadFile: "https://item.weidian.com", downloadFile: "https://s.geilicdn.com", api: "https://item.weidian.com", wdapi: "https://wd.api.weidian.com", sso: "https://sso.weidian.com", order: "https://order.weidian.com", static: "https://s.geilicdn.com/weidian_lite/v1.0.0" }, buyer: { wxAppid: "wxb67e50c33946db5a", paySuccessUrl: "/lib/order/dist/pages/pay_success/pay_success", appid: "wxseller", environment: 3, orderListUrl: "/lib/order/dist/pages/order_list/order_list", payUrl: "/lib/wxCashierApp/dist/wdcashier/index/index" }, vap: { ares: { query: void 0 } }, commonImage: { loginBg: "https://s.geilicdn.com/weidian_lite/v1.0.0/images/login/hello.jpg", woodBg: "https://s.geilicdn.com/weidian_lite/v1.0.0/images/index/wood_grain_bg.jpg", wdLogo: "https://s.geilicdn.com/weidian_lite/v1.0.0/images/common/wd_logo.png", indexItem: "https://s.geilicdn.com/weidian_lite/v1.0.0/images/index/item_icon.png", indexOrder: "https://s.geilicdn.com/weidian_lite/v1.0.0/images/index/order_icon.png", indexNotice: "https://s.geilicdn.com/weidian_lite/v1.0.0/images/index/message.png", indexCash: "https://s.geilicdn.com/weidian_lite/v1.0.0/images/index/cash_icon.png" }, shopInfo: { shopId: "", shopLogo: "", shopName: "" } };
});
define("modules/lib/formVerify.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

var mod = { checkPrice: function checkPrice(e) {
    return !!/^\d+(\.\d*)?$/.test(e);
  }, checkNum: function checkNum(e) {
    return !!/^\d+$/.test(e);
  } };module.exports = mod;
});
define("modules/lib/util.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var userInfo = {};module.exports = { loginMod: null, loadModule: function loadModule(t) {
    return require("../" + t + "/index");
  }, getUserInfo: function getUserInfo() {
    return this.loginMod && !userInfo.shopId && (userInfo = this.loginMod.getUserInfo()), userInfo;
  }, resetUserInfo: function resetUserInfo() {
    userInfo = {};
  }, toType: function toType(t) {
    return Object.prototype.toString.call(t).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  }, isString: function isString(t) {
    return "string" === this.toType(t);
  }, isArray: function isArray(t) {
    return Array.isArray(t);
  }, isObject: function isObject(t) {
    return t === Object(t);
  }, isPlainObject: function isPlainObject(t) {
    if ("object" !== this.toType(t) || t.nodeType) return !1;try {
      if (t.constructor && !{}.hasOwnProperty.call(t.constructor.prototype, "isPrototypeOf")) return !1;
    } catch (t) {
      return !1;
    }return !0;
  }, isFunction: function isFunction(t) {
    return "[object Function]" === Object.prototype.toString.call(t);
  }, isNumeric: function isNumeric(t) {
    return "number" == typeof t;
  }, extend: function extend() {
    var t,
        o,
        e,
        n,
        s,
        r,
        i = arguments[0] || {},
        c = 1,
        u = arguments.length,
        a = !1;if ("boolean" == typeof i && (a = i, i = arguments[1] || {}, c = 2), "object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) || this.isFunction(i) || (i = {}), u === c) return i;for (; c < u; c++) {
      if (null != (t = arguments[c])) for (o in t) {
        e = i[o], n = t[o], i !== n && (a && n && (this.isPlainObject(n) || (s = this.isArray(n))) ? (s ? (s = !1, r = e && this.isArray(e) ? e : []) : r = e && this.isPlainObject(e) ? e : {}, i[o] = this.extend(a, r, n)) : void 0 !== n && (i[o] = n));
      }
    }return i;
  }, request: function request(t) {
    var o = this;t.showLoading !== !1 && wxs.showToast({ mask: t.showMask || !1, title: "加载中", icon: "loading", duration: 1e4 });var e = t.data || {};this.getUserInfo(), userInfo.shopId && (e.userId = userInfo.shopId, e.token = userInfo.token), wxs.request({ url: t.url, data: e, method: t.method || "GET", complete: function complete() {
        wxs.hideToast(), t.complete && t.complete();
      }, success: function success(e) {
        t.succOption ? (t.succOption.data = e.data, o.checkAjaxResult(t.succOption, t)) : t.success && t.success(e);
      }, fail: function fail(o) {
        t.fail && t.fail(o);
      } });
  }, showModal: function showModal(t, o) {
    if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) var e = t;else {
      if ("string" != typeof t) return;var e = { title: t, success: o };
    }wxs.showModal({ title: e.title || "", content: e.content || "", showCancel: e.showCancel || !1, confirmText: e.confirmText || "确定", success: function success(t) {
        "function" == typeof e.success && e.success(t);
      } });
  }, checkAjaxResult: function checkAjaxResult(t, o) {
    var e = this,
        n = t.data,
        s = Number(n.status.status_code);return 120 === s || 420010 == s ? void (e.loginMod ? (e.resetUserInfo(), e.loginMod.config.loginCb.success = function () {
      e.request(o), e.loginMod.config.loginCb.success = null;
    }, e.loginMod.doLogin()) : e.showModal({ title: "登录已过期，请重新登录", success: function success(t) {
        t.confirm && e.loginMod && e.loginMod.doLogout();
      } })) : void (0 === s ? t.success && t.success(n) : t.error ? t.error(n) : n.status.status_reason && e.showModal(n.status.status_reason));
  } };
});
define("modules/login/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

var storageKey = "TOKEN_INFO";var userLoginInfo = {},
    config = require("../../config"),
    util = require("../lib/util"),
    domain = config && config.domain || "https://sso.weidian.com";wxs.getStorage({ key: storageKey, success: function success(o) {
    userLoginInfo = o.data || {};
  } });var login = { storageKey: storageKey, config: { loginApi: domain.sso + "/user/oauth/lite/login", bindCheckApi: domain.sso + "/user/bindcheck", countryCodesApi: domain.sso + "/weidian/countrycodes", vcodeCheckApi: domain.sso + "/user/vcode/check", bindApi: domain.sso + "/user/oauth/lite/bind", mediaVcodeApi: domain.sso + "/user/vcode/getmediavcode", msgVcodeApi: domain.sso + "/user/vcode/getmsgvcode", loginCb: { complete: null, success: null } }, getUserInfo: function getUserInfo() {
    return userLoginInfo.shopId || (userLoginInfo = wxs.getStorageSync(storageKey)), userLoginInfo;
  }, setLoginInfo: function setLoginInfo(o) {
    var e = o.shopInfo;e.shopLogo = e.shopLogo || "https://si.geilicdn.com/vshop-shop-logo-default.jpg", e.token = o.token, e.userId = o.userId, wxs.setStorage({ key: storageKey, data: e }), userLoginInfo = e, this.config.loginCb.success && this.config.loginCb.success(o);
  }, setConfig: function setConfig(o) {
    this.getSystemInfo(), o && util.extend(!0, this.config, o);
  }, getSystemInfo: function getSystemInfo() {
    var o = getApp();this.systemInfo = o.systemInfo || wxs.getSystemInfoSync(), this.curSystem = this.systemInfo.system && this.systemInfo.system.split(" ")[0].toLowerCase();
  }, isLogin: function isLogin() {
    return this.getUserInfo(), !!userLoginInfo.shopId;
  }, doLogin: function doLogin() {
    var o = this;wxs.login({ success: function success(e) {
        var n = e.code;return n ? void wxs.getUserInfo({ success: function success(e) {
            wxs.request({ url: o.config.loginApi, data: { code: n, rawData: e.rawData, signature: e.signature, encryptData: e.encryptedData, iv: e.iv, clientType: o.curSystem, appid: 7 }, method: "GET", complete: function complete(e) {
                o.config.loginCb.complete && o.config.loginCb.complete(e);
              }, success: function success(e) {
                var e = e.data,
                    n = Number(e.status.status_code),
                    s = e.result;0 === n ? o.setLoginInfo(s) : 420017 === n ? (wxs.setStorageSync("login_no_bind_tele_session", s.session), wxs.navigateTo({ url: "/modules/login/pages/checkTele" })) : util.showModal(e.status.status_reason);
              }, fail: function fail(o) {
                util.showModal("登录失败");
              } });
          }, fail: function fail(e) {
            console.log(e), e.errMsg.match(/cancel|deny/) || o.grantFail === !0 ? (o.grantFail = e.grantFail = !0, util.showModal({ content: "由于你拒绝授权，用户信息无法获取，功能将不可用，请十分钟后再试" })) : util.showModal("获取用户登录信息失败"), o.config.loginCb.complete && o.config.loginCb.complete(e);
          } }) : void util.showModal("获取登录code失败");
      }, fail: function fail(e) {
        util.showModal("获取用户登录code失败"), o.config.loginCb.complete && o.config.loginCb.complete(e);
      } });
  }, doLogout: function doLogout(o, e) {
    var n = getApp();wxs.clearStorageSync(), util.resetUserInfo(), userLoginInfo = {}, n.globalData.shopInfo = {}, e && e(), o !== !1 && wxs.navigateBack({ delta: getCurrentPages().length - 1 });
  } };module.exports = util.loginMod = login;
});
define("modules/login/pages/checkTele.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

var util = require("../../lib/util"),
    login = require("../index");Page({ data: { code: "", codeDes: "", telephone: "", defaultSelectCountry: 0, countryCodeList: [] }, showError: function showError(t) {
    util.showModal({ title: t.title || "", content: t.str });
  }, teleSubmit: function teleSubmit() {
    var t = this;return t.data.code && t.data.telephone ? void util.request({ showMask: !0, url: login.config.bindCheckApi + "?phone=" + t.data.telephone + "&countryCode=" + t.data.code, succOption: { success: function success(e) {
          var o = e.result,
              n = Number(o.wechatRegisted);0 === n ? util.showModal({ title: "确认手机号码", content: "我们将发送验证码短信到这个号码,+" + t.data.code + " " + t.data.telephone, showCancel: !0, confirmText: "确认", success: function success(e) {
              e.confirm && wxs.navigateTo({ url: "./verifyCode?country_code=" + t.data.code + "&telephone=" + t.data.telephone + "&_t=" + Date.now() });
            } }) : 1 === n ? util.showModal({ title: "", content: "该手机号已绑定其他微信,请更换手机号", confirmText: "确认" }) : t.showError({ str: "绑定状态查询失败，请重试" });
        } }, fail: function fail() {
        t.showError({ str: "获取手机号状态出错，请重试" });
      } }) : void t.showError({ str: "请正确填写区号及手机号" });
  }, teleInput: function teleInput(t) {
    this.setData({ telephone: t.detail.value });
  }, changeCountry: function changeCountry(t) {
    var e = this.data.countryCodeList[t.detail.value];this.setData({ code: e[0], codeDes: e[1] });
  }, getCountryList: function getCountryList() {
    var t = this;util.request({ url: login.config.countryCodesApi, succOption: { success: function success(e) {
          for (var o = e.result, n = o.length, i = [], r = 0, c = 0; c < n; c++) {
            var u = o[c];86 === Number(u.c) && (r = c), i.push([u.c, u.n]);
          }t.setData({ defaultSelectCountry: r, code: i[r][0], codeDes: i[r][1], countryCodeList: i });
        } }, fail: function fail() {
        t.showError({ str: "获取国家区号出错，请重试" });
      } });
  }, onShow: function onShow() {
    this.getCountryList();
  }, onLoad: function onLoad() {} });
});
define("modules/login/pages/regrule.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

Page({ data: { type: "agreement" }, onLoad: function onLoad(t) {
    this.setData({ type: t.type }), wxs.setNavigationBarTitle({ title: "standard" == t.type ? "微店禁售商品管理规范" : "微店平台服务协议" });
  }, onReady: function onReady() {}, onShow: function onShow() {}, onHide: function onHide() {}, onUnload: function onUnload() {} });
});
define("modules/login/pages/verifyCode.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

var util = require("../../lib/util"),
    login = require("../index");Page({ data: { code: "", telephone: "", identifyingCode: "", regetCodeText: "重发", canRegetCode: !0, codeSubmitLoading: !1 }, showError: function showError(e) {
    util.showModal({ title: e.title || "提示", content: e.str });
  }, codeSubmit: function codeSubmit() {
    var e = this;e.setData({ codeSubmitLoading: !0 }), util.request({ url: login.config.vcodeCheckApi + "?phone=" + e.data.telephone + "&countryCode=" + e.data.code + "&vcode=" + e.data.identifyingCode + "&session=" + encodeURIComponent(wxs.getStorageSync("login_no_bind_tele_session")), data: { action: login.config.bindApi }, succOption: { success: function success(t) {
          console.log("验证码验证成功 继续请求绑定");var o = t.result;util.request({ url: login.config.bindApi + "?clientType=" + login.curSystem + "&phone=" + e.data.telephone + "&countryCode=" + e.data.code + "&session=" + encodeURIComponent(o), complete: function complete() {
              e.setData({ codeSubmitLoading: !1 });
            }, succOption: { success: function success(e) {
                console.log("绑定成功"), wxs.setStorageSync("login_no_bind_tele_session", "");var t = e.result;login.setLoginInfo(t), wxs.showToast({ title: "绑定手机号成功", icon: "loading", duration: 1e4, complete: function complete() {
                    wxs.navigateBack({ delta: 6 });
                  } });
              } }, fail: function fail() {
              e.showError({ str: "绑定手机号出错，请重试" });
            } });
        }, error: function error(t) {
          e.setData({ codeSubmitLoading: !1 }), e.showError({ str: t.status.status_reason });
        } }, fail: function fail() {
        e.setData({ codeSubmitLoading: !1 }), e.showError({ str: "检测验证码出错，请重试" });
      } });
  }, codeInput: function codeInput(e) {
    this.setData({ identifyingCode: e.detail.value });
  }, noneGetCode: function noneGetCode() {
    var e = this;util.request({ url: login.config.mediaVcodeApi + "?phone=" + e.data.telephone + "&countryCode=" + e.data.code, succOption: { success: function success(t) {
          e.showError({ title: "获取语音验证码成功", str: "验证码将以电话形式通知到你，请注意接听" });
        } }, fail: function fail() {
        e.showError({ str: "获取语音验证码错误，请重试" });
      } });
  }, regetCode: function regetCode() {
    this.data.canRegetCode && this.getCode();
  }, calcRegetCodeTime: function calcRegetCodeTime() {
    var e = this,
        t = 60;e.setData({ regetCodeText: "60S", canRegetCode: !1 });var o = setInterval(function () {
      1 === t ? (e.setData({ canRegetCode: !0, regetCodeText: "重发" }), clearInterval(o)) : (t--, e.setData({ regetCodeText: t + "S" }));
    }, 1e3);
  }, getCode: function getCode() {
    var e = this;util.request({ url: login.config.msgVcodeApi + "?phone=" + e.data.telephone + "&countryCode=" + e.data.code, succOption: { success: function success(t) {
          e.calcRegetCodeTime();
        } }, fail: function fail() {
        e.showError({ str: "获取验证码出错，请重试" });
      } });
  }, onLoad: function onLoad(e) {
    this.setData({ code: e.country_code, telephone: e.telephone }), this.getCode();
  } });
});
define("template/toast/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

module.exports = { show: function show(t, o, e) {
    t && o && (t.setData({ toast: { show: !0, content: o } }), setTimeout(function () {
      t.setData({ toast: { show: !1, content: "" } });
    }, e || 2e3));
  } };
});
define("template/tooltip/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

module.exports = { closeKey: "tooltip@close", init: function init(o) {
    if (o) {
      var t = this;o.tooltipClose = function () {
        o.setData({ tooltip: { show: !1 } }), wxs.setStorage({ key: t.closeKey, data: !0 });
      };
    }
  } };
});
define("utils/fileCache.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

var mod = { cacheFileToLocal: function cacheFileToLocal(e) {
    e && e.name && e.url && wxs.downloadFile({ url: e.url, success: function success(c) {
        wxs.saveFile({ tempFilePath: c.tempFilePath, success: function success(c) {
            wxs.setStorageSync("_CACHE_" + e.name, c.savedFilePath), "function" == typeof e.success && e.success.call(null, c.savedFilePath);
          } });
      }, fail: function fail(e) {
        console.log(e);
      } });
  }, getCacheFilePath: function getCacheFilePath(e) {
    return wxs.getStorageSync("_CACHE_" + e);
  }, removeCacheFiles: function removeCacheFiles(e) {
    var c = this;if (e) c.removeCacheFileByName("_CACHE_" + res.keys[i]);else {
      wxs.getStorageInfo({ success: function success(e) {
          for (var o = e.keys.length, s = 0; s < o; s++) {
            0 === e.keys[s].indexOf("_CACHE_") && c.removeCacheFileByName(e.keys[s]);
          }
        } });
    }
  }, removeCacheFileByName: function removeCacheFileByName(e) {
    wxs.getStorage({ key: e, success: function success(c) {
        wxs.removeSavedFile({ filePath: c.data, success: function success(c) {
            wxs.removeStorage({ key: e, success: function success(c) {
                console.log("del succ " + e);
              } });
          } });
      } });
  } };module.exports = mod;
});
define("utils/util.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

var modUtil = require("../modules/lib/util");module.exports = modUtil;
});
define("app.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var scopeNotices = {},
    config = require("./config"),
    scopeVersion = "1.0.0";App({ version: scopeVersion, onLaunch: function onLaunch() {
    var o = this;wxs.getSystemInfo({ success: function success(e) {
        o.systemInfo = e, +e.version.replace(".", "") > 65 && o.downloadInitImg();
      } });
  }, getNotices: function getNotices(o, e) {
    return o && scopeNotices[o] ? e ? scopeNotices[o][e] : scopeNotices[o] : "";
  }, postPageNotices: function postPageNotices(o, e, n) {
    o && e && (scopeNotices[o] || (scopeNotices[o] = {}), scopeNotices[o][e] = n || "");
  }, removeNotices: function removeNotices(o, e) {
    o && (e ? scopeNotices[o][e] = null : scopeNotices[o] = null);
  }, dispatchNotices: function dispatchNotices(o) {
    var e = this.getNotices(o.name);if (e) {
      for (var n in e) {
        o["__pna" + n] && o["__pna" + n].call(o, e[n]);
      }this.removeNotices(o.name);
    }
  }, downloadInitImg: function downloadInitImg() {
    var o = this,
        e = require("./utils/fileCache"),
        n = function n(_n) {
      e.cacheFileToLocal({ name: _n, url: o.globalData.commonImage[_n], success: function success(e) {
          o.globalData.commonImage[_n] = e;
        } });
    },
        c = o.globalData.commonImage;wxs.getStorage({ key: "version", success: function success(o) {
        var t = o.data;if (t != scopeVersion) {
          e.removeCacheFiles();for (var s in c) {
            !function (o) {
              n(o);
            }(s);
          }wxs.setStorage({ key: "version", data: scopeVersion });
        } else for (var s in c) {
          c[s] = e.getCacheFilePath(s) || c[s];
        }
      } });
  }, showAlert: function showAlert(o) {
    "object" == (typeof o === "undefined" ? "undefined" : _typeof(o)) && o.content && wxs.showModal && wxs.showModal({ title: o.title || "提示", content: o.content, showCancel: o.showCancel || !1, confirmText: o.confirmText || "确定", success: function success(e) {
        e.confirm ? o.confirmFun && o.confirmFun() : o.cannelFun && o.cannelFun();
      } });
  }, globalData: config });
});require("app.js")
var __wxRoute = "pages/index/index", __wxRouteBegin = true;
define("pages/index/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

Page({ data: { data: [], networkType: "" }, onLoad: function onLoad(t) {
    var e = this;this.getList({ success: function success(t) {
        e.setData(t);
      } }), wxs.getNetworkType({ success: function success(t) {
        t.networkType;e.setData(t);
      } });
  }, getList: function getList(t) {
    wxs.showToast({ mask: !1, title: "加载中", icon: "loading", duration: 1e4 }), wxs.request({ url: "http://v3.wufazhuce.com:8000/api/music/idlist/0", method: t.method || "GET", data: t.data || {}, header: { "Content-Type": "application/json" }, success: function success(e) {
        t.success && t.success(e.data);
      }, fail: function fail(e) {
        t.fail && t.fail(e);
      }, complete: function complete(e) {
        t.complete && t.complete(e), wxs.hideToast();
      } });
  } });
});require("pages/index/index.js")
var __wxRoute = "pages/test/index", __wxRouteBegin = true;
define("pages/test/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,SReporter){
"use strict";

var app = getApp();Page({ name: "test-index", data: { notice: "" }, onLoad: function onLoad(n) {}, onReady: function onReady() {}, onShow: function onShow() {
    app.dispatchNotices(this);
  }, onHide: function onHide() {}, onUnload: function onUnload() {}, __pnaShowNotice: function __pnaShowNotice(n) {
    n && this.setData({ notice: n.content });
  } });
});require("pages/test/index.js")
package com.beijing.giraffeman.androidslowfuck.web;

import android.webkit.JavascriptInterface;

/**
 * Created by giraffe on 2017/7/15.
 */

public class GiraffeJSInterface {
    public IJsHandler mJsHandler;

    public GiraffeJSInterface(IJsHandler handler) {
        mJsHandler = handler;
    }

    @JavascriptInterface
    public void getSysInfo() {

    }

    @JavascriptInterface
    public void showToast(String msg) {
        this.mJsHandler.showToast(msg);
    }


}

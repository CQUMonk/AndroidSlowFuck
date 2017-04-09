package com.beijing.giraffeman.androidslowfuck.interfaces;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.JavascriptInterface;

/**
 * Created by giraffe on 2017/4/5.
 */

public class JSInterface {
    private static final String TAG = "JSInterface";
    private IJSExcutor mJSExcutor;

    //JS的方法在主线程中执行
    private Handler mHandler=new Handler(Looper.getMainLooper());
    public JSInterface(IJSExcutor jsExcutor){
        mJSExcutor=jsExcutor;

    }

    @JavascriptInterface
    public void invokeHandler(final String event, final String params, final int callbackId){
        Log.d(TAG, String.format("invokeHandler is called! event=%s, params=%s, callbackId=%d",
                event, params, callbackId));

        mHandler.post(new Runnable() {
            @Override
            public void run() {
                mJSExcutor.handleInvoke(event,params,callbackId);
            }
        });


    }

    @JavascriptInterface
    public void publishHandler(final String event, final String params, final String callbackIds){
        Log.d(TAG, String.format("publishHandler is called! event=%s, params=%s, callbackId=%s",
                event, params, callbackIds));

        mHandler.post(new Runnable() {
            @Override
            public void run() {
                mJSExcutor.handlePublish(event,params,callbackIds);
            }
        });

    }

}

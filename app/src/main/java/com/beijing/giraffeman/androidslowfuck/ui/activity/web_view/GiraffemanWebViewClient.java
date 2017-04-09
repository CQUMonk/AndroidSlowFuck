package com.beijing.giraffeman.androidslowfuck.ui.activity.web_view;

import android.graphics.Bitmap;
import android.util.Log;
import android.view.KeyEvent;

import com.tencent.smtt.export.external.interfaces.WebResourceRequest;
import com.tencent.smtt.export.external.interfaces.WebResourceResponse;
import com.tencent.smtt.sdk.WebView;
import com.tencent.smtt.sdk.WebViewClient;


/**
 * Created by giraffe on 2017/3/18.
 *
 * 帮助 WebView 处理各种通知、请求事件等
 */

public class GiraffemanWebViewClient extends WebViewClient {
    private static final String TAG="GiraffemanWebViewClient";


    @Override
    public boolean shouldOverrideKeyEvent(WebView view, KeyEvent event) {
        Log.d(TAG,event.toString());
        return super.shouldOverrideKeyEvent(view, event);
    }

    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        Log.d(TAG,"onPageStarted");
        super.onPageStarted(view, url, favicon);
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        Log.d(TAG,"onPageFinished");
        super.onPageFinished(view, url);
    }

    @Override
    public void onReceivedHttpError(WebView webView, WebResourceRequest webResourceRequest, WebResourceResponse webResourceResponse) {
        Log.d(TAG,"onReceivedHttpError");
        super.onReceivedHttpError(webView, webResourceRequest, webResourceResponse);
    }

    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        Log.d(TAG,"shouldInterceptRequest");
        return super.shouldInterceptRequest(view, request);
    }
}

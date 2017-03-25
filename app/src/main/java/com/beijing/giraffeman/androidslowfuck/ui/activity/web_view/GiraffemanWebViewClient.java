package com.beijing.giraffeman.androidslowfuck.ui.activity.web_view;

import android.graphics.Bitmap;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by giraffe on 2017/3/18.
 *
 * 帮助 WebView 处理各种通知、请求事件等
 */

public class GiraffemanWebViewClient extends WebViewClient {
    private static final String TAG="GiraffemanWebViewClient";
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        Log.d(TAG,"shouldOverrideUrlLoading");
        return super.shouldOverrideUrlLoading(view, request);
    }

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
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        Log.d(TAG,"shouldInterceptRequest");
        return super.shouldInterceptRequest(view, request);
    }
}

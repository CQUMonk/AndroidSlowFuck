package com.beijing.giraffeman.androidslowfuck.web.ui.activity;

import android.content.Intent;

import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.support.v4.app.FragmentActivity;
import android.view.View;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;


import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.web.GiraffeWebChromeClient;
import com.beijing.giraffeman.androidslowfuck.web.GiraffeWebViewClient;
import com.beijing.giraffeman.androidslowfuck.web.GiraffeJSInterface;
import com.beijing.giraffeman.androidslowfuck.web.IJsHandler;

public class WebviewActivity extends FragmentActivity implements IJsHandler {

    private String mUrl="file:///android_asset/demo.html";
    private WebView mWebview;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);

        //Intent intent=getIntent();
        //mUrl=intent.getStringExtra("url");

        initWebview();

        mWebview.loadUrl(mUrl);




    }

    private void initWebview(){
        mWebview= (WebView) findViewById(R.id.wb_web_content);

        WebSettings webSetting=mWebview.getSettings();


        webSetting.setAllowFileAccess(true);
        webSetting.setBuiltInZoomControls(true);
        webSetting.setDisplayZoomControls(false);
        webSetting.setSupportMultipleWindows(false);
        webSetting.setAppCacheEnabled(true);

        webSetting.setGeolocationEnabled(true);
        webSetting.setUseWideViewPort(true);

        webSetting.setJavaScriptEnabled(true);
        mWebview.addJavascriptInterface(new GiraffeJSInterface(this),"Giraffe");

        mWebview.setWebChromeClient(new GiraffeWebChromeClient());
        mWebview.setWebViewClient(new GiraffeWebViewClient());

    }


    @Override
    public void showToast(String msg) {
        Toast.makeText(this,msg,Toast.LENGTH_SHORT).show();
    }

    public void showJsAlert(View view) {
        String msg="I am a msg from android";
        String nativeCall = String.format("javascript:alertMsg('%s')", msg);
        mWebview.loadUrl(nativeCall);
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    public void getJsMsg(View view) {
        String msg="I am a msg from android";
        String nativeCall = String.format("response2Native('%s')", msg);
        mWebview.evaluateJavascript(nativeCall, new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String s) {
                Toast.makeText(WebviewActivity.this,s,Toast.LENGTH_SHORT).show();
            }
        });
    }
}

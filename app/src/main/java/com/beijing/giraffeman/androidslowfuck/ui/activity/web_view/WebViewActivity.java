package com.beijing.giraffeman.androidslowfuck.ui.activity.web_view;


import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;


import android.text.TextUtils;
import android.util.Log;
import android.view.ViewGroup;

import android.widget.LinearLayout;


import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.interfaces.IJSExcutor;
import com.beijing.giraffeman.androidslowfuck.interfaces.JSInterface;

import com.beijing.giraffeman.androidslowfuck.ui.view.GiraffeWebView;
import com.beijing.giraffeman.androidslowfuck.widgets.LoadingDialog;
import com.tencent.smtt.sdk.ValueCallback;

import org.json.JSONObject;


public class WebViewActivity extends AppCompatActivity implements IJSExcutor{
    private final String TAG="WebViewActivity";
    private static final String WX_JSCORE="WeixinJSCore";
    private static final String BASE_PATH = "file:///android_asset/";

    private GiraffeWebView mServiceWebView;
    private GiraffeWebView mAppWebView;

    private ViewGroup mServiceViewGroup;
    private ViewGroup mAppViewGroup;


    private LoadingDialog mLoadingDialog;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view);

        initView();

    }

    private void initView() {
        mLoadingDialog=new LoadingDialog(this);

        mServiceViewGroup= (ViewGroup) findViewById(R.id.service_layout);
        mAppViewGroup= (ViewGroup) findViewById(R.id.app_layout);

        mServiceWebView=new GiraffeWebView(this);
        mAppWebView=new GiraffeWebView(this);

        mServiceViewGroup.addView(mServiceWebView,new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT));

        mAppViewGroup.addView(mAppWebView,new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT));

        JSInterface jsInterface=new JSInterface(this);

        mServiceWebView.addJavascriptInterface(jsInterface,WX_JSCORE);
        mAppWebView.addJavascriptInterface(jsInterface,WX_JSCORE);

        mServiceWebView.loadUrl(BASE_PATH + "service.html");
        //mAppWebView.setWebContentsDebuggingEnabled(true);
        //mServiceWebView.loadUrl(BASE_PATH+ "demo.html");
        //mAppWebView.loadUrl(BASE_PATH+ "demo.html");

        //mAppWebView.loadUrl("https://www.baidu.com");
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mServiceViewGroup != null) {
            mServiceViewGroup.removeAllViews();
            mServiceWebView.destroy();
        }
        if (mAppViewGroup != null) {
            mAppViewGroup.removeAllViews();
            mAppWebView.destroy();
        }
        //System.exit(0);
    }



    public LoadingDialog getLoadingDialog() {
        return mLoadingDialog;
    }


    @Override
    public void handlePublish(String event, String params, String callbackId) {
        if (TextUtils.isEmpty(event)){
            return;
        }

        switch (event){
            case "custom_event_serviceReady":

                break;
        }

    }

    @Override
    public void handleInvoke(String event, String params, int callbackId) {
        if ("showToast".equals(event)) {
            showLoading(params);
        } else if ("hideToast".equals(event)) {
            hideLoading();
        }

    }
    private void showLoading(String params) {
        String message = null;
        try {
            JSONObject json = new JSONObject(params);
            message = json.optString("title");
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (mLoadingDialog != null) {
            mLoadingDialog.show(message);
        }
    }

    private void hideLoading() {
        if (mLoadingDialog != null) {
            mLoadingDialog.dismiss();
        }
    }

    private void onServiceReady(){
        mServiceWebView.evaluateJavascript("__wxConfig__", new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String s) {
                Log.d(TAG,"The __wxConfig__ callback return :"+s);

            }
        });

    }


    private Handler mhandler=new Handler(){

        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
        }
    };
}

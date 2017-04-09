package com.beijing.giraffeman.androidslowfuck.ui.view;

import android.content.Context;
import android.util.AttributeSet;




import com.beijing.giraffeman.androidslowfuck.ui.activity.web_view.GiraffeWebChromeClient;
import com.beijing.giraffeman.androidslowfuck.ui.activity.web_view.GiraffemanWebViewClient;
import com.tencent.smtt.sdk.WebSettings;
import com.tencent.smtt.sdk.WebView;

/**
 * Created by giraffe on 2017/3/25.
 */

public class GiraffeWebView extends WebView {
    private static final String TAG = "GiraffeWebView";

    private GiraffemanWebViewClient mWebViewClient;
    private GiraffeWebChromeClient mWebChromeClient;


    public GiraffeWebView(Context context) {
        super(context);
        init();
    }

    public GiraffeWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public GiraffeWebView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init() {
        mWebViewClient=new GiraffemanWebViewClient();
        mWebChromeClient=new GiraffeWebChromeClient();


        //这个Java Bridge是WebView自己添加的
        //在Api 17以前,javascript可以通过java对象进行反射,执行一些不安全的操作
        removeJavascriptInterface("searchBoxJavaBridge_");


        WebSettings settings = getSettings();

        //设置使用默认的缩放控制器,默认是false
        settings.setBuiltInZoomControls(true);
        //不显示默认的+/-缩放控制View, 默认是true
        settings.setDisplayZoomControls(false);

        settings.setJavaScriptEnabled(true);

        //支持 H5 的session storage和local storage
        settings.setDomStorageEnabled(true);

        /*
        设置加载资源时,如何使用cache,默认设置是:WebSettings.LOAD_DEFAULT
        当WebView正常加载一个页面时,如果缓存命中且没有过期,则使用缓存数据,否则从网络加载,
        当WebView.goBack()时,如果缓存命中,直接使用,不会验证是否过期
        可用的其他设置:LOAD_CACHE_ELSE_NETWORK, LOAD_NO_CACHE, LOAD_CACHE_ONLY
        */
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        /*
        设置使用 宽 的Viewpoint,默认是false
        Android browser以及chrome for Android的设置是`true`
        而WebView的默认设置是`false`
        如果设置为`true`,那么网页的可用宽度为`980px`,并且可以通过 meta data来设置
        如果设置为`false`,那么可用区域和WebView的显示区域有关.
         */
        settings.setUseWideViewPort(true);


        settings.setAllowFileAccess(true);
        settings.setSupportMultipleWindows(false);
        settings.setAppCacheEnabled(true);
        settings.setGeolocationEnabled(true);
        setWebViewClient(mWebViewClient);
        setWebChromeClient(mWebChromeClient);


    }


}

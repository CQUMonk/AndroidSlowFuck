package com.beijing.giraffeman.androidslowfuck.ui.fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;
import android.webkit.WebView;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.services.WebAppInterface;
import com.beijing.giraffeman.androidslowfuck.ui.activity.web_view.IWebViewListener;
import com.beijing.giraffeman.androidslowfuck.ui.view.GiraffeWebView;

/**
 * Created by giraffe on 2017/3/25.
 */

public class GiraffeWebViewFragment extends AbsFragment {
    private View mRootView;
    private GiraffeWebView mWebView;
    private IWebViewListener mListener;
    private String mCurrentUrl;

    public void setListener(IWebViewListener listener) {
        this.mListener = listener;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mWebView.addJavascriptInterface(new WebAppInterface(mContext),"Android");
        mListener.onWebViewInitFinish(mWebView);
    }

    @Override
    protected View getCustomView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        if (mRootView==null){
            mRootView=inflater.inflate(R.layout.fragment_webview,container,false);
            mWebView= (GiraffeWebView) mRootView.findViewById(R.id.webview_fragment);
        }


        return mRootView;
    }
    public WebView getWebView() {
        return mWebView;
    }
    public String getWebPageUrl() {

        String retUrl = mWebView != null ? mWebView.getUrl() : "";
        if (retUrl == null) {
            retUrl = "";
        }
        return retUrl;
    }

    /**
     * {@link WebView#canGoBack()}
     *
     * @return
     */
    public boolean canGoBack() {

        if (mWebView != null) {
            return mWebView.canGoBack();
        }
        return false;
    }

    /**
     * {@link WebView#goBack()}
     */
    public void goBack() {
        if (mWebView != null) {
            mWebView.goBack();
        }
    }

    public void startLoadUrl(String url){
        if (!TextUtils.equals(mCurrentUrl, url)) {
            mCurrentUrl = url;
        }

        loadUrl(url);




    }
    public void loadUrl(String url){
        mWebView.loadUrl(url);
    }



    @Override
    public void onDestroyView() {
        if (mRootView != null) {
            ViewParent parent = mRootView.getParent();
            if (parent instanceof ViewGroup) {
                ((ViewGroup) parent).removeView(mRootView);
            }
        }
        super.onDestroyView();
    }

    @Override
    public void onDestroy() {
        if (mWebView != null) {
            mWebView.stopLoading();
            ((ViewGroup) mWebView.getParent()).removeAllViews();
            mWebView.removeAllViews();
            mWebView.destroy();
        }
        super.onDestroy();
    }
}

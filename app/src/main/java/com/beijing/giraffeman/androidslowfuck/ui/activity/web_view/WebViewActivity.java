package com.beijing.giraffeman.androidslowfuck.ui.activity.web_view;


import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;



import android.webkit.WebView;



import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.ui.fragments.GiraffeWebViewFragment;


public class WebViewActivity extends AppCompatActivity implements IWebViewListener {



    private GiraffeWebViewFragment mWebViewFragment;
    private String mUrl;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view);

        initView();

    }

    private void initView() {

        mUrl="file:///android_asset/demo.html";

        FragmentManager fragmentManager=getSupportFragmentManager();
        FragmentTransaction transaction=fragmentManager.beginTransaction();
        mWebViewFragment=new GiraffeWebViewFragment();
        transaction.add(R.id.activity_web_view,mWebViewFragment);
        transaction.commitAllowingStateLoss();
        mWebViewFragment.setListener(this);
    }


    /**
     * 截获back键的监听，保证H5页面回退
     * @param keyCode
     * @param event
     * @return
     */
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode==KeyEvent.KEYCODE_BACK&&mWebViewFragment.canGoBack()){
            mWebViewFragment.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public void onWebViewInitFinish(WebView webView) {
        startLoadUrl(mUrl);
    }
    private void startLoadUrl(String url){
        mWebViewFragment.startLoadUrl(url);
    }
}

package com.beijing.giraffeman.androidslowfuck.services;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by giraffe on 2017/3/25.
 */

public class WebAppInterface {
    Context mContext;

    public WebAppInterface(Context mContext) {
        this.mContext = mContext;
    }
    @JavascriptInterface
    public void showToast(String toast){
        Toast.makeText(mContext,toast,Toast.LENGTH_LONG).show();
    }
}

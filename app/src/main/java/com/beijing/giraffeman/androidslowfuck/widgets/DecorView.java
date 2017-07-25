package com.beijing.giraffeman.androidslowfuck.widgets;

import android.content.Context;
import android.view.View;
import android.widget.LinearLayout;

/**
 * Created by giraffe on 2017/7/19.
 */

public class DecorView extends LinearLayout {

    private boolean mNeedLoadingView;

    public DecorView(Context context,View contentView,boolean needLoadingView) {
        super(context);
        this.mNeedLoadingView=needLoadingView;
        setOrientation(VERTICAL);
    }
}

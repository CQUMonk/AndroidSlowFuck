package com.beijing.giraffeman.androidslowfuck.mainpage.ui;

import android.support.v4.app.FragmentActivity;

/**
 * Created by giraffe on 2017/7/1.
 */

public class BaseActivity extends FragmentActivity {

    public void setContentView(int layoutID){
        super.setContentView(layoutID);
        this.getWindow().setContentView();
    }
}

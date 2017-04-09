package com.beijing.giraffeman.androidslowfuck.ui;

import android.content.ComponentName;
import android.content.Intent;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.OrientationHelper;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.util.Log;
import android.view.View;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.adapter.MainPageRecyclerViewAdapter;
import com.beijing.giraffeman.androidslowfuck.model.NavigatorItem;
import com.beijing.giraffeman.androidslowfuck.ui.activity.ipc.IPCMainActivity;
import com.beijing.giraffeman.androidslowfuck.ui.activity.lifecycle_launch.LifeCycleActivity;
import com.beijing.giraffeman.androidslowfuck.ui.activity.md5_compute.MD5Activity;
import com.beijing.giraffeman.androidslowfuck.ui.activity.web_view.WebViewActivity;
import com.beijing.giraffeman.androidslowfuck.util.GraffeStringUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class MainActivity extends AppCompatActivity {
    //private static final String LIFECYCLE="lifecycle";
    private static final String TAG="MainActivity";
    private List<NavigatorItem> mModules;
    @BindView(R.id.rv_main_navigator) RecyclerView mRecyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG,"onCreate");
        setContentView(R.layout.activity_main);

        ButterKnife.bind(this);

        initDatas();

        mRecyclerView.setLayoutManager(new StaggeredGridLayoutManager(2, OrientationHelper.VERTICAL));
        mRecyclerView.setAdapter(new MainPageRecyclerViewAdapter(this,mModules));
    }


    private void initDatas() {
        mModules=new ArrayList<>();
        mModules.add(new NavigatorItem(getResources().getString(R.string.lifecycle_of_activity),
                getResources().getDrawable(R.mipmap.ic_launcher),
                LifeCycleActivity.class));
        mModules.add(new NavigatorItem(getResources().getString(R.string.ipc),
                getResources().getDrawable(R.mipmap.ic_launcher),
                IPCMainActivity.class));
        mModules.add(new NavigatorItem(getResources().getString(R.string.webview_activity),
                getResources().getDrawable(R.mipmap.ic_launcher),
                WebViewActivity.class));
        mModules.add(new NavigatorItem(getResources().getString(R.string.md5_activity),
                getResources().getDrawable(R.mipmap.ic_launcher),
                MD5Activity.class));
    }


    @Override
    protected void onRestart() {
        super.onRestart();
        Log.d(TAG,"onRestart");
    }


    @Override
    public void onSaveInstanceState(Bundle outState) {
        //在onStop前执行
        super.onSaveInstanceState(outState);
        Log.d(TAG,"onSaveInstanceState");
        outState.putString("customData",":Mayday");
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        //在onStart之后执行
        super.onRestoreInstanceState(savedInstanceState);
        Log.d(TAG,"onRestoreInstanceState");
        String customData=savedInstanceState.getString("customData");
        Log.d(TAG,customData);
    }


}

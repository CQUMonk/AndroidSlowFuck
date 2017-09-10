package com.beijing.giraffeman.androidslowfuck.mainpage;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.OrientationHelper;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.util.Log;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.imagepicker.ImagePickerDemo;
import com.beijing.giraffeman.androidslowfuck.lifecycle.ui.LifeCycleActivity;
import com.beijing.giraffeman.androidslowfuck.loopview.LooperViewActivity;
import com.beijing.giraffeman.androidslowfuck.mainpage.adapter.MainPageRecyclerViewAdapter;
import com.beijing.giraffeman.androidslowfuck.mainpage.model.NavigatorItem;
import com.beijing.giraffeman.androidslowfuck.md5.MD5Activity;
import com.beijing.giraffeman.androidslowfuck.animations.AnimationsActivity;
import com.beijing.giraffeman.androidslowfuck.storage.StorageActivity;
import com.beijing.giraffeman.androidslowfuck.tags.TagActivity;
import com.beijing.giraffeman.androidslowfuck.weather.ui.WeatherActivity;
import com.beijing.giraffeman.androidslowfuck.web.ui.activity.WebviewActivity;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class MainActivity extends AppCompatActivity {
    //private static final String LIFECYCLE="lifecycle";
    private static final String TAG = "MainActivity";
    @BindView(R.id.rv_main_navigator)
    RecyclerView mRecyclerView;
    private List<NavigatorItem> mModules;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate");
        setContentView(R.layout.activity_main);

        ButterKnife.bind(this);

        initDatas();

        mRecyclerView.setLayoutManager(new StaggeredGridLayoutManager(2, OrientationHelper.VERTICAL));
        mRecyclerView.setAdapter(new MainPageRecyclerViewAdapter(this, mModules));
    }


    private void initDatas() {
        mModules = new ArrayList<>();
        mModules.add(new NavigatorItem(getResources().getString(R.string.lifecycle_of_activity),
                getResources().getDrawable(R.mipmap.ic_launcher),
                LifeCycleActivity.class));

        mModules.add(new NavigatorItem(getResources().getString(R.string.md5_activity),
                getResources().getDrawable(R.mipmap.ic_launcher),
                MD5Activity.class));
        mModules.add(new NavigatorItem("MVP demo",getResources().getDrawable(R.drawable.icon),
                WeatherActivity.class));
        mModules.add(new NavigatorItem("AutoScroll demo",getResources().getDrawable(R.drawable.icon),
                LooperViewActivity.class));

        mModules.add(new NavigatorItem("Tags",getResources().getDrawable(R.drawable.icon),
                TagActivity.class));
        mModules.add(new NavigatorItem("Image Picker",getResources().getDrawable(R.drawable.icon),
                ImagePickerDemo.class));
        mModules.add(new NavigatorItem("WebView Demo",getResources().getDrawable(R.drawable.icon),
                WebviewActivity.class));
        mModules.add(new NavigatorItem("Storage",getResources().getDrawable(R.drawable.icon),
                StorageActivity.class));
        mModules.add(new NavigatorItem("Animation",getResources().getDrawable(R.drawable.icon),
                AnimationsActivity.class));
    }


    @Override
    protected void onRestart() {
        super.onRestart();
        Log.d(TAG, "onRestart");
    }


    @Override
    public void onSaveInstanceState(Bundle outState) {
        //在onStop前执行
        super.onSaveInstanceState(outState);
        Log.d(TAG, "onSaveInstanceState");
        outState.putString("customData", ":Mayday");
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        //在onStart之后执行
        super.onRestoreInstanceState(savedInstanceState);
        Log.d(TAG, "onRestoreInstanceState");
        String customData = savedInstanceState.getString("customData");
        Log.d(TAG, customData);
    }


}

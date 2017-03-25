package com.beijing.giraffeman.androidslowfuck.ui;

import android.content.ComponentName;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.ui.activity.lifecycle_launch.LifeCycleActivity;
import com.beijing.giraffeman.androidslowfuck.ui.activity.web_view.WebViewActivity;

public class MainActivity extends AppCompatActivity {
    //private static final String LIFECYCLE="lifecycle";
    private static final String TAG="MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG,"onCreate");
        setContentView(R.layout.activity_main);
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

    public void dispatch(View view) {
        //activity的花式跳转
        Intent intent;
        switch (view.getId()){
            //explicit
            case R.id.lifecycle:
                //Intent(Context packageContext, Class<?> cls)
                intent=new Intent(this,LifeCycleActivity.class);
                startActivity(intent);
                break;
            //setComponent
            case R.id.tv_ipc_main:
                intent = new Intent();
                intent.setComponent(new ComponentName(this,
                        "com.beijing.giraffeman.androidslowfuck.ui.activity.ipc.IPCMainActivity"));
                startActivity(intent);
                break;
            //setClass
            case R.id.tv_webview:
                intent=new Intent();
                intent.setClass(this, WebViewActivity.class);
                startActivity(intent);
                break;





            //setClassName

            //implicit

            //

        }
    }
}

package com.beijing.giraffeman.androidslowfuck.lifecycle.ui;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.beijing.giraffeman.androidslowfuck.R;

/**
 * 演示activity的SingleTask启动模式，通过 adb shell dumpsys activity 命令查看当前栈结构
 */

public class SingleTask extends AppCompatActivity {
    private static final String TAG="SingleTask";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG,"onCreate Start");
        setContentView(R.layout.activity_single_task);
        Log.d(TAG,"onCreate end");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d(TAG,"onStart");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG,"onResume");
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        Log.d(TAG,"onNewIntent:"+intent.getLongExtra("time",0));
    }

    public void jumpToMyself(View view) {
        Intent intent=new Intent(this,SingleTask.class);
        intent.putExtra("time", System.currentTimeMillis());
        startActivity(intent);
    }
}

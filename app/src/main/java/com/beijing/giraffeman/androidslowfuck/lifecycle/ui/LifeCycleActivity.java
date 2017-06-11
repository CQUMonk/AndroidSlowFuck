package com.beijing.giraffeman.androidslowfuck.lifecycle.ui;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.beijing.giraffeman.androidslowfuck.R;

public class LifeCycleActivity extends AppCompatActivity implements View.OnClickListener{

    private static final String TAG="LifeCycleActivity";
    private Button mSingleTop;
    private Button mSingleTask;
    private Button mSingleInstance;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG,"onCreate start");
        setContentView(R.layout.activity_life_cycle);
        initViews();
        initEvents();
        startActivity(new Intent(this,SingleTask.class));

        Log.d(TAG,"onCreate end");
    }

    private void initEvents() {
        mSingleTop.setOnClickListener(this);
        mSingleTask.setOnClickListener(this);
        mSingleInstance.setOnClickListener(this);
    }

    private void initViews() {
        mSingleTop= (Button) findViewById(R.id.btn_life_singleTop);
        mSingleTask= (Button) findViewById(R.id.btn_life_singleTask);
        mSingleInstance= (Button) findViewById(R.id.btn_life_singleInstance);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG,"onDestroy");
    }

    @Override
    protected void onStart() {

        super.onStart();
        Log.d(TAG,"onStart");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(TAG,"onStop");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG,"onResume");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d(TAG,"onPause");
    }


    @Override
    public void onClick(View view) {
        Intent intent=new Intent();
        switch (view.getId()){

            case R.id.btn_life_singleTask:
                intent.setClass(LifeCycleActivity.this,SingleTask.class);
                break;

        }

        intent.putExtra("time", System.currentTimeMillis());
        startActivity(intent);

    }
}

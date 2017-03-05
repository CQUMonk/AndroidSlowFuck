package com.beijing.giraffeman.androidslowfuck.ui.activity.ipc;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import com.beijing.giraffeman.androidslowfuck.R;

/**
 * 演示各种IPC方式
 */
public class IPCMainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ipcmain);
    }

    public void navigate(View view) {
        Intent intent=new Intent();
        switch (view.getId()){

            case R.id.btn_messenger:
                intent.setClass(this,MessengerActivity.class);
                break;

        }
        startActivity(intent);
    }
}

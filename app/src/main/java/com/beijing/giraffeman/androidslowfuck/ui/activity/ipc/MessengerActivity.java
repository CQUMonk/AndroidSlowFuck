package com.beijing.giraffeman.androidslowfuck.ui.activity.ipc;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.os.RemoteException;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.services.MessageService;
import com.beijing.giraffeman.androidslowfuck.util.MyConstants;

/**
 * client for request for MessengerService
 */

public class MessengerActivity extends AppCompatActivity {

    private static final String TAG="MessengerActivity";
    private Messenger mSpeaker;
    private Messenger mReciever=new Messenger(new MessageHandler());
    private ServiceConnection mConn=new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
            mSpeaker =new Messenger(iBinder);
            Message msg=Message.obtain(null, MyConstants.MSG_FROM_CLIENT);
            Bundle data=new Bundle(1);
            data.putString("msg","hi, I'm client");
            msg.setData(data);
            msg.replyTo=mReciever;
            try {
                mSpeaker.send(msg);
            } catch (RemoteException e) {
                Log.e(TAG,e.getMessage());
            }
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            Log.i(TAG,"disconnected!");
        }
    };
    private static class MessageHandler extends Handler{
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what){
                case MyConstants.MSG_FROM_SERVER:
                    Log.i(TAG,"receive the msg from server: "+msg.getData().getString("reply"));
                    break;
                default:
                    super.handleMessage(msg);
            }

        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_messenger);
        Intent intent=new Intent(this, MessageService.class);
        bindService(intent,mConn, Context.BIND_AUTO_CREATE);//BIND_AUTO_CREATE service不存在时创建一个
    }

    @Override
    protected void onDestroy() {
        unbindService(mConn);
        super.onDestroy();
    }
}

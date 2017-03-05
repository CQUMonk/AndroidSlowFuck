package com.beijing.giraffeman.androidslowfuck.services;

import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.os.RemoteException;
import android.util.Log;

import com.beijing.giraffeman.androidslowfuck.util.MyConstants;

public class MessageService extends Service {
    private static final String TAG="MessageService";

    private static class MessageHandler extends Handler{
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what){
                case MyConstants.MSG_FROM_CLIENT://在AS中看这条日志时要选择正确的进程
                    Log.i(TAG,"server get the msg from client:"+msg.getData().getString("msg"));

                    //响应客户端
                    Messenger replyToClient=msg.replyTo;
                    Message repMsg=Message.obtain(null,MyConstants.MSG_FROM_SERVER);
                    Bundle bundle=new Bundle(1);
                    bundle.putString("reply","Hi,this is server, we got your msg");
                    repMsg.setData(bundle);
                    try {
                        replyToClient.send(repMsg);
                    } catch (RemoteException e) {
                        e.printStackTrace();
                    }

                    break;
                default:
                    super.handleMessage(msg);
            }

        }
    }
    private final Messenger mReceiver =new Messenger(new MessageHandler());



    @Override
    public IBinder onBind(Intent intent) {
        return mReceiver.getBinder();
    }
}

package com.beijing.giraffeman.androidslowfuck.ui.activity.ipc;

import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.RemoteException;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.beijing.giraffeman.androidslowfuck.IBookManager;
import com.beijing.giraffeman.androidslowfuck.IOnNewBookArrivedListener;
import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.model.Book;
import com.beijing.giraffeman.androidslowfuck.services.BookManagerService;

import java.util.List;

public class BookManagerActivity extends AppCompatActivity {
    private static final String TAG="BookManagerActivity";
    private static final int MSG_NEW_BOOK_ARRIVED=1;

    private IBookManager mBookManager;
    private IOnNewBookArrivedListener mNewBookListener= new IOnNewBookArrivedListener.Stub() {
        @Override
        public void onNewBookArrived(Book book) throws RemoteException {
            mHandler.obtainMessage(MSG_NEW_BOOK_ARRIVED,book).sendToTarget();
        }
    };
    private Handler mHandler=new Handler(){
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            switch (msg.what){
                case MSG_NEW_BOOK_ARRIVED:
                    Log.d(TAG,"receive new book :"+msg.obj);
                    break;
                default:
                    super.handleMessage(msg);
            }
        }
    };


    private ServiceConnection mConn=new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
            mBookManager=IBookManager.Stub.asInterface(iBinder);

            try {
                List<Book> list=mBookManager.getBookList();
                Log.i(TAG,"we query book list , list type : "+list.getClass().getCanonicalName());
                Log.i(TAG,"list : "+list.toString());
                mBookManager.registerListener(mNewBookListener);
            } catch (RemoteException e) {
                e.printStackTrace();
            }

        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            mBookManager=null;

        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_manager);
        Intent intent=new Intent(this, BookManagerService.class);
        bindService(intent,mConn,BIND_AUTO_CREATE);
    }

    @Override
    protected void onDestroy() {
        if (mBookManager!=null&&mBookManager.asBinder().isBinderAlive()){
            try {
                mBookManager.unregisterListnener(mNewBookListener);
            } catch (RemoteException e) {
                e.printStackTrace();
            }
        }

        unbindService(mConn);
        super.onDestroy();
    }
}

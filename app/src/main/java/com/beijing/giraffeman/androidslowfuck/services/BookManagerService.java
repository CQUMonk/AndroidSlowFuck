package com.beijing.giraffeman.androidslowfuck.services;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.os.RemoteCallbackList;
import android.os.RemoteException;
import android.util.Log;

import com.beijing.giraffeman.androidslowfuck.IBookManager;
import com.beijing.giraffeman.androidslowfuck.IOnNewBookArrivedListener;
import com.beijing.giraffeman.androidslowfuck.model.Book;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicBoolean;

public class BookManagerService extends Service {
    private static final String TAG="BookManagerService";
    private CopyOnWriteArrayList<Book> mBookList=new CopyOnWriteArrayList<Book>();
    private RemoteCallbackList<IOnNewBookArrivedListener> mReaders=new RemoteCallbackList<>();
    private AtomicBoolean mIsServiceDestroied=new AtomicBoolean(false);
    private Binder mBinder=new IBookManager.Stub(){
        @Override
        public List<Book> getBookList() throws RemoteException {
            return mBookList;
        }

        @Override
        public void addBook(Book book) throws RemoteException {
            mBookList.add(book);
        }

        @Override
        public void registerListener(IOnNewBookArrivedListener listener) throws RemoteException {
            mReaders.register(listener);

            Log.d(TAG,"now we have new readers");

        }

        @Override
        public void unregisterListnener(IOnNewBookArrivedListener listener) throws RemoteException {
            mReaders.unregister(listener);
            Log.d(TAG,"now we lost a reader ");

        }
    };

    @Override
    public void onCreate() {
        super.onCreate();
        mBookList.add(new Book(1,"android"));
        mBookList.add(new Book(2,"ios"));

        new Thread(new ServiceWorker()).start();
    }

    @Override
    public void onDestroy() {
        mIsServiceDestroied.set(true);
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }



    private  class ServiceWorker implements Runnable{

        @Override
        public void run() {
            while (!mIsServiceDestroied.get()){
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                int bookId=mBookList.size()+1;
                Book book=new Book(bookId,"NewBook"+bookId);

                try {
                    onNewBookArrived(book);
                } catch (RemoteException e) {
                    e.printStackTrace();
                }
            }

        }
    }

    private void onNewBookArrived(Book book) throws RemoteException {
        mBookList.add(book);
        Log.d(TAG,"new book is coming,notify the readers"+mBookList.size());

        final int N=mReaders.beginBroadcast();
        for(int i=0;i<N;++i){
            IOnNewBookArrivedListener listener=mReaders.getBroadcastItem(i);
            if (listener!=null){
                listener.onNewBookArrived(book);
            }
        }

        mReaders.finishBroadcast();

    }
}

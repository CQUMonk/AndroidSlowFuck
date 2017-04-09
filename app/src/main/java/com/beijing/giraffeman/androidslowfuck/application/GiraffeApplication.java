package com.beijing.giraffeman.androidslowfuck.application;

import android.app.Application;
import android.util.Log;

import com.tencent.smtt.sdk.QbSdk;
import com.tencent.smtt.sdk.TbsDownloader;
import com.tencent.smtt.sdk.TbsListener;

/**
 * Created by giraffe on 2017/4/5.
 */

public class GiraffeApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        TbsDownloader.needDownload(getApplicationContext(), false);
        QbSdk.PreInitCallback cb = new QbSdk.PreInitCallback() {

            @Override
            public void onViewInitFinished(boolean arg0) {
                // TODO Auto-generated method stub
                Log.e("app", " onViewInitFinished is " + arg0);
            }

            @Override
            public void onCoreInitFinished() {
                // TODO Auto-generated method stub

            }
        };
        QbSdk.setTbsListener(new TbsListener() {
            @Override
            public void onDownloadFinish(int i) {
                Log.d("app","onDownloadFinish is " + i);
            }

            @Override
            public void onInstallFinish(int i) {
                Log.d("app","onInstallFinish is " + i);
            }

            @Override
            public void onDownloadProgress(int i) {
                Log.d("app","onDownloadProgress:"+i);
            }
        });

        QbSdk.initX5Environment(getApplicationContext(),  cb);
    }
}

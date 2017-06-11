package com.beijing.giraffeman.androidslowfuck.md5;

import android.os.AsyncTask;
import android.os.Process;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.widget.EditText;
import android.widget.TextView;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.util.GraffeStringUtils;
import com.beijing.giraffeman.androidslowfuck.widgets.LoadingDialog;

import java.io.File;

import butterknife.BindView;
import butterknife.ButterKnife;

public class MD5Activity extends AppCompatActivity {
    @BindView(R.id.tv_file_cnt) TextView fileCnts;
    @BindView(R.id.tv_md5_value) TextView MD5Value;
    @BindView(R.id.et_file_list) EditText fileList;
    private String mAppTbsPath;
    private String mAppWebview;
    private LoadingDialog mLoadingDialog;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_md5);
        ButterKnife.bind(this);

        //mAppTbsPath=getFilesDir().getParent()+"/app_tbs/core_unzip_tmpcore_share";
        mAppTbsPath=getFilesDir().getParent()+"/app_tbs/core_share";
        //mAppWebview=getFilesDir().getParent()+ File.separator+"app_webview";


        mLoadingDialog=new LoadingDialog(this);

        fileList.setKeyListener(null);


        tackleFiles();
    }
    protected void showMD5ofFiles(String msg){
        fileList.setText(msg);
    }

    protected void showFileCnts(String cnt){
        fileCnts.setText(cnt);
    }

    private void tackleFiles(){
        new AsyncTask<Void,Void,FilesInfo>(){
            @Override
            protected void onPreExecute() {
                super.onPreExecute();
                mLoadingDialog.show();
            }

            @Override
            protected FilesInfo doInBackground(Void... voids) {
                Process.setThreadPriority(Process.THREAD_PRIORITY_DEFAULT);
                return getFilesInfo(mAppTbsPath);
            }

            @Override
            protected void onPostExecute(FilesInfo filesInfo) {
                if (filesInfo!=null){
                    showMD5ofFiles(filesInfo.MD5Info);
                    showFileCnts(filesInfo.FileCnt+"");
                    Log.d("md5",filesInfo.MD5Info);
                }

                mLoadingDialog.hide();
            }
        }.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);


    }

    private FilesInfo getFilesInfo(String path){


        FilesInfo filesInfo=new FilesInfo();
        if (TextUtils.isEmpty(path))
        {
            return null;
        }
        File root=new File(path);
        if (!root.exists()){

            Log.e("md5",root.getPath()+" is not exist..");
            return null;
        }

        File[] Flist=root.listFiles();
        for(File file:Flist){
            if (file.isFile()){
                filesInfo.FileCnt++;
                filesInfo.MD5Info=filesInfo.MD5Info+file.getName()+" : "+GraffeStringUtils.getFileMD5(file)+"\n";
            }
        }
        return filesInfo;

    }


}

package com.beijing.giraffeman.androidslowfuck.util.network;


import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by giraffe on 2017/6/11.
 */

public class GiraffeOkHttpUtils {

    /**
     * 开启异步线程访问网络
     * @param request
     * @param responseCallback
     */
    public static void enqueue(Request request, Callback responseCallback){
        OkHttpClientProvider.getOkHttpClient().newCall(request).enqueue(responseCallback);
    }

}

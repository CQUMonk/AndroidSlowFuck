package com.beijing.giraffeman.androidslowfuck.util.network;


import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;

/**
 * Created by giraffe on 2017/6/11.
 */

public class GiraffeOkHttpUtils {

    private final OkHttpClient sClient = OkHttpClientProvider.getOkHttpClient();

    /**
     * 开启异步线程访问网络
     *
     * @param request
     * @param responseCallback
     */
    public static void enqueue(Request request, Callback responseCallback) {
        OkHttpClientProvider.getOkHttpClient().newCall(request).enqueue(responseCallback);
    }

}

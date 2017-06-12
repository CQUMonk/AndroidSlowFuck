package com.beijing.giraffeman.androidslowfuck.util.network;

import android.os.Build;
import android.util.Log;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import okhttp3.ConnectionSpec;
import okhttp3.OkHttpClient;
import okhttp3.TlsVersion;

/**
 * Created by giraffe on 2017/6/11.
 */

public class OkHttpClientProvider {

    //所有网络请求都使用同一个Client即可
    private static OkHttpClient sClient;

    public static OkHttpClient getOkHttpClient() {
        if (sClient == null) {
            sClient = createClient();
        }
        return sClient;
    }

    public static OkHttpClient createClient() {
        // 默认情况下无连接超时
        OkHttpClient.Builder client = new OkHttpClient.Builder()
                .connectTimeout(0, TimeUnit.MILLISECONDS)
                .readTimeout(0, TimeUnit.MILLISECONDS)
                .writeTimeout(0, TimeUnit.MILLISECONDS);
        //.cookieJar(new ReactCookieJarContainer());

        return enableTls12OnPreLollipop(client).build();
    }

    /*
        Android 4.1-4.4 (API level 16 to 19) 虽然支持 TLS 1.1 and 1.2协议
        但默认情况下未开启。
    */
    public static OkHttpClient.Builder enableTls12OnPreLollipop(OkHttpClient.Builder client) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN && Build.VERSION.SDK_INT <= Build.VERSION_CODES.KITKAT) {
            try {
                client.sslSocketFactory(new TLSSocketFactory());

                ConnectionSpec cs = new ConnectionSpec.Builder(ConnectionSpec.MODERN_TLS)
                        .tlsVersions(TlsVersion.TLS_1_2)
                        .build();

                List<ConnectionSpec> specs = new ArrayList<>();
                specs.add(cs);
                specs.add(ConnectionSpec.COMPATIBLE_TLS);
                specs.add(ConnectionSpec.CLEARTEXT);

                client.connectionSpecs(specs);
            } catch (Exception exc) {
                Log.e("OkHttpClientProvider", "Error while enabling TLS 1.2", exc);
            }
        }

        return client;
    }
}

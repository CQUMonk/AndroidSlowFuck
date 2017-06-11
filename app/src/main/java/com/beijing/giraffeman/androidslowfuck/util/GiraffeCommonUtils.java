package com.beijing.giraffeman.androidslowfuck.util;

import android.os.Handler;
import android.os.Looper;



/**
 * Created by giraffe on 2017/6/11.
 */

public class GiraffeCommonUtils {
    private static Handler handler = new android.os.Handler(Looper.getMainLooper());

    public static void runInUIThread(Runnable runnable, long delayMillis) {
        handler.postDelayed(runnable, delayMillis);
    }

    public static void runInUIThread(Runnable runnable) {
        runInUIThread(runnable, 0);
    }
}

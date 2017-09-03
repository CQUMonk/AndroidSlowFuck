package com.beijing.giraffeman.androidslowfuck.util;

import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;
import android.util.Log;

import java.io.File;

/**
 * Created by giraffe on 2017/8/9.
 */

public class PreferenceUtils {
    private static final String DEFAULT_PREFERENCE_NAME = "fuck";
    private static final int SIZE_LIMIT = 10 * 1024 * 1024 * 8;



    public static void saveString(Context context,String key, String value) {
        if (TextUtils.isEmpty(key) || value == null) {
            return;
        }

        SharedPreferences preference = context.getSharedPreferences(DEFAULT_PREFERENCE_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preference.edit();
        editor.putString(key, value);
        editor.apply();
    }

    public static String loadString(Context context,String key, String defaultValue) {
        SharedPreferences settings = context
                .getSharedPreferences(DEFAULT_PREFERENCE_NAME, Context.MODE_PRIVATE);
        return settings.getString(key, defaultValue);
    }

    public static long computeSPFileSize(Context context, String fileName){
        long res=0;
        if (TextUtils.isEmpty(fileName)||context==null){
            return 0;
        }
        File spDir=new File(context.getCacheDir().getParent(), "shared_prefs");
        Log.d("sp",spDir.getAbsolutePath());
        Log.d("sp",spDir.listFiles().toString());
        File spFile=new File(spDir,fileName+".xml");
        res=spFile.length();
        return res;
    }


/*    private static void savePreference(String preferenceName, String key, String data) {

        if (TextUtils.isEmpty(key) || data == null) {
            return;
        }

        SharedPreferences preference = mContext.getSharedPreferences(preferenceName, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preference.edit();
        editor.putString(key, data);
        editor.apply();
    }*/
}

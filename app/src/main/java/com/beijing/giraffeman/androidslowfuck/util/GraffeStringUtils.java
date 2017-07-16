package com.beijing.giraffeman.androidslowfuck.util;

import android.graphics.Paint;
import android.text.TextUtils;
import android.util.Log;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.MessageDigest;

/**
 * Created by giraffe on 2017/3/31.
 */


public class GraffeStringUtils {
    /**
     * 生成文件的MD5值
     *
     * @param file
     * @return
     * @throws Exception
     */
    private static final char[] DIGITS_LOWER = { '0', '1', '2', '3', '4', '5',
            '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'
    };
    private static final String TAG="GraffeStringUtils";
    public static final String getMD5ForFileInAssets(InputStream inputStream){
        try {

            byte[] buffer = new byte[1024];
            MessageDigest md = MessageDigest.getInstance("MD5");
            int numRead = 0;
            while ((numRead = inputStream.read(buffer)) > 0) {
                md.update(buffer, 0, numRead);
            }
            inputStream.close();

            return toHexString(md.digest());

        } catch (Exception e) {
            Log.e(TAG,e.getMessage());

        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
            }catch (Exception e) {
                Log.e(TAG,e.getMessage());
            }
        }

        return "";

    }



    public static String getFileMD5(File file) {

        if (file == null || !file.exists()) {
            return "";
        }

        InputStream inputStream = null;

        try {
            inputStream = new FileInputStream(file);
            byte[] buffer = new byte[1024];
            MessageDigest md = MessageDigest.getInstance("MD5");
            int numRead = 0;
            while ((numRead = inputStream.read(buffer)) > 0) {
                md.update(buffer, 0, numRead);
            }
            inputStream.close();

            return toHexString(md.digest());

        } catch (Exception e) {
            Log.d(TAG,"e=" + e + ":message=" + e.getMessage());
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
            }catch (Exception e) {
                Log.d(TAG,"e=" + e + ":message=" + e.getMessage());
            }
        }

        return "";
    }

    private static String toHexString(byte[] data) throws Exception {

        String result = "";
        if (data != null && data.length > 0) {
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < 16; i++) {
                byte byte0 = data[i];
                builder.append(DIGITS_LOWER[byte0 >>> 4 & 0xf]);
                builder.append(DIGITS_LOWER[byte0 & 0xf]);
            }
            result = builder.toString();
        }
        return result;
    }
    public static float getStringWidth(String str, float fontSize, float scaleX) {
        if(TextUtils.isEmpty(str)) {
            return 0.0F;
        } else {
            Paint paint = new Paint();
            paint.setTextSize(fontSize);
            float text_width = paint.measureText(str);
            text_width *= scaleX;
            return text_width;
        }
    }
}

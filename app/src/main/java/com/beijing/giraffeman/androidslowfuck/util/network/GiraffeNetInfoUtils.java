package com.beijing.giraffeman.androidslowfuck.util.network;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.telephony.TelephonyManager;
import android.util.Log;

/**
 * NetWork Utils
 * <ul>
 * <strong>Attentions</strong>
 * <li>You should add <strong>android.permission.ACCESS_NETWORK_STATE</strong> in manifest, to get network status.</li>
 * </ul>
 *
 * @author <a href="http://www.trinea.cn" target="_blank">Trinea</a> 2014-11-03
 */
public class GiraffeNetInfoUtils {

    private static final String TAG = "NetworkUtils";

    public static final int NETWORKTYPE_WIFI = 0;

    public static final int NETWORKTYPE_2G = 1;

    public static final int NETWORKTYPE_3G = 2;

    public static final int NETWORKTYPE_4G = 3;

    public static final int NETWORKTYPE_UNKNOWN = 4;

    public static final int NETWORK_TYPE_LTE = 13;

    /**
     * 当前是否wi-fi连接
     *
     * @return
     */
    public static boolean isWifiConnected(Context context) {

        try {
            ConnectivityManager connectMgr = (ConnectivityManager) context
                    .getSystemService(Context.CONNECTIVITY_SERVICE);

            NetworkInfo info = connectMgr.getActiveNetworkInfo();

            if (info == null) {
                return false;
            }

            return info.getType() == ConnectivityManager.TYPE_WIFI;
        } catch (Exception e) {
            Log.d(TAG, "e=" + e + ":message=" + e.getMessage());
        }

        return false;
    }

    /**
     * 是否有网络连接
     *
     * @param context
     * @return
     */
    public static boolean hasNetWork(Context context) {

        ConnectivityManager connectivityManager = (ConnectivityManager) context
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo info = connectivityManager.getActiveNetworkInfo();

        if (info != null) {
            return true;
        }

        return false;
    }

    /**
     * 判断网络是否可用
     *
     * @return
     */
    public static boolean isNetworkAvalid(Context context) {

        if (context == null) {
            return false;
        }

        try {

            ConnectivityManager connectivityManager = (ConnectivityManager) context
                    .getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo activeNetInfo = connectivityManager.getActiveNetworkInfo();

            if (activeNetInfo == null) {
                return false;
            }

            return activeNetInfo.isAvailable() || activeNetInfo.isConnected();

        } catch (Exception e) {
            Log.d(TAG, "e=" + e + ":message=" + e.getMessage());
        }

        return false;
    }

    /**
     * 返回网络类型
     *
     * @return
     */
    public static String getNetwrokTypeStr(int networkType) {

        String result = "UNKNOWN";

        switch (networkType) {
            case NETWORKTYPE_2G:
                result = "2G";
                break;
            case NETWORKTYPE_3G:
                result = "3G";
                break;
            case NETWORKTYPE_4G:
                result = "4G";
                break;
            case NETWORKTYPE_WIFI:
                result = "WIFI";
                break;
            default:
                break;
        }

        return result;
    }

    /**
     * 对于移动端网络要区分2G、3G、4G
     *
     * @param context
     * @return
     */
    public static int getNetworkType(Context context, NetworkInfo info) {

        int type = NETWORKTYPE_UNKNOWN;

        if (info == null || context == null) {
            return type;
        }

        if (info.getType() == ConnectivityManager.TYPE_WIFI) {
            type = NETWORKTYPE_WIFI;
        } else if (info.getType() == ConnectivityManager.TYPE_MOBILE) {

            type = NETWORKTYPE_3G;

            int subType = info.getSubtype();

            switch (subType) {
                case TelephonyManager.NETWORK_TYPE_HSDPA:
                case TelephonyManager.NETWORK_TYPE_HSPA:
                case TelephonyManager.NETWORK_TYPE_HSUPA:
                case TelephonyManager.NETWORK_TYPE_UMTS:
                case TelephonyManager.NETWORK_TYPE_EVDO_0:
                case TelephonyManager.NETWORK_TYPE_EVDO_A:
                    type = NETWORKTYPE_3G;
                    break;
                case TelephonyManager.NETWORK_TYPE_GPRS:
                case TelephonyManager.NETWORK_TYPE_EDGE:
                case TelephonyManager.NETWORK_TYPE_CDMA:
                    type = NETWORKTYPE_2G;
                    break;
                case NETWORK_TYPE_LTE:
                    type = NETWORKTYPE_4G;
                    break;
                default:
                    break;
            }

            Log.d(TAG, "network type：" + subType);
        }

        return type;
    }

    public static NetworkInfo getNetworkInfo(Context context) {
        ConnectivityManager connectMgr = (ConnectivityManager) context
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        return connectMgr.getActiveNetworkInfo();
    }



}

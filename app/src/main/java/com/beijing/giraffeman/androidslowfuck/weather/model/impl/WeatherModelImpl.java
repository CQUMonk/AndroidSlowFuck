package com.beijing.giraffeman.androidslowfuck.weather.model.impl;

import android.text.TextUtils;
import android.util.Log;

import com.beijing.giraffeman.androidslowfuck.util.network.GiraffeOkHttpUtils;
import com.beijing.giraffeman.androidslowfuck.weather.model.IWeatherModel;
import com.beijing.giraffeman.androidslowfuck.weather.model.OnWeatherListener;
import com.beijing.giraffeman.androidslowfuck.weather.model.entiry.Weather;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by giraffe on 2017/6/11.
 */

public class WeatherModelImpl implements IWeatherModel {
    private static final String TAG = "WeatherModelImpl";

    @Override
    public void loadWeather(String cityNO, final OnWeatherListener onWeatherListener) {
        if (TextUtils.isEmpty(cityNO)) {
            Log.e(TAG, "cityNo is null");
            return;
        }

        String url = String.format("http://www.weather.com.cn/data/sk/%s.html", cityNO);
        Log.d(TAG, url);

        Request request = new Request.Builder()
                .url(url)
                .build();

        GiraffeOkHttpUtils.enqueue(request, new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(TAG, e.getLocalizedMessage());
                onWeatherListener.onError();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Gson gson = new GsonBuilder().create();
                Weather weather = gson.fromJson(response.body().string(), Weather.class);

                onWeatherListener.onSuccess(weather);
            }
        });


    }
}

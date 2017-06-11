package com.beijing.giraffeman.androidslowfuck.weather.model;

import com.beijing.giraffeman.androidslowfuck.weather.model.entiry.Weather;

/**
 * Created by giraffe on 2017/6/11.
 */

public interface OnWeatherListener {
    void onSuccess(Weather weather);
    void onError();
}

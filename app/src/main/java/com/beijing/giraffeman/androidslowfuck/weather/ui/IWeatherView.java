package com.beijing.giraffeman.androidslowfuck.weather.ui;

import com.beijing.giraffeman.androidslowfuck.weather.model.entiry.Weather;

/**
 * Created by giraffe on 2017/6/11.
 */

public interface IWeatherView {
    void showLoading();

    void hideLoading();

    void showError();

    void setWeatherInfo(Weather weather);
}

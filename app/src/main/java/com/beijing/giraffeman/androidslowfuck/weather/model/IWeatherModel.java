package com.beijing.giraffeman.androidslowfuck.weather.model;

/**
 * Created by giraffe on 2017/6/11.
 */

public interface IWeatherModel {
    void loadWeather(String cityNO, OnWeatherListener onWeatherListener);
}

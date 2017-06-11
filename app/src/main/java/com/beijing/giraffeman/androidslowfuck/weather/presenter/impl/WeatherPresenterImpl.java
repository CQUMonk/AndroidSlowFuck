package com.beijing.giraffeman.androidslowfuck.weather.presenter.impl;

import com.beijing.giraffeman.androidslowfuck.weather.model.IWeatherModel;
import com.beijing.giraffeman.androidslowfuck.weather.model.OnWeatherListener;
import com.beijing.giraffeman.androidslowfuck.weather.model.entiry.Weather;
import com.beijing.giraffeman.androidslowfuck.weather.model.impl.WeatherModelImpl;
import com.beijing.giraffeman.androidslowfuck.weather.presenter.IWeatherPresenter;
import com.beijing.giraffeman.androidslowfuck.weather.ui.IWeatherView;

/**
 * Created by giraffe on 2017/6/11.
 */

public class WeatherPresenterImpl implements IWeatherPresenter, OnWeatherListener {
    private IWeatherView weatherView;
    private IWeatherModel weatherModel;

    public WeatherPresenterImpl(IWeatherView weatherView) {
        this.weatherView = weatherView;
        this.weatherModel = new WeatherModelImpl();
    }

    @Override
    public void getWeather(String cityNO) {
        this.weatherView.showLoading();
        this.weatherModel.loadWeather(cityNO, this);
    }

    @Override
    public void onSuccess(Weather weather) {
        this.weatherView.hideLoading();
        this.weatherView.setWeatherInfo(weather);
    }

    @Override
    public void onError() {

        this.weatherView.hideLoading();
        this.weatherView.showError();
    }
}

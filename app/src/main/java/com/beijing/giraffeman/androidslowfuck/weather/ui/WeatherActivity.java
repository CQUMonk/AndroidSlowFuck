package com.beijing.giraffeman.androidslowfuck.weather.ui;

import android.app.Dialog;
import android.app.ProgressDialog;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.util.GiraffeCommonUtils;
import com.beijing.giraffeman.androidslowfuck.util.GraffeStringUtils;
import com.beijing.giraffeman.androidslowfuck.weather.model.entiry.Weather;
import com.beijing.giraffeman.androidslowfuck.weather.model.entiry.WeatherInfo;
import com.beijing.giraffeman.androidslowfuck.weather.presenter.IWeatherPresenter;
import com.beijing.giraffeman.androidslowfuck.weather.presenter.impl.WeatherPresenterImpl;

import butterknife.BindView;
import butterknife.ButterKnife;

public class WeatherActivity extends AppCompatActivity implements View.OnClickListener,IWeatherView {
    private Dialog loadingDialog;
    private IWeatherPresenter weatherPresenter;

    @BindView(R.id.et_city_no)
     EditText cityNOInput;

    @BindView(R.id.tv_weather_city)
     TextView city;

    @BindView(R.id.tv_weather_no)
     TextView cityNO;

    @BindView(R.id.tv_weather_temp)
     TextView temp;

    @BindView(R.id.tv_weather_WD)
     TextView wd;

    @BindView(R.id.tv_weather_WS)
     TextView ws;

    @BindView(R.id.tv_weather_SD)
     TextView sd;

    @BindView(R.id.tv_weather_WSE)
     TextView wse;

    @BindView(R.id.tv_weather_time)
     TextView time;
    @BindView(R.id.tv_weather_njd)
     TextView njd;
    @BindView(R.id.btn_go)
     Button go;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weather);
        ButterKnife.bind(this);

        loadingDialog = new ProgressDialog(this);
        loadingDialog.setTitle("加载天气中...");
        go.setOnClickListener(this);

        weatherPresenter=new WeatherPresenterImpl(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btn_go:
                weatherPresenter.getWeather(cityNOInput.getText().toString().trim());
                break;
        }
    }

    @Override
    public void showLoading() {
        this.loadingDialog.show();
    }

    @Override
    public void hideLoading() {
        this.loadingDialog.dismiss();
    }

    @Override
    public void showError() {

        Toast.makeText(this, "error", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void setWeatherInfo(Weather weather) {
        if (weather==null){
            Log.e("MainPage","Weather info is null");
            return;
        }
        final WeatherInfo info = weather.getWeatherInfo();
        GiraffeCommonUtils.runInUIThread(new Runnable() {
            @Override
            public void run() {
                city.setText(info.getCity());
                cityNO.setText(info.getCityid());
                temp.setText(info.getTemp());
                wd.setText(info.getWD());
                ws.setText(info.getWS());
                sd.setText(info.getSD());
                wse.setText(info.getWS());
                time.setText(info.getTemp());
                njd.setText(info.getNjd());
            }
        });

    }
}

package com.beijing.giraffeman.androidslowfuck.imagepicker;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;


import com.beijing.giraffeman.androidslowfuck.R;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by giraffe on 2017/7/4.
 */

public class ImagePickerDemo extends AppCompatActivity implements View.OnClickListener{

    @BindView(R.id.btn_imagepicker_pick)
    Button btn_pick;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_imagepicker_demo);
        ButterKnife.bind(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.btn_imagepicker_pick:

                break;

        }
    }

    private void pickPics(){

    }
}

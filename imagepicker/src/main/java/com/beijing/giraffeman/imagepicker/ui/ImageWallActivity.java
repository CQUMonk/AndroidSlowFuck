package com.beijing.giraffeman.imagepicker.ui;

import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;

import com.beijing.giraffeman.imagepicker.ImagePicker;
import com.beijing.giraffeman.imagepicker.listener.OnImageSelectedListener;
import com.beijing.giraffeman.imagepicker.model.ImageItem;

/**
 * Created by giraffe on 2017/7/5.
 */

public class ImageWallActivity extends AppCompatActivity implements OnImageSelectedListener{


    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ImagePicker.INSTANCE.clear();
        ImagePicker.INSTANCE.addOnImageSelectedListener(this);
    }

    public boolean checkPermission(@NonNull String permission) {
        return ActivityCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED;
    }

    @Override
    public void onImageSelected(int position, ImageItem item, boolean isAdd) {

    }
}

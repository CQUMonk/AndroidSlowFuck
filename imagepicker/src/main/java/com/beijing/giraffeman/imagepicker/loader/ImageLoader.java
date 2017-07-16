package com.beijing.giraffeman.imagepicker.loader;

import android.app.Activity;
import android.widget.ImageView;

/**
 * Created by giraffe on 2017/7/5.
 */

public interface ImageLoader {

    void displayImage(Activity activity, String path, ImageView imageView, int width, int height);

    void clearMemoryCache();
}

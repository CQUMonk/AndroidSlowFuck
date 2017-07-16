package com.beijing.giraffeman.imagepicker.listener;

import com.beijing.giraffeman.imagepicker.model.ImageItem;

/**
 * Created by giraffe on 2017/7/5.
 */

public interface OnImageSelectedListener {
    void onImageSelected(int position, ImageItem item, boolean isAdd);
}

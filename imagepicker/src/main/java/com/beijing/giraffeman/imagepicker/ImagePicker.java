package com.beijing.giraffeman.imagepicker;

import com.beijing.giraffeman.imagepicker.listener.OnImageSelectedListener;
import com.beijing.giraffeman.imagepicker.loader.ImageLoader;
import com.beijing.giraffeman.imagepicker.model.ImageFolder;
import com.beijing.giraffeman.imagepicker.model.ImageItem;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by giraffe on 2017/7/5.
 */

public enum ImagePicker {
    INSTANCE;

    private boolean multiMode = true;    //图片选择模式
    private int selectLimit = 9;         //最大选择图片数量

    private boolean crop = true;         //裁剪
    private boolean showCamera = true;   //显示相机

    private boolean isSaveRectangle = false;  //裁剪后的图片是否是矩形，否者跟随裁剪框的形状
    private int outPutX = 800;           //裁剪保存宽度
    private int outPutY = 800;           //裁剪保存高度
    private int focusWidth = 280;         //焦点框的宽度
    private int focusHeight = 280;        //焦点框的高度
    private ImageLoader imageLoader;     //图片加载器

    private List<OnImageSelectedListener> mImageSelectedListeners;          // 图片选中的监听回调

    private ArrayList<ImageItem> mSelectedImages = new ArrayList<>();   //选中的图片集合
    private List<ImageFolder> mImageFolders;      //所有的图片文件夹
    private int mCurrentImageFolderPosition = 0;  //当前选中的文件夹位置 0表示所有图片

    public boolean isMultiMode() {
        return multiMode;
    }

    public void setMultiMode(boolean multiMode) {
        this.multiMode = multiMode;
    }


    public void addOnImageSelectedListener(OnImageSelectedListener l) {
        if (mImageSelectedListeners == null) mImageSelectedListeners = new ArrayList<>();
        mImageSelectedListeners.add(l);
    }

    public void removeOnImageSelectedListener(OnImageSelectedListener l) {
        if (mImageSelectedListeners == null) return;
        mImageSelectedListeners.remove(l);
    }

    public void clear() {
        if (mImageSelectedListeners != null) {
            mImageSelectedListeners.clear();
            mImageSelectedListeners = null;
        }
        if (mImageFolders != null) {
            mImageFolders.clear();
            mImageFolders = null;
        }
        if (mSelectedImages != null) {
            mSelectedImages.clear();
        }
        mCurrentImageFolderPosition = 0;
    }
}

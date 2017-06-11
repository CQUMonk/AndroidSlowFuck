package com.beijing.giraffeman.androidslowfuck.mainpage.model;

import android.graphics.drawable.Drawable;

/**
 * Created by giraffe on 2017/4/8.
 */

public class NavigatorItem {
    public String ModuleName;
    public Drawable Pic;
    public Class ModuleClass;

    public NavigatorItem(String moduleName, Drawable pic,Class moduleClass) {
        this.ModuleName = moduleName;
        this.Pic = pic;
        this.ModuleClass=moduleClass;
    }
}

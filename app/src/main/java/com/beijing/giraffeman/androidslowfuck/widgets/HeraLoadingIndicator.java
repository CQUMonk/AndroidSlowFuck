package com.beijing.giraffeman.androidslowfuck.widgets;

import android.animation.ObjectAnimator;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.view.animation.AccelerateInterpolator;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.animations.drawables.HeraLoadingDrawable;

/**
 * Created by giraffe on 2017/9/10.
 */

public class HeraLoadingIndicator extends FrameLayout {
    private ImageView icon;
    private ImageView indicator;
    private TextView name;
    private HeraLoadingDrawable mDrawable;

    public HeraLoadingIndicator(Context context) {
        super(context);
        init(context);
    }

    public HeraLoadingIndicator(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }


    private void init(Context context) {
        LayoutInflater.from(context).inflate(R.layout.indicator_loading_hera, this);
        icon = (ImageView) findViewById(R.id.iv_hera_loading_icon);
        indicator = (ImageView) findViewById(R.id.iv_hera_loading_indicator);
        name = (TextView) findViewById(R.id.tv_hera_loading_name);

        mDrawable = new HeraLoadingDrawable();
        indicator.setImageDrawable(mDrawable);
    }


    public void setIcon(Drawable drawable) {
        this.icon.setImageDrawable(drawable);
        icon.setVisibility(VISIBLE);
    }

    public void setAppName(String appName) {
        this.name.setText(appName);
        name.setVisibility(VISIBLE);
    }

    public void hide() {
        int marginBottom = ((ViewGroup.MarginLayoutParams) this.getLayoutParams()).bottomMargin;

        int translationY = -(marginBottom + this.getBottom());//滑动距离

        ViewGroup target = this.getParent() != null ? (ViewGroup) this.getParent() : this;


        ObjectAnimator animator = ObjectAnimator.ofFloat(target, "translationY", translationY);
        animator.setInterpolator(new AccelerateInterpolator());
        animator.setDuration(600);
        animator.start();
        // drawable 动画停止
        if (mDrawable.isRunning()) {
            mDrawable.stop();
        }
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        mDrawable.start();
    }


}

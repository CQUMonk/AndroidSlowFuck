package com.beijing.giraffeman.androidslowfuck.animations.drawables;

import android.animation.ObjectAnimator;
import android.animation.PropertyValuesHolder;
import android.animation.ValueAnimator;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ColorFilter;
import android.graphics.Paint;
import android.graphics.PixelFormat;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.drawable.Animatable;
import android.graphics.drawable.Drawable;
import android.support.annotation.IntRange;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Property;

/**
 * Created by giraffe on 2017/9/9.
 */

public class CircleDrawable extends Drawable implements Animatable{
    private Paint mPaint;

    private ValueAnimator mValueAnimator;

    private int mRadius;

    private RectF mRect = new RectF();

    private int mStartDelay;



    public CircleDrawable() {
        mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mPaint.setColor(Color.WHITE);
        mPaint.setStyle(Paint.Style.STROKE);
        mPaint.setStrokeWidth(5);
    }

    public int getRadius() {
        return mRadius;
    }
    public void setRadius(int radius) {
        mRadius = radius;
    }

    @Override
    public void draw(@NonNull Canvas canvas) {
        canvas.drawCircle(mRect.centerX(), mRect.centerY(), mRadius, mPaint);
    }

    @Override
    public void setAlpha(@IntRange(from = 0, to = 255) int alpha) {
        mPaint.setAlpha(alpha);

    }

    @Override
    public void setColorFilter(@Nullable ColorFilter colorFilter) {
        mPaint.setColorFilter(colorFilter);
    }

    @Override
    public int getOpacity() {
        return PixelFormat.OPAQUE;
    }

    @Override
    protected void onBoundsChange(Rect bounds) {
        super.onBoundsChange(bounds);
        mRect.set(clipRectToSquare(bounds));
        if (isRunning()) {
            stop();
        }
        // 计算最大半径
        int maxRadius = (int) ((mRect.right - mRect.left) / 2);

        PropertyValuesHolder radiusHolder = PropertyValuesHolder.ofInt(mRadiusProperty, 0, maxRadius);

        PropertyValuesHolder alphaHolder = PropertyValuesHolder.ofInt("alpha", 255, 0);

        mValueAnimator = ObjectAnimator.ofPropertyValuesHolder(this, radiusHolder, alphaHolder);
        mValueAnimator.setStartDelay(mStartDelay);
        mValueAnimator.setDuration(1200);

        mValueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                // 监听属性动画并进行重绘
                invalidateSelf();
            }
        });
        // 设置动画无限循环
        mValueAnimator.setRepeatMode(ValueAnimator.RESTART);
        mValueAnimator.setRepeatCount(ValueAnimator.INFINITE);
        start();
    }

    /**
     * 裁剪Rect为正方形
     * @param rect
     * @return
     */
    private Rect clipRectToSquare(Rect rect) {
        int w = rect.width();
        int h = rect.height();
        int min = Math.min(w, h);
        int cx = rect.centerX();
        int cy = rect.centerY();
        int r = min / 2;
        return new Rect(
                cx - r,
                cy - r,
                cx + r,
                cy + r
        );
    }

    // --------------- Animatable  ------------------

    @Override
    public void start() {
        mValueAnimator.start();
    }

    @Override
    public void stop() {
        mValueAnimator.end();

    }

    @Override
    public boolean isRunning() {
        return mValueAnimator != null && mValueAnimator.isRunning();
    }

    public void setAnimatorDelay(int startDelay) {
        mStartDelay = startDelay;
    }


    Property<CircleDrawable,Integer > mRadiusProperty= new Property<CircleDrawable, Integer>(Integer.class, "radius") {
        @Override
        public Integer get(CircleDrawable circleDrawable) {
            return circleDrawable.getRadius();
        }

        @Override
        public void set(CircleDrawable object, Integer value) {
            object.setRadius(value);
        }
    };
}

package com.beijing.giraffeman.androidslowfuck.animations.drawables;

import android.animation.ValueAnimator;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ColorFilter;
import android.graphics.Paint;
import android.graphics.PixelFormat;
import android.graphics.Rect;
import android.graphics.drawable.Animatable;
import android.graphics.drawable.Drawable;
import android.support.annotation.IntRange;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.animation.AccelerateInterpolator;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by giraffe on 2017/9/10.
 */

public class HeraLoadingDrawable
        extends Drawable implements Animatable {
    private Paint mPaint;
    public static final int ALPHA=100;

    int[] alphas=new int[]{ALPHA,
            ALPHA,
            ALPHA,};

    private Rect drawBounds = new Rect();

    private ArrayList<ValueAnimator> mAnimators;
    private HashMap<ValueAnimator,ValueAnimator.AnimatorUpdateListener> mUpdateListeners=new HashMap<>();

    public HeraLoadingDrawable(){
        mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mPaint.setColor(Color.GRAY);
        mPaint.setStyle(Paint.Style.FILL);
    }
    @Override
    public void start() {
        if (mAnimators==null){
            mAnimators=getAnimators();
        }
        if (isStarted()) {
            return;
        }
        startAnimators();
        invalidateSelf();
    }

    @Override
    public void stop() {
        stopAnimators();
    }

    @Override
    public boolean isRunning() {
        return isStarted();
    }

    @Override
    public void draw(@NonNull Canvas canvas) {
        float circleSpacing=20;
        float radius=(Math.min(getWidth(),getHeight())-circleSpacing*2)/6;
        float x = getWidth()/ 2-(radius*2+circleSpacing);
        float y=getHeight() / 2;
        for (int i = 0; i < 3; i++) {
            canvas.save();
            float translateX=x+(radius*2)*i+circleSpacing*i;
            canvas.translate(translateX, y);
            mPaint.setAlpha(alphas[i]);
            canvas.drawCircle(0, 0, radius, mPaint);
            canvas.restore();
        }
    }

    @Override
    public void setAlpha(@IntRange(from = 0, to = 255) int i) {
        mPaint.setAlpha(i);
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
        drawBounds=new Rect(bounds);
    }

    public int getWidth(){
        return drawBounds.width();
    }

    public int getHeight(){
        return drawBounds.height();
    }

    private ArrayList<ValueAnimator> getAnimators() {
        ArrayList<ValueAnimator> animators=new ArrayList<>();
        int[] delays=new int[]{300,600,900};
        for (int i = 0; i < 3; i++) {
            final int index=i;

            ValueAnimator alphaAnim=ValueAnimator.ofInt(100,255,100);
            alphaAnim.setDuration(1000);

            alphaAnim.setRepeatCount(-1);
            alphaAnim.setStartDelay(delays[i]);
            mUpdateListeners.put(alphaAnim,new ValueAnimator.AnimatorUpdateListener() {
                @Override
                public void onAnimationUpdate(ValueAnimator animation) {
                    alphas[index] = (int) animation.getAnimatedValue();
                    invalidateSelf();
                }
            });

            animators.add(alphaAnim);
        }
        return animators;
    }

    public void setColor(int color){
        mPaint.setColor(color);
    }

    private void startAnimators() {
        for (int i = 0; i < mAnimators.size(); i++) {
            ValueAnimator animator = mAnimators.get(i);

            //when the animator restart , add the updateListener again because they
            // was removed by animator stop .
            ValueAnimator.AnimatorUpdateListener updateListener=mUpdateListeners.get(animator);
            if (updateListener!=null){
                animator.addUpdateListener(updateListener);
            }

            animator.start();
        }
    }
    private void stopAnimators() {
        if (mAnimators!=null){
            for (ValueAnimator animator : mAnimators) {
                if (animator != null && animator.isStarted()) {
                    animator.removeAllUpdateListeners();
                    //animator.end();
                    animator.cancel();
                }
            }
        }
    }

    private boolean isStarted() {

        if (mAnimators!=null){
            return mAnimators.get(0).isRunning();
        }

        return false;
    }
}



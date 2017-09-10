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

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by giraffe on 2017/9/9.
 */

public class PointIndicator extends Drawable implements Animatable {

    private Paint mPaint;
    public static final float SCALE=1.0f;
    private Rect drawBounds = new Rect();

    //scale x ,y
    private float[] scaleFloats=new float[]{SCALE,
            SCALE,
            SCALE};

    private ArrayList<ValueAnimator> mAnimators;
    private HashMap<ValueAnimator,ValueAnimator.AnimatorUpdateListener> mUpdateListeners=new HashMap<>();


    public PointIndicator(){
        mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mPaint.setColor(Color.WHITE);
        mPaint.setStyle(Paint.Style.FILL);
        //mPaint.setStrokeWidth(5);
    }

    public void setColor(int color){
        mPaint.setColor(color);
    }

    @Override
    public void draw(@NonNull Canvas canvas) {
        float circleSpacing=4;
        float radius=(Math.min(getWidth(),getHeight())-circleSpacing*2)/6;
        float x = getWidth()/ 2-(radius*2+circleSpacing);
        float y=getHeight() / 2;
        for (int i = 0; i < 3; i++) {
            canvas.save();
            float translateX=x+(radius*2)*i+circleSpacing*i;
            canvas.translate(translateX, y);
            canvas.scale(scaleFloats[i], scaleFloats[i]);
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
        int[] delays=new int[]{120,240,360};
        for (int i = 0; i < 3; i++) {
            final int index=i;

            ValueAnimator scaleAnim=ValueAnimator.ofFloat(1,0.3f,1);

            scaleAnim.setDuration(1000);
            scaleAnim.setRepeatCount(-1);
            scaleAnim.setStartDelay(delays[i]);

            mUpdateListeners.put(scaleAnim,new ValueAnimator.AnimatorUpdateListener() {
                @Override
                public void onAnimationUpdate(ValueAnimator animation) {
                    scaleFloats[index] = (float) animation.getAnimatedValue();
                    invalidateSelf();
                }
            });
            animators.add(scaleAnim);
        }
        return animators;
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

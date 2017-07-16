package com.beijing.giraffeman.androidslowfuck.loopview.ui;

import android.content.Context;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewConfiguration;
import android.widget.FrameLayout;

/**
 * Created by giraffe on 2017/6/18.
 */

public class ScrollWall extends FrameLayout {

    private int touchSlop;

    public ScrollWall(@NonNull Context context) {
        super(context);
    }

    public ScrollWall(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        touchSlop= ViewConfiguration.get(context).getScaledTouchSlop();
    }

    public ScrollWall(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

/*    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {


        if (ev.getAction()== MotionEvent.ACTION_MOVE){
           // Log.d("event"," ACTION MOVE in Dispatch !");
            //Log.d("event","touchSlop: "+touchSlop);
            return true;
        }
        //Log.d("event","ev: "+MotionEvent.actionToString(ev.getAction()));

        return super.dispatchTouchEvent(ev);
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        if (ev.getAction()== MotionEvent.ACTION_MOVE){
            Log.d("event"," ACTION MOVE in Intercept!");
            return true;
        }
        return super.onInterceptTouchEvent(ev);
    }*/
}

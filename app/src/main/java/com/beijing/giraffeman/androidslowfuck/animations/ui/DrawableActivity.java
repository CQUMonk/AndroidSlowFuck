package com.beijing.giraffeman.androidslowfuck.animations.ui;

import android.animation.ObjectAnimator;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.animations.drawables.HeraLoadingDrawable;
import com.beijing.giraffeman.androidslowfuck.widgets.HeraLoadingIndicator;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by giraffe on 2017/9/9.
 */

public class DrawableActivity extends AppCompatActivity {


    private static final String TAG = "DrawableActivity";
    @BindView(R.id.iv_drawable_circle)
    HeraLoadingIndicator imageView;
    @BindView(R.id.view_split)
    View split;
    HeraLoadingDrawable mDrawable;
    private int originTop;
    private int originBottom;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_drawable);
        ButterKnife.bind(this);




/*        mCircleDrawable=new CircleDrawable();
        imageView.setImageDrawable(mCircleDrawable);*/
        /*mDrawable = new HeraLoadingDrawable();
*/

        //mDrawable.start();


    }

    public void control(View view) {
/*        if (mDrawable.isRunning()) {
            mDrawable.stop();
        } else {
            mDrawable.start();
        }*/
        //doAnimation();

        imageView.hide();
    }

    private void doAnimation() {

        int margin = ((ViewGroup.MarginLayoutParams) imageView.getLayoutParams()).bottomMargin;
        //ValueAnimator animator = ValueAnimator.ofInt(0,imageView.getBottom()+margin);
        final View parent = (View) imageView.getParentForAccessibility();
        ObjectAnimator animator = ObjectAnimator.ofFloat(parent, "translationY", -(margin + imageView.getHeight()));
        animator.setDuration(1000);


        //originTop =parent.getTop();
        //originBottom =parent.getBottom();

/*        animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                Log.d(TAG,"getX："+imageView.getX()+"getY："+imageView.getY());
                Log.d(TAG,"getTop："+imageView.getTop()+"getBottom："+imageView.getBottom());
                Log.d(TAG,"getLeft："+imageView.getLeft()+"getRight："+imageView.getRight());



                int curValue = (int)animation.getAnimatedValue();
                Log.d(TAG,"curValue"+curValue);
                parent.layout(parent.getLeft(),originTop-curValue,parent.getRight(),originBottom-curValue);
            }
        });*/
        animator.start();
    }


}

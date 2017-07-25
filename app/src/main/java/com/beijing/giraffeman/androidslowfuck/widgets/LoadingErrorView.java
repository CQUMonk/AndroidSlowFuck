package com.beijing.giraffeman.androidslowfuck.widgets;

import android.content.Context;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.beijing.giraffeman.androidslowfuck.R;

/**
 * Created by giraffe on 2017/7/19.
 */

public class LoadingErrorView extends LinearLayout implements View.OnClickListener {

    private ImageView mErrorImg;
    private TextView mErrorMsg;

    private boolean mSupportReload;

    public LoadingErrorView(Context context) {
        this(context,null);
    }

    public LoadingErrorView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);

        LayoutInflater mInflater = LayoutInflater.from(getContext());
        mInflater.inflate(R.layout.loading_error_view,this);

        mErrorImg= (ImageView) findViewById(R.id.img_loading_error);
        mErrorMsg= (TextView) findViewById(R.id.tv_loading_error);
    }

    public boolean isSupportReload(){
        return mSupportReload;
    }
    public void setSupportLoading(boolean isSupportReload){
        this.mSupportReload=isSupportReload;
        if (isSupportReload){
            this.setOnClickListener(this);
        }else {
            this.setClickable(false);
        }
    }

    public void setErrorImage(int drawable){
        mErrorImg.setImageResource(drawable);
    }
    public void setErrorText(String msg){
        if (TextUtils.isEmpty(msg)){
            return;
        }
        mErrorMsg.setText(msg);
    }

    @Override
    public void onClick(View view) {

    }


}

package com.beijing.giraffeman.androidslowfuck.widgets;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.beijing.giraffeman.androidslowfuck.R;

/**
 * Created by giraffe on 2017/4/5.
 */

public class LoadingDialog extends AlertDialog {

    private static final String TAG = "LoadingDialog";
    private String mLoadingMsg;

    private TextView mTextView;

    /**
     * @param context
     */
    public LoadingDialog(Context context) {
        super(context, R.style.TransparentDialog);
        setCancelable(false);
        setCanceledOnTouchOutside(false);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.loading_dialog);
        mTextView = (TextView) findViewById(R.id.loading_message);
    }

    public void show(String message) {
        show();

        if (TextUtils.isEmpty(message)) {
            mTextView.setText("");
            mTextView.setVisibility(View.GONE);
        } else {
            mTextView.setText(message);
            mTextView.setVisibility(View.VISIBLE);
        }
    }

    @Override
    public void show() {
        try {
            super.show();
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
    }

    @Override
    public boolean isShowing() {
        try {
            return super.isShowing();
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }

        return false;
    }
}

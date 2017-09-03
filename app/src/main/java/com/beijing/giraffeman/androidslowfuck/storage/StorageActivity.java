package com.beijing.giraffeman.androidslowfuck.storage;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.util.PreferenceUtils;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by giraffe on 2017/8/9.
 */

public class StorageActivity extends AppCompatActivity implements View.OnClickListener {

    @BindView(R.id.et_storage_key)
    EditText mKeyText;
    @BindView(R.id.et_storage_value)
    EditText mValueText;

    @BindView(R.id.tv_storage_show)
    TextView mShowText;

    @BindView(R.id.btn_storage_save)
    Button mSaveBtn;
    @BindView(R.id.btn_storage_read)
    Button mReadBtn;
    @BindView(R.id.btn_storage_clear)
    Button mClearBtn;
    @BindView(R.id.btn_storage_size)
    Button mSizeBtn;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_storage);
        ButterKnife.bind(this);

        mSaveBtn.setOnClickListener(this);
        mReadBtn.setOnClickListener(this);
        mClearBtn.setOnClickListener(this);
        mSizeBtn.setOnClickListener(this);

    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.btn_storage_save:
                PreferenceUtils.saveString(this,mKeyText.getText().toString().trim(),mValueText.getText().toString().trim());
                break;
            case R.id.btn_storage_size:
                mShowText.setText(String.valueOf(PreferenceUtils.computeSPFileSize(this,"fuck")));

                break;

        }

    }
}

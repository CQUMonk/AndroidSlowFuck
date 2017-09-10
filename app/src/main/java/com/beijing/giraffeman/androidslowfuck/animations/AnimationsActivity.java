package com.beijing.giraffeman.androidslowfuck.animations;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.animations.ui.DrawableActivity;
import com.beijing.giraffeman.androidslowfuck.widgets.GiraffeLoadingDialog;

import butterknife.BindView;

public class AnimationsActivity extends AppCompatActivity {



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_animations);
    }

    public void drawableAnim(View v){
        startActivity(new Intent(AnimationsActivity.this, DrawableActivity.class));
    }

    public void viewAnim(View view){

    }

    public void propertyAnim(View view){

    }


}

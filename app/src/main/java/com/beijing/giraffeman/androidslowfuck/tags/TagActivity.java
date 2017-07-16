package com.beijing.giraffeman.androidslowfuck.tags;

import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.util.GiraffeCommonUtils;
import com.beijing.giraffeman.androidslowfuck.widgets.GiraffeFlowLayout;
import com.beijing.giraffeman.androidslowfuck.widgets.GiraffeTagLayout;
import com.beijing.giraffeman.androidslowfuck.widgets.TagGroupLayout;
import com.beijing.giraffeman.androidslowfuck.widgets.adapters.TagAdapter;
import com.beijing.giraffeman.androidslowfuck.widgets.adapters.TagGroupAdapter;

import java.util.ArrayList;
import java.util.List;
import java.util.zip.Inflater;

public class TagActivity extends AppCompatActivity {
    private GiraffeTagLayout mTagLayout;
    private List<String> mTags;

    private List<List<String>> mTagGroups;
    private LinearLayout mGroupContainer;

    private TagGroupLayout mTagGroupLayout;

    private LayoutInflater mInflater;


    private TagGroupAdapter<String> mAapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tag);

        mInflater = LayoutInflater.from(this);
        //mTagLayout= (GiraffeTagLayout) findViewById(R.id.gtl_tags_layout);
        mTagLayout= (GiraffeTagLayout) mInflater.inflate(R.layout.group_item,null);

        mTags=generateTags();


        mTagLayout.setAdapter(new TagAdapter<String>(mTags) {
            @Override
            public View getView(GiraffeFlowLayout parent, int position, final String s) {
                TextView tagTextView = (TextView) mInflater.inflate(R.layout.tag_item,
                        mTagLayout, false);
                if (position != 0) {
                    ViewGroup.MarginLayoutParams lp = (ViewGroup.MarginLayoutParams) tagTextView.getLayoutParams();
                    lp.leftMargin = GiraffeCommonUtils.dip2px(TagActivity.this, 10);
                    tagTextView.setLayoutParams(lp);
                }
                tagTextView.setText(s);
                tagTextView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        Toast.makeText(TagActivity.this,s,Toast.LENGTH_SHORT).show();

                    }
                });
                return tagTextView;
            }
        });


        mGroupContainer= (LinearLayout) findViewById(R.id.ll_group_container);
        mTagGroups=generateTagGroups();
/*        ViewGroup.LayoutParams groupParams=new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);

        mTagLayout.setLayoutParams(groupParams);
        mGroupContainer.addView(mTagLayout);*/
        configGroups();


        mTagGroupLayout= (TagGroupLayout) findViewById(R.id.view_tag_group);
        showCustomView();

    }

    @Override
    protected void onResume() {
        super.onResume();


    }

    private List<String> generateTags(){
        ArrayList<String> res=new ArrayList<String>();

        for (int i=0;i<10;i++){
            res.add("天气真热"+i);
        }

        return res;
    }

    private List<List<String>> generateTagGroups(){

        List<List<String>> res=new ArrayList<>();
        for (int i=0;i<2;i++){
            ArrayList<String> group=new ArrayList<String>();
            for (int j=0;j<3;j++){
                group.add("今天下雨"+" "+j);
            }
            res.add(group);
        }
        return res;
    }

    private void configGroups(){
        LinearLayout.LayoutParams groupParams=new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        groupParams.setMargins(0, 0, 20, 0);

        for (List<String> group:mTagGroups){

            final GiraffeTagLayout groupLayout= (GiraffeTagLayout) mInflater.inflate(R.layout.group_item,null);

            groupLayout.setAdapter(new TagAdapter<String>(group) {
                @Override
                public View getView(GiraffeFlowLayout parent, int position, final String s) {
                    TextView tagTextView = (TextView) mInflater.inflate(R.layout.tag_item,
                            null);

                    tagTextView.setText(s);

                    tagTextView.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {

                            Toast.makeText(TagActivity.this,s,Toast.LENGTH_SHORT).show();

                        }
                    });
                    return tagTextView;
                }
            });


            groupLayout.setLayoutParams(groupParams);

            mGroupContainer.addView(groupLayout);



        }
    }

    private void showCustomView(){
        mAapter=new TagGroupAdapter<String>() {
            @Override
            public View getView(GiraffeFlowLayout parent, int row, int col, String s) {
                TextView tagTextView = (TextView) mInflater.inflate(R.layout.tag_item,
                        null);

                tagTextView.setText(s);


                if (isSelected(row,col)){
                    tagTextView.setTextColor(Color.parseColor("#C60A1E"));
                    tagTextView.setBackgroundResource(R.drawable.tag_bg_selected);
                }else {
                    tagTextView.setTextColor(Color.parseColor("#737373"));
                    tagTextView.setBackgroundResource(R.drawable.tag_bg);
                }
                return tagTextView;
            }
        };
        mTagGroupLayout.setAdapter(mAapter);
        mAapter.setDatas(mTagGroups);
        mAapter.notifyDataChanged();

        mTagGroupLayout.setOnTagClickListener(new TagGroupLayout.OnTagClickListener() {
            @Override
            public boolean onTagClick(View view, int row, int col, GiraffeFlowLayout parent) {
                Toast.makeText(TagActivity.this,row+","+col,Toast.LENGTH_SHORT).show();
                mTagGroupLayout.setGroupTagSelected(row,col);

                return true;
            }
        });



    }
}

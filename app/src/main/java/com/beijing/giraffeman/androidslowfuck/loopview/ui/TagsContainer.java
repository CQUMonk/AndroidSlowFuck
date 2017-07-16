package com.beijing.giraffeman.androidslowfuck.loopview.ui;

import android.content.Context;
import android.graphics.Canvas;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.loopview.model.TagInfo;
import com.beijing.giraffeman.androidslowfuck.util.GraffeStringUtils;

import java.util.List;


/**
 * Created by giraffe on 2017/6/26.
 */

public class TagsContainer extends LinearLayout {
    private List<TagInfo> mTags;
    private LayoutInflater mInflater;
    private int containerWidth;
    private int tagMargins=50;
    private int tagRowMargin=20;

    private Context mContext;

    private OnTagTouchedListener mListener;

    public TagsContainer(Context context,List<TagInfo> tags) {
        super(context);
        mTags=tags;
        mInflater= LayoutInflater.from(context);
        mContext=context;
        drawTags();

    }




    public void setOnTagTouchListener(OnTagTouchedListener listener){
        this.mListener=listener;
    }


    private void drawTags(){

        containerWidth=this.getMeasuredWidth()-this.getPaddingRight()-this.getPaddingLeft();
        LinearLayout.LayoutParams itemParmas = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        itemParmas.setMargins(0, 0, tagMargins, 0);
        LinearLayout.LayoutParams lastItemParmas = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        lastItemParmas.setMargins(0, 0, 0, 0);


        LinearLayout.LayoutParams firstRowParmas = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        //第一行
        firstRowParmas.setMargins(0, 0, 0, 0);
        LinearLayout rowLayout = new LinearLayout(mContext);
        rowLayout.setLayoutParams(firstRowParmas);
        rowLayout.setOrientation(LinearLayout.HORIZONTAL);
        this.addView(rowLayout);

        //以后的行
        LinearLayout.LayoutParams rowParmas = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        rowParmas.setMargins(0, tagRowMargin, 0, 0);

        int restSpaceOfLine=containerWidth;

        for (TagInfo tagInfo:mTags){

            TagView tagView=getTagViewFromTagViewInfo(tagInfo);
            if (tagView==null){
                continue;
            }
            int tagAllWidth = tagView.tagWidth + tagMargins;

            if (restSpaceOfLine >= tagAllWidth) {
                rowLayout.addView(tagView.mViewGroup, itemParmas);
                restSpaceOfLine = restSpaceOfLine - tagAllWidth;
            } else if (restSpaceOfLine >= tagView.tagWidth) {
                rowLayout.addView(tagView.mViewGroup, lastItemParmas);
                restSpaceOfLine = 0;
            } else {
                rowLayout = new LinearLayout(mContext);
                rowLayout.setLayoutParams(rowParmas);
                rowLayout.setOrientation(LinearLayout.HORIZONTAL);
                this.addView(rowLayout);
                restSpaceOfLine = containerWidth;
                if (restSpaceOfLine >= tagAllWidth) {
                    rowLayout.addView(tagView.mViewGroup, itemParmas);
                    restSpaceOfLine = restSpaceOfLine - tagAllWidth;
                } else {
                    rowLayout.addView(tagView.mViewGroup, lastItemParmas);
                    restSpaceOfLine = 0;
                }
            }

        }

    }


    /**
     * 获取单个标签的View和实际长度
     *
     * @param
     * @return
     */
    private TagView getTagViewFromTagViewInfo(TagInfo tagInfo) {
        if (tagInfo != null) {

            final LinearLayout tagViewGroup = (LinearLayout) mInflater.inflate(R.layout.tag_item, null);
            TextView tagTextView = (TextView) tagViewGroup.findViewById(R.id.tag_text);

            tagTextView.setText(tagInfo.getTagName());



            float textSize = tagTextView.getTextSize();
            float textScaleX = tagTextView.getTextScaleX();

            TagView tagView = new TagView();
            tagView.mViewGroup=tagViewGroup;

            //TextView 左右边缘空隙
            int itemPadding = tagTextView.getCompoundPaddingRight() + tagTextView.getCompoundPaddingLeft();
            //TextView 宽度
            int tagTextWidth = (int) (GraffeStringUtils.getStringWidth(tagInfo.getTagName(), textSize, textScaleX) + itemPadding + 0.5f);

            //tag本身的宽度

            tagView.tagWidth = tagTextWidth;


            tagViewGroup.setTag(tagInfo);
            tagViewGroup.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    mListener.onTagTouched((TagInfo) tagViewGroup.getTag());
                }
            });


            return tagView;
        }
        return null;
    }
    static class TagView {
        View mViewGroup;
        int tagWidth;
    }
    public interface OnTagTouchedListener{
        void onTagTouched(TagInfo tagInfo);
    }

}

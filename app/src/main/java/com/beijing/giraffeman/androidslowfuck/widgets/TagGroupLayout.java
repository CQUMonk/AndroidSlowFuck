package com.beijing.giraffeman.androidslowfuck.widgets;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.graphics.Point;
import android.graphics.Rect;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.util.GiraffeCommonUtils;
import com.beijing.giraffeman.androidslowfuck.widgets.adapters.TagGroupAdapter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by giraffe on 2017/6/28.
 */

public class TagGroupLayout extends GiraffeFlowLayout implements TagGroupAdapter.OnDataChangedListener {
    private static final String KEY_CHOOSE_POS = "key_choose_pos";
    private static final String KEY_DEFAULT = "key_default";
    //private TagAdapter mTagAdapter;
    private TagGroupAdapter mTagGroupAdapter;

    private boolean mAutoSelectEffect = true;
    private int mSelectedMax = -1;//-1为不限制数量
    private MotionEvent mMotionEvent;
    private Set<String> mSelectedView = new HashSet<String>();

    //private Set<Integer> mRowSelectedView = new HashSet<Integer>();
    //private Set<Integer> mColSelectedView = new HashSet<Integer>();
    private TagGroupLayout.OnSelectListener mOnSelectListener;
    private TagGroupLayout.OnTagClickListener mOnTagClickListener;

    private List<List<TagView>> children = new ArrayList<>();


    public TagGroupLayout(Context context) {
        super(context);
    }

    public TagGroupLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public TagGroupLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        TypedArray ta = context.obtainStyledAttributes(attrs, R.styleable.flowlayout);
        mAutoSelectEffect = ta.getBoolean(R.styleable.flowlayout_flowautoselecteffect, true);
        mSelectedMax = ta.getInt(R.styleable.flowlayout_flowmaxselect, -1);
        ta.recycle();

        if (mAutoSelectEffect) {
            setClickable(true);
        }
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int cCount = getChildCount();

        for (int i = 0; i < cCount; i++) {
            View child = getChildAt(i);
            if (child instanceof TagView) {
                TagView tagView = (TagView) child;
                if (tagView.getVisibility() == View.GONE) continue;
                if (tagView.getTagView().getVisibility() == View.GONE) {
                    tagView.setVisibility(View.GONE);
                }
            }

        }
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    @Override
    public void onChanged() {
        //mRowSelectedView.clear();
        //mColSelectedView.clear();
        mSelectedView.clear();
        changeAdapter();
    }

    public void setOnSelectListener(TagGroupLayout.OnSelectListener onSelectListener) {
        mOnSelectListener = onSelectListener;
        if (mOnSelectListener != null) setClickable(true);
    }

    public void setOnTagClickListener(TagGroupLayout.OnTagClickListener onTagClickListener) {
        mOnTagClickListener = onTagClickListener;
        if (onTagClickListener != null) setClickable(true);
    }

    private void changeAdapter() {
        removeAllViews();
        children.clear();
        TagGroupAdapter adapter = mTagGroupAdapter;
        TagView tagViewContainer = null;
        //HashSet rowChecked = mTagGroupAdapter.getRowSelected();
        //HashSet colChecked = mTagGroupAdapter.getColumnSelected();
        HashSet tagSelected=mTagGroupAdapter.getTagSelectedList();

        // 逐个处理Tag
        for (int i = 0; i < adapter.getGroupCount(); i++) {
            int cntInGroup = adapter.getTagCountOfGroup(adapter.getGroupByIndex(i));
            ArrayList<TagView> tagsInGroup = new ArrayList<>(cntInGroup);
            for (int j = 0; j < cntInGroup; j++) {
                View tagView = adapter.getView(this, i, j, adapter.getItem(i, j));

                tagViewContainer = new TagView(getContext());
                tagView.setDuplicateParentStateEnabled(true);

                if (tagView.getLayoutParams() != null) {
                    tagViewContainer.setLayoutParams(tagView.getLayoutParams());
                } else {
                    ViewGroup.MarginLayoutParams lp = new ViewGroup.MarginLayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
                    lp.setMargins(GiraffeCommonUtils.dip2px(getContext(), 5),
                            GiraffeCommonUtils.dip2px(getContext(), 5),
                            GiraffeCommonUtils.dip2px(getContext(), 5),
                            GiraffeCommonUtils.dip2px(getContext(), 5));
                    tagViewContainer.setLayoutParams(lp);
                }
                tagViewContainer.addView(tagView);
                addView(tagViewContainer);
                tagsInGroup.add(tagViewContainer);

                //处理选中
                if (tagSelected.contains(i+","+j)) {
                    tagViewContainer.setChecked(true);
                }
                if (mTagGroupAdapter.setSelected(i, j, mTagGroupAdapter.getItem(i, j))) {
                    mSelectedView.add(i+","+j);
                    tagViewContainer.setChecked(true);
                }

            }
            children.add(tagsInGroup);
            if (cntInGroup>0&&i<adapter.getGroupCount()-1){
                //加Spliter
                TagView splitContainer = new TagView(getContext());
                View split = new View(getContext());
                split.setDuplicateParentStateEnabled(true);
                split.setBackgroundColor(Color.parseColor("#EEEEEE"));
                ViewGroup.MarginLayoutParams lp = new ViewGroup.MarginLayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
                lp.setMargins(0, GiraffeCommonUtils.dip2px(getContext(), 15),
                        0, GiraffeCommonUtils.dip2px(getContext(), 15));
                lp.height = 1;
                splitContainer.setLayoutParams(lp);
                split.setTag("split");

                splitContainer.addView(split);
                addView(splitContainer);
            }



        }

        mSelectedView.addAll(tagSelected);

    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if (event.getAction() == MotionEvent.ACTION_UP) {
            mMotionEvent = MotionEvent.obtain(event);
        }
        return super.onTouchEvent(event);
    }

    @Override
    public boolean performClick() {
        if (mMotionEvent == null) return super.performClick();

        int x = (int) mMotionEvent.getX();
        int y = (int) mMotionEvent.getY();
        mMotionEvent = null;

        TagView child = findChild(x, y);
        //int pos = findPosByView(child);
        Point pos = findPositionByView(child);
        if (child != null) {
            //doSelect(child, pos);
            if (mOnTagClickListener != null) {
                return mOnTagClickListener.onTagClick(child.getTagView(), pos.x, pos.y, this);
            }
        }
        return true;
    }

/*    private void doSelect(TagView child, int position) {
        if (mAutoSelectEffect) {
            if (!child.isChecked()) {
                //处理max_select=1的情况
                if (mSelectedMax == 1 && mSelectedView.size() == 1) {
                    Iterator<Integer> iterator = mSelectedView.iterator();
                    Integer preIndex = iterator.next();
                    TagView pre = (TagView) getChildAt(preIndex);
                    pre.setChecked(false);
                    child.setChecked(true);
                    mSelectedView.remove(preIndex);
                    mSelectedView.add(position);
                } else {
                    if (mSelectedMax > 0 && mSelectedView.size() >= mSelectedMax)
                        return;
                    child.setChecked(true);
                    mSelectedView.add(position);
                }
            } else {
                child.setChecked(false);
                mSelectedView.remove(position);
            }
            if (mOnSelectListener != null) {
                mOnSelectListener.onSelected(new HashSet<Integer>(mSelectedView));
            }
        }
    }*/

    public TagGroupAdapter getAdapter() {
        return mTagGroupAdapter;
    }

    public void setAdapter(TagGroupAdapter adapter) {
        mTagGroupAdapter = adapter;
        mTagGroupAdapter.setOnDataChangedListener(this);
        mSelectedView.clear();
        changeAdapter();
    }






    private int findPosByView(View child) {
        final int cCount = getChildCount();
        for (int i = 0; i < cCount; i++) {
            View v = getChildAt(i);
            if (v == child) return i;
        }
        return -1;
    }

    private Point findPositionByView(View child) {
        Point pos = new Point();

        for (int i = 0; i < children.size(); ++i) {
            List<TagView> group = children.get(i);

            for (int j = 0; j < group.size(); j++) {
                View tag = group.get(j);
                if (tag == child) {
                    pos.x = i;
                    pos.y = j;
                    return pos;

                } else {
                    pos.x = -1;
                    pos.y = -1;
                }
            }
        }
        return pos;
    }

    private TagView findChild(int x, int y) {
        final int cCount = getChildCount();

        for (int i = 0; i < cCount; i++) {

            if (getChildAt(i) instanceof TagView) {
                TagView v = (TagView) getChildAt(i);
                if (v.getVisibility() == View.GONE) continue;
                Rect outRect = new Rect();
                v.getHitRect(outRect);
                if (outRect.contains(x, y)) {
                    return v;
                }

            }
        }
        return null;
    }
    public boolean isTagSelected(int i,int j){
        return this.mTagGroupAdapter.isSelected(i,j);
    }
    public void setTagSelected(int i,int j){
        this.mTagGroupAdapter.setTagSelected(i,j);
    }
    public void setTagUnselected(int i,int j){
        this.mTagGroupAdapter.setTagUnSelected(i,j);
    }

    public void setGroupTagSelected(int i,int j){
        this.mTagGroupAdapter.setGroupTagSelected(i,j);
    }

    public interface OnSelectListener {
        void onSelected(Set<Integer> rowSelectSet, Set<Integer> colSelectSet);
    }

    public interface OnTagClickListener {
        boolean onTagClick(View view, int row, int col, GiraffeFlowLayout parent);
    }
}
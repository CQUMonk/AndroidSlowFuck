package com.beijing.giraffeman.androidslowfuck.widgets.adapters;

import android.view.View;

import com.beijing.giraffeman.androidslowfuck.widgets.GiraffeFlowLayout;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by giraffe on 2017/6/26.
 */

public abstract class TagAdapter<T> {

    private List<T> mTagDatas;

    private HashSet<Integer> mCheckedPosList = new HashSet<Integer>();

    private TagAdapter.OnDataChangedListener mOnDataChangedListener;


    public TagAdapter(List<T> datas) {
        mTagDatas = datas;
    }

    public TagAdapter(T[] datas) {
        mTagDatas = new ArrayList<T>(Arrays.asList(datas));
    }



    public void setOnDataChangedListener(TagAdapter.OnDataChangedListener listener) {
        mOnDataChangedListener = listener;
    }
    public void setSelectedList(Set<Integer> set) {
        mCheckedPosList.clear();
        if (set != null)
            mCheckedPosList.addAll(set);
        notifyDataChanged();
    }
    public void setSelectedList(int... poses) {
        Set<Integer> set = new HashSet<>();
        for (int pos : poses)
        {
            set.add(pos);
        }
        setSelectedList(set);
    }

    public void notifyDataChanged() {
        if(mOnDataChangedListener != null)
            mOnDataChangedListener.onChanged();
    }
    public int getCount() {
        return mTagDatas == null ? 0 : mTagDatas.size();
    }
    public HashSet<Integer> getPreCheckedList() {
        return mCheckedPosList;
    }

    public T getItem(int position) {
        return mTagDatas.get(position);
    }

    public abstract View getView(GiraffeFlowLayout parent, int position, T t);

    public boolean setSelected(int position, T t) {
        return false;
    }




    public interface OnDataChangedListener {
        void onChanged();
    }

}

package com.beijing.giraffeman.androidslowfuck.widgets.adapters;

import android.view.View;

import com.beijing.giraffeman.androidslowfuck.widgets.GiraffeFlowLayout;

import java.util.HashSet;
import java.util.List;

/**
 * Created by giraffe on 2017/6/28.
 */

public abstract class TagGroupAdapter<T> {


    private List<List<T>> mTagGroupDatas;



    //protected HashSet<Integer> rowSelected = new HashSet<Integer>();
    //protected HashSet<Integer> columnSelected = new HashSet<Integer>();

    protected HashSet<String> mTagSelectedList=new HashSet<>();



    private TagGroupAdapter.OnDataChangedListener mOnDataChangedListener;


    public TagGroupAdapter(List<List<T>> datas) {
        mTagGroupDatas = datas;
    }

    public TagGroupAdapter(){

    }




    public void setOnDataChangedListener(TagGroupAdapter.OnDataChangedListener listener) {
        mOnDataChangedListener = listener;
    }


    public void setTagSelected(int i, int j) {
        //rowSelected.add(i);
        //columnSelected.add(j);
        mTagSelectedList.add(i+","+j);
        notifyDataChanged();
    }
    public void setTagUnSelected(int i, int j){
        if (isSelected(i,j)){
            //columnSelected.remove(j);
            mTagSelectedList.remove(i+","+j);
            notifyDataChanged();
        }
    }
    public void setGroupTagSelected(int i,int j){
        for (int elemI=0;elemI<getTagCountOfGroup(mTagGroupDatas.get(i));elemI++){
            mTagSelectedList.remove(i+","+elemI);
        }
        setTagSelected(i,j);
        notifyDataChanged();
    }


    public boolean isSelected(int row, int col){
        return mTagSelectedList.contains(row + "," + col);
    }

    public void notifyDataChanged() {
        if (mOnDataChangedListener != null)
            mOnDataChangedListener.onChanged();
    }

    public int getCount() {
        int cnt = 0;
        if (mTagGroupDatas != null) {
            for (int i = 0; i < mTagGroupDatas.size(); ++i) {
                cnt += getTagCountOfGroup(mTagGroupDatas.get(0));
            }
        }
        return cnt;
    }

    public int getTagCountOfGroup(List<T> group) {
        return group == null ? 0 : group.size();
    }




    public T getItem(int i, int j) {
        return mTagGroupDatas.get(i).get(j);
    }

    public abstract View getView(GiraffeFlowLayout parent, int row, int col, T t);

    public boolean setSelected(int i, int j, T t) {
        return false;
    }

    public int getGroupCount() {
        return mTagGroupDatas == null ? 0 : mTagGroupDatas.size();
    }

    public List<T> getGroupByIndex(int i){
        return this.mTagGroupDatas.get(i);
    }

    public HashSet<String> getTagSelectedList(){
        return mTagSelectedList;
    }

    public interface OnDataChangedListener {
        void onChanged();
    }

    public void setDatas(List<List<T>> datas){
        mTagGroupDatas=datas;
        notifyDataChanged();
    }
}

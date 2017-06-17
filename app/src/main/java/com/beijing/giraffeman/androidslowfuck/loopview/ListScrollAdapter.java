package com.beijing.giraffeman.androidslowfuck.loopview;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.loopview.model.ScrollListItem;

import java.util.List;

/**
 * Created by giraffe on 2017/6/14.
 */

public class ListScrollAdapter extends BaseAdapter {
    private Context mContext;
    private List<ScrollListItem> mDas;
    private LayoutInflater mInflater;

    public ListScrollAdapter(Context mContext, List<ScrollListItem> mDas) {
        this.mContext = mContext;
        this.mDas = mDas;
        mInflater=LayoutInflater.from(mContext);
    }

    @Override
    public int getCount() {
        return mDas.size();
    }

    @Override
    public Object getItem(int i) {
        return mDas.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        ViewHolder viewHolder=null;
        if (view==null){
            viewHolder=new ViewHolder();
            view=mInflater.inflate(R.layout.auto_scroll_item,null);
            viewHolder.icon= (ImageView) view.findViewById(R.id.img_scroll_icon);
            viewHolder.name= (TextView) view.findViewById(R.id.tv_scroll_name);
            viewHolder.date= (TextView) view.findViewById(R.id.tv_scroll_date);
            viewHolder.words= (TextView) view.findViewById(R.id.tv_scroll_words);
            view.setTag(viewHolder);
        }else {
            viewHolder= (ViewHolder) view.getTag();
        }
        viewHolder.icon.setImageResource(R.drawable.dengliao);
        viewHolder.name.setText(mDas.get(i).getName());
        viewHolder.date.setText(mDas.get(i).getDate());
        viewHolder.words.setText(mDas.get(i).getWords());
        return view;
    }
}
final class ViewHolder {
    ImageView icon;
    TextView name;
    TextView date;
    TextView words;
}

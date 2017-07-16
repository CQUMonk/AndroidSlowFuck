package com.beijing.giraffeman.androidslowfuck.loopview.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.loopview.model.ScrollListItem;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by giraffe on 2017/6/14.
 */

public class RecyclerScrollAdapter extends RecyclerView.Adapter<RecyclerScrollAdapter.ScrollItemHolder> {

    private LayoutInflater inflater;
    private Context context;
    private List<ScrollListItem> mDas;
    private String mDate;

    public RecyclerScrollAdapter(Context context, List<ScrollListItem> mDas) {
        this.context = context;
        this.mDas = mDas;
        this.inflater = LayoutInflater.from(context);
    }

    @Override
    public ScrollItemHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new ScrollItemHolder(this.inflater.inflate(R.layout.auto_scroll_item,parent,false));
    }

    @Override
    public void onBindViewHolder(ScrollItemHolder viewHolder, int i) {

        viewHolder.icon.setImageResource(R.drawable.dengliao);
        viewHolder.name.setText(mDas.get(i).getName());
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date date = simpleDateFormat.parse("2016-11-13 23:59:31");
            viewHolder.date.setText((new Date().getTime()-date.getTime())+"");
        } catch (ParseException e) {
            e.printStackTrace();
        }

        mDate=mDas.get(i).getDate();
        //viewHolder.date.setText(mDas.get(i).getDate());
        viewHolder.words.setText(mDas.get(i).getWords());

        viewHolder.words.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d("recyclerView",mDate);
            }
        });


    }

    @Override
    public int getItemCount() {
        return mDas.size();
    }

    public static class ScrollItemHolder extends RecyclerView.ViewHolder{

        @BindView(R.id.img_scroll_icon)
        ImageView icon;

        @BindView(R.id.tv_scroll_name)
        TextView name;

        @BindView(R.id.tv_scroll_date)
        TextView date;

        @BindView(R.id.tv_scroll_words)
        TextView words;

        public ScrollItemHolder(View itemView) {
            super(itemView);
            ButterKnife.bind(this,itemView);

        }

    }
}

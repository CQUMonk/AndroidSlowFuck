package com.beijing.giraffeman.androidslowfuck.adapter;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.model.NavigatorItem;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by giraffe on 2017/4/8.
 */

public class MainPageRecyclerViewAdapter extends RecyclerView.Adapter<MainPageRecyclerViewAdapter.MainItemViewHolder>{
    private LayoutInflater inflater;
    private Context context;
    private List<NavigatorItem> items;


    public MainPageRecyclerViewAdapter(Context context, List<NavigatorItem> modules) {
        this.inflater = LayoutInflater.from(context);
        this.context = context;
        this.items = modules;
    }

    @Override
    public MainItemViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new MainItemViewHolder(this.inflater.inflate(R.layout.item_main_navigator,parent,false));
    }

    @Override
    public void onBindViewHolder(MainItemViewHolder holder, final int position) {
        holder.textView.setText(items.get(position).ModuleName);
        holder.imageView.setImageDrawable(items.get(position).Pic);
        holder.cardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(context,items.get(position).ModuleClass);
                context.startActivity(intent);
            }
        });

    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    public static class MainItemViewHolder extends RecyclerView.ViewHolder{
        @BindView(R.id.cv_item_navigator)
        CardView cardView;
        @BindView(R.id.iv_item_navigator)
        ImageView imageView;
        @BindView(R.id.tv_item_navigator)
        TextView textView;

        public MainItemViewHolder(View itemView) {
            super(itemView);
            ButterKnife.bind(this,itemView);
        }
    }
}

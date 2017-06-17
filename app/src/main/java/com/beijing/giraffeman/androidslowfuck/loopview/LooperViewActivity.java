package com.beijing.giraffeman.androidslowfuck.loopview;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.view.animation.AccelerateDecelerateInterpolator;

import com.beijing.giraffeman.androidslowfuck.R;
import com.beijing.giraffeman.androidslowfuck.loopview.adapter.RecyclerScrollAdapter;
import com.beijing.giraffeman.androidslowfuck.loopview.model.ScrollListItem;
import com.beijing.giraffeman.androidslowfuck.util.GiraffeCommonUtils;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class LooperViewActivity extends AppCompatActivity {
    private final String longWords = "一颗葡萄有多甜美 用尽了所有的 图腾和语言 描写" +
            "想一个人有多想念 那又是文字失效瞬间" +
            "结一个纪念的绳结 记录你离去后 万语和千言 瓦解" +
            "升起了慌张的狼烟 我遗落在最孤独史前 的荒野" +
            "多遥远 多纠结 多想念 多无法描写 疼痛 和疯癫 你都看不见" +
            "想穿越 想飞天 想变成 造字的仓颉 写出 能让你快回来 的诗篇" +
            "一只蝴蝶有多鲜艳 能不能飞越过 猜忌和冷漠 世界";
    private final String shortWords = "今天真热";
    @BindView(R.id.lv_loop)
    RecyclerView recyclerView;
    private List<ScrollListItem> data;
    private int index = 0;
    private LinearLayoutManager manager;
    private AccelerateDecelerateInterpolator mDecelerateInterpolator;

    private RecyclerScrollAdapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_looper_view);
        ButterKnife.bind(this);


        initDas();

        mDecelerateInterpolator = new AccelerateDecelerateInterpolator();


    }

    private void initDas() {




        data = new ArrayList<>(10);
        for (int i = 0; i < 10; ++i) {
            if (i % 2 == 0) {
                data.add(new ScrollListItem("李摸摸", 1 + i + "", shortWords));
            } else {
                data.add(new ScrollListItem("李不摸", 1 + i + "", longWords));
            }
        }

        manager = new LinearLayoutManager(this);
        //manager=new ScrollLayoutManager(this);

        recyclerView.setLayoutManager(manager);
        mAdapter = new RecyclerScrollAdapter(this, data);
        recyclerView.setAdapter(mAdapter);


    }

    private ArrayList<ScrollListItem> generateData() {
        ArrayList<ScrollListItem> res = new ArrayList<>(20);
        for (int i = 0; i < 20; i++) {
            if (i % 2 == 0) {
                res.add(new ScrollListItem("AAA", 1 + i + "", shortWords));
            } else {
                res.add(new ScrollListItem("BBB", 1 + i + "", longWords));
            }
        }

        return res;
    }

    @Override
    protected void onResume() {
        super.onResume();

        //scrollItemAutoly();


        autoScroll();
    }


    private void autoScroll() {
        GiraffeCommonUtils.runInUIThread(new Runnable() {
            @Override
            public void run() {
                scrollToNextItem();
                autoScroll();
            }
        }, 3000);


    }

    /**
     * 滑动到下一个Item
     */

    private void scrollToNextItem() {
        if (index >= data.size() - 2) {
            index = 0;
            recyclerView.scrollToPosition(0);
        }
        int nextViewIndex = manager.findFirstCompletelyVisibleItemPosition();
        View nextItem = manager.findViewByPosition(nextViewIndex);

        index = nextViewIndex;


        if (nextItem != null) {
            float offset = nextItem.getTop();
            recyclerView.smoothScrollBy(0, (int) offset + nextItem.getHeight(), mDecelerateInterpolator);
        }

    }

    public void addItems(View view) {
        int pos = data.size();
        data.addAll(pos, generateData());
        mAdapter.notifyItemInserted(pos);


    }

    public void deleteItems(View view) {

        data.remove(0);
        mAdapter.notifyItemRemoved(0);


    }
}

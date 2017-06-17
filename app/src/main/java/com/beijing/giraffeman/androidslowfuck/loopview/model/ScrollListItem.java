package com.beijing.giraffeman.androidslowfuck.loopview.model;

/**
 * Created by giraffe on 2017/6/14.
 */

public class ScrollListItem {

    private String name;
    private String date;
    private String words;

    public ScrollListItem(String name, String date, String words) {
        this.name = name;
        this.date = date;
        this.words = words;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getWords() {
        return words;
    }

    public void setWords(String words) {
        this.words = words;
    }
}

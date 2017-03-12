package com.beijing.giraffeman.androidslowfuck.model;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by giraffe on 2017/3/6.
 */

public class Book implements Parcelable {
    private int bookId;
    private String bookName;

    public Book(int id,String name){
        this.bookId=id;
        this.bookName=name;
    }

    private Book(Parcel in) {
        bookId = in.readInt();
        bookName = in.readString();
    }

    public static final Creator<Book> CREATOR = new Creator<Book>() {
        @Override
        public Book createFromParcel(Parcel in) {
            return new Book(in);
        }

        @Override
        public Book[] newArray(int size) {
            return new Book[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeInt(bookId);
        parcel.writeString(bookName);
    }
}

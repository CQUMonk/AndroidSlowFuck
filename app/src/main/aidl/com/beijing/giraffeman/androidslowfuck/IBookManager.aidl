// IBookManager.aidl
package com.beijing.giraffeman.androidslowfuck;

// Declare any non-default types here with import statements
import com.beijing.giraffeman.androidslowfuck.model.Book;
import com.beijing.giraffeman.androidslowfuck.IOnNewBookArrivedListener;
interface IBookManager {
    List<Book> getBookList();
    void addBook(in Book book);
    void registerListener(IOnNewBookArrivedListener listener);
    void unregisterListnener(IOnNewBookArrivedListener listener);
}

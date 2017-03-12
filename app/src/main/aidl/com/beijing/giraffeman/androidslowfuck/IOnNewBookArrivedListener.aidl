// IOnNewBookArrivedListener.aidl
package com.beijing.giraffeman.androidslowfuck;

// Declare any non-default types here with import statements
import com.beijing.giraffeman.androidslowfuck.model.Book;
interface IOnNewBookArrivedListener {
    /**
     * Demonstrates some basic types that you can use as parameters
     * and return values in AIDL.
     */
    void onNewBookArrived(in Book book);
}

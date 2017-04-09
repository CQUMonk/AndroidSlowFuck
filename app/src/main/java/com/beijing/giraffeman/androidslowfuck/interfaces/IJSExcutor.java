package com.beijing.giraffeman.androidslowfuck.interfaces;

/**
 * Created by giraffe on 2017/4/5.
 */

public interface IJSExcutor {
    void handlePublish(String event, String params, String callbackId);

    void handleInvoke(String event, String params, int callbackId);
}

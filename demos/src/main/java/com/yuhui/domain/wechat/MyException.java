package com.yuhui.domain.wechat;


public class MyException extends  RuntimeException {

    public MyException(String errCode, String errMsg) {
        this.errCode = errCode;
        this.errMsg = errMsg;
    }

    private String errCode;
    private String errMsg;
}

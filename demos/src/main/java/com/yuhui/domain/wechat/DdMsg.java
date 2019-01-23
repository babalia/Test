package com.yuhui.domain.wechat;

/**
 * @Author: cm
 * @Date: 2019/1/23 11:37
 * @Version 1.0
 */
public class DdMsg {

    private String msgtype;
    private Text text;

    public String getMsgtype() {
        return msgtype;
    }

    public void setMsgtype(String msgtype) {
        this.msgtype = msgtype;
    }

    public Text getText() {
        return text;
    }

    public void setText(Text text) {
        this.text = text;
    }
}

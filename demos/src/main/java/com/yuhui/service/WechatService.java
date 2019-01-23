package com.yuhui.service;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface WechatService {

    public Map<String,Object> chechWechat(HttpServletRequest request);
}

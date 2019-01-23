package com.yuhui.timedTask;

import com.yuhui.domain.wechat.AccessToken;
import com.yuhui.util.WechatUtil;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class GroupHailTask {

    @Scheduled(cron = "0 0 12 * * ?")
     public void sendMessage(){
         try {
             AccessToken token = WechatUtil.getAccessToken();


             WechatUtil.doGetStr("");
         } catch (IOException e) {
             e.printStackTrace();
         }
     }
}

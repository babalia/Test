package com.yuhui.controller;

import com.yuhui.domain.wechat.DdMsg;
import com.yuhui.domain.wechat.Text;
import com.yuhui.util.WechatUtil;
import net.sf.json.JSONObject;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WechatTest {

    public static void main(String[] args) throws IOException, NoSuchAlgorithmException, NoSuchProviderException, KeyManagementException {

       // AccessToken token = WechatUtil.getAccessToken();
        String WX_URL = "https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2?access_token=ACCESS_TOKEN";

       // System.out.println("票据"+token.getToken());
       // System.out.println("有效时间"+token.getExpiresIn());

        Map<String,Object> map = new HashMap<>();

        map.put("agent_id",218565531);

        List<String> userList = new ArrayList<>();

        userList.add("manager8640");

        map.put("userid_list","manager8640");

        DdMsg ddMsg = new DdMsg();

        ddMsg.setMsgtype("text");

        ddMsg.setText(new Text());

        ddMsg.getText().setContent("测试消息");

        map.put("msg",ddMsg);


        String message = JSONObject.fromObject(map).toString();

        String assToken = WechatUtil.getDdAccessToken();

        String sendUrl  = WX_URL.replace("ACCESS_TOKEN",assToken);

        JSONObject jsonObject = WechatUtil.doPostStr(sendUrl,message);

        System.out.println(jsonObject.get("userIds").toString());

        /*String path = "C:/Users/adagd/Pictures/Saved Pictures/1.jpg";
        String mediaId = WechatUtil.upload(path, token.getToken(), "thumb");
        System.out.println(mediaId);*/

        /*MessageGroup group = new MessageGroup();
        group.setThumb_media_id("5JKit4ySRcnBi99qYbqLQ2_rYHTlJZTiWljjXsTOC0UUant_RR4rLvQNC_xMwCev");
        group.setTitle("测试");
        group.setContent("111");

        Articles articles = new Articles();
        articles.setArticles(new MessageGroup[]{group});


        String message = JSONObject.fromObject(articles).toString();

        String medId = WechatUtil.uploadNews(token.getToken(),message);
        System.out.println(medId);*/
       /* Map<String,Object> mapAll = new HashMap<String,Object>();

        mapAll.put("is_to_all",true);



        Map<String,Object> map = new HashMap<String,Object>();
        map.put("filter",mapAll);
        Map<String,Object> data = new HashMap<String,Object>();
        data.put("media_id","kxo7vpwx-oZGpzFk9_f1V13wtU1cT0jzRjwS5MPqwJE8lB5WkKfHWYTb1pp2S_aB");
        map.put("mpnews",data);
        map.put("msgtype","mpnews");
        map.put("send_ignore_reprint",0);
        String message = JSONObject.fromObject(map).toString();

        int i = WechatUtil.sendGroupMessage(token.getToken(),message);
        System.out.println(i);*/
    }


}

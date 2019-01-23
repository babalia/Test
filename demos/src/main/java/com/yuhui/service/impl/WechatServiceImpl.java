package com.yuhui.service.impl;

import com.yuhui.service.WechatService;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class WechatServiceImpl implements WechatService {
    @Override
    public Map<String, Object> chechWechat(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        String signature = request.getParameter("signature");
        String timestamp = request.getParameter("timestamp");
        String nonce = request.getParameter("nonce");
        String echostr = request.getParameter("echostr");

        map.put("echostr", echostr);

        String[] arr = new String[]{"dghz",timestamp,nonce};

        Arrays.sort(arr);

        //生成字符串
        StringBuffer content = new StringBuffer();
        for(int i=0;i<arr.length;i++){
            content.append(arr[i]);
        }


        //sha1加密
        String temp = getSha1(content.toString());

        map.put("success", temp.equals(signature));
        
        return map;
    }



    /**
     * Sha1加密方法
     * @param str
     * @return
     */
    public static String getSha1(String str) {
        if (str == null || str.length() == 0) {
            return null;
        }
        char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'a', 'b', 'c', 'd', 'e', 'f' };

        try {
            MessageDigest mdTemp = MessageDigest.getInstance("SHA1");
            mdTemp.update(str.getBytes("UTF-8"));

            byte[] md = mdTemp.digest();
            int j = md.length;
            char buf[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                buf[k++] = hexDigits[byte0 >>> 4 & 0xf];
                buf[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(buf);
        } catch (Exception e) {
            return null;
        }
    }
}

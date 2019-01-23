package com.yuhui.controller;

import com.yuhui.domain.user.User;
import com.yuhui.service.impl.WechatServiceImpl;
import com.yuhui.util.MD5;
import com.yuhui.util.MessageUtil;
import com.yuhui.util.WechatUtil;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.dom4j.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

@Controller
@RequestMapping("wechat")
public class WechatController {
 private static Logger logger = Logger.getLogger(WechatController.class);
    @Autowired
    private WechatServiceImpl wechatServiceImpl;

    /**
     * 微信请求认证
     * @param request
     * @param response
     */
    @GetMapping("wechat")
    public void chechWechat(HttpServletRequest request, HttpServletResponse response){
        Map<String, Object> data = wechatServiceImpl.chechWechat(request);

        String echsotr=data.get("echostr").toString();
        PrintWriter out = null;
        try {
            out = response.getWriter();
            if((boolean)data.get("success")){
                out.print(echsotr);
            }else {
                logger.error("不是微信请求!!");

            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            out.close();
        }


    }



    /**
     * 接收微信事件
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    @PostMapping("wechat")
    public void doPost(HttpServletRequest request,HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        String message = null;
        PrintWriter out = null;

        try {
            out = response.getWriter();
            Map<String, String> map  = MessageUtil.xmlToMap(request);

            //WXBizMsgCrypt wxBizMsgCrypt = new WXBizMsgCrypt();
            String fromUserName = map.get("FromUserName");
            String toUserName = map.get("ToUserName");
            String msgType = map.get("MsgType");
            String content = map.get("Content");
            String event = map.get("Event");
            String eventKey = map.get("EventKey");
            String nonce = map.get("nonce");

            //wxBizMsgCrypt.decryptMsg("","",nonce,content);


            //文本消息
            if(MessageUtil.MESSAGE_TEXT.equals(msgType)){

                switch (content) {
                    case "1":
                        message = MessageUtil.initText(toUserName, fromUserName, "1你妈个头");


                        break;
                    case "2":
                        message = MessageUtil.initNewsMessage(toUserName, fromUserName);
                        break;
                    default:
                        message = MessageUtil.initText(toUserName, fromUserName, "你好");
                        break;
                }
                //click事件
            }else if(MessageUtil.MESSAGE_EVNET.equals(msgType)){
                 //关注事件
                 if(event.equals(MessageUtil.MESSAGE_SUBSCRIBE)){
                      message = MessageUtil.initText(toUserName,fromUserName,"帅哥美女都关注本订阅号啦！！！");
                 }else if(eventKey.equals("11")){
                    message = MessageUtil.initNewsMessage(toUserName,fromUserName);
                 }else if(event.equals(MessageUtil.MESSAGE_LOCATION)){
                     System.out.println();
                 }
            }
            System.out.println(message);
            out.print(message);
        } catch (IOException | DocumentException e) {
            e.printStackTrace();
        } finally {
            out.close();
        }



    }


    @GetMapping("/logout")
    public String logout() {
        Subject subject = SecurityUtils.getSubject();

        subject.logout();

        return "thymeleaf/login";
    }

    @GetMapping(value = "/login")
    public String listUI(){

         return "thymeleaf/login";
    }


    @PostMapping("/login")
    @ResponseBody
    public Map<String, Object> login(String username, String password) {
        // 密码MD5加密
        Map<String, Object> map= new HashMap<>();
        password = MD5.getMD5Str(password);
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        // 获取Subject对象
        Subject subject = SecurityUtils.getSubject();
        map.put("code",0);
        subject.login(token);



        return map;
        //try {

        /*    return ResponseBo.ok();
        } catch (UnknownAccountException e) {
            return ResponseBo.error(e.getMessage());
        } catch (IncorrectCredentialsException e) {
            return ResponseBo.error(e.getMessage());
        } catch (LockedAccountException e) {
            return ResponseBo.error(e.getMessage());
        } catch (AuthenticationException e) {
            return ResponseBo.error("认证失败！");
        }
    */
    }

    @RequestMapping("/index")
    public String index(Model model) {
        // 登录成后，即可通过Subject获取登录的用户信息
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        model.addAttribute("user", user);
        return "thymeleaf/index";
    }

    @RequestMapping("/vueUI")
    public String vueUI() {

        return "thymeleaf/vuetest";
    }

    /**
     * 微信小程序获取用户openid
     * @param code
     * @return
     * @throws IOException
     */
    @GetMapping(value = "getWxOpenId")
    @ResponseBody
    public Map<String,Object> getWxOpenId(String code) throws IOException {
        Map<String,Object> map = new HashMap<>();

            String WX_URL = "https://api.weixin.qq.com/sns/jscode2session?appid=wxd6bd5fd8a7d27db5&secret=a3a61d5fe7dda8709c75168fefe52d10&js_code="+code+"&grant_type=authorization_code";




        JSONObject jsonObject = WechatUtil.doGetStr(WX_URL);

        System.out.println(jsonObject.get("openid").toString());

        map.put("openId",jsonObject.get("openid").toString());

        return map;
    }

    /**
     * 钉钉获取access_token
     * @param code
     * @return
     * @throws IOException
     */
    @GetMapping(value = "getDdOpenId")
    @ResponseBody
    public Map<String,Object> getDdOpenId(String code) throws IOException {
        Map<String,Object> map = new HashMap<>();

        String WX_URL = "https://oapi.dingtalk.com/gettoken?appkey=dingwsiujljqqjafzsqa&appsecret=d6kPlwFWOU0m27VTcJjye-keIBSilm7v_biUBinin2cBTm5YpypcjQKvpcGblkkp";




        JSONObject jsonObject = WechatUtil.doGetStr(WX_URL);

        System.out.println(jsonObject.get("access_token").toString());

        map.put("openId",jsonObject.get("access_token").toString());

        return map;
    }



    /**
     * 钉钉获取免登用户ID
     * @param accessToken
     * @return
     * @throws IOException
     */
    @GetMapping(value = "getDdAuthUserId")
    @ResponseBody
    public Map<String,Object> getDdAuthUserId(String accessToken,String authCode) throws IOException {
        Map<String,Object> map = new HashMap<>();

        String WX_URL = "https://oapi.dingtalk.com/user/getuserinfo?access_token="+accessToken+"&code="+authCode;




        JSONObject jsonObject = WechatUtil.doGetStr(WX_URL);

        System.out.println(jsonObject.get("userid").toString());

        map.put("userid",jsonObject.get("userid").toString());

        return map;
    }

    /**
     * 钉钉获取免登用户ID
     * @param accessToken
     * @return
     * @throws IOException
     */
    @GetMapping(value = "ddSendMsg")
    @ResponseBody
    public Map<String,Object> ddSendMsg(String accessToken,String authCode) throws IOException {
        Map<String,Object> map = new HashMap<>();

        String WX_URL = "https://oapi.dingtalk.com/user/getDeptMember?access_token=ACCESS_TOKEN&deptId=1";

        map.put("agent_id","218565531");

        List<String> userList = new ArrayList<>();

        userList.add("");

        String assToken = WechatUtil.getDdAccessToken();

        String sendUrl  = WX_URL.replace("ACCESS_TOKEN",assToken);

        JSONObject jsonObject = WechatUtil.doGetStr(sendUrl);

        System.out.println(jsonObject.get("userIds").toString());

        map.put("userid",jsonObject.get("userIds").toString());

        return map;
    }
}

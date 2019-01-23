package com.yuhui.util;

import com.yuhui.domain.wechat.*;
import net.sf.json.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;

public class WechatUtil {

    private static final String APPID = "wxcb14935ccc7f9647";
    private static final String APPSECRET = "e5ec5c3684e16f6902f88a65a438d548";

    private static final String ACCESS_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";

    private static final String UPLOAD_URL = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE";

    private static final String CREATE_MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN";

    private static final String QUERY_MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/get?access_token=ACCESS_TOKEN";

    private static final String DELETE_MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=ACCESS_TOKEN";

    private static final String GROUP_SEND_URL = "https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=ACCESS_TOKEN";

    private static final  String GET_OPENID_URL = "https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN";

    private static final String UPLOADNEWS_URL = "https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=ACCESS_TOKEN";

    private static final String SENDALL_URL =  "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN";
    /**
     * get请求
     * @param url
     * @return
     * @throws ParseException
     * @throws IOException
     */
    public static JSONObject doGetStr(String url) throws ParseException, IOException{
        CloseableHttpClient client = HttpClients.createDefault();

        HttpGet httpGet = new HttpGet(url);
        JSONObject jsonObject = null;
        CloseableHttpResponse response = client.execute(httpGet);
        HttpEntity entity = response.getEntity();

        if(entity != null){
            String result = EntityUtils.toString(entity,"UTF-8");
            jsonObject = JSONObject.fromObject(result);
        }
        return jsonObject;
    }

    /**
     * POST请求
     * @param url
     * @param outStr
     * @return
     * @throws ParseException
     * @throws IOException
     */
    public static JSONObject doPostStr(String url,String outStr) throws ParseException, IOException {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpost = new HttpPost(url);
        JSONObject jsonObject = null;
        httpost.setEntity(new StringEntity(outStr,"UTF-8"));
        CloseableHttpResponse response = client.execute(httpost);
        String result = EntityUtils.toString(response.getEntity(),"UTF-8");
        jsonObject = JSONObject.fromObject(result);
        return jsonObject;
    }

    /**
     * 文件上传
     * @param filePath
     * @param accessToken
     * @param type
     * @return
     * @throws IOException
     * @throws NoSuchAlgorithmException
     * @throws NoSuchProviderException
     * @throws KeyManagementException
     */
    public static String upload(String filePath, String accessToken,String type) throws IOException, NoSuchAlgorithmException, NoSuchProviderException, KeyManagementException {
        File file = new File(filePath);
        if (!file.exists() || !file.isFile()) {
            throw new IOException("文件不存在");
        }

        String url = UPLOAD_URL.replace("ACCESS_TOKEN", accessToken).replace("TYPE",type);

        URL urlObj = new URL(url);
        //连接
        HttpURLConnection con = (HttpURLConnection) urlObj.openConnection();

        con.setRequestMethod("POST");
        con.setDoInput(true);
        con.setDoOutput(true);
        con.setUseCaches(false);

        //设置请求头信息
        con.setRequestProperty("Connection", "Keep-Alive");
        con.setRequestProperty("Charset", "UTF-8");

        //设置边界
        String BOUNDARY = "----------" + System.currentTimeMillis();
        con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + BOUNDARY);

        StringBuilder sb = new StringBuilder();
        sb.append("--");
        sb.append(BOUNDARY);
        sb.append("\r\n");
        sb.append("Content-Disposition: form-data;name=\"file\";filename=\"" + file.getName() + "\"\r\n");
        sb.append("Content-Type:application/octet-stream\r\n\r\n");

        byte[] head = sb.toString().getBytes("utf-8");

        //获得输出流
        OutputStream out = new DataOutputStream(con.getOutputStream());
        //输出表头
        out.write(head);

        //文件正文部分
        //把文件已流文件的方式 推入到url中
        DataInputStream in = new DataInputStream(new FileInputStream(file));
        int bytes = 0;
        byte[] bufferOut = new byte[1024];
        while ((bytes = in.read(bufferOut)) != -1) {
            out.write(bufferOut, 0, bytes);
        }
        in.close();

        //结尾部分
        byte[] foot = ("\r\n--" + BOUNDARY + "--\r\n").getBytes("utf-8");//定义最后数据分隔线

        out.write(foot);

        out.flush();
        out.close();

        StringBuffer buffer = new StringBuffer();
        BufferedReader reader = null;
        String result = null;
        try {
            //定义BufferedReader输入流来读取URL的响应
            reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String line = null;
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            if (result == null) {
                result = buffer.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                reader.close();
            }
        }

        JSONObject jsonObj = JSONObject.fromObject(result);

        System.out.println(jsonObj);
        String typeName = "media_id";
        if(!"image".equals(type)){
            typeName = type + "_media_id";
        }
        String mediaId = jsonObj.getString(typeName);
        return mediaId;
    }

    /**
     * 获取accessToken
     * @return
     * @throws ParseException
     * @throws IOException
     */
    public static AccessToken getAccessToken() throws ParseException, IOException{
        AccessToken token = new AccessToken();
        String url = ACCESS_TOKEN_URL.replace("APPID", APPID).replace("APPSECRET", APPSECRET);
        JSONObject jsonObject = doGetStr(url);
        if(jsonObject!=null){
            token.setToken(jsonObject.getString("access_token"));
            token.setExpiresIn(jsonObject.getInt("expires_in"));
        }
        return token;
    }

    /**
     * 获取accessToken
     * @return
     * @throws ParseException
     * @throws IOException
     */
    public static String getDdAccessToken() throws ParseException, IOException{
        AccessToken token = new AccessToken();
        String url = "https://oapi.dingtalk.com/gettoken?appkey=dingwsiujljqqjafzsqa&appsecret=d6kPlwFWOU0m27VTcJjye-keIBSilm7v_biUBinin2cBTm5YpypcjQKvpcGblkkp";
        JSONObject jsonObject = doGetStr(url);
        if(jsonObject!=null){
            String tokenStr = jsonObject.getString("access_token").toString();
            return tokenStr;
        }
        return "";
    }

    /**
     * 组装菜单
     * @return
     */
    public static Menu initMenu(){
        Menu menu = new Menu();
        ClickButton button11 = new ClickButton();
        button11.setName("产品白皮书");
        button11.setType("click");
        button11.setKey("11");


        ClickButton button12 = new ClickButton();
        button12.setName("受理一点通");
        button12.setType("click");
        button12.setKey("12");

        ClickButton button13 = new ClickButton();
        button13.setName("实战宝典");
        button13.setType("click");
        button13.setKey("13");

        ViewButton button21 = new ViewButton();
        button21.setName("训练");
        button21.setType("view");
        button21.setUrl("http://dghz.ngrok.xiaomiqiu.cn/wechat/listUI");

        ViewButton button31 = new ViewButton();
        button31.setName("练习");
        button31.setType("view");
        button31.setUrl("http://www.imooc.com");

        ViewButton button41 = new ViewButton();
        button41.setName("view菜单");
        button41.setType("view");
        button41.setUrl("http://www.imooc.com");

       /* ClickButton button31 = new ClickButton();
        button31.setName("扫码事件");
        button31.setType("scancode_push");
        button31.setKey("31");*/

        ClickButton button32 = new ClickButton();
        button32.setName("地理位置");
        button32.setType("location_select");
        button32.setKey("32");

        Button button = new Button();
        button.setName("销售秘籍");
        button.setSub_button(new Button[]{button11,button12,button13});

        Button button1 = new Button();
        button1.setName("实用工具");
        button1.setSub_button(new Button[]{button21,button31,button41});

        menu.setButton(new Button[]{button,button1});
        return menu;
    }



    /**
     * 创建菜单
     * @param token
     * @param menu
     * @return
     * @throws ParseException
     * @throws IOException
     */
    public static int createMenu(String token,String menu) throws ParseException, IOException{
        int result = 0;
        String url = CREATE_MENU_URL.replace("ACCESS_TOKEN", token);
        JSONObject jsonObject = doPostStr(url, menu);
        if(jsonObject != null){
            result = jsonObject.getInt("errcode");
        }
        return result;
    }

    /**
     * 获取openId
     * @param token
     * @return
     * @throws ParseException
     * @throws IOException
     */
    public static String getUserOpenId(String token) throws ParseException, IOException{
        String result = "";
        String url = GET_OPENID_URL.replace("ACCESS_TOKEN", token);
        JSONObject jsonObject =doGetStr(url);
        if(jsonObject != null){
            result = jsonObject.getString("openid");
        }
        return result;
    }

    /**
     * 群发信息
     * @param token
     * @param message
     * @return
     * @throws ParseException
     * @throws IOException
     */
    public static int sendGroupMessage(String token,String message) throws ParseException, IOException{
        int result = 0;
        String url = SENDALL_URL.replace("ACCESS_TOKEN", token);
        JSONObject jsonObject = doPostStr(url, message);
        if(jsonObject != null){
            result = jsonObject.getInt("errcode");
        }
        return result;
    }


    /**
     * 上传图文素材
     * @param token
     * @param message
     * @return
     * @throws ParseException
     * @throws IOException
     */
    public static String uploadNews(String token,String message) throws ParseException, IOException{
        String result = "";
        String url = UPLOADNEWS_URL.replace("ACCESS_TOKEN", token);
        JSONObject jsonObject = doPostStr(url, message);
        if(jsonObject != null){
            result = jsonObject.getString("media_id");
        }
        return result;
    }
}

package com.yuhui.shiro;

import com.yuhui.dao.UserDao;
import com.yuhui.domain.user.User;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ShiroRealm extends AuthorizingRealm{

    @Resource
    private UserDao userDao;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        // 获取用户输入的用户名和密码
        String userName = (String) token.getPrincipal();
        String password = new String((char[]) token.getCredentials());


         User user = new User();
         user.setName(userName);
         user.setPassWord(password);

        Map<String,Object> map = new HashMap<>();

        map.put("userName",userName);
        map.put("passWord",password);

        List<User> userList = userDao.selectByMap(map);

        System.out.println("用户" + userName + "认证-----ShiroRealm.doGetAuthenticationInfo");

        if(userList.isEmpty()){
            throw new UnknownAccountException("用户名或密码错误！");
        }

        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(user, password, getName());
        return info;
    }
}

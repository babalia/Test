package com.yuhui.controller.flow;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yuhui.dao.SysUserDao;
import com.yuhui.domain.user.SysUser;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestController {

    @Autowired
    private SysUserDao sysUserDao;

    @Test
   public void test(){
        Map<String,Object> map = new HashMap<>();
        map.put("userName","admin");

        IPage<SysUser> pageList = sysUserDao.selectPage(new Page<SysUser>(1,10),new QueryWrapper<SysUser>().isNotNull("town_name"));

        List<SysUser> list = pageList.getRecords();

        for(SysUser sys:list){
            System.out.println(sys.getRealName());
        }

        /*int i = sysUserDao.selectCount(new QueryWrapper<SysUser>().eq("real_name","超管理员"));

        System.out.println(i);*/
    }
}

package com.yuhui;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan(basePackages = "com.yuhui.dao")
//扫描 所有需要的包, 包含一些自用的工具类包 所在的路径
@ComponentScan(basePackages = {"com.yuhui"})
public class WechatApplication{

   /*@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(WechatApplication.class);
    }*/

    public static void main(String[] args) {

        SpringApplication.run(WechatApplication.class,args);
        System.out.println("打印");

    }
}

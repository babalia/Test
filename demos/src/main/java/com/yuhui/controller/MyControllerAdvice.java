package com.yuhui.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class MyControllerAdvice {
    private final static Logger logger = LoggerFactory.getLogger(MyControllerAdvice.class);


    /**
     * 全局异常捕捉处理
     * @param ex
     * @return
     */
    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    public Map errorHandler(Exception ex) {
        Map map = new HashMap();

        String msg = "";
        if(ex instanceof NullPointerException){
            map.put("code", 500);
            msg = "空指针异常";
            logger.error(msg);
        }else if(ex instanceof IOException){
            map.put("code", 500);
            msg = "IO流异常";
            logger.error(msg);
        }else if(ex instanceof IndexOutOfBoundsException){
            map.put("code",404);
            msg = "数组越界异常";
            logger.error(msg);
        }

        map.put("msg",msg);
        return map;
    }
}

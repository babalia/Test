package com.yuhui.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 拦截器
 */
public class MyInterceptor implements HandlerInterceptor {
    private static final Logger log = LoggerFactory.getLogger(MyInterceptor.class);

    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3) throws Exception{
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object arg2, ModelAndView arg3) throws Exception

    {

    }
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {
        String contextPath = request.getContextPath();
        String url = request.getRequestURI();
        System.out.println("被调用");
        return true;
    }

}

package com.yuhui.controller.flow;

import com.yuhui.domain.test.FlowInfo;
import com.yuhui.service.flowinfo.FlowInfoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/flowInfo")
public class FlowInfoController {
    private static Logger logger = Logger.getLogger(FlowInfoController.class);
    @Autowired
    private FlowInfoService flowInfoService;

    @PostMapping("/findAllFlow")
    public Map<String,Object> findAllFlow(HttpServletRequest request){
          Map<String,Object> map = new HashMap<>();

           List<FlowInfo> list = flowInfoService.findAllData(request);

           if(list.isEmpty()){
             logger.info("未找到数据!!!");
           }else {
               map.put("rows",list);
           }
           return map;
    }

    @PostMapping("/saveFlowInfo")
    public Map<String,Object> saveFlowInfo(FlowInfo info){
        Map<String,Object> map = new HashMap<>();

        flowInfoService.saveFlowInfo(info);

        map.put("state",1);

        return map;
    }



}

package com.yuhui.service.flowinfo.impl;

import com.yuhui.dao.FlowInfoDao;
import com.yuhui.domain.test.FlowInfo;
import com.yuhui.service.flowinfo.FlowInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FlowInfoServiceImpl implements FlowInfoService {

    @Resource
    private FlowInfoDao infoDao;

    @Override
    @Transactional(readOnly = true)
    public List<FlowInfo> findAllData(HttpServletRequest request) {
        String id = request.getParameter("id");
        Map<String,Object> map = new HashMap<>();
        map.put("id",id);
        List<FlowInfo> list = new ArrayList<>();

             list = infoDao.findAllData(map);

        return list;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public int saveFlowInfo(FlowInfo info) {

        int i = infoDao.saveFlowInfo(info);

        return i;
    }
}

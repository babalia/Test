package com.yuhui.dao;

import com.yuhui.domain.test.FlowInfo;

import java.util.List;
import java.util.Map;

public interface FlowInfoDao {
    public List<FlowInfo> findAllData(Map<String,Object> map);

    public int saveFlowInfo(FlowInfo info);
}

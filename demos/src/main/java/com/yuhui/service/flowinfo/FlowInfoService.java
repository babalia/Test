package com.yuhui.service.flowinfo;

import com.yuhui.domain.test.FlowInfo;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface FlowInfoService {

    public List<FlowInfo> findAllData(HttpServletRequest request);

    public int saveFlowInfo(FlowInfo info);
}

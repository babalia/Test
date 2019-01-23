package com.yuhui.domain.user;

import java.util.ArrayList;
import java.util.List;

public class Privilege {

    private String id;//权限id

    private String name;//权限名称

    private String url;//权限url

    private String icon;//图标

    private int showFlag;

    private String priName;

    private int order;//序号

    private Integer lev;// 权限等级

    private String pri_type;// 权限类型

    private Privilege parent;//权限上一级

    private List<Privilege> children=new ArrayList<Privilege>();//权限下一级

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }


    public int getShowFlag() {
        return showFlag;
    }

    public void setShowFlag(int showFlag) {
        this.showFlag = showFlag;
    }

    public Privilege getParent() {
        return parent;
    }

    public void setParent(Privilege parent) {
        this.parent = parent;
    }

    public List<Privilege> getChildren() {
        return children;
    }

    public void setChildren(List<Privilege> children) {
        this.children = children;
    }

    public String getPriName() {
        return priName;
    }

    public void setPriName(String priName) {
        this.priName = priName;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public Integer getLev() {
        return lev;
    }

    public void setLev(Integer lev) {
        this.lev = lev;
    }

    public String getPri_type() {
        return pri_type;
    }

    public void setPri_type(String pri_type) {
        this.pri_type = pri_type;
    }

    @Override
    public String toString() {
        return "Privilege [id=" + id + ", name=" + name + ", url=" + url + ", icon=" + icon + ", priName=" + priName
                + ", order=" + order + ", lev=" + lev + ", pri_type=" + pri_type + ", parent=" + parent + ", children="
                + children + "]";
    }

}

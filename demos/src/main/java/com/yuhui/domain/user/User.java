package com.yuhui.domain.user;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class User {
    private String id;//用户id

    private String name;//用户名

    private String passWord;//密码

    private String phone;//手机号码

    private String mail;//邮箱

    private String realName;//名称

    private String channelType;//渠道类别

    private String business;//商

    private String townName;//镇分

    private String sapHall;

    private String businessHall;

    private String businessName;//商名称

    private String branchName;//网点名称

    private String shopRole;

    private String shopArea;

    private String reaRelease;//是否发布

    private String branch;//网点

    private String deptId;//用户部门id

    private String deptName;//部门名称

    private List<Role> Roles=new ArrayList<Role>();//角色

    public List<Role> getRoles() {
        return Roles;
    }

    public void setRoles(List<Role> roles) {
        Roles = roles;
    }

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

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getChannelType() {
        return channelType;
    }

    public void setChannelType(String channelType) {
        this.channelType = channelType;
    }

    public String getDeptId() {
        return deptId;
    }

    public void setDeptId(String deptId) {
        this.deptId = deptId;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getTownName() {
        return townName;
    }

    public void setTownName(String townName) {
        this.townName = townName;
    }

    public String getSapHall() {
        return sapHall;
    }

    public void setSapHall(String sapHall) {
        this.sapHall = sapHall;
    }

    public String getBusinessHall() {
        return businessHall;
    }

    public void setBusinessHall(String businessHall) {
        this.businessHall = businessHall;
    }

    public String getBusiness() {
        return business;
    }

    public void setBusiness(String business) {
        this.business = business;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getShopRole() {
        return shopRole;
    }

    public void setShopRole(String shopRole) {
        this.shopRole = shopRole;
    }

    public String getShopArea() {
        return shopArea;
    }

    public void setShopArea(String shopArea) {
        this.shopArea = shopArea;
    }

    public String getReaRelease() {
        return reaRelease;
    }

    public void setReaRelease(String reaRelease) {
        this.reaRelease = reaRelease;
    }
}

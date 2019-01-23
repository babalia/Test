package com.yuhui.domain.test;

import java.io.Serializable;

public class FlowInfo implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -5580348120752346090L;

    private String id;
    private String flowInitiator;
    private String flowName;
    private String recipientType;
    private String flowOrder;
    private String flowRole;
    private String flowPerson;
    private String flowStatus;
    private String flowAdvise;
    private String flowNext;
    private String flowLast;
    private String flowLink;
    private String flowLinkAdvise;
    private String createDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFlowInitiator() {
        return flowInitiator;
    }

    public void setFlowInitiator(String flowInitiator) {
        this.flowInitiator = flowInitiator;
    }

    public String getFlowName() {
        return flowName;
    }

    public void setFlowName(String flowName) {
        this.flowName = flowName;
    }

    public String getRecipientType() {
        return recipientType;
    }

    public void setRecipientType(String recipientType) {
        this.recipientType = recipientType;
    }

    public String getFlowOrder() {
        return flowOrder;
    }

    public void setFlowOrder(String flowOrder) {
        this.flowOrder = flowOrder;
    }

    public String getFlowRole() {
        return flowRole;
    }

    public void setFlowRole(String flowRole) {
        this.flowRole = flowRole;
    }

    public String getFlowPerson() {
        return flowPerson;
    }

    public void setFlowPerson(String flowPerson) {
        this.flowPerson = flowPerson;
    }

    public String getFlowStatus() {
        return flowStatus;
    }

    public void setFlowStatus(String flowStatus) {
        this.flowStatus = flowStatus;
    }

    public String getFlowAdvise() {
        return flowAdvise;
    }

    public void setFlowAdvise(String flowAdvise) {
        this.flowAdvise = flowAdvise;
    }

    public String getFlowNext() {
        return flowNext;
    }

    public void setFlowNext(String flowNext) {
        this.flowNext = flowNext;
    }

    public String getFlowLast() {
        return flowLast;
    }

    public void setFlowLast(String flowLast) {
        this.flowLast = flowLast;
    }

    public String getFlowLink() {
        return flowLink;
    }

    public void setFlowLink(String flowLink) {
        this.flowLink = flowLink;
    }

    public String getFlowLinkAdvise() {
        return flowLinkAdvise;
    }

    public void setFlowLinkAdvise(String flowLinkAdvise) {
        this.flowLinkAdvise = flowLinkAdvise;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }
}

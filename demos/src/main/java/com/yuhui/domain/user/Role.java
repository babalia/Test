package com.yuhui.domain.user;


import java.util.ArrayList;
import java.util.List;

public class Role {
    private String id;
    private String name;
    private String description;
    private List<Privilege> privileges = new ArrayList<Privilege>();

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Privilege> getPrivileges() {
        return this.privileges;
    }

    public void setPrivileges(List<Privilege> privileges) {
        this.privileges = privileges;
    }
}

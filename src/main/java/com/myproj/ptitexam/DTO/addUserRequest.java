package com.myproj.ptitexam.DTO;

import com.myproj.ptitexam.model.Roles;

import java.util.List;
import java.util.Set;

public class addUserRequest {
    private String username;
    private String email;
    private String password;
    private List<Roles> roles;

    public List<Roles> getRoles() {
        return roles;
    }

    public addUserRequest( String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

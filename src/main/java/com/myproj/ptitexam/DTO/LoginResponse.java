package com.myproj.ptitexam.DTO;

import java.util.List;

public class LoginResponse {
    private boolean status;
    private String message;
    private int user_id;

    public LoginResponse(boolean status, String message, int user_id) {
        this.status = status;
        this.message = message;
        this.user_id = user_id;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}

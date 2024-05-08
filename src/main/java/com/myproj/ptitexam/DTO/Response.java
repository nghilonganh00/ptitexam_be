package com.myproj.ptitexam.DTO;

public class Response {
    private boolean status ;
    private String message;

    public Response() {
    }

    public Response(boolean status, String message) {
        this.status = status;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}

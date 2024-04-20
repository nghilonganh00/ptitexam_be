package com.myproj.ptitexam.DTO;

public class ExamResultDTO {
    private int id;
    private String user_name;
    private String exam_title;
    private double score;

    public ExamResultDTO(){

    }

    public ExamResultDTO(int id, String user_name, String exam_title, double score) {
        this.id = id;
        this.user_name = user_name;
        this.exam_title = exam_title;
        this.score = score;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getExam_title() {
        return exam_title;
    }

    public void setExam_title(String exam_title) {
        this.exam_title = exam_title;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}

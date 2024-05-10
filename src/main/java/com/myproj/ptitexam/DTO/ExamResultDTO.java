package com.myproj.ptitexam.DTO;

public class ExamResultDTO {
    private int id;
    private int exam_id;
    private String user_name;
    private String exam_title;
    private double score;
    private String start_time;

    public ExamResultDTO(){

    }

    public ExamResultDTO(int id,int exam_id, String user_name, String exam_title, double score,String start_time) {
        this.id = id;
        this.user_name = user_name;
        this.exam_title = exam_title;
        this.score = score;
        this.exam_id=exam_id;
        this.start_time= start_time;
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

    public int getExam_id() {
        return exam_id;
    }

    public void setExam_id(int exam_id) {
        this.exam_id = exam_id;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }
}

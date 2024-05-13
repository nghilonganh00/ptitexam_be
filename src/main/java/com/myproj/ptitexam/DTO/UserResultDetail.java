package com.myproj.ptitexam.DTO;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

public class UserResultDetail {
    private String exam;
    private double score;
    private Timestamp endTime;
    private List<ResultDetailDTO> details;

    public UserResultDetail(String exam, double score, Timestamp endTime, List<ResultDetailDTO> details) {
        this.exam = exam;
        this.score = score;
        this.endTime = endTime;
        this.details = details;
    }

    public String getExam() {
        return exam;
    }

    public void setExam(String exam) {
        this.exam = exam;
    }

    public double getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public List<ResultDetailDTO> getDetails() {
        return details;
    }

    public void setDetails(List<ResultDetailDTO> details) {
        this.details = details;
    }
}
